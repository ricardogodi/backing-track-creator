import React, { useState, useRef } from "react";
import AppController from "./lib/AppController.js";

import TonicSelectionPanel from "./components/TonicSelectionPanel/TonicSelectionPanel";
import ScaleTypeSelectionPanel from "./components/ScaleTypeSelectionPanel/ScaleTypeSelectionPanel";
import ChordTypeSelectionPanel from "./components/ChordTypeSelectionPanel/ChordTypeSelectionPanel";
import ChordBoxList from "./components/ChordBoxList/ChordBoxList";
import Bars from "./components/Bars/Bars";
import StyleSelector from "./components/StyleSelector/StyleSelector";
import PlayerControls from "./components/PlayerControls/PlayerControls";

import "./App.css";

function App() {
  const appController = useRef(null);
  if (!appController.current) {
    appController.current = new AppController();
  }

  const positionMap = () => ({ left: "", middle: "", right: "" });

  const [barLabels, setBarLabels] = useState(
    Array.from({ length: 4 }, () => ({ ...positionMap() }))
  );
  const [barsHaveChord, setBarsHaveChord] = useState([false, false, false, false]);
  const [barsHaveTwoChords, setBarsHaveTwoChords] = useState([false, false, false, false]);
  const [chords, setChords] = useState(appController.current.getFullChordNames());
  const [isPlaying, setIsPlaying] = useState(false);
  const [chordIsDragging, setChordIsDragging] = useState(false);
  const [style, setStyle] = useState("Rock");
  const [drums, setDrums] = useState(appController.current.getDrumsListByStyle("Rock")[0]);
  const [bass, setBass] = useState(appController.current.getBassListByStyle("Rock")[0]);
  const [tempo, setTempo] = useState(120);

  return (
    <div className="app">
      <h1>Backing Track Creator</h1>
      <div className="mainContent">
        <div className="leftPanel">
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

        <div className="middleContent">
          <ChordBoxList
            chordList={chords}
            isPlaying={isPlaying}
            setChordIsDragging={setChordIsDragging}
          />
          <Bars
            controller={appController.current}
            isPlaying={isPlaying}
            setChordIsDragging={setChordIsDragging}
            chordIsDragging={chordIsDragging}
            barLabels={barLabels}
            setBarLabels={setBarLabels}
            barsHaveChord={barsHaveChord}
            setBarsHaveChord={setBarsHaveChord}
            barsHaveTwoChords={barsHaveTwoChords}
            setBarsHaveTwoChords={setBarsHaveTwoChords}
          />

          <StyleSelector
            controller={appController.current}
            isPlaying={isPlaying}
            style={style}
            setStyle={setStyle}
            drums={drums}
            setDrums={setDrums}
            bass={bass}
            setBass={setBass}
          />
        </div>

        <div className="rightPanel">
          <PlayerControls
            controller={appController.current}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}

            setTempo={setTempo}
            tempo={tempo}
            setStyle={setStyle}
            style={style}
            setDrums={setDrums}
            drums={drums}
            setBass={setBass}
            bass={bass}
            barLabels={barLabels}
            setBarLabels={setBarLabels}
            setBarsHaveChord={setBarsHaveChord}
            setBarsHaveTwoChords={setBarsHaveTwoChords}
          />
        </div>
      </div>
    </div>
  );
}

export default App;