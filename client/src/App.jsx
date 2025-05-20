// App.jsx
import React, { useState, useRef, useEffect } from "react";
import AppController from "./lib/AppController.js";
import AuthBar from "./components/Auth/AuthBar";
import LoginForm from "./components/Login/LoginForm";
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

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [tracks, setTracks] = useState([]);

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

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://backing-track-creator.onrender.com/api/track/fetch", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load saved tracks");

        const data = await res.json();
        setTracks(data);
      } catch (err) {
        console.error("Error fetching tracks:", err.message);
      }
    };

    if (token && token !== "guest") fetchTracks();
  }, [token]);

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  return (
    <div className="app">
      <AuthBar token={token} setToken={setToken} />
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
            tempo={tempo}
            style={style}
            drums={drums}
            bass={bass}
            tracks={tracks}
            setTracks={setTracks}
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
            tempo={tempo}
            setTempo={setTempo}
            style={style}
            setStyle={setStyle}
            drums={drums}
            setDrums={setDrums}
            bass={bass}
            setBass={setBass}
            barLabels={barLabels}
            setBarLabels={setBarLabels}
            setBarsHaveChord={setBarsHaveChord}
            setBarsHaveTwoChords={setBarsHaveTwoChords}
            tracks={tracks}
            setTracks={setTracks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;