import ChordBox from "./ChordBox.jsx";

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
        <div className= {`chord-box-list-container ${isPlaying ? "disabled" : ""}`}>
           {chords}
        </div>
    );
}

export default ChordBoxList;