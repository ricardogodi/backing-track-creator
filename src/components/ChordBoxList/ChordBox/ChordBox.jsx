import React, { useState } from 'react';
import styles from './ChordBox.module.css';

export default function ChordBox({ label, index, fontSize, setChordIsDragging }) {
  const [isLocalDragging, setIsLocalDragging] = useState(false);

  return (
    <div
      className={`${styles.chordBox} draggable ${isLocalDragging ? styles.chordIsDragging : ''}`}
      draggable={true}
      onDragStart={(e) => {
        document.body.classList.add('no-scroll');
        e.dataTransfer.setData("type", "chordBox");
        e.dataTransfer.setData("chordIndex", index);
        e.dataTransfer.setData("chordLabel", label);
        setChordIsDragging(true);
        setIsLocalDragging(true);
      }}
      onDragEnd={() => {
        document.body.classList.remove('no-scroll');
        setChordIsDragging(false);
        setIsLocalDragging(false);
      }}
      style={{ fontSize: `${fontSize}px` }}
    >
      {label}
    </div>
  );
}