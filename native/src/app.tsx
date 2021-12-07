import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
// import Conversation from '../../solution/native';
import Conversation from './conversation';

import { store } from './assets/store';

import styles from './app.styles';
import { Message, TextMessage } from './assets/types';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Kraaft</Text>
    </View>
  );
};

interface FooterProps {
  handleAddTextMessage: (content: string) => void;
}

const Footer = ({ handleAddTextMessage }: FooterProps) => {
  const [messageContent, setMessageContent] = useState('');
  const handleSendMessage = useCallback(
    function () {
      handleAddTextMessage(messageContent);
      setMessageContent('');
    },
    [handleAddTextMessage, messageContent],
  );

  return (
    <View style={styles.footer}>
      <View style={styles.messageInput}>
        <TextInput
          placeholder="Écrivez un message..."
          value={messageContent}
          onChangeText={setMessageContent}
          onSubmitEditing={handleSendMessage}
        />
      </View>
      <TouchableOpacity onPress={handleSendMessage}>
        <View style={styles.messageSendButton}>
          <Text style={styles.messageSendButtonText}>Envoyer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const { messages: storeMessages, users, currentUserId } = store;
  const [messages, setMessages] = useState<Message[]>(storeMessages);

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
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Header />
          <View style={styles.conversationContainer}>
            <Conversation {...{ messages, users, currentUserId }} />
          </View>
          <Footer handleAddTextMessage={addTextMessage} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default App;
