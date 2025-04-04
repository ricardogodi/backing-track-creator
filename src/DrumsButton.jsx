function DrumsButton({ drumsPressedIndex, index, label, setDrumsPressedIndex, handleDrumsSelection }) {
    return (

        <div
            className={`drums-button ${drumsPressedIndex == index ? "pressed" : ""}`}

            onClick={() => {

                handleDrumsSelection(label);
                setDrumsPressedIndex(index)
            }}
        >
            {label}
        </div>
    )
}

export default DrumsButton