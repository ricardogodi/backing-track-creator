import Chord from "./Chord.js";
import VoicedChord from "./VoicedChord.js";

class HarmonyBar {

    #leftChord;
    #rightChord;

    #voicedLeftChord;
    #voicedRightChord;

    #hasLeftChord;
    #hasRightChord;

    /**
     * 
     */
    constructor() {
        this.#leftChord = null;
        this.#rightChord = null;

        this.#voicedLeftChord = null;
        this.#voicedRightChord = null;

        this.#hasLeftChord = false;
        this.#hasRightChord = false;
    }

    /**
     * 
     * @param {*} chord 
     */
    setLeftChord(chord) {
        this.#leftChord = chord;
        this.#hasLeftChord = true;
    }

    /**
    * 
    * @param {*} chord 
    */
    setRightChord(chord) {
        this.#rightChord = chord;
        this.#hasRightChord = true;
    }

    /**
     * 
     * @param {*} voicedChord 
     */
    setVoicedLeftChord(voicedChord) {
        this.#voicedLeftChord = voicedChord;
    }

    /**
     * 
     * @param {*} voicedChord 
     */
    setVoicedRightChord(voicedChord) {
        this.#voicedRightChord = voicedChord;
    }

    /**
     * 
     * @returns 
     */
    getLeftChord() {
        return this.#leftChord;
    }

    /**
     * 
     * @returns 
     */
    getRightChord() {
        return this.#rightChord;
    }

    /**
     * 
     * @returns 
     */
    getLeftVoicedChord() {
        return this.#voicedLeftChord;
    }

    /**
     * 
     * @returns 
    */
    getRightVoicedChord() {
        return this.#voicedRightChord;
    }

    /**
     * 
     * @returns 
     */
    hasLeftChord() {
        return this.#hasLeftChord;
    }

    /**
     * 
     * @returns 
     */
    hasRightChord() {
        return this.#hasRightChord;
    }

    /**
    * 
    * @returns 
    */
    hasTwoChords() {
        return this.#hasLeftChord && this.#hasRightChord
    }

    /**
    * 
    * @returns 
    */
    hasAChord() {
        return this.#hasLeftChord || this.#hasRightChord
    }

    /**
     * 
     * @param {*} position 
     */
    removeChordAtPosition(position) {
        if (!this.hasTwoChords() && position == 'right') { 
            // Trying to remove right chord when there isn't one
            throw new Error(`Bar does not have a right chord!`)
        }

        if (!this.hasAChord()) {
            throw new Error(`Bar does not have a chord!`)
        }

        if (this.hasTwoChords()) {
            if (position == 'left' || position == "middle") { // Removing left chord
                // Move right chord the left
                this.#leftChord = this.#rightChord;
                this.#voicedLeftChord = this.#voicedRightChord;
            } 
        
            // Set right chord to null
            this.#rightChord = null;
            this.#voicedRightChord = null;
            this.#hasRightChord = false;

        } else { // Must have one chord
            this.#leftChord = null;
            this.#voicedLeftChord = null;
            this.#hasLeftChord = false;
        }
    }
}

export default HarmonyBar;
