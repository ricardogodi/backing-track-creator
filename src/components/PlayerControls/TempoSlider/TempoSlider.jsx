import React, { useState } from 'react';

import styles from "./TempoSlider.module.css"

function TempoSlider({ controller, isPlaying }) {
    // State to store the value of the slider
    const [sliderValue, setSliderValue] = useState(120); // Initial value of the slider is 50

    // Handle slider value change
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    // Handle slider value commit (when the user releases the slider)
    const handleSliderEnd = (e) => {
        controller.changeTempo(e.target.value);
    };

    return (    
       /* <div className = {`tempo-slider-container ${isPlaying ? "disabled" : ""}`}>*/
       <div className = "tempoSliderContainer">
            <h3>Tempo: {sliderValue}</h3>
            <input
                type = "range"
                min = "20"
                max = "200"
                value = {sliderValue}
                onChange = {handleSliderChange} // Updates the state as the slider is moved
                onMouseUp = {handleSliderEnd}   // Calls changeTempo when the user stops sliding (mouse)
                onTouchEnd = {handleSliderEnd}  // Calls changeTempo when the user stops sliding (touch devices)
                step = "1"
                style = {{ width: '100%' }}
                disabled={isPlaying}
            />
        </div>
    );
}

export default TempoSlider;