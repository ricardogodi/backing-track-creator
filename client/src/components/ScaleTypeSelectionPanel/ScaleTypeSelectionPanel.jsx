import React from 'react';
import ScaleTypeButton from './ScaleTypeButton/ScaleTypeButton';
import { useState } from 'react';

import styles from './ScaleTypeSelectionPanel.module.css'

function ScaleTypeSelectionPanel({ controller, setChords, isPlaying }) {

    const [pressedIndex, setPressedIndex] = useState(0)
    const scaleTypes = ['Major', 'Minor', 'Melodic Minor', 'Harmonic Minor'];

    let list = []
    for (let i = 0; i < scaleTypes.length; i++) {
        list.push(
            <ScaleTypeButton
                key={i}
                index={i}
                label={scaleTypes[i]}
                pressedIndex={pressedIndex}
                controller={controller}
                setPressedIndex={setPressedIndex}
                setChords={setChords}
            />
        );
    }

    return (
        <div className={`${styles.scaleTypeSelectionContainer} ${isPlaying ? 'disabled' : ""} `}>
            <h2 className={styles.selectionTitle}>Scale Type</h2>
            {list}
        </div>
    );
}

export default ScaleTypeSelectionPanel;