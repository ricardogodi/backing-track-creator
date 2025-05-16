import PlayStopButton from './PlayStopButton/PlayStopButton';
import TempoSlider from './TempoSlider/TempoSlider';
import Muters from './Muters/Muters';
import ChangeHarmonicPosition from './ChangeHarmonicPosition/ChangeHarmonicPosition';
import LoadButton from './LoadButton/LoadButton';
import ResetButton from './ResetButton/ResetButton';
import SaveTrackButton from './SaveTrackButton/SaveTrackButton';
import styles from './PlayerControls.module.css';

function PlayerControls({
  controller,
  isPlaying,
  setIsPlaying,
  tempo,
  setTempo,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords,
  style,
  setStyle,       // <- Add this
  drums,
  setDrums,       // <- Add this
  bass,
  setBass,        // <- Add this
  barLabels
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
      <LoadButton
        controller={controller}
        setBarLabels={setBarLabels}
        setBarsHaveChord={setBarsHaveChord}
        setBarsHaveTwoChords={setBarsHaveTwoChords}
        setTempo={setTempo}
        setStyle={setStyle}
        setDrums={setDrums}
        setBass={setBass}
      />
      <ResetButton
        controller={controller}
        setBarLabels={setBarLabels}
        setBarsHaveChord={setBarsHaveChord}
        setBarsHaveTwoChords={setBarsHaveTwoChords}
      />
      <SaveTrackButton
        barLabels={barLabels}
        tempo={tempo}
        style={style}
        drums={drums}
        bass={bass}
      />
    </div>
  );
}

export default PlayerControls;