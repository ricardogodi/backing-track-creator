import React from 'react';
import styles from "./PatternSelector.module.css"

export default function PatternSelector({
  type,           // "bass" or "drums"
  selectedIndex,  // currently active index
  index,          // this item’s index
  label,          // text to display
  onSelect,       // callback(label, index)
}) {
  const isActive = selectedIndex === index;
  return (
    <div
      className={` ${isActive ? 'pressed' : ''}`}
      onClick={() => onSelect(label, index)}
    >
      {label}
    </div>
  );
}