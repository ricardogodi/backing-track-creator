import StyleButton from './StyleButton.jsx';
import {useState} from 'react'

function StylesList({controller, handleStyleSelection }) {

    const styles = controller.getAllStyles();
    const [pressedIndex, setPressedIndex] = useState(0)

    let stylesList = []
    for (let i = 0; i < styles.length; i++) {
        stylesList.push(
            <StyleButton
                key={i}
                index={i}
                label={styles[i]}
                handleStyleSelection={handleStyleSelection}
                pressedIndex={pressedIndex}
                setPressedIndex={setPressedIndex}
            />
        );
    }

    return (
        <div className={'styles-list-container'} >
            {stylesList}
        </div>
    );
}

export default StylesList;