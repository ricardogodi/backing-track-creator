
import styles from './ScaleTypeButton.module.css'

function ScaleTypeButton({ index, pressedIndex, setPressedIndex, controller, setChords, label }) {

    const handleButtonClick = () => {
        controller.setScaleType(label.toLowerCase());
        setChords(controller.getFullChordNames());
        setPressedIndex(index)
    };

    return (
        <button className={`${styles.scaleTypeButton} ${pressedIndex == index ? 'pressed' : ""}`}
            onClick={handleButtonClick}
        >
            {label}
        </button>
    );
}

export default ScaleTypeButton;