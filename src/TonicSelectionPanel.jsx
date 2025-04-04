import React, { useState } from "react";
import TonicButton from "./TonicButton";

function TonicSelectionPanel({ controller, setChords, isPlaying }) {
    const [pressedIndex, setPressedIndex] = useState(0); // Track pressed button

    const tonics = [
        { id: 0, label: 'C' },
        [{ id: 1, label: 'C#' }, { id: 2, label: 'Db' }],
        { id: 3, label: 'D' },
        [{ id: 4, label: 'D#' }, { id: 5, label: 'Eb' }],
        { id: 6, label: 'E' },
        { id: 7, label: 'F' },
        [{ id: 8, label: 'F#' }, { id: 9, label: 'Gb' }],
        { id: 10, label: 'G' },
        [{ id: 11, label: 'G#' }, { id: 12, label: 'Ab' }],
        { id: 13, label: 'A' },
        [{ id: 14, label: 'A#' }, { id: 15, label: 'Bb' }],
        { id: 16, label: 'B' },
    ];

    return (
        <div className={`tonic-selection-container ${isPlaying ? "disabled" : ""}`}>
            <h2 className="selection-title">Tonic</h2>
            
            {tonics.map((tonic, index) => {
                if (Array.isArray(tonic)) {
                    return (
                        <EnharmonicPair
                            key={`pair-${tonic[0].id}`}
                            controller={controller}
                            setChords={setChords}
                            notes={tonic}
                            pressedIndex={pressedIndex}
                            setPressedIndex={setPressedIndex}
                        />
                    );
                } else {
                    return (
                        <SingleNote
                            key={`note-${tonic.id}`}
                            controller={controller}
                            setChords={setChords}
                            note={tonic}
                            pressedIndex={pressedIndex}
                            setPressedIndex={setPressedIndex}
                        />
                    );
                }
            })}
        </div>
    );
}

function SingleNote({ controller, note, setChords, pressedIndex, setPressedIndex }) {
    return (
        <TonicButton
            controller={controller}
            setChords={setChords}
            label={note.label}
            index={note.id} // Pass ID for tracking
            pressedIndex={pressedIndex}
            setPressedIndex={setPressedIndex}
        />
    );
}

function EnharmonicPair({ controller, notes, setChords, pressedIndex, setPressedIndex }) {
    return (
        <div className="button-pair">
            {notes.map(note => (
                <TonicButton
                    key={note.id}
                    controller={controller}
                    setChords={setChords}
                    label={note.label}
                    index={note.id}
                    pressedIndex={pressedIndex}
                    setPressedIndex={setPressedIndex}
                />
            ))}
        </div>
    );
}

export default TonicSelectionPanel;