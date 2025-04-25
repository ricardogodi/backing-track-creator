import ChordTypeButton from './ChordTypeButton';
import {useState} from 'react'

function ChordTypeSelectionPanel({ controller, setChords, isPlaying }) {

    const [pressedIndex, setPressedIndex] = useState(0)
    const chordTypes = ['Triads', '7th'];

    let list = []
    for (let i = 0; i < chordTypes.length; i++) {
        list.push(
            <ChordTypeButton
                key={i}
                index={i}
                label={chordTypes[i]}
                pressedIndex={pressedIndex}
                controller={controller}
                setPressedIndex={setPressedIndex}
                setChords={setChords}                
            />
        );
    }

    return (
        <div className={`chord-type-selection-container ${isPlaying ? "disabled" : "" }`}>
            <h2 className="selection-title">Chords Type</h2>
            {list}
        </div>
    );
}

export default ChordTypeSelectionPanel;