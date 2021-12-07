import { useState } from 'react';
import './app.css';
import Conversation from './components/conversation';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { UserContextProvider } from './context/userContext';
import { store } from './mocks/store';
import { TextMessage } from './models/message';

const App = () => {
  const { messages: storeMessages } = store;
  const [messages, setMessages] = useState(storeMessages);

  function addTextMessage(content: string) {
    const newMessage: TextMessage = {
      id: `newMessage-${messages.length}`,
      type: 'text',
      senderId: store.currentUserId,
      createdAt: new Date().getTime(),
      content,
    };

    setMessages((oldMessages) => [newMessage, ...oldMessages]);
  }

  return (
    <div className="app">
      <UserContextProvider>
        <Header />
        <Conversation className="conversation" messages={messages} />
        <Footer handleAddTextMessage={addTextMessage} />
      </UserContextProvider>
    </div>
  );
};

export default App;
