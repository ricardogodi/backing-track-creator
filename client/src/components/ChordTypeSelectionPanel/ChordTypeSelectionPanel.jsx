import React, { useState, useEffect, useRef } from 'react';
import ChordTypeButton from './ChordTypeButton/ChordTypeButton';
import styles from './ChordTypeSelectionPanel.module.css';

function ChordTypeSelectionPanel({ controller, setChords, isPlaying }) {
  const [pressedIndex, setPressedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showModal && modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showModal]);

  const chordTypes = ['Triads', '7th'];

  const list = chordTypes.map((type, i) => (
    <ChordTypeButton
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
    <div className={`${styles.chordTypeSelectionContainer} ${isPlaying ? "disabled" : ''}`}>
      <h2 className={styles.selectionTitle}>Chords Type</h2>
      {list}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button onClick={() => setShowModal(true)} className="openButton">
          Chords Type
        </button>
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
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

export default ChordTypeSelectionPanel;