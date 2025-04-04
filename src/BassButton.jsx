function BassButton({bassPressedIndex, index, label, setBassPressedIndex, handleBassSelection }) {
    return (

        <div

        className={`bass-button ${bassPressedIndex == index ? "pressed" : ""}`}

            onClick={() => {
                
                handleBassSelection(label)
                setBassPressedIndex(index)
            }}>

            {label}

        </div>
    )
}

export default BassButton