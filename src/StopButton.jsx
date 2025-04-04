// PlayButton.jsx
import React from 'react';

function StopButton({ controller, setIsPlaying }) {
  
  const handlePlayClick = () => {
    setIsPlaying(false)
    controller.stop();
  };

  return (
    <button className="stop-button" onClick={handlePlayClick}>
      Stop
    </button>
  );
}

export default StopButton;