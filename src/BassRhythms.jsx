import BassButton from './BassButton.jsx';
import { useState } from 'react'

function BassRhythms({ bassPressedIndex, setBassPressedIndex, bassList, handleBassSelection }) {

    let list = []
    for (let i = 0; i < bassList.length; i++) {
        list.push(
            <BassButton
                key={i}
                index={i}
                label={bassList[i]}
                bassPressedIndex={bassPressedIndex}
                handleBassSelection={handleBassSelection}
                setBassPressedIndex={setBassPressedIndex}
            />
        );
    }

    return (
        <div className='bass-rhythms-container'>
            {list}
        </div> 
    );
}

export default BassRhythms;





