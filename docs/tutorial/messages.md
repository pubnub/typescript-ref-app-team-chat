---
id: messages
title: Send and Receive Messages
sidebar_label: Messages
---

Along the top of the conversation pane, the app displays details about the conversation: a title, description, and membership and presence information. 
Below that, the app shows messages in the conversation as they arrive. 
At the bottom, we have a component to let us input text and emoji.

![a conversation](/img/team-chat-conversation.png)

Once a conversation is selected, the `currentConversation/CurrentConversation/CurrentConversation.tsx` component displays details of the conversation as well as its messages.

There are three sub-components:
  * `Header` includes the conversation name, description, and occupancy count
  * `MessageList` shows the messages in the conversation (we’ll talk about this in the next section)
  * `MessageInput` shows the text input area and emoji picker (we’ll talk about this in the next section, too)

```tsx
const CurrentConversation = () => {
  const panels = useSelector(getPanelStates);
  return (
    <AnimatedWrapper pose={panels.Content ? "open" : "closed"}>
      <Header />
      <MessageList />
      <MessageInput />
    </AnimatedWrapper>
  );
};
export { CurrentConversation };
```

## Show the Current Conversation

The `currentConversation/Header/Header.tsx` component calls `getConversationsById()` to get details of the selected conversation from the [local store](https://www.pubnub.com/docs/chat/redux/spaces#state-shape), and renders them in the UI.

```tsx
export interface ConversationDescriptionFragment {
  id: string;
  name: string;
  description: string;
}
export const getCurrentConversationDescription = createSelector(
  [getConversationsById, getCurrentConversationId],
  (
    conversations: ConversationsIndexedById,
    currentConversationId: string
  ): ConversationDescriptionFragment => {
    return {
      ...conversations[currentConversationId]
    };
  }
);
const Header = () => {
  const conversation: ConversationDescriptionFragment = useSelector(
    getCurrentConversationDescription
  );
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Body>
        <BackIconWrapper
          onClick={() => {
            dispatch(setLayoutLeft());
          }}
        >
          <BackIcon />
        </BackIconWrapper>
        <Information>
          <Name>{conversation.name}</Name>
          <Description>{conversation.description}</Description>
        </Information>
        <ConversationOccupancy />
      </Body>
      <Border />
    </Wrapper>
  );
};
export { Header };
```

We’ll explain the `MessageList` and `MessageInput` components in the next section.

## Send Messages

The `currentConversation/MessageInput/MessageInput.tsx` component renders the text input field and emoji picker.

```tsx
const MessageInput = () => {
  const [message, setMessage]: MessageFragment = useState(emptyMessage);
  const conversationId: string = useSelector(getCurrentConversationId);
  const textareaRef = useRef<HTMLTextAreaElement>(
    document.createElement("textarea")
  );
  const conversationMessageInputValue: string = useSelector(
    getConversationMessageInputValue
  );
const send = () => {
    dispatch(
      sendMessageAction({
        type: "text",
        body: cleanMessage(message)
      })
    );
    dispatch(
      updateConversationMessageInputValueAction(conversationId, emptyMessage)
    );
    setMessage(emptyMessage);
  };
  useEffect(() => {
    setMessage(conversationMessageInputValue);
    autoExpand(textareaRef.current);
  }, [conversationId, conversationMessageInputValue]);
  return (
    <Wrapper>
      <EmojiSuggestion
        value={message}
        onSelection={messageWithEmoji => {
          setMessage(messageWithEmoji);
        }}
      />
      <Container>
        <TextArea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={changed}
          onKeyPress={handleKeyPress}
          placeholder="Type Message"
        />
        <EmojiInput
          value={message}
          onSelection={messageWithEmoji => {
            setMessage(messageWithEmoji);
          }}
        />
      </Container>
    </Wrapper>
  );
};
```

### Send Message Command

The `sendMessageAction()` method (in `messages/sendMessageCommand.ts`) sends your message to the other users in the conversation. 
It calls the [sendMessage()](https://www.pubnub.com/docs/chat/redux/messages#sendmessage) command to publish a message to PubNub on the conversation channel. 
The message includes sender details.

```tsx
export const sendMessageAction = (message: MessageContent): ThunkAction => {
  return (dispatch, getState) => {
    const state = getState();
    return dispatch(
      sendMessage({
        channel: getCurrentConversationId(state),
        message: {
          content: message,
          sender: getLoggedInUserId(state)
        }
      })
    );
  };
};
```

### Add Emoji To A Message

The `MessageInput.tsx` component also includes an `emoji/EmojiInput/EmojiInput.tsx` component to add emoji in a message. 
The component uses the [emoji-mart](https://missive.github.io/emoji-mart/) library to render emoji on the screen. 
If an emoji is selected, it adds that emoji to the message input.

```tsx
import "emoji-mart/css/emoji-mart.css";
import { Picker, EmojiData } from "emoji-mart";
interface EmojiInputProps {
  value: string;
  onSelection(contentWithEmoji: string): any;
}
const EmojiInput = ({ value, onSelection }: EmojiInputProps) => {
  const [showPicker, setPickerState] = useState(false);
  const picker = useRef<HTMLDivElement>(null);
  const dismissPicker = useCallback(() => {
    setPickerState(false);
  }, [setPickerState]);
  useClickOutside([picker], dismissPicker);
  const togglePicker = () => {
    setPickerState(!showPicker);
  };
  const addEmoji = (emoji: EmojiData) => {
    if ("native" in emoji) {
      onSelection(`${value}${emoji.native}`);
      dismissPicker();
    }
  };
  return (
    <div ref={picker}>
      <Dialog>
        {showPicker && <Picker emoji="" title="" onSelect={addEmoji} />}
      </Dialog>
      <EmojiButton onClick={togglePicker}>
        <FunnyEmoji />
      </EmojiButton>
    </div>
  );
};
export { EmojiInput };
```

## Receive Messages

The `currentConversation/MessageList/MessageList.tsx` component displays the list of messages when they are received by the app. 
The component calls the `getCurrentConversationMessages()` selector to fetch messages from the [local store](https://www.pubnub.com/docs/chat/redux/messages#state-shape) and render them on the screen.

Each message that is received includes the message text as well as the id of the user who published that message. 
This component calls the `getUsersById()` selector to fetch details for the user from the [local store](https://www.pubnub.com/docs/chat/redux/messages#state-shape) to display it alongside the message.

Go to the next section for more details on how a message is displayed.

```tsx
const MessageList = () => {
  type ConversationScrollPositionsType = { [conversationId: string]: number };
  const conversationId: string = useSelector(getCurrentConversationId);
  const [
    conversationsScrollPositions,
    setConversationsScrollPositions
  ] = useState<ConversationScrollPositionsType>({});
  const updateCurrentConversationScrollPosition = (scrollPosition: number) => {
    setConversationsScrollPositions({
      ...conversationsScrollPositions,
      [conversationId]: scrollPosition
    });
  };
  const handleScroll = (e: any) => {
    const scrollPosition = e.target.scrollTop;
    if (scrollPosition !== 0) {
      updateCurrentConversationScrollPosition(scrollPosition);
    }
  };
  const restoreConversationScrollPosition = (conversationId: string) => {
    const conversationScrollPosition: number =
      conversationsScrollPositions[conversationId];
    if (conversationScrollPosition) {
      wrapper.current.scrollTo(0, conversationScrollPosition);
    }
  };
  const memoizedRestoreConversationScrollPositionCallback = useCallback(
    restoreConversationScrollPosition,
    [conversationId]
  );
  const messages: MessageFragment[] = useSelector(
    getCurrentConversationMessages
  );
  const wrapper = useRef<HTMLDivElement>(document.createElement("div"));
  const el = wrapper.current;
  const scrollToBottom = useCallback(() => {
    return (el.scrollTop = el.scrollHeight - el.clientHeight);
  }, [el]);
  const hasReachedBottom = el.scrollHeight - el.clientHeight === el.scrollTop;
  useEffect(() => {
    if (hasReachedBottom) {
      scrollToBottom();
    }
  }, [messages.length, hasReachedBottom, scrollToBottom]);
  useEffect(() => {
    memoizedRestoreConversationScrollPositionCallback(conversationId);
  }, [memoizedRestoreConversationScrollPositionCallback, conversationId]);
  return (
    <Wrapper ref={wrapper} onScroll={handleScroll}>
      <WelcomeMessage />
      {messages.map(message => (
        <Message message={message} key={message.timetoken} />
      ))}
    </Wrapper>
  );
};
```

### Display A Message

The `Message/Message.tsx` component styles a message and displays it in the UI. 
Messages are displayed with a timetoken, content, sender’s name and avatar. 
The message displays the sender as “unknown” if the user ID isn’t present in the local store.

```tsx
export interface MessageFragment {
  sender: {
    id: string;
    name: string;
  };
  timetoken: string;
  message: {
    content: {
      body: string;
    };
  };
}
interface MessageProps {
  message: MessageFragment;
  avatar?: ReactNode;
}
const Message = ({ message, avatar }: MessageProps) => {
  // show unknown sender when sender is missing
  let sender = message.sender || { id: "unknown", name: "Unknown" };
  return (
    <Wrapper>
      <Avatar>
        {avatar ? (
          avatar
        ) : (
          <UserInitialsAvatar size={36} name={sender.name} uuid={sender.id} />
        )}
      </Avatar>
      <Body>
        <Header>
          <SenderName>{sender.name}</SenderName>
          <TimeSent>{convertTimestampToTime(message.timetoken)}</TimeSent>
        </Header>
        <Content>{message.message.content.body}</Content>
      </Body>
    </Wrapper>
  );
};
export { Message };
```

The `features/messages/messageModel.ts` file calls [createMessageReducer()](https://www.pubnub.com/docs/chat/redux/messages#createmessagereducer), which responds to actions dispatched to update the state of messages in the store. 
The message state is automatically updated and the UI change is rendered as the app receives messages in a conversation.

```tsx
/**
 * create a reducer which holds all known message envelope objects in a normalized form
 */
export const MessageStateReducer = createMessageReducer<MessageEnvelope>();
```