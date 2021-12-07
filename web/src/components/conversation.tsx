import { Message } from '../models';
import { MessageBubble } from './message';

interface ConversationProps {
  className?: string;
  messages: Message[];
}

const Conversation = ({ className, messages }: ConversationProps) => {
  return messages.length > 0 ? (
    <div>
      {messages.map((message) => (
        <MessageBubble message={message} />
      ))}
    </div>
  ) : (
    <div>Aucun messages</div>
  );
};

export default Conversation;
