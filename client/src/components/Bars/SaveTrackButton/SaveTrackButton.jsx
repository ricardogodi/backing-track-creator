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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const isGuest = !token || token === 'guest';

  const handleSave = async () => {
    if (!name.trim()) {
      setMessage('Please enter a name for the track.');
      setTimeout(() => setMessage(''), 3000);
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
      if (!data.track || !data.track._id) {
        console.error("Invalid track returned from backend:", data.track);
        setMessage("Something went wrong saving the track.");
        setTimeout(() => setMessage(''), 3000);
        return;
      }

      setTracks(prev => [...prev, data.track]);
      setName('');
      setMessage(`Track "${name}" saved successfully!`);
      setTimeout(() => setMessage(''), 3000);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving track:', err.message);
      setMessage(err.message);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className={styles.saveWrapper}>
      <button
        className={styles.saveButton}
        onClick={() => setIsModalOpen(true)}
        disabled={isGuest}
        title={isGuest ? "You must be logged in to save tracks." : ""}
      >
        Save Track
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Name Your Track</h2>
            <input
              type="text"
              value={name}
              placeholder="Enter track name"
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
            {message && <div className={styles.feedback}>{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
}