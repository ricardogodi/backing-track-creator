function StyleButton({ label, handleStyleSelection, isPressed }) {
  return (
    <button
      className={`style-button ${isPressed ? "pressed" : ""}`}
      onClick={() => handleStyleSelection(label)}
    >
      {label}
    </button>
  );
}

export default StyleButton;