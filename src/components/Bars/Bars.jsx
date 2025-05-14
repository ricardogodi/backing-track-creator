// src/components/Bars/Bars.jsx
import React, { useState, useEffect } from 'react';
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

  const [barLabels, setBarLabels] = useState([]);
  const [barsHaveChord, setBarsHaveChord] = useState([]);
  const [barsHaveTwoChords, setBarsHaveTwoChords] = useState([]);
  const [barIsDragging, setBarIsDragging] = useState(false);
  const [isOverDropZone, setBarIsOverDropZone] = useState(false);

  // 🧠 Dynamically adjust state when numOfBars changes
  useEffect(() => {
    setBarLabels((prev) => {
      const updated = [...prev];
      while (updated.length < numOfBars) updated.push(positionMap());
      return updated.slice(0, numOfBars);
    });
    setBarsHaveChord((prev) => {
      const updated = [...prev];
      while (updated.length < numOfBars) updated.push(false);
      return updated.slice(0, numOfBars);
    });
    setBarsHaveTwoChords((prev) => {
      const updated = [...prev];
      while (updated.length < numOfBars) updated.push(false);
      return updated.slice(0, numOfBars);
    });
  }, [numOfBars]);

  const handleChordDrop = (chordBoxIndex, barIndex, positionTo) => {
    const chordBoxLabel = controller.getFullChordAtIndex(chordBoxIndex);
    const newLabels = [...barLabels];
    const bar = { ...newLabels[barIndex] };

    const newBarsHaveChord = [...barsHaveChord];
    const newBarsHaveTwoChords = [...barsHaveTwoChords];

    if (!newBarsHaveChord[barIndex]) {
      bar.middle = chordBoxLabel;
      newBarsHaveChord[barIndex] = true;
    } else if (newBarsHaveChord[barIndex] && !newBarsHaveTwoChords[barIndex]) {
      if (positionTo === 'left') {
        bar.left = chordBoxLabel;
        bar.right = bar.middle;
        bar.middle = '';
        newBarsHaveTwoChords[barIndex] = true;
      } else if (positionTo === 'middle') {
        bar.middle = chordBoxLabel;
      } else if (positionTo === 'right') {
        bar.right = chordBoxLabel;
        bar.left = bar.middle;
        bar.middle = '';
        newBarsHaveTwoChords[barIndex] = true;
      }
    } else if (newBarsHaveTwoChords[barIndex]) {
      bar[positionTo] = chordBoxLabel;
    }

    newLabels[barIndex] = bar;

    setChordIsDragging(false);
    setBarLabels(newLabels);
    setBarsHaveChord(newBarsHaveChord);
    setBarsHaveTwoChords(newBarsHaveTwoChords);
    controller.setChord(chordBoxIndex, barIndex, positionTo);
  };

  const handleBarRemove = (barIndexFrom, positionFrom) => {
    const updated = [...barLabels];
    const bar = { ...updated[barIndexFrom] };

    if (positionFrom === 'left') {
      bar.middle = bar.right;
      bar.left = '';
      bar.right = '';
    } else if (positionFrom === 'middle') {
      bar.middle = '';
    } else if (positionFrom === 'right') {
      bar.middle = bar.left;
      bar.left = '';
      bar.right = '';
    }

    updated[barIndexFrom] = bar;

    const chordState = [...barsHaveChord];
    const twoChordState = [...barsHaveTwoChords];
    chordState[barIndexFrom] = bar.middle !== '';
    twoChordState[barIndexFrom] = false;

    setBarLabels(updated);
    setBarsHaveChord(chordState);
    setBarsHaveTwoChords(twoChordState);
    setBarIsDragging(false);
    controller.removeChord(barIndexFrom, positionFrom);
  };

  const handleBarDrop = (barIndexFrom, barIndexTo, positionFrom, positionTo) => {
    if (barIndexFrom === barIndexTo && positionFrom === positionTo) return;

    const newLabels = [...barLabels];
    const from = { ...newLabels[barIndexFrom] };
    const to = { ...newLabels[barIndexTo] };
    const chordFrom = from[positionFrom];
    const chordTo = to[positionTo];

    from[positionFrom] = chordTo;
    to[positionTo] = chordFrom;

    newLabels[barIndexFrom] = from;
    newLabels[barIndexTo] = to;

    setBarLabels(newLabels);
    controller.moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo);
  };

  return (
    <div className={styles.barsAndDropZoneContainer}>
      <div className={`${styles.dropZoneWrapper} ${barIsDragging ? styles.dragging : ''}`}>
        <div
          className={`${styles.dropZone} ${barIsDragging ? styles.dragging : ''} ${isOverDropZone ? styles.over : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setBarIsOverDropZone(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setBarIsOverDropZone(false);
          }}
          onDrop={(e) => {
            const type = e.dataTransfer.getData('type');
            if (type === 'bar') {
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
      <div className={styles.barsContainer}>
        {barLabels.map((bar, i) => (
          <Bar
            key={i}
            barIndex={i}
            barLabels={bar}
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
        ))}
      </div>
    </div>
  );
}