// src/components/Bars/Bars.jsx
import React, { useState } from 'react';
import Bar from './Bar/Bar';
import styles from './Bars.module.css';

export default function Bars({
    numOfBars,
    controller,
    isPlaying,
    chordIsDragging,
    setChordIsDragging,
}) {
    const positionMap = () => ({ left: '', middle: '', right: '' });

    const [barLabels, setBarLabels] = useState(
        Array.from({ length: numOfBars }, () => ({ ...positionMap() }))
    );
    const [barsHaveChord, setBarsHaveChord] = useState(
        new Array(numOfBars).fill(false)
    );
    const [barsHaveTwoChords, setBarsHaveTwoChords] = useState(
        new Array(numOfBars).fill(false)
    );
    const [barIsDragging, setBarIsDragging] = useState(false);
    const [isOverDropZone, setBarIsOverDropZone] = useState(false);

    const handleChordDrop = (chordBoxIndex, barIndex, positionTo) => {
        const chordBoxLabel = controller.getFullChordAtIndex(chordBoxIndex);
        const newLabels = [...barLabels];
        const newBarsHaveChord = [...barsHaveChord];
        const newBarsHaveTwoChords = [...barsHaveTwoChords];
        const bar = { ...newLabels[barIndex] };
        newLabels[barIndex] = bar;

        if (!barsHaveChord[barIndex]) {
            bar.middle = chordBoxLabel;
            newBarsHaveChord[barIndex] = true;
        } else if (barsHaveChord[barIndex] && !barsHaveTwoChords[barIndex]) {
            if (positionTo === 'left') {
                bar.left = chordBoxLabel;
                bar.right = newLabels[barIndex].middle;
                bar.middle = '';
                newBarsHaveTwoChords[barIndex] = true;
            } else if (positionTo === 'middle') {
                bar.middle = chordBoxLabel;
            } else {
                bar.right = chordBoxLabel;
                bar.left = newLabels[barIndex].middle;
                bar.middle = '';
                newBarsHaveTwoChords[barIndex] = true;
            }
        } else {
            if (positionTo === 'left') bar.left = chordBoxLabel;
            else if (positionTo === 'right') bar.right = chordBoxLabel;
        }

        setChordIsDragging(false);
        setBarLabels(newLabels);
        setBarsHaveChord(newBarsHaveChord);
        setBarsHaveTwoChords(newBarsHaveTwoChords);
        controller.setChord(chordBoxIndex, barIndex, positionTo);
    };

    const handleBarDrop = (fromIdx, toIdx, fromPos, toPos) => {
        if (fromIdx === toIdx && fromPos === toPos) return;
        // ...existing move logic...

        // after updating state arrays:
        setBarIsDragging(false);
        setBarLabels(barLabels);
        setBarsHaveChord(barsHaveChord);
        setBarsHaveTwoChords(barsHaveTwoChords);
        controller.moveChord(fromIdx, toIdx, fromPos, toPos);
    };

    const handleBarRemove = (fromIdx, fromPos) => {
        // ...existing remove logic...
        setBarIsDragging(false);
    };

    const bars = Array.from({ length: numOfBars }, (_, i) => (
        <Bar
            key={i}
            barIndex={i}
            barLabels={barLabels[i]}
            barDropHandler={handleBarDrop}
            chordDropHandler={handleChordDrop}
            setBarIsDragging={setBarIsDragging}
            barIsDragging={barIsDragging}
            setChordIsDragging={setChordIsDragging}
            chordIsDragging={chordIsDragging}
            hasAChord={barsHaveChord[i]}
            hasTwoChords={barsHaveTwoChords[i]}
            isPlaying={isPlaying}
        />
    ));

    return (
        <div className={styles.barsAndDropZoneContainer}>
            <div
                className={`${styles.dropZoneWrapper} ${barIsDragging ? styles.dragging : ''}`}
            >
                <div
                    className={`${styles.dropZone} ${barIsDragging ? styles.dragging : ''} ${isOverDropZone ? styles.over : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setBarIsOverDropZone(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setBarIsOverDropZone(false); }}
                    onDrop={(e) => {
                        const type = e.dataTransfer.getData('type');
                        if (type === 'bar') {
                            e.preventDefault();
                            const idx = Number(e.dataTransfer.getData('barIndex'));
                            const pos = e.dataTransfer.getData('positionFrom');
                            handleBarRemove(idx, pos);
                            setBarIsDragging(false);
                            setBarIsOverDropZone(false);
                        }
                    }}
                >
                    <div className={styles.text}>Drop Chord to Delete</div>
                </div>
            </div>
            <div className={styles.barsContainer}>{bars}</div>
        </div>
    );
}
