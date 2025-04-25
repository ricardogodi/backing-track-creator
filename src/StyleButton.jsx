function StyleButton({ label, handleStyleSelection, pressedIndex, setPressedIndex, index }) {

    return (
        <button
            className={`style-button ${pressedIndex == index ? "pressed" : ""}`}
            onClick={() => {
                handleStyleSelection(label)
                setPressedIndex(index)
            }}>
            {label}
        </button>
    )
}

export default StyleButton