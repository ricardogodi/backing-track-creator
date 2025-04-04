import StylesList from './StylesList.jsx';
import BassRhythms from './BassRhythms.jsx';
import DrumsRhythms from './DrumsRhythms.jsx';

import { useState } from "react";

function StyleSelector({ controller }) {


    const [styleSelection, setStyleSelection] = useState("Rock")
    const [drumsList, setDrumsList] = useState(controller.getDrumsListByStyle(styleSelection))
    const [bassList, setBassList] = useState(controller.getBassListByStyle(styleSelection))
    const [drumsSelection, setDrumsSelection] = useState("")
    const [bassSelection, setBassSelection] = useState("")

    const [drumsPressedIndex, setDrumsPressedIndex] = useState(0)
    const [bassPressedIndex, setBassPressedIndex] = useState(0)



    const handleStyleSelection = (styleLabel) => {

        console.log("Changing style to: ", styleLabel)

        setStyleSelection(styleLabel)

        const drumsPerStyle = controller.getDrumsListByStyle(styleLabel)
        setDrumsList(drumsPerStyle)

        const bassPerStyle = controller.getBassListByStyle(styleLabel)
        setBassList(bassPerStyle)

        controller.setDrums(styleLabel, drumsPerStyle[0]);
        controller.setBass(styleLabel, bassPerStyle[0]);

        setDrumsPressedIndex(0)
        setBassPressedIndex(0)


    }

    const handleBassSelection = (bassLabel) => {

        setBassSelection(bassLabel)
        controller.setBass(styleSelection, bassLabel)
    };

    const handleDrumsSelection = (drumsLabel) => {

        setDrumsSelection(drumsLabel)
        controller.setDrums(styleSelection, drumsLabel)
    };

    return (
        <div className='style-selector-container'>

            <StylesList

                controller={controller}
                handleStyleSelection={handleStyleSelection}
            />

            <div className='rhythms-container'>

                <DrumsRhythms

                    drumsList={drumsList}
                    drumsPressedIndex={drumsPressedIndex}
                    setDrumsPressedIndex={setDrumsPressedIndex}
                    handleDrumsSelection={handleDrumsSelection}
                />

                <BassRhythms

                    bassList={bassList}
                    handleBassSelection={handleBassSelection}
                    setBassPressedIndex={setBassPressedIndex}
                    bassPressedIndex={bassPressedIndex}
                />
                
            </div>
        </div>
    )
}

export default StyleSelector;