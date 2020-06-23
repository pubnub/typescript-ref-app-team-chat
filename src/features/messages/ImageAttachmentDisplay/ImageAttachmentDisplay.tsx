import React from "react";
import { Wrapper, Media } from "./ImageAttachmentDisplay.style";
import { ImageAttachment } from "sharedTypes/messageModel";

type ImageAttachmentProps = {
  attachment: ImageAttachment;
};

/**
 * Display a ImageAttachment such as it would appear in a list of attachments
 */
export const ImageAttachmentDisplay = ({
  attachment,
}: ImageAttachmentProps) => {
  return (
    <Wrapper>
      {attachment.image?.source && (
        <Media
          alt={`media from ${attachment.image.source}`}
          src={attachment.image.source}
        />
      )}
    </Wrapper>
  );
};
