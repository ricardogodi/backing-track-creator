// src/components/Muters/Muters.jsx
import React, { useState } from 'react';
import Muter from './Muter/Muter';
import styles from './Muters.module.css';

export default function Muters({ controller }) {
  const [pianoIsMuted, setPianoMuted] = useState(false);
  const [bassIsMuted,  setBassMuted]  = useState(false);
  const [drumsIsMuted, setDrumsMuted] = useState(false);

  const togglePiano = () => {
    setPianoMuted(m => {
      controller.mutePiano(!m);
      return !m;
    });
  };

  const toggleBass = () => {
    setBassMuted(m => {
      controller.muteBass(!m);
      return !m;
    });
  };

  const toggleDrums = () => {
    setDrumsMuted(m => {
      controller.muteDrums(!m);
      return !m;
    });
  };

  return (
    <div className={styles.mutersContainer}>
      <Muter label="Piano" isMuted={pianoIsMuted} onToggle={togglePiano} />
      <Muter label="Bass"  isMuted={bassIsMuted}  onToggle={toggleBass}  />
      <Muter label="Drums" isMuted={drumsIsMuted} onToggle={toggleDrums} />
    </div>
  );
}
