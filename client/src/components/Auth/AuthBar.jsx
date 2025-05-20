// client/src/components/Auth/AuthBar.jsx
import React from 'react';

export default function AuthBar({token, setToken}) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleLoginClick = () => {
    setToken(null); // Forces login screen
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
      {token === 'guest' ? (
        <button onClick={handleLoginClick}>Log In</button>
      ) : (
        <button onClick={handleLogout}>Log Out</button>
      )}
    </div>
  );
}