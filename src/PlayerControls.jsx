
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import PlayStopButton from './PlayStopButton';

function PlayerControls({ controller, isPlaying, setIsPlaying }) {

    return (

        <div className="player-controls">
           
        <PlayStopButton
        
        controller={controller}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}


        
        />


        </div>
    );
}

export default PlayerControls;