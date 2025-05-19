import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import RegisterForm from './RegisterForm';

export default function LoginForm({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isRegistering) {
    return <RegisterForm onBack={() => setIsRegistering(false)} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://backing-track-creator.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      onLogin(data.token);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGuestLogin = () => {
    onLogin('guest');
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.logoHeader}>
        <h1>🎵 Backing Track Creator</h1>
        <p className={styles.tagline}>Jam. Create. Loop.</p>
      </div>

      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
      <button type="button" onClick={handleGuestLogin}>Continue as Guest</button>
      <button type="button" onClick={() => setIsRegistering(true)}>Sign Up</button>
    </form>
  );
}