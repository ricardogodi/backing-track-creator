import React, { useState, useRef } from "react";
import AppController from "./lib/AppController.js";
import TonicSelectionPanel from "./TonicSelectionPanel";
import PlayButton from "./PlayButton.jsx";
import StopButton from "./StopButton.jsx";
import ScaleTypeSelectionPanel from "./ScaleTypeSelectionPanel.jsx";
import ChordTypeSelectionPanel from "./ChordTypeSelectionPanel.jsx"
import ChordBoxList from "./ChordBoxList.jsx";
import Bars from "./Bars.jsx";
import TempoSlider from "./TempoSlider.jsx";
import Muters from "./Muters.jsx"
import ChangeHarmonicPosition from "./ChangeHarmonicPosition.jsx";
import StyleSelector from "./StyleSelector.jsx";
import AddBarButton from "./AddBarButton.jsx";
import PlayerControls from "./PlayerControls.jsx";
import PlayStopButton from "./PlayStopButton.jsx";

import "./App.css";

function App() {

    const appController = useRef(null);

    if (!appController.current) {
        appController.current = new AppController();
    }
    
    const [chords, setChords] = useState(appController.current.getFullChordNames());
    const [isPlaying, setIsPlaying] = useState(false);
    const [chordIsDragging, setChordIsDragging] = useState(false)

    const [numOfBars, setNumOfBars] = useState(4)

    return (

        <div className="app">

            <h1>Backing Track Creator</h1>

            <div className="main-content">

                <div className="left-panel">

                    <TonicSelectionPanel
                        controller={appController.current}
                        setChords={setChords}
                        isPlaying={isPlaying}
                    />

                    <ScaleTypeSelectionPanel

                        controller={appController.current}
                        setChords={setChords}
                        isPlaying={isPlaying}
                    />

                    <ChordTypeSelectionPanel
                        controller={appController.current}
                        setChords={setChords}
                        isPlaying={isPlaying}
                    />

                </div>

                <div className="middle-content">

                    <ChordBoxList
                        chordList={chords}
                        isPlaying={isPlaying}
                        setChordIsDragging={setChordIsDragging}

                    />

                    <Bars
                        controller={appController.current}
                        isPlaying={isPlaying}
                        numOfBars={numOfBars}
                        setChordIsDragging={setChordIsDragging}
                        chordIsDragging={chordIsDragging}
                    />

                    <StyleSelector
                        controller={appController.current}
                        isPlaying={isPlaying}
                    />

                </div>

                <div className="right-panel">

                    <PlayerControls
                        controller={appController.current}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />

                    <TempoSlider
                        controller={appController.current}
                        isPlaying={isPlaying}
                    />

                    <Muters
                        controller={appController.current}
                    />

                    <ChangeHarmonicPosition
                        controller={appController.current}
                        isPlaying={isPlaying}
                    />

                </div>
            </div>
        </div>
    );
}

export default App;