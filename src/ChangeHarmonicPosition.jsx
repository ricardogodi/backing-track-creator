

function ChangeHarmonicPosition({ controller, isPlaying }) {

    const handleClick = () => { 
        controller.changeInitialHarmonicPosition()
    }

    return (
        <div className={`change-harm-pos ${isPlaying ? "disabled" : ""}`} >
            <button className="change-harmonic-position-button"
                onClick={handleClick}
             
            >
                Change Harmonic Position
            </button>

        </div>
    )
}

export default ChangeHarmonicPosition;