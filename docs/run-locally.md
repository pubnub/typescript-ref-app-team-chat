---
id: run-locally
title: Running the App
sidebar_label: Run Locally
---

Follow the instructions below to run the app in your local environment.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [PubNub Account](https://dashboard.pubnub.com/)

## Running the project

1. Clone the GitHub repository.

    ```bash
    git clone https://github.com/pubnub/typescript-ref-app-team-chat-private.git
    ```

1. Install the project.

    ```bash
    cd typescript-ref-app-team-chat
    npm install
    ```

1. Start the project. You'll be asked to enter your chat app keys from the PubNub Dashboard. Note that Objects should be enabled and a region should be selected on the key.

    ```bash
    npm start
    ```

    A web browser should automatically open [http://localhost:3000](http://localhost:3000), and you can explore your very own Team Chat app!
