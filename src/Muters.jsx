// PlayButton.jsx
import React from 'react';
import Muter from "./Muter.jsx"
import { useState } from 'react';

function Muters({ controller }) {

    const [pianoIsMuted, setPianoMuted] = useState(false)
    const [bassIsMuted, setBassMuted] = useState(false)
    const [drumsAreMuted, setDrumsMuted] = useState(false)
    const [labels, setLabels] = useState(["Mute Piano", "Mute Bass", "Mute Drums"])

    const handleMutePiano = () => {

        const newLabels = [...labels]

        if (!pianoIsMuted) {
            newLabels[0] = "Unmute Piano"
            controller.mutePiano(true);
            setPianoMuted(true)
        } else {
            newLabels[0] = "Mute Piano"
            controller.mutePiano(false);
            setPianoMuted(false)
        }
        setLabels(newLabels)
    };

  const handleMuteBass = () => {
        const newLabels = [...labels]
        if (!bassIsMuted) {
            newLabels[1] = "Unmute Bass"
            controller.muteBass(true);
            setBassMuted(true)
        } else {
            newLabels[1] = "Mute Bass"
            controller.muteBass(false);
            setBassMuted(false)
        }
        setLabels(newLabels)
    };

    const handleMuteDrums = () => {
        const newLabels = [...labels]
        if (!drumsAreMuted) {
            newLabels[2] = "Unmute Drums"
            controller.muteDrums(true);
            setDrumsMuted(true)
        } else {
            newLabels[2] = "Mute Drums"
            controller.muteDrums(false);
            setDrumsMuted(false)
        }
        setLabels(newLabels)
    };

    return (
        <div className="muters-container">
            <button className="muter-button"onClick={handleMutePiano}>
                {labels[0]}
            </button>

            <button className="muter-button" onClick={handleMuteBass}>
                {labels[1]}
            </button>

            <button className="muter-button" onClick={handleMuteDrums}>
                {labels[2]}
            </button>
        </div>
    );
}

export default Muters;