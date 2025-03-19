import React from 'react';
import ThreadView from './ThreadView';

const ChatContainer = ({ messages }) => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px', backgroundColor: '#f5f5f5' }}>
      {messages.map((msg, idx) => (
        <div key={idx} style={{ marginBottom: '10px' }}>
          <p>
            <strong>{msg.username || 'User'}:</strong> {msg.text}
          </p>
          {/* If a file is attached, show a preview or indication */}
          {msg.file && <p>[File attached]</p>}
          {/* If there are threaded replies, show them */}
          {msg.replies && msg.replies.length > 0 && <ThreadView replies={msg.replies} />}
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
