
import PlayStopButton from './PlayStopButton/PlayStopButton';
import TempoSlider from './TempoSlider/TempoSlider';
import Muters from './Muters/Muters';
import ChangeHarmonicPosition from './ChangeHarmonicPosition/ChangeHarmonicPosition'

import styles from './PlayerControls.module.css'

function PlayerControls({ controller, isPlaying, setIsPlaying }) {

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
        </div>
    );
}

export default PlayerControls;