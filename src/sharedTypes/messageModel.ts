import { IGif } from "@giphy/js-types";
/**
 * Define the types of messages that this application is designed to work with.
 *
 * This application only defines "text" messages, but you can add more here.
 */
export enum MessageType {
  Text = "text",
  Giphy = "giphy",
}

/**
 * BaseMessage defines a structure that ALL messages that the application works should conform to.
 */
export interface BaseMessage {
  /**
   * An indicator of the type of this message, which must appear in the MessageType enum.
   */
  type: MessageType;

  /**
   * The user id of the user that sent this message
   */
  senderId: string;
}

export interface Image {
  source: string;
}

export interface Video {
  source: string;
}

export enum AttachmentType {
  Image = "image",
  Video = "video",
  Link = "link",
}

export interface BaseAttachment {
  type: AttachmentType;
}

export interface ImageAttachment extends BaseAttachment {
  type: AttachmentType.Image;
  image: Image;
}

export interface VideoAttachment extends BaseAttachment {
  type: AttachmentType.Video;
  video: Video;
  preview?: Image;
}

export type MediaAttachment = ImageAttachment | VideoAttachment;

export interface Provider {
  name: string;
  url: string;
}

export interface LinkAttachment {
  type: AttachmentType.Link;
  url: string;
  provider: Provider;
  title?: string;
  description?: string;
  author?: Provider;
  icon?: Image;
  image?: Image;
  video?: Video;
}

export type Attachment = MediaAttachment | LinkAttachment;

/**
 * Defines a text message with a UTF-8 encoding
 */
export interface TextMessage extends BaseMessage {
  /**
   * type must be "text"
   */
  type: MessageType.Text;

  /**
   * The message content with a UTF-8 unicode encoding
   */
  text: string;

  /**
   * Message attachments (images and links)
   */
  attachments?: Attachment[];
}

export interface GiphyMessage extends BaseMessage {
  type: MessageType.Giphy;
  query: string;
  gif: IGif;
}

/**
 * This is a union of all of the message types that the application works with.
 *
 * To add a new message type, add a new type identifier to the MessageType enum.
 *
 *    MyCustomMessageType = "my-custom-message-type",
 *
 * Then declare a new message type that extends BaseMessage that uses the enum
 *
 *     export interface MyCustomMessage extends BaseMessage {
 *       type: MessageType.MyCustomMessageType;
 *       myField: string;
 *     }
 *
 * Then add that type to this AppMessage union type
 *    export type AppMessage = TextMessage | MyCustomMessage;
 *
 * You will also need to modify the application to work with your new message type.
 * Using your IDE to find references to AppMessage will help find those areas you
 * need to modify.
 */
export type AppMessage = TextMessage | GiphyMessage;

/**
 * Customize the PubNub message envelope declaration to include our custom message types
 * and define which fields from the envelope this application will have access to.
 *
 * Fields that are not included in this list may appear in the data but will be ignored by
 * the application.  To remove the fields entirely (for example to use less memory),
 *  use a filter on the incoming messages from subscribe.
 */
