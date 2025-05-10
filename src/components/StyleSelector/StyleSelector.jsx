// src/components/StyleSelector/StyleSelector.jsx
import React, { useState } from "react";
import StylesList    from "./StylesList/StylesList";
import PatternList   from "./PatternList/PatternList"; 

import styles from './StyleSelector.module.css'

export default function StyleSelector({ controller, isPlaying }) {
  const [styleSelection, setStyleSelection]       = useState("Rock");
  const [drumsList, setDrumsList]                 = useState(controller.getDrumsListByStyle(styleSelection));
  const [bassList, setBassList]                   = useState(controller.getBassListByStyle(styleSelection));
  const [drumsPressedIndex, setDrumsPressedIndex] = useState(0);
  const [bassPressedIndex, setBassPressedIndex]   = useState(0);

  const handleStyleSelection = (styleLabel) => {
    setStyleSelection(styleLabel);

    const drumsPerStyle = controller.getDrumsListByStyle(styleLabel);
    setDrumsList(drumsPerStyle);

    const bassPerStyle = controller.getBassListByStyle(styleLabel);
    setBassList(bassPerStyle);

    controller.setDrums(styleLabel, drumsPerStyle[0]);
    controller.setBass(styleLabel, bassPerStyle[0]);

    setDrumsPressedIndex(0);
    setBassPressedIndex(0);
  };

  const handleDrumsSelection = (label) => {
    controller.setDrums(styleSelection, label);
    setDrumsPressedIndex(drumsList.indexOf(label));
  };

  const handleBassSelection = (label) => {
    controller.setBass(styleSelection, label);
    setBassPressedIndex(bassList.indexOf(label));
  };

  return (
    <div className={`${styles.styleSelectorContainer} ${isPlaying ? "disabled" : ""}`}>
      <StylesList
        controller={controller}
        handleStyleSelection={handleStyleSelection}
      />

      <div className={styles.rhythmsContainer}>
        <PatternList
          list={drumsList}
          selectedIndex={drumsPressedIndex}
          setSelectedIndex={setDrumsPressedIndex}
          handleSelection={handleDrumsSelection}
          type="drums"
        />

        <PatternList
          list={bassList}
          selectedIndex={bassPressedIndex}
          setSelectedIndex={setBassPressedIndex}
          handleSelection={handleBassSelection}
          type="bass"
        />
      </div>
    </div>
  );
}