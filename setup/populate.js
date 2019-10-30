const PubNub = require('pubnub');
const data = require('./input_data.json'); 
const keys = require('../src/config/pubnub-keys.json');
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
let membershipsCreationErrors;

if(keys.publishKey.length && keys.subscribeKey.length) {
    console.log('Keys detected in `src/config/pubnub-keys.json`.');
    scriptStart(keys.publishKey, keys.subscribeKey);
} else {
    console.log('*** A PubNub account is required. ***');
    console.log('');
    console.log('Visit the PubNub dashboard to create an account or login.');
    console.log('     https://dashboard.pubnub.com/');
    console.log('');
    console.log('Go to your Apps > Keys Settings page.');
    console.log('Copy and paste your publish and then your subscribe keys below.');
    rl.question("\nEnter your publish key: ", publishKey => {
        rl.question("Enter your subscribe key: ", subscribeKey => { 
            const updateKeys = {
                "publishKey": publishKey,
                "subscribeKey": subscribeKey
            }
            fs.writeFile('../src/config/pubnub-keys.json', JSON.stringify(updateKeys), (err) => {
                if (!err) console.log('\nYour keys have been saved to `src/config/pubnub-keys.json` file.');
                scriptStart(publishKey, subscribeKey);
            });
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
                        name: item.name
                    },  status => { 
                        if (!status.error) {
                            resolve()  
                        }
                        else {
                            if (status.statusCode === 409) { //skip duplicate users ie that already exists
                                resolve();
                            } 
                            else {
                                console.log(`\ncreateUser ${item.id} error:`, status.errorData ? status.errorData : status.message);
                                reject()
                            }
                        }
                    })
                }, 100*(index + 1));
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
                        name: item.name
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
        data.spaces.forEach((item, index) => {
            createdMemberships.push(new Promise((resolve, reject) => {
                setTimeout(() => {
                    membershipsCreatedBar.increment();
                    pubnub.addMembers({
                        spaceId: item.id,
                        users: data.spaces[index].members.map(member => ({ id: member }))
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
                            console.log('\naddMembers error:', status.errorData.error.message);
                            reject();
                        }
                    })
                }, 100*(index + 1));
            }));
        });
    }

    createUsers();
    let values = await Promise.allSettled(createdUsers);
    createdUsers = values.filter(value => value.status === 'fulfilled');
    userCreationErrors = values.filter(value => value.status === 'rejected');
    createSpaces();
    values = await Promise.allSettled(createdSpaces);
    createdSpaces = values.filter(value => value.status === 'fulfilled');
    spacesCreationErrors = values.filter(value => value.status === 'rejected');
    createMemberships();
    values = await Promise.allSettled(createdMemberships);
    createdMemberships = values.filter(value => value.status === 'fulfilled');
    membershipsCreationErrors = values.filter(value => value.status === 'rejected');
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
        console.log(``);
        console.log(`Your data has been loaded successfully!`);
        console.log(`Try 'npm start' next to run the application.`);
        process.exit(0);
});