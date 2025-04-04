import React from "react";
import { FaPlay, FaStop } from "react-icons/fa";

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
        <button className="play-stop-button" onClick={handleClick}>
            {isPlaying ? <FaStop className="stop-button"/> : <FaPlay className="play-button"/>}
        </button>
    );
}

export default PlayStopButton;