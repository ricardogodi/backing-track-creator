import StyleButton from './StyleButton/StyleButton';
import styles from './StylesList.module.css';

function StylesList({ controller, handleStyleSelection, currentStyle }) {
  const musicStyles = controller.getAllStyles();

  return (
    <div className={styles.stylesListContainer}>
      {musicStyles.map((label, i) => (
        <StyleButton
          key={i}
          index={i}
          label={label}
          handleStyleSelection={handleStyleSelection}
          isPressed={label === currentStyle}
        />
      ))}
    </div>
  );
}

export default StylesList;