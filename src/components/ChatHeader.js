import React from 'react';

const ChatHeader = ({ room }) => {
  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <h3>Chat Room: {room}</h3>
      {/* Add additional controls (settings, file uploads, etc.) as needed */}
    </header>
  );
};

export default ChatHeader;
