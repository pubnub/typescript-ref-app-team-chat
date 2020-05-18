---
id: typing-indicators
title: Typing Indicators
sidebar_label: Typing Indicators
---

When someone is typing, the app displays a message showing the name of the user who is typing.
If more than one person is typing, the message changes to reflect that multiple users are typing.

![typing indicators](/img/typing-indicator.png)

The `typingIndicator/TypingIndicatorDisplay/TypingIndicatorDisplay.tsx` component adds logic to display typing indicators in the app.
The typing indicators are displayed to all users in a conversation as a user is typing a message.

The component calls the `getTypingIndicatorsById` selector to get the typing indicator signals for a conversation from the local store. 
If the store has typing indicator signals for the conversation and the signal was triggered less than 10 seconds ago, “User is typing ...” text is displayed on the screen. 
If typing indicators are present from multiple users, “Multiple users typing …” text is displayed.

```tsx
export interface TypingIndicatorFragment {
  sender: {
    id: string;
    name: string;
  };
  timetoken: string;
  message: TypingIndicator;
}
export const getCurrentConversationTypingIndicators = createSelector(
  [getTypingIndicatorsById, getCurrentConversationId, getUsersById, getLoggedInUserId],
  (typingIndicators, conversationId, users, loggedInUserId): TypingIndicatorFragment[] => {
    return typingIndicators[conversationId]
      ? Object.values(
          Object.values(typingIndicators[conversationId] || [])
            .filter(typingIndicator => typingIndicator.channel === conversationId )
            .reduce((grouped: {[key:string]: TypingIndicatorEnvelope}, typingIndicator) => {
              grouped[typingIndicator.publisher] = typingIndicator;
              return grouped;
            }, {})
          )
          .filter(typingIndicator => (Date.now() - (typingIndicator.timetoken / 10000)) < (TYPING_INDICATOR_DURATION_SECONDS * 1000))
          .map(
            typingIndicator => {
              return {
                ...typingIndicator,
                timetoken: String(typingIndicator.timetoken),
                sender:
                  users[typingIndicator.publisher || ''] ||
                  (typingIndicator.publisher
                    ? {
                        id: typingIndicator.publisher,
                        name: typingIndicator.publisher
                      }
                    : {
                        id: "unknown",
                        name: "unknown"
                      })
              };
            }
          )
      : [];
  }
);
/**
 * Display a Message based on its type
 */
export const TypingIndicatorDisplay = () => {
  const typingIndicators: TypingIndicatorFragment[] = useSelector(
    getCurrentConversationTypingIndicators
  );
  if (typingIndicators.length === 0) {
    return <Wrapper> </Wrapper>;
  } else if (typingIndicators.length === 1) {
    return <Wrapper>{typingIndicators[0].sender.name} is typing ...</Wrapper>
  } else {
    return <Wrapper>Multiple users typing ...</Wrapper>;
  }
};
```

## Receive a Typing Signal

The `features/typingIndicator/typingIndicatorModel.ts` file calls the [createSignalReducer()](https://www.pubnub.com/docs/chat/redux/signals#createsignalreducer) reducer from the Redux framework. 
This responds to actions dispatched when signals are received by the app. 
The reducer automatically updates state in the local store when it receives a signal.

The code then either stores the "typing on" signal in the store, or removes this signal from the store if an actual message was received from the sender. 
The signal is also removed if the sender stopped typing, which sends a "typing off" signal.

It also initiates a 10-second timer to expire each typing signal, and dispatch an action that removes the “User is typing ...” text from the screen. 
The expectation is that the sender of the message will trigger another typing signal if they continue typing once 10 second window elapses. 
In such a case, the app will continue to show that the user is typing.

```tsx
const signalReducer = createSignalReducer<TypingIndicatorEnvelope>();
const defaultState = { byId: {} };
const removeTypingIndicator = (state: SignalState<TypingIndicatorEnvelope>, channel: string, userId: string, timetoken?: number): SignalState<TypingIndicatorEnvelope> => {
  let newState = {
    byId: { ...state.byId },
  };
  newState.byId[channel] = newState.byId[channel].filter(
    (signal) => timetoken ? !(signal.publisher === userId && signal.timetoken === timetoken) : !(signal.publisher === userId)
  );
  return newState;
};
/**
 * create a reducer which holds all typing indicator signal objects in a normalized form
 */
export const TypingIndicatorStateReducer = (state: SignalState<TypingIndicatorEnvelope>, action: AppActions): SignalState<TypingIndicatorEnvelope> => {
  switch (action.type) {
    case SignalActionType.SIGNAL_RECEIVED:
      if (action.payload.message.type === TypingIndicatorType.ShowTypingIndicator) {
        // we only want to store the show typing indicator signals
        // the hide signal is handled by the listener below
        return signalReducer(state, action);
      }
      
      return state || defaultState;
    case TypingIndicatorActionType.REMOVE_TYPING_INDICATOR:
      return removeTypingIndicator(state, action.payload.channel, action.payload.userId, action.payload.timetoken);
    case TypingIndicatorActionType.REMOVE_TYPING_INDICATOR_ALL:
      return removeTypingIndicator(state, action.payload.channel, action.payload.userId);
    case MessageActionType.MESSAGE_RECEIVED:
      return removeTypingIndicator(state, action.payload.channel, action.payload.message.senderId);
    default:
      return state || defaultState;
  }
};
export const typingIndicatorRemoved = (
  payload: RemoveTypingIndicatorPayload
): RemoveTypingIndicatorAction => ({
  type: TypingIndicatorActionType.REMOVE_TYPING_INDICATOR,
  payload,
});
export const typingIndicatorRemovedAll = (
  payload: RemoveTypingIndicatorAllPayload
): RemoveTypingIndicatorAllAction => ({
  type: TypingIndicatorActionType.REMOVE_TYPING_INDICATOR_ALL,
  payload,
});
/**
 * This listener will initiate a timer to dispatch a RemoveTypingIndicatorAction once the 
 * TYPING_INDICATOR_DURATION_SECONDS time is passed
 */
export const createTypingIndicatorsListener = (
  dispatch: Dispatch<AppActions>
): any => ({
  signal: (payload: TypingIndicatorEnvelope) => {
    if (payload.message.type === TypingIndicatorType.ShowTypingIndicator) {
      // hide indicator after display seconds
      setTimeout(() => {
        dispatch(typingIndicatorRemoved({
          userId: payload.publisher,
          channel: payload.channel,
          timetoken: payload.timetoken,
        }));
      }, TYPING_INDICATOR_DURATION_SECONDS * 1000);
    } else if (payload.message.type === TypingIndicatorType.HideTypingIndicator) {
      // hide indicator now, removes all for user regardless of time token
      dispatch(typingIndicatorRemovedAll({
        userId: payload.publisher,
        channel: payload.channel,
      }));
    }
  }
});
```

## Send a Typing Signal

The `currentConversation/MessageInput/MessageInput.tsx` component dispatches actions that trigger signals as a user is typing a message. 
The code automatically dispatches the "typing on" signal in a conversation when a user starts typing in that conversation. 
If the user is still typing the message after 10 seconds, another signal is sent to indicate that the user is still typing. 
If the user stops typing and clears off the message from the screen, a "typing off" signal is triggered to remove the typing indicator from the screen.

```
const notifyTyping = () => {
  if (!typingIndicators[conversationId]) {
    typingIndicators[conversationId] = true;
    dispatch(sendTypingIndicator(TypingIndicatorType.ShowTypingIndicator));
    // allow sending additional typing indicators 1 seconds before display duration ends
    setTimeout(() => {
      typingIndicators[conversationId] = false;
    }, (TYPING_INDICATOR_DURATION_SECONDS - 1) * 1000);
  }
};
const notifyStopTyping = () => {
  if (typingIndicators[conversationId]) {
    typingIndicators[conversationId] = false;
    dispatch(sendTypingIndicator(TypingIndicatorType.HideTypingIndicator));
  }
};
const send = (appMessage: DraftMessage) => {
  dispatch(sendMessage(appMessage));
  dispatch(discardMessageDraft(conversationId));
  typingIndicators[conversationId] = false;
};
const update = (appMessage: DraftMessage) => {
  dispatch(updateMessageDraft(conversationId, appMessage));
  if (appMessage.text.length > 0) {
    notifyTyping();
  } else {
    notifyStopTyping();
  }
};
```

## SendSignal Command

The `typingIndicator/sendTypingIndicator.ts` file calls the [sendSignal](https://www.pubnub.com/docs/chat/redux/signals#sendsignal) command from the Redux framework to trigger typing on/off signals. 
These signals are sent to all users in a channel and can be used to display typing indicators in the app.

```tsx
/**
 * Send a typing indicator to the current conversation
 *
 * This command does not handle failure and leaves the error to the caller
 */
export const sendTypingIndicator = (typingIndicatorType: TypingIndicatorType): ThunkAction => {
  return (dispatch, getState) => {
    const state = getState();
    return dispatch(
      sendSignal({
        channel: getCurrentConversationId(state),
        message: { type: typingIndicatorType }
      })
    );
  };
};
```