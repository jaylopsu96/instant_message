import React, { useState } from 'react';

const MessageBar = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message && !file) return;
    onSend(message, file);
    setMessage('');
    setFile(null);
  };

  return (
    <form
      onSubmit={handleSend}
      style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1, marginRight: '10px' }}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginRight: '10px' }}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageBar;
