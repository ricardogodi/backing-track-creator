import React from 'react';
import PatternSelector from './PatternSelector/PatternSelector';

import styles from './PatternList.module.css'

export default function PatternList({
  list,             // array of labels, e.g. drumsList or bassList
  selectedIndex,    // e.g. drumsPressedIndex or bassPressedIndex
  setSelectedIndex, // setter function
  handleSelection,  // e.g. handleDrumsSelection or handleBassSelection
  type,             // 'drums' or 'bass'
}) {
  return (
    <div className={styles.patternList}>
      {list.map((label, idx) => (
        <PatternSelector
          key={idx}
          type={type}
          selectedIndex={selectedIndex}
          index={idx}
          label={label}
          onSelect={(lbl, i) => {
            handleSelection(lbl);
            setSelectedIndex(i);
          }}
        />
      ))}
    </div>
  );
}