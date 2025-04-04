import React, { useState } from 'react';

function Bar({ barIndex, barLabels, isPlaying, setBarIsDragging, barIsDragging, setChordIsDragging, chordIsDragging, chordDropHandler, barDropHandler, hasAChord, hasTwoChords }) {

    const [isOverLeft, setIsOverLeft] = useState(false);
    const [isOverMiddle, setIsOverMiddle] = useState(false);
    const [isOverRight, setIsOverRight] = useState(false);
    const [isLocalDragging, setIsLocalDragging] = useState(false);
    const [leftIsDragging, setLeftIsLocalDragging] = useState(false);
    const [middleIsDragging, setMiddleIsLocalDragging] = useState(false);
    const [rightIsDragging, setRightIsLocalDragging] = useState(false);


    const onDropHandler = (event, positionTo, isOverSetter) => {

        //console.log("inside onDropHandler: ")
        // console.log(`positionTo: ${positionTo}`)

        isOverSetter(false); // might move this to the bottom!!

        const type = event.dataTransfer.getData("type");

        if (type == "chordBox") {

            const chordIndexFrom = Number(event.dataTransfer.getData("chordIndex"));

            chordDropHandler(chordIndexFrom, barIndex, positionTo);
            setChordIsDragging(false)

        } else if (type == "bar") {

            const barIndexFrom = Number(event.dataTransfer.getData("barIndex"));
            const positionFrom = event.dataTransfer.getData("positionFrom");

            /*const barLabelFrom = event.dataTransfer.getData("barLabel");*/
            // console.log(`positionFrom: ${positionFrom}`)

            barDropHandler(barIndexFrom, barIndex, positionFrom, positionTo)
        }
    }

    return (
        <div className="bar-container"


        >
            <div className='bar'>




            </div>


            <div
                className={`left-area ${((hasAChord && !hasTwoChords) || hasTwoChords) && (chordIsDragging || barIsDragging) && (!isLocalDragging) ? "droppable-mode" : ""} 
                ${hasTwoChords && !chordIsDragging ? "draggable-mode" : ""} ${leftIsDragging ? "bar-is-dragging" : ""}`}

                draggable={hasTwoChords && !isPlaying} // also is not playing

                onDragOver={(e) => {

                    e.preventDefault();
                    setIsOverLeft(true);
                }}

                onDragLeave={(e) => {

                    e.preventDefault();
                    setIsOverLeft(false);
                }}

                onDragStart={(e) => {
                    // CHECK:
                    e.stopPropagation();

                    e.dataTransfer.setData("type", "bar");
                    e.dataTransfer.setData("barIndex", barIndex);
                    // e.dataTransfer.setData("barLabel", barLabels["left"]);
                    e.dataTransfer.setData("positionFrom", "left");
                    setBarIsDragging(true)
                    //setIsLocalDragging(true)
                    setLeftIsLocalDragging(true)

                    // console.log("Dragging from left")
                }}

                onDragEnd={() => {

                    setBarIsDragging(false)
                    setLeftIsLocalDragging(false)
                }}

                onDrop={(event) => {
                    // console.log("Dropping to the left")

                    onDropHandler(event, "left", setIsOverLeft)
                    setIsOverLeft(false);
                }}

            >
                {barLabels["left"]}
            </div>

            {/* Middle Droppable Area */}
            <div
                className={`middle-area ${(!hasAChord || (hasAChord && !hasTwoChords) && (chordIsDragging || barIsDragging)) ? "droppable-mode" : ""} 
                ${hasAChord && !hasTwoChords ? "draggable-mode" : ""} ${middleIsDragging ? "bar-is-dragging" : ""}`}

                // && (isLocalDragging && (hasAChord && !hasTwoChords))

                draggable={(hasAChord && !hasTwoChords) && !isPlaying}

                onDragOver={(e) => {

                    e.preventDefault();
                    setIsOverMiddle(true);
                }}

                onDragLeave={(e) => {

                    e.preventDefault();
                    setIsOverMiddle(false);
                }}

                onDragStart={(e) => {

                    // CHECK:
                    e.stopPropagation();

                    e.dataTransfer.setData("type", "bar");
                    e.dataTransfer.setData("barIndex", barIndex);
                    e.dataTransfer.setData("positionFrom", "middle");
                    setBarIsDragging(true)
                    setIsLocalDragging(true)
                    setMiddleIsLocalDragging(true)

                    // console.log("Dragging from middle")
                }}

                onDragEnd={() => {

                    setIsLocalDragging(false)
                    setBarIsDragging(false)
                    setMiddleIsLocalDragging(false)

                }}

                onDrop={(event) => {
                    // console.log("Dropping to the middle")

                    onDropHandler(event, "middle", setIsOverRight)
                    setIsOverMiddle(false);
                    //  console.log(isOverMiddle)
                }}
            >
                {barLabels["middle"]}
            </div>

            {/* Right Droppable Area */}
            <div
                className={`right-area ${((hasAChord && !hasTwoChords) || hasTwoChords) && (chordIsDragging || barIsDragging) && (!isLocalDragging) ? "droppable-mode" : ""} 
                ${hasTwoChords && !chordIsDragging ? "draggable-mode" : ""} ${rightIsDragging ? "bar-is-dragging" : ""}`}

                //&& (isLocalDragging && (hasAChord && !hasTwoChords))

                draggable={hasTwoChords && !isPlaying}

                onDragOver={(e) => {

                    e.preventDefault();
                    setIsOverRight(true);
                }}

                onDragLeave={(e) => {

                    e.preventDefault();
                    setIsOverRight(false);
                }}

                onDragStart={(e) => {

                    // CHECK:
                    e.stopPropagation();

                    e.dataTransfer.setData("type", "bar");
                    e.dataTransfer.setData("barIndex", barIndex);
                    e.dataTransfer.setData("positionFrom", "right");
                    setBarIsDragging(true)
                    setRightIsLocalDragging(true)
                    // setIsLocalDragging(true)             
                }}

                onDragEnd={() => {
                    setRightIsLocalDragging(false)

                    setBarIsDragging(false)
                }}

                onDrop={(event) => {
                    // console.log("Dropping to the right")

                    onDropHandler(event, "right", setIsOverRight)
                }}
            >
                {barLabels["right"]}
            </div>

            {/* HIGHLIGHTS AREAS */}
            <div className={`left-highlight ${isOverLeft ? 'highlight-visible' : ''}`}></div>
            <div className={`middle-highlight ${isOverMiddle ? 'highlight-visible' : ''}`}></div>
            <div className={`right-highlight ${isOverRight ? 'highlight-visible' : ''}`}></div>


























        </div>

    );
}

export default Bar;