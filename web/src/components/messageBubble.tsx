import styled from '@emotion/styled';
import { Message, User } from '../models';
import { isTextMessage } from '../models/message';

interface MessageProps {
  className?: string;
  message: Message;
  sender: User;
}

export const MessageBubble = ({ message, sender, className }: MessageProps) => {
  return (
    <MessageContainer className={className}>
      {sender.username}
      {isTextMessage(message) ? (
        <MessageContent className="message-content">
          {message.content}
        </MessageContent>
      ) : (
        <MessageContent className="message-content">
          {message.url}
        </MessageContent>
      )}
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  max-width: 80%;
`;

const MessageContent = styled.div`
  padding: 16px;
  border: 1px transparent solid;
  border-radius: 8px;
`;
