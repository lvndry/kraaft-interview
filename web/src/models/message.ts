interface BaseMessage {
  id: string;
  senderId: string;
  createdAt: number;
  type: 'text' | 'image';
}

export interface TextMessage extends BaseMessage {
  content: string;
}

export interface ImageMessage extends BaseMessage {
  url: string;
  caption: string;
}

export type Message = TextMessage | ImageMessage;

export const isTextMessage = (message: Message): message is TextMessage => {
  return 'content' in message;
};

export const isImageMessage = (message: Message): message is ImageMessage => {
  return 'caption' in message;
};
