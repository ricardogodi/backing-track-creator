import React, { useState } from 'react';

import styles from "./TempoSlider.module.css"

function TempoSlider({ controller, isPlaying, tempo, setTempo }) {
  const handleSliderChange = (e) => {
    setTempo(Number(e.target.value));
  };

  const handleSliderEnd = (e) => {
    controller.changeTempo(e.target.value);
  };

  return (
    <div className={styles.tempoSliderContainer}>
      <h3>Tempo: {tempo}</h3>
      <input
        type="range"
        min="20"
        max="200"
        value={tempo}
        onChange={handleSliderChange}
        onMouseUp={handleSliderEnd}
        onTouchEnd={handleSliderEnd}
        step="1"
        style={{ width: '100%' }}
        disabled={isPlaying}
      />
    </div>
  );
}

export default TempoSlider;