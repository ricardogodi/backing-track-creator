import PlayStopButton from './PlayStopButton/PlayStopButton';
import TempoSlider from './TempoSlider/TempoSlider';
import Muters from './Muters/Muters';
import ChangeHarmonicPosition from './ChangeHarmonicPosition/ChangeHarmonicPosition';
import LoadButton from './LoadButton/LoadButton';
import ResetButton from './ResetButton/ResetButton';
import styles from './PlayerControls.module.css';

function PlayerControls({
  controller,
  isPlaying,
  setIsPlaying,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords
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
      />
      <Muters
        controller={controller}
      />
      <ChangeHarmonicPosition
        controller={controller}
        isPlaying={isPlaying}
      />
      <LoadButton
        controller={controller}
        setBarLabels={setBarLabels}
        setBarsHaveChord={setBarsHaveChord}
        setBarsHaveTwoChords={setBarsHaveTwoChords}
      />
      <ResetButton
  controller={controller}
  setBarLabels={setBarLabels}
  setBarsHaveChord={setBarsHaveChord}
  setBarsHaveTwoChords={setBarsHaveTwoChords}
/>
    </div>
  );
}

export default PlayerControls;