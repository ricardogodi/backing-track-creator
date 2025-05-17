import MusicalCore from "./MusicalCore.js";

class ScaleChords {

    // Base properties
    #tonic;
    #scaleType;
    #chordsType;

    // Dependent properties:
    #scaleNotes;
    #chordQualities;
    #fullChordNames;

    /**
     * 
     * @param {*} tonic 
     * @param {*} scaleType 
     * @param {*} chordsType 
     */
    constructor(tonic, scaleType, chordsType) {
        this.#tonic = tonic;
        this.#scaleType = scaleType;
        this.#chordsType = chordsType;
        
        // TODO: setDependentProperties() make this method
        this.#scaleNotes = MusicalCore.generateScale(this.#tonic, this.#scaleType);
        this.#chordQualities = MusicalCore.getChordQualitiesByScaleAndChordType(this.#scaleType, this.#chordsType);
        this.#fullChordNames = new Array(7);
        this.#fullChordNames = this.#generateFullChordNames();
    }

    /**
     * 
     * @returns 
     */
    getTonic() {
        return this.#tonic;
    }

    /**
     * 
     * @returns 
     */
    getScaleType() {
        return this.#scaleType;
    }

    /**
     * 
     * @returns 
     */
    getChordsType() {
        return this.#chordsType;
    }

    /**
     * 
     * @returns 
     */
    getScaleNotes() {
        return this.#scaleNotes;
    }

    /**
     * 
     * @returns 
     */
    getChordQualities() {
        return this.#chordQualities;
    }

    /**
     * 
     * @returns 
     */
    getFullChordNames() {
        return this.#fullChordNames;
    }

    getFullChordAtIndex(index) {
        return this.#fullChordNames[index];
    }

    /**
     * 
     * @param {*} index 
     */
    getChordQualityAt(index) {
        return this.#chordQualities[index];
    }

    /**
     * 
     * @param {*} index 
     */
    getScaleNoteAt(index) {
        return this.#scaleNotes[index];
    }

    /**
     * 
     * @param {*} newTonic 
     */
    setTonic(newTonic) {
        if (this.#tonic != newTonic) {
            this.#tonic = newTonic;
            this.#scaleNotes = MusicalCore.generateScale(this.#tonic, this.#scaleType);
            this.#fullChordNames = this.#generateFullChordNames();
        }
    };

    /**
     * 
     * @param {*} newScaleType 
     */
    setScaleType(newScaleType) {
        if (this.#scaleType != newScaleType) {
            this.#scaleType = newScaleType;
            this.#scaleNotes = MusicalCore.generateScale(this.#tonic, this.#scaleType);
            this.#chordQualities = MusicalCore.getChordQualitiesByScaleAndChordType(this.#scaleType, this.#chordsType);
            this.#fullChordNames = this.#generateFullChordNames();
        }
    };

    /**
     * 
     * @param {*} chordsType 
     */
    setChordsType(chordsType) {
        if (this.#chordsType != chordsType) {
            this.#chordsType = chordsType;
            this.#chordQualities = MusicalCore.getChordQualitiesByScaleAndChordType(this.#scaleType, chordsType);
            this.#fullChordNames = this.#generateFullChordNames();
        }
    };

    /**
     * 
     */
    #generateFullChordNames() {
        const NUM_OF_NOTES = 7;
        const newfullChordNames = []

        for (let i = 0; i < NUM_OF_NOTES; i++) {
            let nextChord
            if (this.#chordQualities[i] == 'M') {
                nextChord = this.#scaleNotes[i];
            } else {
                nextChord = this.#scaleNotes[i] + "" + this.#chordQualities[i];
            }
            newfullChordNames.push(nextChord);
        }
        return newfullChordNames;  
    };

    printState() {
        console.log('---------------------------------------------------------------------');
        console.log('             Printing current state ScaleChords state:               ');
        console.log('---------------------------------------------------------------------');
        console.log();
        console.log(`Tonic:                 ${this.#tonic}`);
        console.log(`Scale Type:            ${this.#scaleType}`);
        console.log(`Chords Type:           ${this.#chordsType}`);
        console.log();
        console.log(`Scale Notes:           ${this.#scaleNotes.join(", ")}`);
        console.log(`Chord Qualities:       ${this.#chordQualities.join(", ")}`);
        console.log(`Full Chord Names:      ${this.#fullChordNames.join(", ")}`);
        console.log();
        console.log('---------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------');
    }
}

export default ScaleChords;