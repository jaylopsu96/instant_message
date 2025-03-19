import React from 'react';

const ThreadView = ({ replies }) => {
  return (
    <div style={{ marginLeft: '20px', borderLeft: '2px solid #ddd', paddingLeft: '10px' }}>
      {replies.map((reply, idx) => (
        <div key={idx} style={{ marginBottom: '5px' }}>
          <p>
            <strong>{reply.username || 'User'}:</strong> {reply.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ThreadView;
