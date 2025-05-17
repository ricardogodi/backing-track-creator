// src/components/Muter/Muter.jsx
import React from 'react';
import styles from './Muter.module.css'; 

export default function Muter({ label, isMuted, onToggle }) {
  return (
    <button
      className={`${styles.muterButton} ${isMuted ? 'pressed' : ''}`}
      onClick={onToggle}
    >
      {isMuted ? `Unmute ${label}` : `Mute ${label}`}
    </button>
  );
}