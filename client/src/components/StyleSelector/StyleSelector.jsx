import React, { useState, useEffect } from "react";
import StylesList from "./StylesList/StylesList";
import PatternList from "./PatternList/PatternList"; 

import styles from './StyleSelector.module.css'

export default function StyleSelector({ 
  controller, 
  isPlaying, 
  style, 
  setStyle, 
  drums, 
  setDrums, 
  bass, 
  setBass 
}) {
  const [drumsList, setDrumsList] = useState(controller.getDrumsListByStyle(style));
  const [bassList, setBassList] = useState(controller.getBassListByStyle(style));
  const [drumsPressedIndex, setDrumsPressedIndex] = useState(0);
  const [bassPressedIndex, setBassPressedIndex] = useState(0);

  // Update rhythm pattern lists when style changes
  useEffect(() => {
    const newDrumsList = controller.getDrumsListByStyle(style);
    const newBassList = controller.getBassListByStyle(style);

    setDrumsList(newDrumsList);
    setBassList(newBassList);
  }, [style, controller]);

  // Sync pressed indices when drums or bass change
  useEffect(() => {
    setDrumsPressedIndex(drumsList.indexOf(drums));
  }, [drums, drumsList]);

  useEffect(() => {
    setBassPressedIndex(bassList.indexOf(bass));
  }, [bass, bassList]);

  const handleStyleSelection = (styleLabel) => {
    setStyle(styleLabel);

    const drumsPerStyle = controller.getDrumsListByStyle(styleLabel);
    const bassPerStyle = controller.getBassListByStyle(styleLabel);

    setDrums(drumsPerStyle[0]);
    setBass(bassPerStyle[0]);
    controller.setDrums(styleLabel, drumsPerStyle[0]);
    controller.setBass(styleLabel, bassPerStyle[0]);
  };

  const handleDrumsSelection = (label) => {
    controller.setDrums(style, label);
    setDrums(label);
    setDrumsPressedIndex(drumsList.indexOf(label));
  };

  const handleBassSelection = (label) => {
    controller.setBass(style, label);
    setBass(label);
    setBassPressedIndex(bassList.indexOf(label));
  };

  return (
    <div className={`${styles.styleSelectorContainer} ${isPlaying ? "disabled" : ""}`}>
      <StylesList
        controller={controller}
        currentStyle={style}  // if your StylesList needs it
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