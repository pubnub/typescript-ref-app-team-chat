// users were generated using https://mockaroo.com/, then https://www.csvjson.com/csv2json, then ran through a quick conversion

const json = {}; // output from csv json

const users = json.reduce((obj, entry) => {
  const { first_name, last_name, team, title, id } = entry;
  var teamChannel = team
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace("-and", "")
    .replace("-development", "")
    .replace("-management", "")
    .replace("human-resouces", "hr");
  obj[id] = {
    id,
    name: `${first_name} ${last_name}`,
    profileUrl: `robohash://${id}`,
    custom: {
      title
    },
    spaces: [teamChannel, "introductions", "random", "announcements", "standup"]
  };
  return obj;
}, {});

// create a bunch of fake spaces
const shared = ["introductions", "random", "announcements", "standup"];
const teams = [
  "services",
  "sales",
  "engineering",
  "accounting",
  "training",
  "human-resources",
  "research",
  "support",
  "marketing",
  "business",
  "product",
  "legal"
]; // Object.keys(users)
const spaces = teams.concat(shared);

const present = Object.keys(users).filter(() =>
  Math.round(Math.random() + 0.1)
);

const createSpace = space => {
  var description = `internal discussion for the ${space.replace(
    /\s/g,
    " "
  )} team`;
  if (shared.indexOf(space) > -1) {
    description = {
      introductions: "welcome new members to the team",
      random: "offtopic discussion",
      announcements: "important company wide announcements",
      standup: "share anything you're progress with other teams"
    }[space];
  }
  const members = Object.keys(users).filter(
    user => users[user].spaces.indexOf(space) > -1
  );
  return {
    name: space,
    description,
    messages: [], // TODO,
    members,
    present: members.filter(user => present.indexOf(user) > -1)
  };
};

var spacesData = spaces.map(createSpace).reduce((obj, space) => {
  obj[space.name] = space;
  return obj;
}, {});

// create fake messages and add them to the spaces

const randomFrom = arr => {
  return arr[Math.floor(Math.random() * arr.length)] || arr[0];
};

const createIntroduction = user => {
  const greetings = ["Hi all", "Hey everyone", "Hello"];
  const punctuation = [",", "!", " -", "."];
  const intros = ["I'm", "My name is", "I am"];
  const intros2 = [
    "I'm joining",
    "I'll be working with",
    "I'm excited to be joining"
  ];
  const descriptions = [
    "awesome",
    "wonderful",
    "great folks over on the",
    "great people on the",
    "awesome people in the",
    "amazing people of the",
    ""
  ];
  const join = ["as a", "working as a"];
  const end = [
    "I can't wait to meet you all!",
    "I'm looking forwards to working with you.",
    "I'm excited to be here.",
    "I can't wait to get started.",
    "This seems like an awesome team!",
    ""
  ];

  return `${randomFrom(greetings)}${randomFrom(punctuation)} ${randomFrom(
    intros
  )} ${user.name}. ${randomFrom(intros2)} the ${randomFrom(descriptions)} ${
    user.spaces[0]
  } team ${randomFrom(join)} ${user.custom.title}. ${randomFrom(end)}`;
};

const introductionsCreator = space => {
  return space.members.map(user => {
    return [user, createIntroduction(users[user])];
  });
};

const genericCreator = messages => {
  return space => {
    return messages.map(message => {
      return [
        randomFrom(space.members),
        message.replace(
          /USER/g,
          users[randomFrom(space.members)].name.split(" ")[0]
        )
      ];
    });
  };
};

const userCreator = messages => {
  return space => {
    return messages.map(message => {
      return [
        space.members[message[0]] || space.members[0],
        message[1].replace(/USER/g, randomFrom(space.members))
      ];
    });
  };
};

const announcements = [
  "Heads up, we'll be loosing internet during some setup today.",
  "The all hands for today is cancelled, we're having technical difficulties.",
  "If anyone is interested, we have extra passes to a bunch of upcoming conferences.",
  "We're looking to hire on the marketing team! Make sure to tell and friends you have who you think would be a good fit.",
  "The doors to the building have been acting up. Just ping a friend if you need to get in (or yell really loud)",
  "Reminder: everyone gets the holiday weekend off!",
  "Looks like Slack is down. Make sure to continue using PubNub instead.",
  "Make sure to be out of the office early on Tuesday, the company in the basement is going to be fumigating.",
  "The electric is getting redone next week. Plan on working from home."
];

const random = [
  "Any good restaurants around here?",
  "Depends what you like",
  "There's a lot",
  "I like the pizza place a few blocks west from here",
  "^ definitely gets my vote",
  "the food trucks are pretty good",
  "You have to get there early",
  "lines aren't worth it imo"
];

var messagesData = {};

const fillWithMessages = (space, creator, interval) => {
  var time = new Date().getTime();
  const messages = creator(spacesData[space])
    .map(message => {
      time += interval * Math.random() * 2;
      return {
        channel: space,
        type: "message",
        content: {
          type: "text",
          body: message[1]
        },
        tt: time.toString(),
        sender: message[0]
      };
    })
    .reduce((obj, msg) => {
      obj[msg.tt] = msg;
      return obj;
    }, {});
  spacesData[space].messages = Object.keys(messages);
  messagesData = { ...messagesData, ...messages };
};

fillWithMessages("introductions", introductionsCreator, 1e3 * 60 * 60 * 24 * 7);
fillWithMessages(
  "announcements",
  genericCreator(announcements),
  1e3 * 60 * 60 * 24 * 3
);
teams.forEach(team => fillWithMessages(team, userCreator(team), 1e3 * 60));
fillWithMessages("random", genericCreator(random), 1e3 * 60 * 15);
