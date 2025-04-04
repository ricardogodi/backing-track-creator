function ScaleTypeButton({ index, pressedIndex, setPressedIndex, controller, setChords, label }) {

    const handleButtonClick = () => {

        controller.setScaleType(label.toLowerCase());
        setChords(controller.getFullChordNames());
        setPressedIndex(index)
    };

    return (
        <button className={`scale-type-button ${pressedIndex == index ? "pressed" : ""}`}

            onClick={handleButtonClick}

        >
            {label}
        </button>
    );
}

export default ScaleTypeButton;