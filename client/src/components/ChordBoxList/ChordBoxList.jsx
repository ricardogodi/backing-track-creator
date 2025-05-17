import ChordBox from "./ChordBox/ChordBox.jsx";
import styles from './ChordBoxList.module.css';

function ChordBoxList({ chordList, isPlaying, setChordIsDragging }) {
  const maxLabelLength = Math.max(...chordList.map(label => label.length));

  const baseFontSize = Math.max(12, 18 - (maxLabelLength - 4) * 1.5); 

  return (
    <div className={`${styles.chordBoxListContainer} ${isPlaying ? "disabled" : ""}`}>
      {chordList.map((label, i) => (
        <ChordBox
          key={i}
          index={i}
          label={label}
          fontSize={baseFontSize}
          setChordIsDragging={setChordIsDragging}
        />
      ))}
    </div>
  );
}

export default ChordBoxList;