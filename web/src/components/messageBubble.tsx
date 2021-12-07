import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Message, User } from '../models';
import { isTextMessage } from '../models/message';
import { formatDate } from '../utils/date';

interface MessageProps {
  className?: string;
  message: Message;
  sender: User;
}

const MessageBubble = ({ message, sender, className }: MessageProps) => {
  const { users } = useContext(UserContext);
  const [splitttedMessage, setSplittedMessage] = useState<string[]>([]);

  const date = new Date(message.createdAt);

  useEffect(() => {
    const content = isTextMessage(message) ? message.content : message.caption;
    const mentionRegex = new RegExp(
      `@(${users.map((user) => user.username).join('|')})`,
      'gim',
    );

    const delimiter = content.match(mentionRegex);
    if (delimiter) {
      setSplittedMessage(
        content.split(new RegExp(`(${delimiter.join('|')})`, 'gm')),
      );
    } else {
      setSplittedMessage([content]);
    }
  }, [message, users]);

  return (
    <MessageContainer className={className}>
      <UserNameWrapper>{sender.username}</UserNameWrapper>
      <MessageContentWrapper>
        {isTextMessage(message) ? (
          <MessageContent className="message-content">
            {splitttedMessage.length
              ? splitttedMessage.map((chunk) => {
                  if (chunk.startsWith('@')) {
                    return <Mention key={chunk}>{chunk}</Mention>;
                  }
                  return <BasicText key={chunk}> {chunk} </BasicText>;
                })
              : null}
          </MessageContent>
        ) : (
          <ImageMessageWrapper>
            <Image src={message.url} alt={message.url} />
            <MessageContent className="message-content">
              {splitttedMessage.length
                ? splitttedMessage.map((chunk) => {
                    if (chunk.startsWith('@')) {
                      return <Mention key={chunk}>{chunk}</Mention>;
                    }
                    return <BasicText key={chunk}> {chunk} </BasicText>;
                  })
                : null}
            </MessageContent>
          </ImageMessageWrapper>
        )}
      </MessageContentWrapper>
      <DateWrapper>{formatDate(date)}</DateWrapper>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageContentWrapper = styled.div`
  max-width: 60%;
`;

const MessageContent = styled.div`
  padding: 16px;
  border: 1px transparent solid;
  border-radius: 8px;
`;

const UserNameWrapper = styled.div`
  margin-bottom: 8px;
`;

export const SentMessageBubble = styled(MessageBubble)`
  && {
    align-items: flex-end;
    .message-content {
      position: relative;
      background: #55efc4;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 10px;
        width: 0;
        height: 0;
        border: 21px solid transparent;
        border-bottom-color: #55efc4;
        border-top: 0;
        border-right: 0;
        margin-right: -10.5px;
        margin-top: -8px;
      }
    }
  }
`;

export const ReceivedMessageBubble = styled(MessageBubble)`
  && {
    align-items: flex-start;
    .message-content {
      position: relative;
      background: #dfe6e9;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 9px;
        width: 0;
        height: 0;
        border: 21px solid transparent;
        border-bottom-color: #dfe6e9;
        border-top: 0;
        border-left: 0;
        margin-left: -10.5px;
        margin-top: -8px;
      }
    }
  }
`;

const DateWrapper = styled.time`
  margin-top: 8px;
  color: #636e72;
`;

const ImageMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .message-content {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

const Image = styled.img`
  z-index: 1;
`;

const Mention = styled.span`
  cursor: pointer;
  color: #ff7675;
  display: inline-block;
`;

const BasicText = styled.span``;
