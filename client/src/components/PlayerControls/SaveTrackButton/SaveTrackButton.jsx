// client/src/components/PlayerControls/SaveTrackButton.jsx
import React, { useState } from 'react';
import styles from './SaveTrackButton.module.css';

export default function SaveTrackButton({ 
  controller,
  barLabels, 
  tempo, 
  style, 
  drums, 
  bass,
  tracks,
  setTracks
}) {
  const [name, setName] = useState('');

const handleSave = async () => {
  if (!name.trim()) {
    alert('Please enter a name for the track.');
    return;
  }

  const track = {
    name,
    style,
    drums,
    bass,
    tempo,
    chords: controller.getBarLabels()
  };

  try {
    const token = localStorage.getItem('token');

    const res = await fetch('/api/track/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(track)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to save track');

    console.log('✅ Track saved:', data.message);
    alert(`Track "${name}" saved successfully!`);
    setName('');
    setTracks(prev => [...prev, track]);
  } catch (err) {
    console.error('❌ Error saving track:', err.message);
    alert(err.message); // <-- Now shows the backend's message
  }
};

  return (
    <div className={styles.saveWrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter track name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className={styles.saveButton} onClick={handleSave}>
        Save Track
      </button>
    </div>
  );
}
