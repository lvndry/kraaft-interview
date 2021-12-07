import { useCallback, useContext, useEffect, useState } from 'react';
import './app.css';
import Conversation from './components/conversation';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { UserContext, UserContextProvider } from './context/userContext';
import { store } from './mocks/store';
import { TextMessage } from './models/message';

const App = () => {
  const { messages: storeMessages } = store;
  const [messages, setMessages] = useState(storeMessages);
  const { currentUser } = useContext(UserContext);

  const addTextMessage = useCallback(
    (content: string) => {
      const newMessage: TextMessage = {
        id: `newMessage-${messages.length}`,
        senderId: currentUser.id,
        createdAt: new Date().getTime(),
        content,
      };

      setMessages((oldMessages) => [...oldMessages, newMessage]);
    },
    [currentUser.id, messages.length],
  );

  useEffect(() => {
    setTimeout(() => {
      const conversation = document.querySelector('.conversation');

      if (conversation) {
        conversation.scrollTop =
          conversation.scrollHeight - conversation.clientHeight;
      }
    });
  }, [addTextMessage]);

  return (
    <div className="app">
      <UserContextProvider>
        <Header />
        <Conversation messages={messages} />
        <Footer handleAddTextMessage={addTextMessage} />
      </UserContextProvider>
    </div>
  );
};

export default App;
