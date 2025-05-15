import ScaleChords from "./ScaleChords.js";
import HarmonySequence from "./HarmonySequence.js";
import Playback from "./Playback.js";
import Chord from "./Chord.js";
import StylesLibrary from "./StylesLibrary.js";

class AppController {

    #scaleChords
    #playback
    #harmonySequence

    /**
     * 
     */
    constructor() {
        // Initialize models
        console.log("Initializing controller...")
        this.#scaleChords = new ScaleChords("C", "major", "triads");
        this.#playback = new Playback();
        this.#harmonySequence = new HarmonySequence(this.#playback);
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                    Methods to interact with ScaleChords                    */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * @param {*} newTonic 
     */
    setTonic(newTonic) {
        this.#scaleChords.setTonic(newTonic);
    }

    /**
     * 
     * @param {*} newScaleType 
     */
    setScaleType(newScaleType) {
        this.#scaleChords.setScaleType(newScaleType);
    }

    /**
     * 
     * @param {*} newChordsType 
     */
    setChordsType(newChordsType) {
        if (newChordsType == '7th') {
            this.#scaleChords.setChordsType('seventhChords');
        } else {
            this.#scaleChords.setChordsType(newChordsType);
        }
    }

    // it's possible that we might have to update the ui 'manually'
    /**
     * 
     * @returns 
     */
    getFullChordNames() {
        return this.#scaleChords.getFullChordNames()
    }

    /**
     * 
     * @param {*} index 
     * @returns 
     */
    getFullChordAtIndex(index) {
        return this.#scaleChords.getFullChordAtIndex(index);
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                Methods to interact with HarmonySequence                    */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * @param {*} indexFrom 
     * @param {*} indexTo 
     * @param {*} chordPosition 
     */
    setChord(indexFrom, indexTo, chordPosition) {
        var root = this.#scaleChords.getScaleNoteAt(indexFrom);
        var quality = this.#scaleChords.getChordQualityAt(indexFrom);
        var chord = new Chord(root, quality);
        this.#harmonySequence.insertChordAtBar(chord, indexTo, chordPosition);
    }

    load(chords) {
        this.#harmonySequence.load(chords);
    }

    reset() {
        this.#harmonySequence.reset()
    }

    /**
     * 
     */
    popBar() {
        this.#harmonySequence.popBar()
    }

    /**
     * 
     */
    addBar() {
        this.#harmonySequence.addBar()
    }

    /**
     * 
     * @returns 
     */
    getNumOfBars() {
        console.log("GET NUM OF BARS WAS CALLED")
        return this.#harmonySequence.getNumOfBars()
    }

    /**
     * 
     * @param {*} barIndexFrom 
     * @param {*} barIndexTo 
     * @param {*} positionFrom 
     * @param {*} positionTo 
     */
    moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo) {
        this.#harmonySequence.moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo);
    }

    /**
     * 
     * @param {*} barIndex 
     * @param {*} position 
     */
    removeChord(barIndex, position) {
        if (position == "middle") {
            position = "left"
        }
        this.#harmonySequence.removeChordAtBarAndPosition(barIndex, position);
    }

    getBarLabels() {
        return this.#harmonySequence.getBarLabels();
    }

    /**
     * 
     */
    changeInitialHarmonicPosition() {
        this.#harmonySequence.changeInitialHarmonicPosition();
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                    Methods to interact with Playback                       */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     */
    play() {
        this.#playback.play();
    }

    /**
     * 
     */
    stop() {
        this.#playback.stop();
    }

    /**
     * 
     * @param {*} newTempo 
     */
    changeTempo(newTempo) {
        this.#playback.changeTempo(newTempo);
    }

    /**
     * 
     * @param {*} mute 
     */
    mutePiano(mute) {
        this.#playback.mutePiano(mute);
    }

    /**
     * 
     * @param {*} mute 
     */
    muteBass(mute) {
        this.#playback.muteBass(mute);
    }

    /**
     * 
     * @param {*} mute 
     */
    muteDrums(mute) {
        this.#playback.muteDrums(mute);
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                    Methods to interact with StylesLibrary                  */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * @param {*} style 
     * @returns 
     */
    getDrumsListByStyle(style) {
        return StylesLibrary.getDrumsKeys(style)
    }

    /**
     * 
     * @param {*} style 
     * @returns 
     */
    getBassListByStyle(style) {
        return StylesLibrary.getBassKeys(style)
    }

    /**
     * 
     * @returns 
     */
    getAllStyles() {
        return StylesLibrary.getAllStyles();
    }

    /**
     * 
     * @param {*} style 
     * @param {*} drums 
     */
    setDrums(style, drums) {
        const drumsRhythm = StylesLibrary.getDrums(style, drums);
        this.#playback.setDrumsRhythm(drumsRhythm);
    }

    /**
     * 
     * @param {*} style 
     * @param {*} bass 
     */
    setBass(style, bass) {
        const bassRhythm = StylesLibrary.getBass(style, bass);
        this.#playback.setBassRhythm(bassRhythm);
    }
}

export default AppController;