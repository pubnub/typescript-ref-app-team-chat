import React from "react";
import invariant from "invariant";
import { LinkAttachmentDisplay } from "features/messages/LinkAttachmentDisplay";
import { ImageAttachmentDisplay } from "features/messages/ImageAttachmentDisplay";
import { AttachmentType, Attachment } from "sharedTypes/messageModel";

type AttachmentProps = {
  attachment: Attachment;
};

/**
 * Display an attachment based on its type
 */
export const AttachmentDisplay = ({ attachment }: AttachmentProps) => {
  switch (attachment.type) {
    case AttachmentType.Link:
      return (
        <LinkAttachmentDisplay attachment={attachment}></LinkAttachmentDisplay>
      );
    case AttachmentType.Image:
      return (
        <ImageAttachmentDisplay
          attachment={attachment}
        ></ImageAttachmentDisplay>
      );

    // <== Add additional attachment types here.

    // Don't show anything for an unrecognized attachment type
    default:
      invariant(
        false,
        `No component available for displaying attachment of type "${attachment.type}"`
      );
  }
};
