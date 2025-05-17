// src/components/Bars/Bars.jsx
import React, { useState, useEffect } from 'react';
import Bar from './Bar/Bar';
import styles from './Bars.module.css';

export default function Bars({
    controller,
    isPlaying,
    chordIsDragging,
    setChordIsDragging,
    barLabels,
    setBarLabels,
    barsHaveChord,
    setBarsHaveChord,
    barsHaveTwoChords,
    setBarsHaveTwoChords,
}) {

    const [barIsDragging, setBarIsDragging] = useState(false);
    const [isOverDropZone, setBarIsOverDropZone] = useState(false);

    const positionMap = () => ({
        left: "",
        middle: "",
        right: ""
    });

    const addBar = () => {
        controller.addBar();
        setBarLabels(prev => [...prev, { ...positionMap() }]);
        setBarsHaveChord(prev => [...prev, false]);
        setBarsHaveTwoChords(prev => [...prev, false]);
    };

    const removeLastBar = () => {
        if (barLabels.length <= 1) return;
        
        controller.popBar();

        // Update state arrays by removing the last element
        setBarLabels(prev => prev.slice(0, -1));
        setBarsHaveChord(prev => prev.slice(0, -1));
        setBarsHaveTwoChords(prev => prev.slice(0, -1));
    };

    const handleChordDrop = (chordBoxIndex, barIndex, positionTo) => {
        controller.setChord(chordBoxIndex, barIndex, positionTo);
        refreshBarStates();
        setChordIsDragging(false);
    };

    const handleBarDrop = (barIndexFrom, barIndexTo, positionFrom, positionTo) => {
        if (barIndexFrom === barIndexTo && positionFrom === positionTo) return;
        controller.moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo);
        refreshBarStates();
        setBarIsDragging(false);
    };

    const handleBarRemove = (barIndexFrom, positionFrom) => {
        controller.removeChord(barIndexFrom, positionFrom);
        refreshBarStates();
        setBarIsDragging(false);
    };

    const refreshBarStates = () => {
        const updatedLabels = controller.getBarLabels();

        const formatLabel = (label) => {
            if (!label) return "";
            const quality = label.quality === "M" ? "" : label.quality;
            return `${label.root}${quality}`;
        };

        const formattedLabels = updatedLabels.map(label => ({
            left: formatLabel(label.left),
            middle: formatLabel(label.middle),
            right: formatLabel(label.right),
        }));

        const newBarsHaveChord = updatedLabels.map(label =>
            !!label.left || !!label.middle || !!label.right
        );

        const newBarsHaveTwoChords = updatedLabels.map(label =>
            !!label.left && !!label.right
        );

        setBarLabels(formattedLabels);
        setBarsHaveChord(newBarsHaveChord);
        setBarsHaveTwoChords(newBarsHaveTwoChords);
    };

    const bars = barLabels.map((label, i) => (
        <Bar
            key={i}
            barIndex={i}
            barLabels={label}
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
            <div className={`${styles.dropZoneWrapper} ${barIsDragging ? styles.dragging : ''}`}>
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
            <div className={styles.addAndPopButtonWrapper}>
                <button className={styles.addBarButton} onClick={addBar}>
                    + Add Bar
                </button>
                <button className={styles.popBarButton} onClick={removeLastBar}>
                    − Pop Bar
                </button>
            </div>
        </div>
    );
}
