import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER_URL, {
  autoConnect: false, // connect manually when needed
});

export default socket;
