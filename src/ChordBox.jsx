import React, { useState } from 'react';

function ChordBox({ label, index, setChordIsDragging }) {

    const [isLocalDragging, setIsLocalDragging] = useState(false);

    return <div className={`chord-box ${isLocalDragging ? "chord-is-dragging" : ""}`}

        draggable={true}

        onDragStart={(e) => {
            e.dataTransfer.setData("type", "chordBox")
            e.dataTransfer.setData("chordIndex", index)
            e.dataTransfer.setData("chordLabel", label)
            setChordIsDragging(true)
            setIsLocalDragging(true)

        }}

        onDragEnd={() => {
            setChordIsDragging(false)
            setIsLocalDragging(false)

        }}
    >
        {label}
    </div>;
}

export default ChordBox;