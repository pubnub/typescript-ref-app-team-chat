---
id: optional-features
title: Optional Features
sidebar_label: Optional Features
---

Team Chat comes with additional rich features like link previews, gifs, and content moderation.
These features required additional setup and free third party APIs.

## Gif Picker

To enable the gif picker, you need a GIPHY API key.
You can sign up for a (free) developer account and create a key from the [GIPHY developer dashboard](https://developers.giphy.com/dashboard/).

1. Create `.env` at the root of the project to hold your environment variables. This file will no be commited.

1. Copy the API key from the dashboard and add it to `.env`.

    ```dotenv
    GIPHY_API_KEY=your-api-key
    ```

1. The variable needs to be exposed to the React app by adding another line.

    ```dotenv
    REACT_APP_GIPHY_API_KEY=$GIPHY_API_KEY
    ```


1. Restart the dev server for the changes to take effect.

    ```bash
    npm start
    ```


## Image Moderation

In addition to message moderation, AI powered moderation can be enabled to block innapropriate images.

You can sign up for a (free) account and API key from the [Sightengine dashboard](https://dashboard.sightengine.com/).

1. Add the **API User** and **API Secret** to your `.env` file.

    ```dotenv
    FUNCTIONS_SIGHTENGINE_API_SECRET=your-api-secret
    FUNCTIONS_SIGHTENGINE_API_USER=your-api-user
    ```

## /giphy command

The `/giphy ${message}` command shares a gif related to the message.

1. You should have created a GIPHY API key in the [Gif Picker](#gif-picker) section. Exposed it to the function by adding another variable that references it.

    ```dotenv
    FUNCTIONS_GIPHY_API_KEY=$GIPHY_API_KEY
    ```

## Deploy Functions

Link previews, message moderation, and the `/giphy` command are powered by PubNub functions. To enable these features, you'll need to build and deploy the function code in `/server`.

### Option 1: Automatic Upload

> Note: To manage functions from the CLI, you have to sign in to your PubNub account. This is currently not possible if you created your account with SSO.

1. Use the CLI to build and deploy the functions from source (in `server/src`).

    ```bash
    npm run deploy:functions
    ```

1. Enter your PubNub account email and password (these will **not** be saved).

1. Select your app and keyset using the up/down arrows and return to submit.

### Option 2: Manual Upload

1. From the PubNub dashboard, select the keyset your are using. Then, open the functions tab (on the left). Enter a module name and description, then click **Create New Module**.

1. Click **Create Function**, give it a name, set the event type to *Before Publish or Fire* and enter `*` for the channel pattern and click **Create**.

1. Use the CLI to build the functions from source (in `server/src`).

    ```bash
    npm run build:functions
    ```

1. After running the build command, a minified and compiled version of the function is available is `server/build/transformPublishedMessages.js`. Copy the contents of the file into the functions editor and click **Save**.

1. Click **Start Module** from the top right to deploy your function.