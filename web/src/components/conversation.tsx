import styled from '@emotion/styled';
import { Message } from '../models';
import { MessageBubble } from './messageBubble';

interface ConversationProps {
  messages: Message[];
}

const Conversation = ({ messages }: ConversationProps) => {
  return messages.length > 0 ? (
    <div className="conversation">
      {messages.map((message) => {
        return (
          <MessageWrapper>
            <MessageBubble message={message} />
          </MessageWrapper>
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
