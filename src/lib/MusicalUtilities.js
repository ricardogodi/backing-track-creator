import MusicalCore from "./MusicalCore.js";

class MusicalUtilities {

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                                 METHODS                                    */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * @param {string} note 
     */
    static removePitchOctave(note) {
        var allNotes = MusicalCore.getAllValidNotes();
        var allNotesWithPitch = MusicalCore.getAllValidNotesInFullPitchRange()

        if (!allNotes.has(note) && !allNotesWithPitch.has(note)) {
            throw new Error (`${note } is not a valid note.`)
        }

        var strSize = note.length; // Get size of the note
        var lastChar = note.at(strSize - 1); // Get the last character of the note

        if(isNaN(lastChar)) { // If last character is not a number then it is not in scientific notation
            return note; // Just return it right away
        }
        // Last character is in scientific notation, so remove last character
        note = note.substring(0, strSize - 1)
        return note;
    }

    /**
     * 
     * @param {*} note 
     * @returns 
     */
    static removeAccidentalAndPitchOctave(note) {
        var allNotes = MusicalCore.getAllValidNotes();
        var allNotesWithPitch = MusicalCore.getAllValidNotesInFullPitchRange()
        if (!allNotes.has(note) && !allNotesWithPitch.has(note)) {
            throw new Error (`${note } is not a valid note.`)
        }
        return note[0];
    }

    /**
     * 
     * @param {*} note 
     * @returns 
     */
    static getScaleAlphaWithNoteAtBottom(note) {
        var allNotes = MusicalCore.getAllValidNotes();
        var allNotesWithPitch = MusicalCore.getAllValidNotesInFullPitchRange()

        if (!allNotes.has(note) && !allNotesWithPitch.has(note)) {
            throw new Error (`${note } is not a valid note.`)
        }

        var curatedNote = this.removeAccidentalAndPitchOctave(note)
        var scaleAlphabet = MusicalCore.getScaleAlphabetCAtBottom();
        var curatedNoteIndex = scaleAlphabet.indexOf(curatedNote);
        var length = scaleAlphabet.length;
        var newScale = []

        for (let i = 0; i < length; i++) {
            let nextNote = scaleAlphabet[(curatedNoteIndex + i) % length];
            newScale.push(nextNote);
        }
        return newScale;
    }

    /**
    * 
    * @param {*} note 
    * @returns 
    */
    static getScaleAlphaWithNoteOnTop(note) {
        var allNotes = MusicalCore.getAllValidNotes();
        var allNotesWithPitch = MusicalCore.getAllValidNotesInFullPitchRange()

        if (!allNotes.has(note) && !allNotesWithPitch.has(note)) {
            throw new Error (`${note } is not a valid note.`)
        }

        var curatedNote = this.removeAccidentalAndPitchOctave(note)
        var scaleAlphabet = MusicalCore.getScaleAlphabetCAtBottom();
        var curatedNoteIndex = scaleAlphabet.indexOf(curatedNote);
        var length = scaleAlphabet.length;
        var newScale = []
        for (let i = 0; i < length; i++) {
            let nextNote = scaleAlphabet[(curatedNoteIndex + i + 1) % length];
            newScale.push(nextNote);
        }
        return newScale;
    }


    /**
     * 
     * @param {*} noteTarget 
     * @param {*} index 
     * @returns 
     * 
     * Example: 
     * noteTarget = A
     * index = 7
     * Returns: Abb
     *        6     7    8    
     *  ... | F# | F## | G# | ...
     *  ... | F# |  G  | G# | ...
     *  ... | Gb |  G  | Ab | ...
     *  ... | Gb | Abb | Ab | ...
     * 
     * 
     */
    static retrieveEnharmonic(noteTarget, index) {
        // Get all the four chromatic scales
        var allChromaticScales = MusicalCore.getAllOneOctaveChromaticScales();
        var scaleLength = allChromaticScales.get('sharp').length;

        if (index < 0 || index >= scaleLength) {
            throw new Error(`index '${index}' is out of bounds`);
        }

        // Curate noteTarget
        var noteTargetBaseNote = this.removeAccidentalAndPitchOctave(noteTarget);

        // Traverse over the four chromatic scales along the same index
        for (let [chromScaleName, chromScale] of allChromaticScales) {
             // Get next element from the enharmonic 'columns'
            var nextEnharmonic = chromScale[index];
            // Get the next enharmonic letter
            var nextEnharmonicBaseLetter = this.removeAccidentalAndPitchOctave(nextEnharmonic);

            // If both base letters coincide, return the enharmonic
            if (noteTargetBaseNote == nextEnharmonicBaseLetter) {
                return nextEnharmonic;
            }
        }
    }

    /**
     * 
     * @param {*} notes 
     * @param {*} index 
     * @returns 
     */
    static rotateStructure(notes, index) {
        var length = notes.length;
        var newNotes = []

        for (let i = 0; i < length; i++) {
            let nextNote = notes[(index + i) % length];
            newNotes.push(nextNote);
        }
        return newNotes;
    }
}
export default MusicalUtilities;