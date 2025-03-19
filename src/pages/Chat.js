import React, { useEffect, useState } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatContainer from '../components/ChatContainer';
import ContactsContainer from '../components/ContactsContainer';
import MessageBar from '../components/MessageBar';
import socket from '../services/socket';
import { fetchMessages, sendMessage } from '../services/api';

const Chat = () => {
  const [currentRoom, setCurrentRoom] = useState('default-room');
  const [messages, setMessages] = useState([]);

  // Connect to socket on mount
  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', { room: currentRoom });

    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [currentRoom]);

  // Load conversation history when room changes
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchMessages(currentRoom);
        setMessages(data.messages);
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };
    loadMessages();
  }, [currentRoom]);

  const handleSend = async (msgText, file = null, replyTo = null) => {
    const msgObj = {
      room: currentRoom,
      text: msgText,
      file,      // if file upload is supported
      replyTo,   // for thread-based replies
    };
    try {
      await sendMessage(msgObj);
      // Optionally, add the message optimistically:
      // setMessages([...messages, msgObj]);
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ContactsContainer setCurrentRoom={setCurrentRoom} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatHeader room={currentRoom} />
        <ChatContainer messages={messages} />
        <MessageBar onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chat;
