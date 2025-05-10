// src/components/ChordTypeSelectionPanel/ChordTypeSelectionPanel.jsx
import React, { useState } from 'react';
import ChordTypeButton from './ChordTypeButton/ChordTypeButton';

import styles from './ChordTypeSelectionPanel.module.css';

function ChordTypeSelectionPanel({ controller, setChords, isPlaying }) {
    const [pressedIndex, setPressedIndex] = useState(0);
    const chordTypes = ['Triads', '7th'];

    let list = [];
    for (let i = 0; i < chordTypes.length; i++) {
        list.push(
            <ChordTypeButton
                key={i}
                index={i}
                label={chordTypes[i]}
                pressedIndex={pressedIndex}
                controller={controller}
                setPressedIndex={setPressedIndex}
                setChords={setChords}
            />
        );
    }

    return (
        <div className={`${styles.chordTypeSelectionContainer} ${isPlaying ? "disabled" : ''}`}>
            <h2 className={styles.selectionTitle}>Chords Type</h2>
            {list}
        </div>
    );
}

export default ChordTypeSelectionPanel;