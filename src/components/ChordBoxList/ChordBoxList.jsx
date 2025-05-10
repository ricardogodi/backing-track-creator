import ChordBox from "./ChordBox/ChordBox.jsx";
import styles from './ChordBoxList.module.css'

function ChordBoxList({ chordList, isPlaying, setChordIsDragging }) {

    let chords = []
    for (let i = 0; i < chordList.length; i++) {
        chords.push(
            <ChordBox
                key={i}
                index={i}
                label={chordList[i]} 
                setChordIsDragging={setChordIsDragging}
            />
        );
    }
    return (
        <div className= {`${styles.chordBoxListContainer} ${isPlaying ? "disabled" : ""}`}>
           {chords}
        </div>
    );
}

export default ChordBoxList;