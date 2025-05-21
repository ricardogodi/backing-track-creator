import React, { useState } from 'react';
import styles from './HarmonicChange.module.css';

function HarmonicChange({
  controller,
  isPlaying,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [semitones, setSemitones] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePosition = () => {
    controller.changeInitialHarmonicPosition();
  };

  const handleTranspose = () => {
    const semitoneValue = parseInt(semitones, 10);

    if (isNaN(semitoneValue)) {
      setMessage('Please enter a valid number.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    controller.transpose(semitoneValue);

    const updatedLabels = controller.getBarLabels();
    const formatLabel = (label) =>
      label ? `${label.root}${label.quality === "M" ? "" : label.quality}` : "";

    const formattedLabels = updatedLabels.map((label) => ({
      left: formatLabel(label.left),
      middle: formatLabel(label.middle),
      right: formatLabel(label.right),
    }));

    const newBarsHaveChord = updatedLabels.map(
      (label) => !!label.left || !!label.middle || !!label.right
    );

    const newBarsHaveTwoChords = updatedLabels.map(
      (label) => !!label.left && !!label.right
    );

    setBarLabels(formattedLabels);
    setBarsHaveChord(newBarsHaveChord);
    setBarsHaveTwoChords(newBarsHaveTwoChords);

    setSemitones('');
    setMessage('');
    setIsModalOpen(false);
  };

  return (
    <div className={`${styles.harmonicChangeWrapper} ${isPlaying ? styles.disabled : ''}`}>
      <button
        className={styles.changeHarmPos}
        onClick={handleChangePosition}
        disabled={isPlaying}
      >
        Change Harmonic Position
      </button>
      <button
        className={styles.changeHarmPos}
        onClick={() => setIsModalOpen(true)}
        disabled={isPlaying}
      >
        Transpose
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Transpose</h2>
            <input
              type="text"
              value={semitones}
              placeholder="Enter number of semitones"
              onChange={(e) => setSemitones(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleTranspose}>Apply</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
            {message && <div className={styles.feedback}>{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default HarmonicChange;