import MusicalCore from "./MusicalCore.js";

class Scales {

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                            DATA STRUCTURES                                 */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     */
    static #doubleSharpFullPitchRange = Object.freeze([
        'G##0', 'A#0', 'A##0',
        'B#1', 'C#1', 'C##1', 'D#1', 'D##1', 'E#1', 'F#1', 'F##1', 'G#1', 'G##1', 'A#1', 'A##1',
        'B#2', 'C#2', 'C##2', 'D#2', 'D##2', 'E#2', 'F#2', 'F##2', 'G#2', 'G##2', 'A#2', 'A##2',
        'B#3', 'C#3', 'C##3', 'D#3', 'D##3', 'E#3', 'F#3', 'F##3', 'G#3', 'G##3', 'A#3', 'A##3',
        'B#4', 'C#4', 'C##4', 'D#4', 'D##4', 'E#4', 'F#4', 'F##4', 'G#4', 'G##4', 'A#4', 'A##4',
        'B#5', 'C#5', 'C##5', 'D#5', 'D##5', 'E#5', 'F#5', 'F##5', 'G#5', 'G##5', 'A#5', 'A##5',
        'B#6', 'C#6', 'C##6', 'D#6', 'D##6', 'E#6', 'F#6', 'F##6', 'G#6', 'G##6', 'A#6', 'A##6',
        'B#7', 'C#7', 'C##7', 'D#7', 'D##7', 'E#7', 'F#7', 'F##7', 'G#7', 'G##7', 'A#7', 'A##7',
        'B#8',
    ]);

    static #sharpFullPitchRange = Object.freeze([
        'A0', 'A#0', 'B0',
        'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
        'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
        'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
        'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
        'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
        'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6',
        'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7',
        'C8'
    ]);

    static #flatFullPitchRange = Object.freeze([
        'A0', 'Bb0', 'B0',
        'C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1',
        'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2',
        'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
        'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
        'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
        'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6',
        'C7', 'Db7', 'D7', 'Eb7', 'E7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'B7',
        'C8'
    ]);

    static #doubleFlatFullPitchRange = Object.freeze([
        'Bbb0', 'Bb0', 'Cb0',
        'Dbb1', 'Db1', 'Ebb1', 'Eb1', 'Fb1', 'Gbb1', 'Gb1', 'Abb1', 'Ab1', 'Bbb1', 'Bb1', 'Cb1',
        'Dbb2', 'Db2', 'Ebb2', 'Eb2', 'Fb2', 'Gbb2', 'Gb2', 'Abb2', 'Ab2', 'Bbb2', 'Bb2', 'Cb2',
        'Dbb3', 'Db3', 'Ebb3', 'Eb3', 'Fb3', 'Gbb3', 'Gb3', 'Abb3', 'Ab3', 'Bbb3', 'Bb3', 'Cb3',
        'Dbb4', 'Db4', 'Ebb4', 'Eb4', 'Fb4', 'Gbb4', 'Gb4', 'Abb4', 'Ab4', 'Bbb4', 'Bb4', 'Cb4',
        'Dbb5', 'Db5', 'Ebb5', 'Eb5', 'Fb5', 'Gbb5', 'Gb5', 'Abb5', 'Ab5', 'Bbb5', 'Bb5', 'Cb5',
        'Dbb6', 'Db6', 'Ebb6', 'Eb6', 'Fb6', 'Gbb6', 'Gb6', 'Abb6', 'Ab6', 'Bbb6', 'Bb6', 'Cb6',
        'Dbb7', 'Db7', 'Ebb7', 'Eb7', 'Fb7', 'Gbb7', 'Gb7', 'Abb7', 'Ab7', 'Bbb7', 'Bb7', 'Cb7',
        'Dbb8'
    ]);

    static #allFullPitchChromaticScales = Object.freeze(new Map([
        ["doubleSharp", this.#doubleSharpFullPitchRange],
        ["sharp", this.#sharpFullPitchRange],
        ["flat", this.#flatFullPitchRange],
        ["doubleFlat", this.#doubleFlatFullPitchRange]
    ]));

    /**
    * 
    * 
    */
    static #doubleSharpChromaticScale = Object.freeze(['B#', 'C#', 'C##', 'D#', 'D##', 'E#', 'F#', 'F##', 'G#', 'G##', 'A#', 'A##']);
    static #sharpChromaticScale = Object.freeze(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']);
    static #flatChromaticScale = Object.freeze(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);
    static #doubleFlatChromaticScale = Object.freeze(['Dbb', 'Db', 'Ebb', 'Eb', 'Fb', 'Gbb', 'Gb', 'Abb', 'Ab', 'Bbb', 'Bb', 'Cb']);

    static #allChromaticOneOctaveScales = Object.freeze(new Map([
        ["doubleSharp", this.#doubleSharpChromaticScale],
        ["sharp", this.#sharpChromaticScale],
        ["flat", this.#flatChromaticScale],
        ["doubleFlat", this.#doubleFlatChromaticScale]
    ]));

    /**
     *  The following map maps every possible enharmonic to a chromatic scale
     *  in which we are completely sure it exists.
     */
    static #allNotesToChromScaleNameMapping = Object.freeze(new Map([
        // 0
        ["B#", "doubleSharp"],
        ["C", "sharp"],
        ["Dbb", "doubleFlat"],

        // 1
        ["C#", "sharp"],
        ["Db", "flat"],

        // 2
        ["C##", "doubleSharp"],
        ["D", "sharp"],
        ["Ebb", "doubleFlat"],

        // 3
        ["D#", "sharp"],
        ["Eb", "flat"],

        // 4
        ["D##", "doubleSharp"],
        ["E", "sharp"],
        ["Fb", "doubleFlat"],

        // 5
        ["E#", "doubleSharp"],
        ["F", "sharp"],  // might also be flat
        ["Gbb", "doubleFlat"],

        // 6
        ["F#", "sharp"],
        ["Gb", "flat"],

        // 7
        ["F##", "doubleSharp"],
        ["G", "sharp"],
        ["Abb", "doubleFlat"],

        // 8
        ["G#", "sharp"],
        ["Ab", "flat"],

        // 9
        ["G##", "doubleSharp"],
        ["A", "sharp"],
        ["Bbb", "doubleFlat"],

        // 10
        ["A#", "sharp"],
        ["Bb", "flat"],

        // 11
        ["A##", "doubleSharp"],
        ["B", "sharp"],
        ["Cb", "doubleFlat"],
    ]));

    /**
     * 
     * 
     */
    static #scaleAlphabetCAtBottom = Object.freeze(['C', 'D', 'E', 'F', 'G', 'A', 'B',]);

    /**
     * 
     * 
     */
    static #allValidNotesWithPitchOctave = Object.freeze(new Set([...this.#doubleSharpFullPitchRange,
    ...this.#sharpFullPitchRange,
    ...this.#flatFullPitchRange,
    ...this.#doubleFlatFullPitchRange,
    ]));

    /**
     * 
     * 
     */
    static #allValidNotes = Object.freeze(new Set([...this.#allNotesToChromScaleNameMapping.keys()]));

    /**
     * 
     * 
     */
    static #allValidChromaticScaleTypes = Array.from(this.#allFullPitchChromaticScales.keys())

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                                 METHODS                                    */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
    * 
    * @returns {Map<string, string[]>} - All the variations of the full pitch chromatic scales
    *  'doubleSharp':  []    TODO                 
    *  'sharp':        []        
    *  'flat':         []        
    *  'doubleFlat':   []        
    */
    static getAllFullPitchChromaticScales() {
        return this.#allFullPitchChromaticScales;
    }

    /**
     * 
     * @returns 
     */
    static getAllOneOctaveChromaticScales() {
        return this.#allChromaticOneOctaveScales;
    }

    /**
    *     
    * @param {string} note - A note in scientific pitch notation or not: 'Ab', or 'Ab4' 
    * @returns {string} - The name of a variation of a chromatic scale:  'doubleSharp', 'sharp', 'flat', or 'doubleFlat'
    */
    static getChromaticScaleNameByNote(note) {
        note = MusicalCore.removePitchOctave(note)
        return this.#allNotesToChromScaleNameMapping.get(note);
    }

    /**
     * 
     * @param {string} chromScaleName - The name of a variation of the full pitch range
     * @returns {string[]} - An array containing all the notes of a specific variation of the full pitch range 
     *  
     * Examples: 
     * - For chromScaleName = 'doubleSharp':
     *          Returns: [...'B#5', 'C#5', 'C##5', 'D#5', 'D##5'...]
     * 
     * - For chromScaleName = 'flat'
     *          Returns: [...'E5', 'F5', 'Gb5', 'G5', 'Ab5'...]
     */
    static getFullPitchChromaticScaleByType(chromScaleType) {
        var allValidChromaticScaleTypes = this.getAllValidChromaticScaleTypes();

        if (!allValidChromaticScaleTypes.includes(chromScaleType)) {
            throw new Error(`${chromScaleType} is not a valid chromatic scale type`);
        }
        return this.#allFullPitchChromaticScales.get(chromScaleType)
    }

    /**
     * 
     * @param {string} note  - A note in scientific pitch notation or not: 'Ab', or 'Ab4' 
     * @returns {string[]} - An array containing all the notes of a specific variation of the full pitch range 
     * 
     * Examples: 
     * - For note = 'B#':
     *          Returns: [...'B#5', 'C#5', 'C##5', 'D#5', 'D##5'...]
     * 
     * - For note = 'Gb5'
     *          Returns: [...'E5', 'F5', 'Gb5', 'G5', 'Ab5'...]
     */
    static getFullPitchChromaticScaleByNote(note) {
        var chromScaleType = this.getChromaticScaleNameByNote(note);
        return this.getFullPitchChromaticScaleByType(chromScaleType);
    }

    /**
     * 
     * @param {*} scientificNote 
     * 
     */
    static getIndexInFullPitchChromaticScale(scientificNote) {
        var allValidNotesScientific = this.getAllValidNotesInFullPitchRange();

        if (!allValidNotesScientific.has(scientificNote)) {
            throw new Error(`${scientificNote} is not a valid scientific note`);
        }

        var fullPitchChromaticScale = this.getFullPitchChromaticScaleByNote(scientificNote);
        return fullPitchChromaticScale.indexOf(scientificNote);
    }

    /**
     * 
     * @param {*} chromScaleType 
     * @returns 
     */
    static getOneOctaveChromaticScaleByType(chromScaleType) {
        var allValidChromaticScaleNames = this.getAllValidChromaticScaleTypes();

        if (!allValidChromaticScaleNames.includes(chromScaleType)) {
            throw new Error(`${chromScaleType} is not a valid chromatic scale type`);
        }
        return this.#allChromaticOneOctaveScales.get(chromScaleType)
    }

    /**
     * 
     * @param {*} note 
     * @returns 
     */
    static getOneOctaveChromaticScaleByNote(note) {
        var chromScaleType = this.getChromaticScaleNameByNote(note);
        return this.getOneOctaveChromaticScaleByType(chromScaleType);
    }

    /**
     * 
     * @param {*} note 
     * @returns 
     */
    static getIndexInOneOctaveChromaticScale(note) {
        note = MusicalCore.removePitchOctave(note)
        var oneOctaveChromaticScale = this.getOneOctaveChromaticScaleByNote(note);
        return oneOctaveChromaticScale.indexOf(note);
    }

    /**
     * 
     * @returns {}
     */
    static getScaleAlphabetCAtBottom() {
        return this.#scaleAlphabetCAtBottom;
    }

    /**
     * We might not need this method. It's probably useless
     * @returns {}
     */
    static getAllNotesToChromScaleMapping() {
        return this.#allNotesToChromScaleNameMapping;
    }

    /**
    * 
    * @returns {}
    * 
    */
    static getAllValidNotesInFullPitchRange() {
        return this.#allValidNotesWithPitchOctave;
    }

    /**
     * 
     * @returns {}
     * 
     */
    static getAllValidNotes() {
        return this.#allValidNotes;
    }

    /**
     * 
     * @returns 
     */
    static getAllValidChromaticScaleTypes() {
        return this.#allValidChromaticScaleTypes;
    }

    /**
     * 
     */
    static printAllFullPitchChromaticScalesVertically() {
        var allScales = this.getAllFullPitchChromaticScales();
        var length = allScales.get('sharp').length; // should be 88
        const colWidth = 7; // Set a fixed column width for consistent spacing

        console.log('    ' + '-'.repeat(colWidth * 4 + 6)); // Dynamic width

        let i = 0;
        do {
            let nextRow = [];
            for (let [_, value] of allScales) {
                nextRow.push(value[i]);
            }

            console.log(
                String(i).padEnd(4) + '| ' +
                nextRow[3].padEnd(colWidth) + '| ' +
                nextRow[2].padEnd(colWidth) + '| ' +
                nextRow[1].padEnd(colWidth) + '| ' +
                nextRow[0].padEnd(colWidth)
            );

            console.log('    ' + '-'.repeat(colWidth * 4 + 6)); // Dynamic separator

            i++;
        } while (i < length);
    }

}
export default Scales;