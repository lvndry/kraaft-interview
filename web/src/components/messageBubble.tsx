import styled from '@emotion/styled';
import { Message } from '../models';
import { isTextMessage } from '../models/message';

interface MessageProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageProps) => {
  return (
    <MessageContainer>
      {isTextMessage(message) ? (
        <div>{message.content}</div>
      ) : (
        <div>{message.url}</div>
      )}
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  max-width: 80%;
  padding: 16px;
  background: green;
  border: 1px transparent solid;
  border-radius: 8px;
`;
