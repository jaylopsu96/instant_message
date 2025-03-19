import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = 'https://quality-visually-stinkbug.ngrok-free.app';

function Signup() {
  // Using React state for the form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const payload = { email, password }; // or { username: email, password } if the backend expects "username"

    try {
      alert('Signing up... Please wait.');
      const response = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        payload,
        { headers: { 'Content-Type': 'application/json' }, timeout: 5000 }
      );
      console.log('Signup successful:', response.data);
      alert('Signup successful!\n' + JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Signup error:', error);
      const message = error.response?.data?.message || error.message || 'Unknown error';
      alert(`Signup error: ${message}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
