import styled from '@emotion/styled';
import { Message, User } from '../models';
import { isTextMessage } from '../models/message';

interface MessageProps {
  className?: string;
  message: Message;
  sender: User;
}

const MessageBubble = ({ message, sender, className }: MessageProps) => {
  return (
    <MessageContainer className={className}>
      <UserNameWrapper>{sender.username}</UserNameWrapper>
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
  display: flex;
  flex-direction: column;
`;

const MessageContent = styled.div`
  padding: 16px;
  border: 1px transparent solid;
  border-radius: 8px;
`;

const UserNameWrapper = styled.div`
  margin-bottom: 8px;
`;

export const SentMessageBubbble = styled(MessageBubble)`
  && {
    align-items: flex-start;
    .message-content {
      position: relative;
      background: blue;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 9px;
        width: 0;
        height: 0;
        border: 21px solid transparent;
        border-bottom-color: blue;
        border-top: 0;
        border-left: 0;
        margin-left: -10.5px;
        margin-top: -8px;
      }
    }
  }
`;

export const ReceivedMessageBubble = styled(MessageBubble)`
  && {
    align-items: flex-end;
    .message-content {
      position: relative;
      background: green;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 10px;
        width: 0;
        height: 0;
        border: 21px solid transparent;
        border-bottom-color: green;
        border-top: 0;
        border-right: 0;
        margin-right: -10.5px;
        margin-top: -8px;
      }
    }
  }
`;
