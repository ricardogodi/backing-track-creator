import React, { useState } from 'react';
import styles from './Bar.module.css';

export default function Bar({
  barIndex,
  barLabels,
  isPlaying,
  setBarIsDragging,
  barIsDragging,
  setChordIsDragging,
  chordIsDragging,
  chordDropHandler,
  barDropHandler,
  hasAChord,
  hasTwoChords,
}) {
  const [isOverLeft, setIsOverLeft] = useState(false);
  const [isOverMiddle, setIsOverMiddle] = useState(false);
  const [isOverRight, setIsOverRight] = useState(false);
  const [isLocalDragging, setIsLocalDragging] = useState(false);
  const [leftIsDragging, setLeftIsLocalDragging] = useState(false);
  const [middleIsDragging, setMiddleIsLocalDragging] = useState(false);
  const [rightIsDragging, setRightIsLocalDragging] = useState(false);

  const isBarEmpty = !barLabels.left && !barLabels.middle && !barLabels.right;

  const onDropHandler = (event, positionTo, isOverSetter) => {
    isOverSetter(false);
    const type = event.dataTransfer.getData('type');

    if (type === 'chordBox') {
      const chordIndexFrom = Number(event.dataTransfer.getData('chordIndex'));
      chordDropHandler(chordIndexFrom, barIndex, positionTo);
      setChordIsDragging(false);
    } else if (type === 'bar') {
      const barIndexFrom = Number(event.dataTransfer.getData('barIndex'));
      const positionFrom = event.dataTransfer.getData('positionFrom');
      barDropHandler(barIndexFrom, barIndex, positionFrom, positionTo);
    }
  };

  return (
    <div className={styles.barContainer}>
      <div className={styles.bar}>
        {isBarEmpty && (
          <div className={styles.placeholderText}>Drag chord here</div>
        )}
      </div>

      {/* Left Droppable Area */}
      <div
        className={`
          ${styles.leftArea}
          ${((hasAChord && !hasTwoChords) || hasTwoChords) && (chordIsDragging || barIsDragging) && !isLocalDragging ? styles.droppableMode : ''}
          ${hasTwoChords && !chordIsDragging ? styles.draggableMode : ''}
          ${leftIsDragging ? styles.barIsDragging : ''}
        `}
        draggable={hasTwoChords && !isPlaying}
        onDragOver={(e) => { e.preventDefault(); setIsOverLeft(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsOverLeft(false); }}
        onDragStart={(e) => {
          document.body.classList.add('no-scroll');
          e.stopPropagation();
          e.dataTransfer.setData('type', 'bar');
          e.dataTransfer.setData('barIndex', barIndex);
          e.dataTransfer.setData('positionFrom', 'left');
          setBarIsDragging(true);
          setLeftIsLocalDragging(true);
        }}
        onDragEnd={() => {
          document.body.classList.remove('no-scroll');
          setBarIsDragging(false);
          setLeftIsLocalDragging(false);
        }}
        onDrop={(e) => onDropHandler(e, 'left', setIsOverLeft)}
      >
        {barLabels.left}
      </div>

      {/* Middle Droppable Area */}
      <div
        className={`
          ${styles.middleArea}
          ${(!hasAChord || (hasAChord && !hasTwoChords) && (chordIsDragging || barIsDragging)) ? styles.droppableMode : ''}
          ${hasAChord && !hasTwoChords ? styles.draggableMode : ''}
          ${middleIsDragging ? styles.barIsDragging : ''}
        `}
        draggable={(hasAChord && !hasTwoChords) && !isPlaying}
        onDragOver={(e) => { e.preventDefault(); setIsOverMiddle(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsOverMiddle(false); }}
        onDragStart={(e) => {
          e.stopPropagation();
          e.dataTransfer.setData('type', 'bar');
          e.dataTransfer.setData('barIndex', barIndex);
          e.dataTransfer.setData('positionFrom', 'middle');
          setBarIsDragging(true);
          setIsLocalDragging(true);
          setMiddleIsLocalDragging(true);
        }}
        onDragEnd={() => {
          setIsLocalDragging(false);
          setBarIsDragging(false);
          setMiddleIsLocalDragging(false);
        }}
        onDrop={(e) => onDropHandler(e, 'middle', setIsOverMiddle)}
      >
        {barLabels.middle}
      </div>

      {/* Right Droppable Area */}
      <div
        className={`
          ${styles.rightArea}
          ${((hasAChord && !hasTwoChords) || hasTwoChords) && (chordIsDragging || barIsDragging) && !isLocalDragging ? styles.droppableMode : ''}
          ${hasTwoChords && !chordIsDragging ? styles.draggableMode : ''}
          ${rightIsDragging ? styles.barIsDragging : ''}
        `}
        draggable={hasTwoChords && !isPlaying}
        onDragOver={(e) => { e.preventDefault(); setIsOverRight(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsOverRight(false); }}
        onDragStart={(e) => {
          e.stopPropagation();
          e.dataTransfer.setData('type', 'bar');
          e.dataTransfer.setData('barIndex', barIndex);
          e.dataTransfer.setData('positionFrom', 'right');
          setBarIsDragging(true);
          setRightIsLocalDragging(true);
        }}
        onDragEnd={() => {
          setRightIsLocalDragging(false);
          setBarIsDragging(false);
        }}
        onDrop={(e) => onDropHandler(e, 'right', setIsOverRight)}
      >
        {barLabels.right}
      </div>

      {/* Highlight Areas */}
      <div className={`${styles.leftHighlight} ${isOverLeft ? styles.highlightVisible : ''}`} />
      <div className={`${styles.middleHighlight} ${isOverMiddle ? styles.highlightVisible : ''}`} />
      <div className={`${styles.rightHighlight} ${isOverRight ? styles.highlightVisible : ''}`} />
    </div>
  );
}