// PlayButton.jsx
import React from 'react';

function AddBarButton({ controller, setNumOfBars }) {
  const handlePlayClick = () => {
    controller.addBar();
    setNumOfBars(controller.getNumOfBars())
  };

  return (
    <button className="add-bar-button" onClick={handlePlayClick}>
      Add Bar
    </button>
  );
}

export default AddBarButton;