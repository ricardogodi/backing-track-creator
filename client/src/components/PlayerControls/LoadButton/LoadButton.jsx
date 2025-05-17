// client/src/components/PlayerControls/LoadButton/LoadButton.jsx
import React, { useEffect, useState } from 'react';
import styles from './LoadButton.module.css';

export default function LoadButton({
  controller,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords,
  setTempo,
  setStyle,
  setDrums,
  setBass,
  tracks,
  setTracks
}) {
  const [selectedName, setSelectedName] = useState('');

  // Fetch all saved tracks when component mounts
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/track/load', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to load saved tracks');

        const data = await res.json();
        setTracks(data);
        if (data.length > 0) setSelectedName(data[0].name); // default to first
      } catch (err) {
        console.error('❌ Error fetching tracks:', err.message);
      }
    };

    fetchTracks();
  }, [setTracks]);

  const handleLoad = () => {
    const track = tracks.find(t => t.name === selectedName);
    if (!track) return alert('Track not found');

    // Step 1: Load chords into controller
    controller.load(track.chords);

    // Step 2: Apply tempo, style, drums, and bass
    controller.changeTempo(track.tempo);
    controller.setDrums(track.style, track.drums);
    controller.setBass(track.style, track.bass);

    // Step 3: Update App state
    setTempo(track.tempo);
    setStyle(track.style);
    setDrums(track.drums);
    setBass(track.bass);

    // Step 4: Update chord labels and bar state
    const updatedLabels = controller.getBarLabels();
    const formatLabel = (label) =>
      label ? `${label.root}${label.quality === "M" ? "" : label.quality}` : "";

    const formattedLabels = updatedLabels.map(label => ({
      left: formatLabel(label.left),
      middle: formatLabel(label.middle),
      right: formatLabel(label.right),
    }));

    const newBarsHaveChord = updatedLabels.map(label =>
      !!label.left || !!label.middle || !!label.right
    );

    const newBarsHaveTwoChords = updatedLabels.map(label =>
      !!label.left && !!label.right
    );

    setBarLabels(formattedLabels);
    setBarsHaveChord(newBarsHaveChord);
    setBarsHaveTwoChords(newBarsHaveTwoChords);
  };

  return (
    <div className={styles.loadWrapper}>
      <select
        className={styles.dropdown}
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
      >
        {tracks.map((track) => (
          <option key={track._id} value={track.name}>
            {track.name}
          </option>
        ))}
      </select>
      <button className={styles.loadButton} onClick={handleLoad}>
        Load Track
      </button>
    </div>
  );
}
