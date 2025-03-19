import React, { useEffect, useState } from 'react';
import { fetchUserInfo, updateProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({ firstName: '', lastName: '', bio: '', status: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserInfo();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching user info', err);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setMessage('Update failed.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Your Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input name="firstName" type="text" value={profile.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input name="lastName" type="text" value={profile.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={profile.bio} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <input name="status" type="text" value={profile.status} onChange={handleChange} placeholder="e.g., studying, away" />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
