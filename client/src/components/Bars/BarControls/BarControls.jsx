// src/components/Bars/BarControls.jsx
import React from 'react';
import ResetButton from './ResetButton/ResetButton';
import styles from './BarControls.module.css';

export default function BarControls({

  controller,
  barLabels,
  tempo,
  style,
  drums,
  bass,
  tracks,
  setTracks,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords,
  SaveTrackButton,
  isPlaying
}) {

  const positionMap = () => ({ left: '', middle: '', right: '' });



  const addBar = () => {
    controller.addBar();
    setBarLabels(prev => [...prev, { ...positionMap() }]);
    setBarsHaveChord(prev => [...prev, false]);
    setBarsHaveTwoChords(prev => [...prev, false]);
  };

  const popBar = () => {
    if (barLabels.length <= 1) return;
    controller.popBar();
    setBarLabels(prev => prev.slice(0, -1));
    setBarsHaveChord(prev => prev.slice(0, -1));
    setBarsHaveTwoChords(prev => prev.slice(0, -1));
  };


  return (
      <div className={`${styles.barControls} ${isPlaying ? "disabled" : ""}`}>
            <div className={styles.leftGroup}>
                <button className={styles.addBarButton} onClick={addBar}>+ Add Bar</button>
                <button className={styles.popBarButton} onClick={popBar}>− Pop Bar</button>
                <ResetButton
                    controller={controller}
                    setBarLabels={setBarLabels}
                    setBarsHaveChord={setBarsHaveChord}
                    setBarsHaveTwoChords={setBarsHaveTwoChords}
                />
            </div>

            <div className={styles.rightGroup}>
                <SaveTrackButton
                    controller={controller}
                    barLabels={barLabels}
                    tempo={tempo}
                    style={style}
                    drums={drums}
                    bass={bass}
                    tracks={tracks}
                    setTracks={setTracks}
                />
            </div>
        </div>
  );
}


 

