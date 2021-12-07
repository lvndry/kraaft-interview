import { useCallback, useState } from 'react';

interface FooterProps {
  handleAddTextMessage: (content: string) => void;
}

export const Footer = ({ handleAddTextMessage }: FooterProps) => {
  const [messageContent, setMessageContent] = useState('');
  const handleSendMessage = useCallback(
    function () {
      handleAddTextMessage(messageContent);
      setMessageContent('');
    },
    [handleAddTextMessage, messageContent],
  );

  const handleValueChange = useCallback(function (event) {
    setMessageContent(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    function (event) {
      if (event.key === 'Enter') {
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <footer>
      <span className="messageInput">
        <input
          type="text"
          value={messageContent}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          aria-label="message"
        />
      </span>
      <span
        className="messageSendButton"
        onClick={handleSendMessage}
        onKeyPress={handleKeyDown}
        role="button"
        tabIndex={0}>
        Envoyer
      </span>
    </footer>
  );
};
