let PubNub = require('pubnub');
const data = require('./input_data.json'); 
const keys = require('./config/keys.json');
const _cliProgress = require('cli-progress');
const readline = require("readline");
const fs = require('file-system');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let createdUsers = [];
let createdSpaces = [];

if(keys.publishKey.length && keys.subscribeKey.length)
    scriptStart(keys.publishKey, keys.subscribeKey);
else {
    console.log('Please sign in to your PubNub Dashboard(https://dashboard.pubnub.com) to create an account.');
    console.log('Go to your Apps > Keys Settings page and copy your publish and subscribe keys.');
    rl.question("\nEnter publish key: ", publishKey => {
        rl.question("Enter subscribe key: ", subscribeKey => { 
            const updateKeys = {
                "publishKey": publishKey,
                "subscribeKey": subscribeKey
            }
            fs.writeFile('./config/keys.json', JSON.stringify(updateKeys), (err) => {
                if (!err) console.log('\nYour keys have been saved to `setup/config/keys.json` file.');
                scriptStart(publishKey, subscribeKey);
            });
        })
    })
}

function scriptStart (publishKey, subscribeKey) {
    let pubnub = new PubNub({
        subscribeKey: `${subscribeKey}`,
        publishKey: `${publishKey}`
    });
    let numberOfUsers = data.users.length;
    let numberOfSpaces = data.spaces.length;
    console.log('\nCreating users:');
    const usersCreatedBar = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
    const spacesCreatedBar = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
    usersCreatedBar.start(numberOfUsers, 0);

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
                        if (status.statusCode !== 409) //skip duplicate users ie that already exists
                            console.log('\ncreateUser '+item.id+' error:', status.errorData);
                        reject()
                    }
                })
            }, 100*(index + 1));
        }));
    });

    const createSpacesAndMembers = () => {
        console.log('\nCreating spaces and members:');
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
                            pubnub.addMembers({
                                spaceId: item.id,
                                users: data.spaces[index].members.map(member => ({ id: member }))
                            },  status => {
                                if(!status.error) {
                                    resolve()  
                                }
                                else {
                                    if (status.statusCode !== 400)
                                        console.log('\naddMembers error:', status);
                                    reject()
                                }
                            }) 
                        }   
                        else {
                            if (status.statusCode !== 409)  //skip duplicate users ie that already exists
                                console.log('\ncreateSpace error:', status.errorData);
                            reject()
                        }
                    })
                }, 100*(index + 1));
            }));
        });
    }

    Promise.all(createdUsers.map(p => p.catch(e => e))).then(() => {
        createSpacesAndMembers();
        Promise.all(createdSpaces.map(p => p.catch(e => e))).then(() => rl.close())
    })
}

rl.on("close", () => {
    console.log(`\n\n${createdUsers.length} users created.\n${createdSpaces.length} spaces created.`);
    console.log(`Your data has been loaded successfully!`);
    process.exit(0);
});