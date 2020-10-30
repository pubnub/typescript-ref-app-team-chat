import React, { ReactNode } from "react";
import convertTimestampToTime from "foundations/utilities/convertTimestampToTime";
import useHover from "foundations/hooks/useHover";
import {
  Heading,
  Label,
  LabelSizes
} from "foundations/components/presentation";
import { StyledBox, FlexColumn, FlexRow } from "foundations/components/layout";
import { MessageDisplay } from "features/messages/MessageDisplay";
import { AppMessage } from "features/messages/messageModel";

// TODO: Explain message fragment
export interface MessageFragment {
  sender: {
    id: string;
    name: string;
  };
  timetoken: string;
  message: AppMessage;
}

interface MessageProps {
  messageFragment: MessageFragment;
  avatar: ReactNode;
}

/**
 * Display a message as it appears in a list
 */
const MessageListItem = ({ messageFragment, avatar }: MessageProps) => {
  const sender = messageFragment.sender;
  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });

  return (
    <FlexRow
      py="1"
      px={[5, 6]}
      alignItems="flex-start"
      bg={isHovering ? "backgrounds.contentHover" : ""}
      {...hoverProps}
    >
      {avatar}
      <FlexColumn marginLeft="5" flexGrow={1}>
        <FlexRow marginBottom="1">
          <StyledBox marginRight="3">
            <Heading>{sender.name}</Heading>
          </StyledBox>
          <Label size={LabelSizes.SMALL}>
            {convertTimestampToTime(messageFragment.timetoken)}
          </Label>
        </FlexRow>

        <MessageDisplay
          message={messageFragment.message}
          parentKey={messageFragment.timetoken}
        ></MessageDisplay>
      </FlexColumn>
    </FlexRow>
  );
};

export { MessageListItem };
