import React, { useState } from 'react';
import Bar from './Bar.jsx';

function Bars({numOfBars, controller, isPlaying, chordIsDragging, setChordIsDragging }) {

    const positionMap = () => ({
        left: "",
        middle: "",
        right: ""
      });

     // const [numOfBars, setNumOfBars] = useState(4);
      const [barLabels, setBarLabels] = useState(
        Array.from({ length: numOfBars }, () => ({ ...positionMap() }))
      );

    const [barsHaveChord, setBarsHaveChord] = useState([false, false, false, false]);
    const [barsHaveTwoChords, setBarsHaveTwoChords] = useState([false, false, false, false]);
    const [barIsDragging, setBarIsDragging] = useState(false);
    const [isOverDropZone, setBarIsOverDropZone] = useState(false);

    const handleChordDrop = (chordBoxIndex, barIndex, positionTo) => {
        const chordBoxLabel = controller.getFullChordAtIndex(chordBoxIndex);
        const newLabels = {...barLabels};
        const newBarsHaveChord = [...barsHaveChord];
        const newBarsHaveTwoChords = [...barsHaveTwoChords];
        const bar = newLabels[barIndex];
        const newBar = {...bar}

        newLabels[barIndex] = newBar

        // Now we manage Bars component state
        if (!barsHaveChord[barIndex]) {  // Does not have a chord
            newBar["middle"] = chordBoxLabel;
            newBarsHaveChord[barIndex] = true;
        } else if (barsHaveChord[barIndex] && !barsHaveTwoChords[barIndex]) { // Has one chord exactly
            // We know the current chord in the bar is in the middle

            if (positionTo == "left") {
                newBar["left"] = chordBoxLabel; 
                newBar["right"] = newBar["middle"]
                newBar["middle"] = ""
                newBarsHaveTwoChords[barIndex] = true;
            } else if (positionTo == "middle") {
                newBar["middle"] = chordBoxLabel;
            } else if (positionTo == "right") {
                newBar["right"] = chordBoxLabel;
                newBar["left"] = newBar["middle"]
                newBar["middle"] = ""
                newBarsHaveTwoChords[barIndex] = true;
            }

        } else if (barsHaveTwoChords[barIndex]) {  // Has two chords
            if (positionTo == "left") {
                newBar["left"] = chordBoxLabel
            } else if (positionTo == "right") {
                newBar["right"] = chordBoxLabel
            }
        }
        setChordIsDragging(false)
        setBarLabels(newLabels);
        setBarsHaveChord(newBarsHaveChord);
        setBarsHaveTwoChords(newBarsHaveTwoChords);
        controller.setChord(chordBoxIndex, barIndex, positionTo);
    }

    const handleBarDrop = (barIndexFrom, barIndexTo, positionFrom, positionTo) => {
        if ((barIndexFrom == barIndexTo) && (positionFrom == positionTo)) {
            return;
        }

        const barFrom = barLabels[barIndexFrom];
        const barTo = barLabels[barIndexTo];

        const chordFrom = barFrom[positionFrom]
        const chordTo = barTo[positionTo]

        if (barsHaveChord[barIndexFrom] && !barsHaveTwoChords[barIndexFrom]) { // Bar from has exactly one chord
            if (!barsHaveChord[barIndexTo]) { // Bar to does not have a chord
                barTo[positionTo] = chordFrom;
                barFrom[positionFrom] = "";
                barsHaveChord[barIndexTo] = true;
                barsHaveChord[barIndexFrom] = false;
            } else if (barsHaveChord[barIndexTo] && !barsHaveTwoChords[barIndexTo]) { // Bar to has exactly one chord
                if (positionTo == "middle") { // We just switch the middle chords
                    barTo["middle"] = chordFrom;
                    barFrom[positionFrom] = chordTo;
                } else if (positionTo == "left") { 
                    barTo["left"] = chordFrom;
                    barTo["right"] = barTo["middle"] // Must move the middle chord to the right
                    barTo["middle"] = "";

                    barFrom[positionFrom] = ""
                
                    barsHaveChord[barIndexFrom] = false; 
                    barsHaveTwoChords[barIndexTo] = true;

                } else if (positionTo == "right") {
                    barTo["right"] = chordFrom;
                    barTo["left"] = barTo["middle"];  // Must move the middle chord to the left
                    barTo["middle"] = "";

                    barFrom[positionFrom] = ""
                    
                    barsHaveChord[barIndexFrom] = false; 
                    barsHaveTwoChords[barIndexTo] = true;
                }

            } else if (barsHaveTwoChords[barIndexTo]) { // Bar to has two chords 
                barTo[positionTo] = chordFrom;
                barFrom[positionFrom] = chordTo;      
            }

        } else if (barsHaveTwoChords[barIndexFrom]) { // Bar from has two chords
            if (!barsHaveChord[barIndexTo]) { // Bar to does not have a chord
                barTo[positionTo] = chordFrom;
                barFrom[positionFrom] = "";
                if (positionFrom == "left") {
                    barFrom["middle"] = barFrom["right"]
                    barFrom["right"] = ""
                } else if (positionFrom == "right") {
                    barFrom["middle"] = barFrom["left"]
                    barFrom["left"] = ""
                }
                barsHaveChord[barIndexTo] = true;
                barsHaveTwoChords[barIndexFrom] = false;
            } else if (barsHaveChord[barIndexTo] && !barsHaveTwoChords[barIndexTo]) { // Bar to has exactly one chord
                if (positionTo == "middle") { 
                    barTo["middle"] = chordFrom;
                    barFrom[positionFrom] = chordTo;
                } else if (positionTo == "left") { 
                    barTo["left"] = chordFrom;
                    barTo["right"] = barTo["middle"]
                    barTo["middle"] = ""
    
                    if (positionFrom == "left") {

                        barFrom["left"] = ""
                        barFrom["middle"] = barFrom["right"]
                        barFrom["right"] = "";

                    } else if (positionFrom == "right") {

                        barFrom["right"] = ""
                        barFrom["middle"] = barFrom["left"]
                        barFrom["left"] = "";
                    }

                    barsHaveTwoChords[barIndexTo] = true;
                    barsHaveTwoChords[barIndexFrom] = false;

                } else if (positionTo == "right") {

                    barTo["right"] = chordFrom;
                    barTo["left"] = barTo["middle"]
                    barTo["middle"] = ""
                    
                    if (positionFrom == "left") {

                        barFrom["left"] = ""
                        barFrom["middle"] = barFrom["right"]
                        barFrom["right"] = "";

                    } else if (positionFrom == "right") {

                        barFrom["right"] = ""
                        barFrom["middle"] = barFrom["left"]
                        barFrom["left"] = "";
                    }

                    barsHaveTwoChords[barIndexTo] = true;
                    barsHaveTwoChords[barIndexFrom] = false;
                }

            } else if (barsHaveTwoChords[barIndexTo]) { // Bar to has two chords 

               barTo[positionTo] = chordFrom;
               barFrom[positionFrom] = chordTo;
            }
        }

        const newBarLabels =  {...barLabels};
        const newBarsHaveChord = [...barsHaveChord];
        const newBarsHaveTwoChords = [...barsHaveTwoChords];

        setBarIsDragging(false)
        setBarLabels(newBarLabels);
        setBarsHaveChord(newBarsHaveChord);
        setBarsHaveTwoChords(newBarsHaveTwoChords);

        controller.moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo)
    }
    
    const handleBarRemove = (barIndexFrom, positionFrom) => {
       const barFrom = barLabels[barIndexFrom];

        if (positionFrom == "left") { 
            barFrom["middle"] = barFrom["right"];
            barFrom["left"] = "";
            barFrom["right"] = "";

            barsHaveTwoChords[barIndexFrom] = false;

        } else if (positionFrom == "middle") {

            barFrom["middle"] = ""
            barsHaveChord[barIndexFrom] = false;

        } else if (positionFrom == "right") {

            barFrom["middle"] = barFrom["left"];
            barFrom["left"] = "";
            barFrom["right"] = "";

            barsHaveTwoChords[barIndexFrom] = false;
        }

        const newLabels = {...barLabels}
        const newBarsHaveChord = [...barsHaveChord];
        const newBarsHaveTwoChords = [...barsHaveTwoChords]

        setBarLabels(newLabels);
        setBarsHaveChord(newBarsHaveChord)
        setBarsHaveTwoChords(newBarsHaveTwoChords)
        setBarIsDragging(false)   

        controller.removeChord(barIndexFrom, positionFrom)
    }

    let bars = []
    for (let i = 0; i < numOfBars; i++) {
        console.log(`numOfBars now is: ${numOfBars}`)
        bars.push(
            <Bar
                key={i}

                barIndex={i}
                barLabels={barLabels[i]} 
                barDropHandler={handleBarDrop}
                chordDropHandler={handleChordDrop}

                setBarIsDragging={setBarIsDragging}
                barIsDragging={barIsDragging}

                setChordIsDragging={setChordIsDragging}
                chordIsDragging={chordIsDragging}

                hasAChord={barsHaveChord[i]}
                hasTwoChords={barsHaveTwoChords[i]}

                isPlaying={isPlaying}
            />
        );
    }

    return (
        <div className='bars-and-drop-zone-container'>
            <div className={`drop-zone-wrapper ${(barIsDragging) ? "dragging" : ""}`}
                  //barIsDragging
            >   
                <div className={`drop-zone ${(barIsDragging) ? "dragging" : ""} ${(isOverDropZone) ? "over" : ""}`}
                  
                    onDragOver={(e) => {
                        e.preventDefault()
                        setBarIsOverDropZone(true)
                    }}

                    onDragLeave={(e) => {
                        e.preventDefault()
                        setBarIsOverDropZone(false)
                    }}

                    onDrop={(e) => {
                        const type = e.dataTransfer.getData("type")
                        if (type == "bar") {
                            e.preventDefault();
                            const barIndexFrom = Number(e.dataTransfer.getData("barIndex"));
                            const positionFrom = e.dataTransfer.getData("positionFrom");
                            handleBarRemove(barIndexFrom, positionFrom);
                            setBarIsDragging(false);
                            setBarIsOverDropZone(false)
                        }
                    }}
                >
                    <div className='text'>Drop Chord to Delete</div>
                </div>
            </div>
            <div className="bars-container">

{bars}

</div>
        </div>
    );
}

export default Bars;
