import PlayStopButton from './PlayStopButton/PlayStopButton';
import TempoSlider from './TempoSlider/TempoSlider';
import Muters from './Muters/Muters';
import HarmonicChange from './HarmonicChange/HarmonicChange';

import MyTracks from './MyTracks/MyTracks';

import styles from './PlayerControls.module.css';

function PlayerControls({
  controller,
  isPlaying,
  setIsPlaying,
  tempo,
  setTempo,
  style,
  setStyle,
  drums,
  setDrums,
  bass,
  setBass,
  barLabels,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords,
  tracks,
  setTracks
}) {
  return (
    <div className={styles.playerControls}>
      <PlayStopButton
        controller={controller}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <TempoSlider
        controller={controller}
        isPlaying={isPlaying}
        tempo={tempo}
        setTempo={setTempo}
      />
      <Muters controller={controller} />
      <HarmonicChange
        controller={controller}
        isPlaying={isPlaying}
        setBarLabels={setBarLabels}
        setBarsHaveChord={setBarsHaveChord}
        setBarsHaveTwoChords={setBarsHaveTwoChords}
      />
      <MyTracks
        controller={controller}
        setBarLabels={setBarLabels}
        setBarsHaveChord={setBarsHaveChord}
        setBarsHaveTwoChords={setBarsHaveTwoChords}
        setTempo={setTempo}
        isPlaying={isPlaying}
        setStyle={setStyle}
        setDrums={setDrums}
        setBass={setBass}
        tracks={tracks}
        setTracks={setTracks}
      />
    </div>
  );
}

export default PlayerControls;