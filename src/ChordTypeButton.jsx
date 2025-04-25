function ChordTypeButton({ index, pressedIndex, setPressedIndex, controller, setChords, label }) {

    const handleButtonClick = () => {
        setPressedIndex(index)
        controller.setChordsType(label.toLowerCase());
        setChords(controller.getFullChordNames());
    };

    return (
        <button className={`chord-type-button ${pressedIndex == index ? "pressed" : ""}`}
            onClick={handleButtonClick}
        >
            {label}
        </button>
    );
}

export default ChordTypeButton;