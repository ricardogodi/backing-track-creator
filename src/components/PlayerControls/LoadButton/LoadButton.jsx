// src/components/PlayerControls/LoadButton/LoadButton.jsx

import React from 'react';
import styles from './LoadButton.module.css';

export default function LoadButton({ controller, setBarLabels, setBarsHaveChord, setBarsHaveTwoChords }) {
  const handleLoad = () => {
    const preset = [
      { left: { root: "C", quality: "" }, middle: null, right: { root: "G", quality: "7" } },
      { left: null, middle: { root: "A", quality: "m" }, right: null },
      { left: { root: "F", quality: "" }, middle: null, right: { root: "D", quality: "m7" } },
      { left: null, middle: null, right: null }
    ];

    controller.load(preset);

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