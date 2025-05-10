import styles from './TonicButton.module.css'

function TonicButton({ controller, setChords, label, index, pressedIndex, setPressedIndex }) {
    const handleButtonClick = () => {
        controller.setTonic(label);
        setChords(controller.getFullChordNames());
        setPressedIndex(index); // Update pressed button state
    };

    return (
        <button
            className={`${styles.tonicButton} ${pressedIndex === index ? "pressed" : ""}`}
            onClick={handleButtonClick}
        >
            {label}
        </button>
    );
}

export default TonicButton;