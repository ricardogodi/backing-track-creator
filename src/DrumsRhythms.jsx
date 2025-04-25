import DrumsButton from './DrumsButton.jsx';
import { useState } from 'react'

function DrumsRhythms({drumsPressedIndex, setDrumsPressedIndex, drumsList, handleDrumsSelection }) {

    let list = []
    for (let i = 0; i < drumsList.length; i++) {
        list.push(
            <DrumsButton
                key={i}
                index={i}
                label={drumsList[i]}
                drumsPressedIndex={drumsPressedIndex}
                handleDrumsSelection={handleDrumsSelection}
                setDrumsPressedIndex={setDrumsPressedIndex}
            />
        );
    }

    return (
        <div className='drums-rhythms-container'>
            {list}
        </div>
    );
}

export default DrumsRhythms;
