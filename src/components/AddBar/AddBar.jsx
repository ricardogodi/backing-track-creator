// src/components/AddBar/AddBar.jsx
import React from "react";
import styles from "./AddBar.module.css";

function AddBar({ controller, setNumOfBars }) {
  const handleClick = () => {
    controller.addBar();
    setNumOfBars(controller.getNumOfBars());
  };

  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.addBarButton} onClick={handleClick}>
        + Add Bar
      </button>
    </div>
  );
}

export default AddBar;