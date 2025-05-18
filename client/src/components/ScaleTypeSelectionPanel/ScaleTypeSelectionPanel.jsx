import React, { useState, useEffect } from 'react';
import ScaleTypeButton from './ScaleTypeButton/ScaleTypeButton';
import styles from './ScaleTypeSelectionPanel.module.css';

function ScaleTypeSelectionPanel({ controller, setChords, isPlaying }) {
  const [pressedIndex, setPressedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scaleTypes = ['Major', 'Minor', 'Melodic Minor', 'Harmonic Minor'];

  const list = scaleTypes.map((type, i) => (
    <ScaleTypeButton
      key={i}
      index={i}
      label={type}
      pressedIndex={pressedIndex}
      controller={controller}
      setPressedIndex={setPressedIndex}
      setChords={setChords}
    />
  ));

  const content = (
    <div className={`${styles.scaleTypeSelectionContainer} ${isPlaying ? 'disabled' : ""}`}>
      <h2 className={styles.selectionTitle}>Scale Type</h2>
      {list}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button onClick={() => setShowModal(true)} className={styles.openButton}>
          Scale Type
        </button>
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button onClick={() => setShowModal(false)} className={styles.closeButton}>
                ×
              </button>
              {content}
            </div>
          </div>
        )}
      </>
    );
  }

  return content;
}

export default ScaleTypeSelectionPanel;