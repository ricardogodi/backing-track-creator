import MusicalUtilities from "./MusicalUtilities.js";
import MusicalStructures from "./MusicalStructures.js";
import Scales from "./Scales.js";
import NoteGenerator from "./NoteGenerator.js";

class MusicalCore {

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                            METHODS FROM Scales                             */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * @returns 
     */
    static getAllFullPitchChromaticScales() {

        return Scales.getAllFullPitchChromaticScales();
    }

    /**
     * 
     * @returns 
     */
    static getAllOneOctaveChromaticScales() {

        return Scales.getAllOneOctaveChromaticScales();
    }

    /**
     * 
     * @param {*} noteName 
     * @returns 
     */
    static getChromaticScaleNameByNote(noteName) {

        return Scales.getChromaticScaleNameByNote(noteName);
    }

    /**
     * 
     * @param {*} chromScaleType 
     * @returns 
     */
    static getFullPitchChromaticScaleByType(chromScaleType) {

        return Scales.getFullPitchChromaticScaleByType(chromScaleType);
    }

    /**
     * 
     * @param {*} noteName 
     * @returns 
     */
    static getFullPitchChromaticScaleByNote(noteName) {

        return Scales.getFullPitchChromaticScaleByNote(noteName);
    }

    /**
     * 
     * @param {*} noteName 
     * @returns 
     */
    static getIndexInFullPitchChromaticScale(noteName) {

        return Scales.getIndexInFullPitchChromaticScale(noteName);
    }

    /**
     * 
     * @param {*} noteName 
     * @returns 
     */
    static getIndexInOneOctaveChromaticScale(noteName) {

        return Scales.getIndexInOneOctaveChromaticScale(noteName);
    }

    /**
     * 
     * @param {*} chromScaleType 
     * @returns 
     */
    static getOneOctaveChromaticScaleByType(chromScaleType) {

        return Scales.getOneOctaveChromaticScaleByType(chromScaleType)
    }

    /**
     * 
     * @param {*} noteName 
     * @returns 
     */
    static getOneOctaveChromaticScaleByNote(noteName) {

        return Scales.getOneOctaveChromaticScaleByNote(noteName);
    }

    /**
     * 
     * @param {*} noteName 
     * @returns 
     */
    static getIndexInOneOctaveChromaticScale(noteName) {

        return Scales.getIndexInOneOctaveChromaticScale(noteName);
    }

    /**
     * 
     * @returns 
     */
    static getScaleAlphabetCAtBottom() {

        return Scales.getScaleAlphabetCAtBottom();
    }

    /**
     * 
     * @returns 
     */
    static getAllValidNotesInFullPitchRange() {

        return Scales.getAllValidNotesInFullPitchRange();
    }

    /**
     * 
     * @returns 
     */
    static getAllValidNotes() {

        return Scales.getAllValidNotes();
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                        METHODS FROM MusicalStructures                      */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * @param {*} scaleType 
     * @param {*} chordType 
     * @returns 
     */
    static getChordQualitiesByScaleAndChordType(scaleType, chordType) {

        return MusicalStructures.getChordQualitiesByScaleAndChordType(scaleType, chordType);
    }

    /**
     * 
     * @param {*} chordQuality 
     * @returns 
     */
    static getChromaticDegreesByChordQuality(chordQuality) {

        return MusicalStructures.getChromaticDegreesByChordQuality(chordQuality);
    }

    /**
     * 
     * @param {*} chordQuality 
     * @returns 
     */
    static getChordTypeByChordQuality(chordQuality) {

        return MusicalStructures.getChordTypeByChordQuality(chordQuality);
    }

    /**
     * 
     * @param {*} scaleType 
     * @returns 
     */
    static getChromaticIntervalsByScale(scaleType) {

        return MusicalStructures.getChromaticIntervalsByScale(scaleType);
    }

    /**
     * 
     * @param {*} chromDeg 
     * @returns 
     */
    static getChromaticIntervalByChromaticDegree(chromDeg) {

        return MusicalStructures.getChromaticIntervalByChromaticDegree(chromDeg);
    }

    /**
     * 
     * @param {*} chromDeg 
     * @returns 
     */
    static convertChromDegreeToScaleDegreeOffset(chromDeg) {

        return MusicalStructures.convertChromDegreeToScaleDegreeOffset(chromDeg);
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                       METHODS FROM MusicalUtilities                        */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * @param {*} note 
     * @returns 
     */
    static removePitchOctave(note) {

        return MusicalUtilities.removePitchOctave(note);
    }

    /**
     * 
     * @param {*} note 
     * @returns 
     */
    static removeAccidentalAndPitchOctave(note) {

        return MusicalUtilities.removeAccidentalAndPitchOctave(note);
    }

    /**
     * 
     * @param {*} bottomTarget 
     * @returns 
     */
    static getScaleAlphaWithNoteAtBottom(bottomTarget) {

        return MusicalUtilities.getScaleAlphaWithNoteAtBottom(bottomTarget);
    }

    /**
     * 
     * @param {*} topTarget 
     * @returns 
     */
    static getScaleAlphaWithNoteOnTop(topTarget) {

        return MusicalUtilities.getScaleAlphaWithNoteOnTop(topTarget);
    }

    /**
     * 
     * @param {*} noteTarget 
     * @param {*} index 
     * @returns 
     */
    static retrieveEnharmonic(noteTarget, index) {

        return MusicalUtilities.retrieveEnharmonic(noteTarget, index);
    }

    /**
     * 
     * @param {*} notes 
     * @param {*} index 
     * @returns 
     */
    static rotateStructure(notes, index) {

        return MusicalUtilities.rotateStructure(notes, index)
    }

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                       METHODS FROM NoteGenerator                           */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * @param {*} root 
     * @param {*} chordQuality 
     * @returns 
     */
    static generateChord(root, chordQuality) {

        return NoteGenerator.generateChord(root, chordQuality);
    }

    /**
     * 
     * @param {*} tonic 
     * @param {*} scaleType 
     * @returns 
     */
    static generateScale(tonic, scaleType) {

        return NoteGenerator.generateScale(tonic, scaleType);
    }
}

export default MusicalCore;