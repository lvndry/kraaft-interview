import { Message } from '../models';
import { isTextMessage } from '../models/message';

interface MessageProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageProps) => {
  if (isTextMessage(message)) {
    return <div>{message.content}</div>;
  }

  return <div>{message.url}</div>;
};
