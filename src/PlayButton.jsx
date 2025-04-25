// PlayButton.jsx
import React from 'react';

function PlayButton({ controller, setIsPlaying }) {

  const handlePlayClick = () => {
    controller.play();
    setIsPlaying(true)
  };

  return (
    <button className="play-button" onClick={handlePlayClick}>
      Play
    </button>
  );
}

export default PlayButton;