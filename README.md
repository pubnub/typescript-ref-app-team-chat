# PubNub Team Chat

[![Build Status](https://travis-ci.com/pubnub/typescript-ref-app-team-chat.svg?token=ey6rVJnpqsBKpxXy2fYF&branch=master)](https://travis-ci.com/pubnub/typescript-ref-app-team-chat)

This repository contains the code for the Team Chat Reference Application hosted on [PubNub Chat Docs Page](https://www.pubnub.com/docs/chat/quickstart#quickstart).

The application demonstrates how to build a chat application using:
- PubNub
- TypeScript
- React
- Redux

![alt text](team-chat-preview.png "Reference App")

## Requirements

* [Node.js](https://nodejs.org/en/)
* PubNub Account (Free)

### PubNub Account

If you don't already have an account, you can [create one for free](https://dashboard.pubnub.com/).

1. Sign in to your PubNub [Admin Dashboard](https://dashboard.pubnub.com/), click Create New App for PubNub Chat and give your app a name.

1. Select your new app, then click its keyset.

1. Locate the Publish and Subscribe keys. You'll need these keys to include in this project.

## Building the project

1. Clone the GitHub repository.

    ```bash
    git clone git@github.com:pubnub/typescript-ref-app-team-chat.git
    ```

1. Install the project.

    ```bash
    cd typescript-ref-app-team-chat
    npm install
    ```

1. Run the project in your local environment. You may be asked to input your PubNub keys and populate sample data if you are running the app for the first time.

    ```bash
    npm start
    ```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Further Information

Visit the [PubNub Chat Docs](https://www.pubnub.com/docs/chat) page for more information on how to use the React and Redux SDKs to add in-app chat to your applications.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  Special thanks to Elvis Wolcott and Mark Erikson.
