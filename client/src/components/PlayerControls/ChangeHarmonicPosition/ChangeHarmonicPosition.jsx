// src/components/ChangeHarmonicPosition/ChangeHarmonicPosition.jsx
import React, { useState } from 'react';
import styles from './ChangeHarmonicPosition.module.css';

function ChangeHarmonicPosition({ controller, isPlaying }) {
    const handleClick = () => {
        controller.changeInitialHarmonicPosition();
    };

    return (
        <div className={`${styles.changeHarmPos} ${isPlaying ? styles.disabled : ''}`}>
            <button
                className={styles.changeHarmonicPositionButton}
                onClick={handleClick}
            >
                Change Harmonic Position
            </button>
        </div>
    );
}

export default ChangeHarmonicPosition;