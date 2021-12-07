import styled from '@emotion/styled';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Message } from '../models';
import { MessageBubble } from './messageBubble';

interface ConversationProps {
  messages: Message[];
}

const Conversation = ({ messages }: ConversationProps) => {
  const { currentUser, users } = useContext(UserContext);

  return messages.length > 0 ? (
    <div className="conversation">
      {messages.map((message) => {
        const isSentMessage = message.senderId === currentUser.id;
        const MessageComponent = isSentMessage
          ? SentMessageBubbble
          : ReceivedMessageBubble;
        const user = isSentMessage
          ? currentUser
          : users.find((u) => u.id === message.senderId);
        return (
          user && (
            <MessageWrapper>
              <MessageComponent message={message} sender={user} />
            </MessageWrapper>
          )
        );
      })}
    </div>
  ) : (
    <div>Aucun messages</div>
  );
};

export default Conversation;

const MessageWrapper = styled.div`
  margin-top: 8px;
`;

const SentMessageBubbble = styled(MessageBubble)`
  && {
    .message-content {
      background: blue;
    }
  }
`;

const ReceivedMessageBubble = styled(MessageBubble)`
  && {
    .message-content {
      background: green;
    }
  }
`;
