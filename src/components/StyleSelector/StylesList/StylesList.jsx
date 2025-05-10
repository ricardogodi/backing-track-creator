import StyleButton from './StyleButton/StyleButton';
import {useState} from 'react'

import styles from './StylesList.module.css'

function StylesList({controller, handleStyleSelection }) {

    const musicStyles = controller.getAllStyles();
    const [pressedIndex, setPressedIndex] = useState(0)

    let stylesList = []
    for (let i = 0; i < musicStyles.length; i++) {
        stylesList.push(
            <StyleButton
                key={i}
                index={i}
                label={musicStyles[i]}
                handleStyleSelection={handleStyleSelection}
                pressedIndex={pressedIndex}
                setPressedIndex={setPressedIndex}
            />
        );
    }

    return (
        <div className={styles.stylesListContainer} >
            {stylesList}
        </div>
    );
}

export default StylesList;