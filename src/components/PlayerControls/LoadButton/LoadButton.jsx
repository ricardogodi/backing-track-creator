// src/components/PlayerControls/LoadButton/LoadButton.jsx

import React from 'react';
import styles from './LoadButton.module.css';

export default function LoadButton({
  controller,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords,
  setTempo,
  setStyle,
  setDrums,
  setBass
}) {
  const handleLoad = () => {
    // Simulated saved configuration
    const config = {
      style: "Funk",
      drums: "Drums 2",
      bass: "Bass 3",
      tempo: 160,
      chords: [
        {
          left: { root: "C", quality: "" },
          middle: null,
          right: { root: "G", quality: "7" }
        },
        {
          left: null,
          middle: { root: "A", quality: "m" },
          right: null
        },
        {
          left: { root: "F", quality: "" },
          middle: null,
          right: { root: "D", quality: "m7" }
        },
        {
          left: null,
          middle: null,
          right: null
        }
      ]
    };

    // Step 1: Load chords into controller
    controller.load(config.chords);

    // Step 2: Apply tempo, style, drums, and bass
    controller.changeTempo(config.tempo);
    controller.setDrums(config.style, config.drums);
    controller.setBass(config.style, config.bass);

    // Step 3: Update state in App
    setTempo(config.tempo);
    setStyle(config.style);
    setDrums(config.drums);
    setBass(config.bass);

    // Step 4: Format and update chord display
    const updatedLabels = controller.getBarLabels();
    const formatLabel = (label) => label ? `${label.root}${label.quality === "M" ? "" : label.quality}` : "";

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

  return (
    <button className={styles.loadButton} onClick={handleLoad}>
      Load
    </button>
  );
}