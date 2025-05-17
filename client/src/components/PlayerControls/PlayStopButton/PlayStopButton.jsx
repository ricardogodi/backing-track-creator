import React from "react";
import { FaPlay, FaStop } from "react-icons/fa";

import styles from './PlayStopButton.module.css'

function PlayStopButton({ controller, isPlaying, setIsPlaying }) {

    const handleClick = () => {
        if (isPlaying) {
            controller.stop();
            setIsPlaying(false);
        } else {
            controller.play();
            setIsPlaying(true);
        }
    };

    return (
        <button className={styles.playStopButton} onClick={handleClick}>
            {isPlaying ? <FaStop className={styles.stopButton}/> : <FaPlay className={styles.playButton}/>}
        </button>
    );
}

export default PlayStopButton;