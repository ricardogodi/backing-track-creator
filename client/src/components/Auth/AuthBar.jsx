// client/src/components/Auth/AuthBar.jsx
import React from 'react';
import styles from "./AuthBar.module.css"

export default function AuthBar({ token, setToken, isPlaying, controller }) {

  const handleLogout = () => {
    controller.stop();
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleLoginClick = () => {
    setToken(null); // Forces login screen
  };

  return (
    <div className={styles.authBar}>
      {token === 'guest' ? (
        <button className={`${styles.logInOutButton} ${isPlaying ? "disabled" : ""}`}
          onClick={handleLoginClick}>
          Log In
        </button>
      ) : (
        <button className={`${styles.logInOutButton} ${isPlaying ? "disabled" : ""}`}
          onClick={handleLogout}>
          Log Out
        </button>
      )}
    </div>
  );
}