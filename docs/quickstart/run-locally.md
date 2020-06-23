---
id: run-locally
title: Running the App
sidebar_label: Run Locally
---

Follow the instructions below to run the app in your local environment.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [PubNub Account](#pubnub-account) (*Free*)

### PubNub Account

To run this application you must obtain publish and subscribe keys from your PubNub Account. If you don't already have an account, you can [create one for free](https://dashboard.pubnub.com/).

1. Sign in to your [PubNub Dashboard](https://dashboard.pubnub.com/).

1. Click **Create New App**.

1. Give your app a name, and select **Chat App** as the app type.

1. Click **Create**.

1. Click your new app to open its settings, then click its keyset.

1. Enable the **Objects** feature. **Presence** and **PubNub Functions** should have been enabled when the keyset was created.

1. Select a region to store your user data (e.g. *US East*).

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
