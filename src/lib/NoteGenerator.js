import MusicalCore from "./MusicalCore.js";

class NoteGenerator {

    /**
     * 
     * @param {*} root 
     * @param {*} chordQuality 
     */
    static generateChord(root, chordQuality) {

        // Get the scale alphabet starting at the root's base letter
        var alphabetScaleWithRootAtBottom = MusicalCore.getScaleAlphaWithNoteAtBottom(root);
        // Get the chromatic degrees from the chord quality we plan to construct
        var chordChromaticDegrees = MusicalCore.getChromaticDegreesByChordQuality(chordQuality);

        var chordNotesBaseLetters = [];
        var chomaticIntervals = [];

        const NUM_OF_NOTES = 7;

        for (let chromDeg of chordChromaticDegrees) {
            // Get the corresponding chromatic interval of chromDeg
            let nextChromInterval = MusicalCore.getChromaticIntervalByChromaticDegree(chromDeg);
            // Relative to the seven note alphabet scale, get the number offset
            let scaleOffset = MusicalCore.convertChromDegreeToScaleDegreeOffset(chromDeg);
            // The next note letter of the chord
            let nextNoteLetter = alphabetScaleWithRootAtBottom[scaleOffset];

            chordNotesBaseLetters.push(nextNoteLetter);
            chomaticIntervals.push(nextChromInterval);
        }
        // Will return a modified version of chordNotesBaseLetters with correct accidentals included
        return this.#realizeNotes(root, chomaticIntervals, chordNotesBaseLetters)
    }
    /**
     * 
     * @param {*} tonic 
     * @param {*} scaleType 
     * @returns 
     */
    static generateScale(tonic, scaleType) {

        // Get chromatic intervals array by scale name
        var chromaticIntervals = MusicalCore.getChromaticIntervalsByScale(scaleType);
        // Get alphabet scale with root at the bottom
        var noteLetters = MusicalCore.getScaleAlphaWithNoteAtBottom(tonic);
        return this.#realizeNotes(tonic, chromaticIntervals, noteLetters);
    }

    /**
     * 
     * @param {*} startNote 
     * @param {*} chromaticIntervalsStructure 
     * @param {*} noteLetters 
     * @returns 
     */
    static #realizeNotes(startNote, chromaticIntervalsStructure, noteLetters) {

        if (chromaticIntervalsStructure.length != noteLetters.length) {
            throw new Error("chromaticIntervalsStructure and noteLetters lengths should be equal!");
        }

        // Get the note's index in the one octave chromatic scale
        var startNoteIndexInChromScale = MusicalCore.getIndexInOneOctaveChromaticScale(startNote);

        const NUM_OF_NOTES = 12; // Number of notes in the one octave chromatic scale
        var properNoteNames = []; // Array to populate with correct note names in the structure
        var length = chromaticIntervalsStructure.length;

        for (let i = 0; i < length; i++) {
            // Next bare letter to 'add' the proper accidental
            let nextLetter = noteLetters[i];
            // Next distance in terms of chromatic intervals from the startNote
            let startNoteOffset = chromaticIntervalsStructure[i]; 
            // Index to extract the next enharmonic from
            let nextIndex = (startNoteIndexInChromScale + startNoteOffset) % NUM_OF_NOTES; 
            // Retrieve the next note with the correct accidental
            let nextProperNoteName = MusicalCore.retrieveEnharmonic(nextLetter, nextIndex);
            properNoteNames.push(nextProperNoteName)
        } 
        return properNoteNames;
    }
}

export default NoteGenerator;