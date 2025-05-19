import React, { useState } from 'react';
import styles from './LoginForm.module.css'; // Reuse same styling

export default function RegisterForm({ onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }

    try {
     const res = await fetch('https://backing-track-creator.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');
      alert('Registration successful. You can now log in.');
      onBack(); // Return to login view
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Choose a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
        autoComplete="new-password"
      />
      <button type="submit">Sign Up</button>
      <button type="button" onClick={onBack}>Back to Login</button>
    </form>
  );
}