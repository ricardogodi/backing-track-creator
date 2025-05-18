import PlayStopButton from './PlayStopButton/PlayStopButton';
import TempoSlider from './TempoSlider/TempoSlider';
import Muters from './Muters/Muters';
import ChangeHarmonicPosition from './ChangeHarmonicPosition/ChangeHarmonicPosition';
import LoadButton from './LoadButton/LoadButton';

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
      <ChangeHarmonicPosition
        controller={controller}
        isPlaying={isPlaying}
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