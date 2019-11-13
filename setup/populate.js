const PubNub = require('pubnub');
const data = require('./input_data.json'); 
const _cliProgress = require('cli-progress');
const readline = require("readline");
const fs = require('file-system');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let createdUsers = [];
let userCreationErrors;
let createdSpaces = [];
let spacesCreationErrors;
let createdMemberships = [];
let membershipsCreationErrors = [''];
let keys;
let membersPerRequest = 20;

const CONFIG_FILE = 'src/config/pubnub-keys.json';

try {
    const rawdata = fs.readFileSync(CONFIG_FILE);
    keys = JSON.parse(rawdata);
    if(keys && keys.publishKey.length && keys.subscribeKey.length) {
        console.log(`Keys detected in ${CONFIG_FILE}.`);
        if (process.argv[2] === '--quick-test') {
            process.exit(0);
        }
        scriptStart(keys.publishKey, keys.subscribeKey);
    }
    else addKeysAndStartScript(); //in case of empty pub&sub values
} catch (e) {
    addKeysAndStartScript(); //in case of non-xisting keys file
}

function addKeysAndStartScript() {
    console.log('\n*** A PubNub account is required. ***');
    console.log('\nVisit the PubNub dashboard to create an account or login.');
    console.log('\n     https://dashboard.pubnub.com/');
    console.log('\nCreate a new chat app or locate your chat app in the dashboard.');
    console.log('\nCopy and paste your publish key and then your subscribe key below.');
    rl.question("\nEnter your publish key: ", publishKey => {
        rl.question("Enter your subscribe key: ", subscribeKey => {
            if (publishKey.startsWith('pub') && subscribeKey.startsWith('sub')) {
                const updateKeys = {
                    "publishKey": publishKey,
                    "subscribeKey": subscribeKey
                }
                if(!keys) {
                    fs.openSync(CONFIG_FILE, 'a'); 
                    console.log(`\n${CONFIG_FILE} file for storing your publish and subscribe key is created.`)
                }
                fs.writeFile(CONFIG_FILE, JSON.stringify(updateKeys), (err) => {
                    if (!err) console.log( `\nYour keys have been saved to ${CONFIG_FILE} file.`);
                    scriptStart(publishKey, subscribeKey);
                });
            } 
            else {
                console.log('\nYou entered invalid keys format!');
                process.exit(1);
            }
        })
    })
}

async function scriptStart (publishKey, subscribeKey) {
    let pubnub = new PubNub({
        subscribeKey: `${subscribeKey}`,
        publishKey: `${publishKey}`
    });     
    let numberOfUsers = data.users.length;
    let numberOfSpaces = data.spaces.length;
    const usersCreatedBar = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
    const spacesCreatedBar = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
    const membershipsCreatedBar = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
    console.log('\nCreating users:');
    usersCreatedBar.start(numberOfUsers, 0);

    const createUsers = () => {
        data.users.forEach((item, index) => {
            createdUsers.push(new Promise((resolve, reject) => {
                setTimeout(() => {
                    usersCreatedBar.increment();
                    pubnub.createUser({
                        id: item.id,
                        name: item.name,
                        profileUrl: item.profileUrl,
                        custom: item.custom
                    },  status => { 
                        if (!status.error) {
                            resolve()  
                        }
                        else {
                            if (status.statusCode === 409) { //skip duplicate users ie that already exists
                                resolve();
                            } 
                            else if (status.statusCode === 403) { //objects are not enabled for the subscribe key
                                console.log(`\n${status.errorData.error.message}`);
                                console.log('Please enable objects in your PubNub dashboard to proceed.');
                                process.exit(1);
                            }
                            else {
                                console.log(`\ncreateUser ${item.id} error:`, status.errorData ? (
                                    console.log('\nSubscribe key that you entered is invalid!'), 
                                    //reset keys in case of invalid format
                                    fs.writeFile(CONFIG_FILE, JSON.stringify({"publishKey": "", "subscribeKey": ""}), () => {  
                                        process.exit(1)  //Early exit
                                    })
                                ) : status.message);
                                reject()
                            }
                        }
                    })
                }, 150*(index + 1));
            }));
        });
    }

    const createSpaces = () => {
        console.log('\nCreating spaces:');
        spacesCreatedBar.start(numberOfSpaces, 0);
        data.spaces.forEach((item, index) => {
            createdSpaces.push(new Promise((resolve, reject) => {
                setTimeout(() => {
                    spacesCreatedBar.increment()
                    pubnub.createSpace({
                        id: item.id,
                        name: item.name,
                        description: item.description
                    },  status => {
                        if (!status.error) {
                            resolve();
                        }   
                        else {
                            if (status.statusCode === 409) { //skip duplicate spaces ie that already exists
                                resolve();
                            }
                            else {
                                console.log(`\ncreateSpace ${item.id} error:`, status.errorData ? status.errorData : status.message);
                                reject();
                            }
                        }
                    })
                }, 100*(index + 1));
            }));
        });
    }

    const createMemberships = () => {
        console.log('\nCreating memberships:');
        membershipsCreatedBar.start(numberOfSpaces, 0);
        data.members.forEach((item, index) => {
            createdMemberships.push(new Promise((resolve, reject) => {
                setTimeout(() => {
                    membershipsCreatedBar.increment();
                    if(data.members[index].members.length > membersPerRequest) {
                        let leftMembersToAdd = data.members[index].members.length;
                        let devideMembersArray = [];
                        while (leftMembersToAdd > 0) {
                            let sliceMembersStart = leftMembersToAdd - membersPerRequest > 0 ? leftMembersToAdd - membersPerRequest : 0;
                            devideMembersArray.push(data.members[index].members.slice(sliceMembersStart, leftMembersToAdd))
                            leftMembersToAdd = leftMembersToAdd - membersPerRequest;
                        }
                        for (let members of devideMembersArray) {
                            addMembers(item, members, resolve, reject);
                        }
                    }
                    else addMembers(item, data.members[index].members, resolve, reject);
                }, 100*(index + 1));
            }));
        });

        function addMembers (item, membersToAdd, resolve, reject) {
            pubnub.addMembers({
                spaceId: item.space,
                users: membersToAdd.map(member => ({ id: member }))
            },  status => {
                if(!status.error) {
                    resolve()  
                }
                else if (status.statusCode === 400){
                    if(status.errorData.error.details[0].message === 'User with specified id is already a member.')
                        resolve();
                    else {
                        console.log('\naddMembers error:', status.errorData.error.details[0].message);
                        reject();
                    }
                }
                else {
                    console.log('\naddMembers error:', status.errorData);
                    reject();
                }
            })
        }
    }

    createUsers();
    let values = await Promise.all(createdUsers.map(p => p.then(
        () => ({status: "fulfilled" }),
        () => ({status: "rejected" })
    )));
    createdUsers = values.filter(value => value.status === 'fulfilled');
    userCreationErrors = values.filter(value => value.status === 'rejected');
    createSpaces();
    values = await Promise.all(createdSpaces.map(p => p.then(
        () => ({status: "fulfilled" }),
        () => ({status: "rejected" })
    )));
    createdSpaces = values.filter(value => value.status === 'fulfilled');
    spacesCreationErrors = values.filter(value => value.status === 'rejected');
    if (createdUsers.length > 0 && createdSpaces.length > 0) { //Do not make memberships calls if there are no users or spaces
        createMemberships();
        values = await Promise.all(createdMemberships.map(p => p.then(
            () => ({status: "fulfilled" }),
            () => ({status: "rejected" })
        )));
        createdMemberships = values.filter(value => value.status === 'fulfilled');
        membershipsCreationErrors = values.filter(value => value.status === 'rejected');
    }
    rl.close(); 
}

rl.on("close", () => {
    userCreationErrors.length ? 
        console.log(`\n\n${createdUsers.length} out of ${data.users.length} users created.`) :
        console.log(`\n\n${createdUsers.length} new users created.`);
    spacesCreationErrors.length ? 
        console.log(`${createdSpaces.length} out of ${data.spaces.length} spaces created.`) :
        console.log(`${createdSpaces.length} new spaces created.`);
    membershipsCreationErrors.length ? 
        console.log(`${createdMemberships.length} out of ${data.spaces.length} memberships created.`) :
        console.log(`${createdMemberships.length} new memberships created.`);
        console.log(`\nYour data has been loaded successfully!`);
        process.exit(0);
});