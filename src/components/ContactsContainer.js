import React, { useState } from 'react';
import { createChannel } from '../services/api';

const ContactsContainer = ({ setCurrentRoom }) => {
  const [channels, setChannels] = useState(['default-room']);
  const [newChannel, setNewChannel] = useState('');

  const handleChannelClick = (channel) => {
    setCurrentRoom(channel);
  };

  const handleCreateChannel = async () => {
    if (!newChannel) return;
    try {
      const data = await createChannel({ name: newChannel });
      setChannels([...channels, data.name]);
      setNewChannel('');
    } catch (err) {
      console.error('Channel creation failed', err);
    }
  };

  return (
    <aside style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h4>Channels</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {channels.map((channel, idx) => (
          <li
            key={idx}
            onClick={() => handleChannelClick(channel)}
            style={{ cursor: 'pointer', marginBottom: '5px' }}
          >
            {channel}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="New Channel"
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
        />
        <button onClick={handleCreateChannel}>Create</button>
      </div>
    </aside>
  );
};

export default ContactsContainer;
