import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Optionally add an interceptor to include the auth token in headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication endpoints
export const loginUser = async (credentials) => {
  const response = await API.post('/login', credentials);
  return response.data;
};

export const signupUser = async (userData) => {
    const response = await API.post('/api/auth/signup', userData);
    return response.data;
  };
  

export const fetchUserInfo = async () => {
  const response = await API.get('/userinfo');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await API.put('/update-profile', profileData);
  return response.data;
};

// Chat endpoints
export const fetchMessages = async (chatRoomId) => {
  const response = await API.get(`/get-messages?roomId=${chatRoomId}`);
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await API.post('/send-message', messageData);
  return response.data;
};

export const createChannel = async (channelData) => {
  const response = await API.post('/create-channel', channelData);
  return response.data;
};

export const uploadFile = async (formData) => {
  const response = await API.post('/upload-file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
