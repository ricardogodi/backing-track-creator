import React from 'react';
import styles from './ResetButton.module.css';

export default function ResetButton({
  controller,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords,
}) {
  const handleReset = () => {
    controller.reset();

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

  return (
    <button className={styles.resetButton} onClick={handleReset}>
      Reset
    </button>
  );
}