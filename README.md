# PubNub Team Chat

[![Build Status](https://travis-ci.com/pubnub/typescript-ref-app-team-chat.svg?token=ey6rVJnpqsBKpxXy2fYF&branch=master)](https://travis-ci.com/pubnub/typescript-ref-app-team-chat)

This repository contains the code for the Team Chat web reference application hosted on the [PubNub Chat Docs Page](https://www.pubnub.com/docs/chat/quickstart#quickstart). You can download the project to run on your local machine, and explore the code to see how we built it.

![alt text](team-chat-preview.png "Reference App")

The application demonstrates how to build a chat application using:

- PubNub
- TypeScript
- React
- Redux

## Requirements

- [Node.js](https://nodejs.org/en/)
- [PubNub Account](#pubnub-account) (*Free*)

## PubNub Account

To run this application you must obtain publish and subscribe keys from your PubNub Account. If you don't already have an account, you can [create one for free](https://dashboard.pubnub.com/).

1. Sign in to your [PubNub Dashboard](https://dashboard.pubnub.com/).

1. Click **Create New App**.

1. Give your app a name, and select **Chat App** as the app type.

1. Select a region to store your user data (e.g. *Portland*).

1. Click **Create**.

1. Click your new app to open its settings, then click its keyset.

1. Locate the *Publish* and *Subscribe* keys. You'll need these keys to include in this project.

## Running the project

1. Clone the GitHub repository.

    ```bash
    git clone git@github.com:pubnub/typescript-ref-app-team-chat.git
    ```

1. Install the project.

    ```bash
    cd typescript-ref-app-team-chat
    npm install
    ```

1. Run the project in your local environment. If you are running the app for the first time, enter your PubNub keys to begin populating sample data.

    ```bash
    npm start
    ```

    A web browser should automatically open [http://localhost:3000](http://localhost:3000), and you can explore your very own Team Chat app!

## Further Information

Visit the [PubNub Chat Docs](https://www.pubnub.com/docs/chat) page for more information about how to use the React and Redux SDKs to add in-app chat to your applications.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Special thanks to Martin Lagrange, Elvis Wolcott, and Mark Erikson.
