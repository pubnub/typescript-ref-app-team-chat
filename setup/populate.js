const PubNub = require("pubnub");
const initializationData = require("./team-chat-initialization-data");
const { SingleBar, Presets } = require("cli-progress");
const prompts = require("prompts");
const fs = require("file-system");
const dotenv = require("dotenv");
const expand = require("dotenv-expand");

const keyPrompt = `
*** A PubNub account is required. ***
Visit the PubNub dashboard to create an account or login.
     https://dashboard.pubnub.com/
Create a new chat app or locate your chat app in the dashboard.
Copy and paste your publish key and then your subscribe key below.
`;

const DOTENV = ".env";
let errorCount = 0;

// group into batches of size
const batch = (list, size) => {
  // split into batches
  return list.reduce(
    (batched, item, index, items) => {
      batched.current.push(item);
      // move complete batches out
      if ((index > 0 && index % size === 0) || index === items.length - 1) {
        batched.complete.push(batched.current);
        batched.current = [];
      }
      return batched;
    },
    { complete: [], current: [] }
  ).complete;
};

//  invoke f on all members of the each batch sequentially
const doBatches = async (batches, f) => {
  for (const batch of batches) {
    await Promise.all(batch.map(f));
  }
};

const getKeys = async () => {
  // check current environment variables in .env
  const env = expand(dotenv.config());
  if (
    env.parsed &&
    env.parsed.REACT_APP_PUBLISH_KEY &&
    env.parsed.REACT_APP_SUBSCRIBE_KEY
  ) {
    if (process.argv[2] === "--quick-test") {
      console.log("Keys detected in .env");
      process.exit(0);
    }
    return {
      publishKey: env.parsed.REACT_APP_PUBLISH_KEY,
      subscribeKey: env.parsed.REACT_APP_SUBSCRIBE_KEY
    };
  }
  // prompt
  console.log(keyPrompt);
  const result = await prompts([
    {
      type: "text",
      name: "publishKey",
      message: "Enter your publish key",
      validate: key => (key.startsWith("pub-") ? true : "Invalid publish key")
    },
    {
      type: "text",
      name: "subscribeKey",
      message: "Enter your subscribe key",
      validate: key => (key.startsWith("sub-") ? true : "Invalid subscribe key")
    }
  ]);
  // append to .env
  fs.writeFileSync(
    DOTENV,
    `\nREACT_APP_PUBLISH_KEY=${result.publishKey}\nREACT_APP_SUBSCRIBE_KEY=${result.subscribeKey}`,
    { flag: "a" }
  );
  console.log("\n Your keys have been saved to .env");
  return {
    publishKey: result.publishKey,
    subscribeKey: result.subscribeKey
  };
};

const formatError = e =>
  `${e.name}(${e.status.operation}): ${e.status.category}.${e.status.errorData.code}`;

const initializeUUID = (pubnub, status) => async ({ id: uuid, ...data }) => {
  try {
    const response = await pubnub.objects.setUUIDMetadata({
      uuid,
      data
    });
    if (response.status === 403) {
      console.error(
        "Objects is not enabled on your keys.\nPlease enable objects in your PubNub dashboard to proceed."
      );
      process.exit(1);
    } else if (response.status === 200) {
      status.increment();
    } else {
      errorCount++;
      console.error(`Unknown error initializing data for ${uuid}.`);
    }
  } catch (e) {
    errorCount++;
    console.error(formatError(e));
  }
};

const initializeChannel = (pubnub, status) => async ({
  id: channel,
  ...data
}) => {
  try {
    const response = await pubnub.objects.setChannelMetadata({
      channel,
      data
    });
    if (response.status === 200) {
      status.increment();
    } else {
      errorCount++;
      console.error(`Unknown error initializing data for ${channel}.`);
    }
  } catch (e) {
    errorCount++;
    console.error(formatError(e));
  }
};

const initializeMembership = (pubnub, status) => async ({
  space: channel,
  members: uuids
}) => {
  try {
    const response = await pubnub.objects.setChannelMembers({
      channel,
      uuids
    });
    if (response.status === 200) {
      status.increment(uuids.length);
    } else {
      errorCount++;
      console.error(`Unknown error initializing members for ${channel}.`);
    }
  } catch (e) {
    errorCount++;
    console.error(formatError(e));
  }
};

// the bars need a second to update
const sleep = async ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const main = async () => {
  // get pubsub keys
  const keys = await getKeys();
  const pubnub = new PubNub({
    ...keys
  });
  // setup progress bars
  const totalUUIDs = initializationData.users.length;
  const totalChannels = initializationData.spaces.length;
  const totalMemberships = initializationData.members
    .map(channel => channel.members.length)
    .reduce((a, b) => a + b);
  const uuidCreationStatus = new SingleBar({}, Presets.shades_classic);
  const channelCreationStatus = new SingleBar({}, Presets.shades_classic);
  const membershipCreationStatus = new SingleBar({}, Presets.shades_classic);

  // initialize data
  console.log("\nInitializing UUID Metdata:");
  uuidCreationStatus.start(totalUUIDs, 0);
  await doBatches(
    batch(initializationData.users, 10),
    initializeUUID(pubnub, uuidCreationStatus)
  );
  await sleep(100);
  console.log("\n");

  console.log("\nInitializing Channel Metdata:");
  channelCreationStatus.start(totalChannels, 0);
  await doBatches(
    batch(initializationData.spaces, 5),
    initializeChannel(pubnub, channelCreationStatus)
  );
  await sleep(100);
  console.log("\n");

  console.log("\nInitializing Memberships:");
  // batch members into groups of 20
  const memberships = initializationData.members
    .map(({ space, members }) =>
      batch(members, 10).map(batched => ({ space, members: batched }))
    )
    .flat();
  membershipCreationStatus.start(totalMemberships, 0);
  // memberships seem to be more likely to timeout, so take it slowly
  await sleep(1000);
  await doBatches(
    batch(memberships, 1),
    initializeMembership(pubnub, membershipCreationStatus)
  );
  await sleep(100);
  console.log("\n");

  if (errorCount === 0) {
    process.exit(0);
  } else {
    console.warn(
      `${errorCount} error${
        errorCount === 1 ? "" : "s"
      } initializing data. \n Please "npm run setup" again.`
    );
    process.exit(1);
  }
};

main();
