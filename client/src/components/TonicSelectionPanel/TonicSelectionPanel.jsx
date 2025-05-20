import React, { useState, useEffect } from "react";
import TonicButton from "./TonicButton/TonicButton";
import styles from './TonicSelectionPanel.module.css';

function TonicSelectionPanel({ controller, setChords, isPlaying }) {
  const [pressedIndex, setPressedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tonics = [
    { id: 0, label: 'C' },
    [{ id: 1, label: 'C#' }, { id: 2, label: 'Db' }],
    { id: 3, label: 'D' },
    [{ id: 4, label: 'D#' }, { id: 5, label: 'Eb' }],
    { id: 6, label: 'E' },
    { id: 7, label: 'F' },
    [{ id: 8, label: 'F#' }, { id: 9, label: 'Gb' }],
    { id: 10, label: 'G' },
    [{ id: 11, label: 'G#' }, { id: 12, label: 'Ab' }],
    { id: 13, label: 'A' },
    [{ id: 14, label: 'A#' }, { id: 15, label: 'Bb' }],
    { id: 16, label: 'B' },
  ];

  const tonicPanel = (
    <div className={`${styles.tonicSelectionContainer} ${isPlaying ? "disabled" : ""}`}>
      <h2 className={styles.selectionTitle}>Tonic</h2>
      {tonics.map((tonic) => (
        Array.isArray(tonic) ? (
          <div className={styles.buttonPair} key={`pair-${tonic[0].id}`}>
            {tonic.map(note => (
              <TonicButton
                key={note.id}
                controller={controller}
                setChords={setChords}
                label={note.label}
                index={note.id}
                pressedIndex={pressedIndex}
                setPressedIndex={setPressedIndex}
              />
            ))}
          </div>
        ) : (
          <TonicButton
            key={tonic.id}
            controller={controller}
            setChords={setChords}
            label={tonic.label}
            index={tonic.id}
            pressedIndex={pressedIndex}
            setPressedIndex={setPressedIndex}
          />
        )
      ))}
    </div>
  );

  // Mobile: show modal
  if (isMobile) {
    return (
      <>
        <button
          className="openButton"
          onClick={() => setShowModal(true)}
        >
          Tonic
        </button>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              {tonicPanel}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop: show inline
  return tonicPanel;
}

export default TonicSelectionPanel;