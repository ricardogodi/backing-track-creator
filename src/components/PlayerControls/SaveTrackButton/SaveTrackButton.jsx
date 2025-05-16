import React from 'react';
import styles from './SaveTrackButton.module.css';

export default function SaveTrackButton({ 
  barLabels, 
  tempo, 
  style, 
  drums, 
  bass 
}) {
  const handleSave = () => {
    const config = {
      style,
      drums,
      bass,
      tempo,
      chords: barLabels
    };

    // Simulate saving (replace with your real logic)
    console.log("Saved Track Configuration:", JSON.stringify(config, null, 2));

    // Optional: localStorage
    // localStorage.setItem("savedTrackConfig", JSON.stringify(config));
  };

  return (
    <button className={styles.saveButton} onClick={handleSave}>
      Save Track
    </button>
  );
}