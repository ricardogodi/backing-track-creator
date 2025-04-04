import ScaleChords from "./ScaleChords.js";
import HarmonySequence from "./HarmonySequence.js";
import Playback from "./Playback.js";
import Chord from "./Chord.js";
import StylesLibrary from "./StylesLibrary.js";

class AppController {
    
    #scaleChords
    #playback
    #harmonySequence 

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

    setTonic(newTonic) {
        this.#scaleChords.setTonic(newTonic);
    }

    setScaleType(newScaleType) {
        this.#scaleChords.setScaleType(newScaleType);
    }

    setChordsType(newChordsType) {

        if (newChordsType == '7th') {
            this.#scaleChords.setChordsType('seventhChords');
        } else {
            this.#scaleChords.setChordsType(newChordsType);
        }    
    }

    // it's possible that we might have to update the ui 'manually'
    getFullChordNames() {
        return this.#scaleChords.getFullChordNames()
    }

    getFullChordAtIndex(index) {
        return this.#scaleChords.getFullChordAtIndex(index);
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                Methods to interact with HarmonySequence                    */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    setChord(indexFrom, indexTo, chordPosition) {

        var root = this.#scaleChords.getScaleNoteAt(indexFrom);
        var quality = this.#scaleChords.getChordQualityAt(indexFrom);

        var chord = new Chord(root, quality);

        this.#harmonySequence.insertChordAtBar(chord, indexTo, chordPosition);
    }

    addBar() {

        this.#harmonySequence.addBar()
    }

    getNumOfBars() {
        console.log(`this.#harmonySequence.getNumOfBars() ${this.#harmonySequence.getNumOfBars()}`)
        return this.#harmonySequence.getNumOfBars()
    }

    moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo) {
/*
        if (positionFrom == "middle") {

            positionFrom = "left"
        } 

        if (positionTo == "middle") {

            positionTo = "left"
        } 
            */
        
        this.#harmonySequence.moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo);
    }

    removeChord(barIndex, position) {

        if (position == "middle") {
            position = "left"
        }
        console.log(`Removing chord at index: ${barIndex} position: ${position}`)
        this.#harmonySequence.removeChordAtBarAndPosition(barIndex, position);
    }


    changeInitialHarmonicPosition() {
        this.#harmonySequence.changeInitialHarmonicPosition();
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                    Methods to interact with Playback                       */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */


    play() {

        this.#playback.play();
    }

    stop() {

        this.#playback.stop();
    }

    changeTempo(newTempo) {

        this.#playback.changeTempo(newTempo);
    }

    mutePiano(mute) {

        //console.log("Muting Piano...")
        this.#playback.mutePiano(mute);
    }

    muteBass(mute) {

       // console.log("Muting Bass...")
        this.#playback.muteBass(mute);
    }

    muteDrums(mute) {
        
        //console.log("Muting Drums...")
        this.#playback.muteDrums(mute);
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                    Methods to interact with StylesLibrary                  */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    getDrumsListByStyle(style) { 

        return StylesLibrary.getDrumsKeys(style)
    }

    getBassListByStyle(style) { 

        return StylesLibrary.getBassKeys(style)
    }

    getAllStyles() {
        return StylesLibrary.getAllStyles();
    }

    /*
    getBassListByDrumsSelection(style, drums) {

        return StylesLibrary.getBassArrayByDrums(style, drums);
    }
    */

    setDrums(style, drums) {
        //console.log(`style: ${style} drums: ${drums}`)

       const drumsRhythm = StylesLibrary.getDrums(style, drums);


       this.#playback.setDrumsRhythm(drumsRhythm);
    }

    setBass(style, bass) {

        const bassRhythm = StylesLibrary.getBass(style, bass);

        this.#playback.setBassRhythm(bassRhythm);
     }



    /*
    setBass(style, drums, index) {

        const bassList = StylesLibrary.getBassArrayByDrums(style, drums);

        const bassName = bassList[index];

        const bassRhythm = StylesLibrary.getBass(style, bassName);

        this.#playback.setBassRhythm(bassRhythm);
    }
    */
}

export default AppController;