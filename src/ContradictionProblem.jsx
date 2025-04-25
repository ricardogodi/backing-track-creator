import React, { useState } from 'react';

function Bar({ barIndex, barLabels, isPlaying, isDragging, chordDropHandler, barDropHandler }) {

    const [hasAChord, setHasAChord] = useState(true);
    const [hasTwoChords, setHasTwoChord] = useState(false);
    
    const [isOverLeft, setIsOverLeft] = useState(false);
    const [isOverMiddle, setIsOverMiddle] = useState(false);
    const [isOverRight, setIsOverRight] = useState(false);

    const [hasLeftChord, setHasLeftChord] = useState(false)
    const [hasRightChord, setHasRightChord] = useState(false)

    const [isLocalDragging, setIsLocalDragging] = useState(false); 

    return (
        <div className="bar">

             {/* DROPPABLE AREAS */}
            {/* Left Droppable Area */}
            <div
                className={`left-droppable-area ${hasAChord ? "droppable-visible" : ""} ${
                    isLocalDragging ? "move-up" : ""
                }`}
                style={{ pointerEvents: isOverLeft ? 'auto' : 'none' }} // Conditional pointer-events
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsOverLeft(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setIsOverLeft(false);
                }}
                onDrop={(e) => {
                    // Handle drop logic
                }}
            ></div>

            {/* Middle Droppable Area */}
            <div
                className={`middle-droppable-area ${
                    !hasAChord || (hasAChord && !hasTwoChords) ? "droppable-visible" : ""
                } ${isLocalDragging ? "move-up" : ""}`}
                style={{ pointerEvents: isOverMiddle ? 'auto' : 'none' }} // Conditional pointer-events
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsOverMiddle(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setIsOverMiddle(false);
                }}
                onDrop={(e) => {
                    // Handle drop logic
                }}
            ></div>

            {/* Right Droppable Area */}
            <div
                className={`right-droppable-area ${hasAChord ? "droppable-visible" : ""} ${
                    isLocalDragging ? "move-up" : ""
                }`}
                style={{ pointerEvents: isOverRight ? 'auto' : 'none' }} // Conditional pointer-events
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsOverRight(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setIsOverRight(false);
                }}
                onDrop={(e) => {
                    // Handle drop logic
                }}
            ></div>

            {/* HIGHLIGHTS AREAS */}
            <div className={`left-highlight ${isOverLeft ? 'highlight-visible' : ''}`}></div>
            <div className={`middle-highlight ${isOverMiddle ? 'highlight-visible' : ''}`}></div>
            <div className={`right-highlight ${isOverRight ? 'highlight-visible' : ''}`}></div>
            
            
            {/* DRAGGABLE AREAS */}
            <div
                className={`left-draggable-area ${hasTwoChords ? "draggable-visible" : ""} `}
                draggable={true}
                onDragStart={(e) => {
                    console.log("left-draggable-area is dragging!")
                    console.log("isLocalDragging: " , isLocalDragging)
                    setIsLocalDragging(true); // Set dragging state
                }}
                onDragEnd={(e) => {
                    setIsLocalDragging(false); // Reset dragging state
                }}
            >left</div>

            <div
                className={`middle-draggable-area ${hasAChord && !hasTwoChords ? "draggable-visible" : ""}`}
                draggable={true}
                onDragStart={(e) => {
                    console.log("middle-draggable-area is dragging!")
                    
                    setIsLocalDragging(true);
                    console.log("isLocalDragging: " , isLocalDragging)
                }}
                onDragEnd={(e) => {
                    console.log("Stopped dragging")
                   
                    setIsLocalDragging(false);
   
                }}
            >middle</div>

            <div
                className={`right-draggable-area ${hasTwoChords ? "draggable-visible" : ""}`}
                draggable={true}

                onDragStart={(e) => {
                    console.log("right-draggable-area is dragging!")
                   
                    setIsLocalDragging(true);
                    console.log("Stopped dragging")
                    console.log("isLocalDragging: " , isLocalDragging)
                }}

                onDragEnd={(e) => {
                    setIsLocalDragging(false);
                    console.log("Stopped dragging")
                    
                }}
            >right</div>
        </div>

    );
}


export default Bar;


/*
CSS:



.left-droppable-area, .middle-droppable-area, .right-droppable-area {
    flex: 0;
    height: 100%;
    transition: flex 0.2s ease-in-out;
    z-index: 1;
  }
  
  .droppable-visible {
    flex: 1; 
  }
  
  .move-up {
    z-index: 3;
    pointer-events: none;
  }
  
  
  .left-draggable-area, .middle-draggable-area, .right-draggable-area {
    position: absolute;
    top: 0;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    user-select: none;
    
    z-index: 2;
  }
  
  .draggable-visible {
    display: flex;
    pointer-events: auto;
  }
  
  .left-draggable-area {
    left: 0;
    width: 50%;
  }
  
  .middle-draggable-area {
    left: 0;
    width: 100%;
  }
  
  .right-draggable-area {
    right: 0;
    width: 50%;
  }
  
  
  
  .left-highlight, .middle-highlight, .right-highlight {
    position: absolute;
    top: 0;
    width: 33.3%;
    height: 100%;
    background-color: #646cff;
    opacity: 0;
    pointer-events: none; 
    transition: opacity 0.5s ease-in-out;
  }
  
  .left-highlight {
    left: 0;
    width: 50%;
  }
  
  .middle-highlight {
    left: 0;
    width: 100%; 
  }
  
  .right-highlight {
    right: 0;
    width: 50%; 
  }
  
  .highlight-visible {
    opacity: 1;
  }










*/








































/*

                    const type = e.dataTransfer.getData("type");

                    if (type == "chordBox") {

                        const chordIndexFrom = Number(e.dataTransfer.getData("chordIndex"));

                        chordDropHandler(chordIndexFrom, barIndex);

                    } else if (type == "bar") {

                        const barIndexFrom = Number(e.dataTransfer.getData("barIndex"));
                        const barLabelFrom = e.dataTransfer.getData("barLabel");

                        barDropHandler(barIndexFrom, barLabelFrom, barIndex)
                    }

                    setHasLeftChord(true)
                    setIsOverLeft(false)

*/









/*


            
            
            onDragStart={(e) => {

                e.dataTransfer.setData("type", "bar");
                e.dataTransfer.setData("barIndex", barIndex);
                e.dataTransfer.setData("barLabel", barLabels[0]);
                e.dataTransfer.setData("positionFrom", "left");
                isDragging(true);
            }}


*/





/*

   className={`bar ${isOver ? "over" : ""}`}

            draggable={hasChord && !isPlaying}

            onDragStart={(e) => {

                e.dataTransfer.setData("type", "bar");
                e.dataTransfer.setData("barIndex", index);
                e.dataTransfer.setData("barLabel", barLabel);
                isDragging(true);

            }}

            onDragEnd={(e) => {

                isDragging(false);
            }}


            onDragOver={(e) => {

                e.preventDefault()
                setIsOver(true)
            }}

            onDragLeave={(e) => {

                e.preventDefault()
                setIsOver(false)
            }}

            onDrop={(e) => {

                const type = e.dataTransfer.getData("type");

                if (type == "chordBox") {

                    const chordIndexFrom = Number(e.dataTransfer.getData("chordIndex"));

                    chordDropHandler(chordIndexFrom, index);

                } else if (type == "bar") {

                    const barIndexFrom = Number(e.dataTransfer.getData("barIndex"));
                    const barLabelFrom = e.dataTransfer.getData("barLabel");

                    barDropHandler(barIndexFrom, barLabelFrom, index)
                }

                //setHasChord(true)

                setIsOver(false)
            }}
*/