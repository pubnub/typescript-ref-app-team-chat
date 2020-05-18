---
id: profanity-filter
title: Filter Profanity in Messages
sidebar_label: Profanity Filter
---

Filtering input is a common request, as it helps automate moderation for busy chat applications. 
An easy way to implement profanity filtering, in real time, is to implement a serverless [PubNub Function](https://www.pubnub.com/products/functions/).

![profanity filtered chat](/img/profanity-filter.png)

Adding a profanity filter lets you moderate chat messages in real time as they go over the network. 
The function detects objectionable words in any given text, and lets you censor the content in a variety of ways. 
Whenever a user publishes a message, the function processes the text for profanity, and then either blocks the publishing of the message, or censors the specific words.

## Functions Overview

Functions, our serverless Function-as-a-Service platform, allows you to build your own microservices and incorporate realtime logic for routing, augmenting, filtering, transforming, and aggregating messages. 
PubNub Functions seamlessly handles scaling, global deployment, redundancy, and many other operations-related tasks for you.

By providing the ability to program the network, PubNub Functions simplifies deploying custom, realtime logic onto reliable, serverless architecture.

## Create a Function

Go to your [PubNub Dashboard](https://dashboard.pubnub.com/) and create a new module, and then create a new Before Publish function.
The function should be set up to trigger on a specific set of channels (such as `chat.*`) or on all channels using wildcards (`*`).

![create a new function dashboard](/img/function-setup-1.png)

## Copy the Function Code

Copy the function code that checks the contents of each message against a list of objectionable words and replaces the text. 
You can make changes to the dictionary and either replace the swear words, or block the entire message from being published on the channel.

Note: we’ve removed the list of profanity for the inline sample here. 
Get the [actual version](https://gist.github.com/nishith-pubnub/7fb1c3fa09b808913db973d16b534727) from the gist before you start this function!

```js
export default (request) => {
    if (request.channels[0].endsWith('-pnpres') || request.channels[0].startsWith("blocks-output") ) {
        return request.ok();
    }
// The code in the linked gist has the real list of
// profanity to be blocked. Don’t use this code as-is!
var badWords =new RegExp(/.*\b(hello|world)\b.*/,"i");
    
    //Option 1 - Replace profanity text with * and allow the publish
    if(request.message && request.message.text && badWords.test(request.message.text)){
        var newString = request.message.text;
        newString = newString.replace(badWords, "***");
        request.message.text = newString;
        return request.ok(); // Return a promise when you're done
    }
    
    //Option 2 - Block message and return a publish error if the text includes profanity
    /*if(badWords.test(request["message"]["text"])) {
        console.log('moderated message: ' + request["message"]["text"]);
        return request.abort("moderated message")
        return request.ok();
    }*/
    
    
    return request.ok(); // Return a promise when you're done
};
```

## Start the Function

Click "Start Module" to start the Function, and test it using the "Publish" button and payload field on the left.

Your app should now be ready to detect profanity in messages. 
From here you can block the message, filter out the bad parts, send a note to the offending user, or ban them completely. 
How you use this information is up to you and your application.

## Other Filtering Use Cases

As you can see, this is a simple but flexible approach. 
The dictionary-driven approach works well with a well-defined list of words, but using a regular expression lets you work with much more complex patterns, such as screening for particular types of personally-identifiable information in a HIPAA-compliant environment.