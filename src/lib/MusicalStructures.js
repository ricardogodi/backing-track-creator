class MusicalStructures {

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                            DATA STRUCTURES                                 */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * 
     */
    static #majorQualities = new Map([
        ['triads', ['M', 'm', 'm', 'M', 'M', 'm', '(b5)']],
        ['seventhChords', ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5']]
    ]);

    static #minorQualities = new Map([
        ['triads', ['m', '(b5)', 'M', 'm', 'm', 'M', 'M']],
        ['seventhChords', ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', '7']]
    ]);

    static #melMinorQualities = new Map([
        ['triads', ['m', 'm', '+', 'M', 'M', '(b5)', '(b5)']],
        ['seventhChords', ['m(maj7)', 'm7', '+(maj7)', '7', '7', 'm7b5', 'm7b5']]
    ]);

    static #harmMinorQualities = Object.freeze(new Map([
        ['triads', ['m', '(b5)', '+', 'm', 'M', 'M', '(b5)']],
        ['seventhChords', ['m(maj7)', 'm7b5', '+(maj7)', 'm7', '7', 'maj7', 'dim7']]
    ]));

    static #scaleToChordQualities = Object.freeze(new Map([
        ['major', this.#majorQualities],
        ['minor', this.#minorQualities],
        ['melodic minor', this.#melMinorQualities],
        ['harmonic minor', this.#harmMinorQualities]
    ]));

    /**
     * 
     * 
     */
    static #chordQualityToChromDegreesMapping = Object.freeze(new Map([
        // Triads:
        ['M', ['1', '3', '5']],
        ['m', ['1', 'b3', '5']],
        ['(b5)', ['1', 'b3', 'b5']],
        ['+', ['1', '3', '#5']],
        // Seventh Chords
        ['maj7', ['1', '3', '5', '7']],
        ['m7', ['1', 'b3', '5', 'b7']],
        ['7', ['1', '3', '5', 'b7']],
        ['m7b5', ['1', 'b3', 'b5', 'b7']],
        ['m(maj7)', ['1', 'b3', '5', '7']],
        ['+7', ['1', '3', '#5', 'b7']],
        ['+(maj7)', ['1', '3', '#5', '7']],
        ['dim7', ['1', 'b3', 'b5', 'bb7']],
        // More Chords
        ['', []],
    ]));

    /**
     * 
     * 
     */
    static #chromDegreesToChromIntervalsMapping = Object.freeze(new Map([
        ['1', 0],
        // 2nd's
        ['b2', 1],
        ['2', 2],
        // 3rd's
        ['b3', 3],
        ['3', 4],
        // 4th's
        ['4', 5],
        ['#4', 6],
        // 5th's
        ['b5', 6],
        ['5', 7],
        ['#5', 8],
        // 6th's
        ['b6', 8],
        ['6', 9],
        // 7th's
        ['bb7', 9],
        ['b7', 10],
        ['7', 11],
        // 3rd's
        ['b9', 1],
        ['9', 2],
        ['#9', 3],
        // 3rd's
        ['11', 5],
        ['#11', 6],
        // 3rd's
        ['b13', 8],
        ['13', 9]
    ]));

    /**
     * 
     * 
     */
    static #scaleToChromIntervalsMapping = Object.freeze(new Map([
        ['major', [0, 2, 4, 5, 7, 9, 11]],
        ['minor', [0, 2, 3, 5, 7, 8, 10]],
        ['melodic minor', [0, 2, 3, 5, 7, 9, 11]],
        ['harmonic minor', [0, 2, 3, 5, 7, 8, 11]]
    ]));

    // Will change if we add more scales, so define it dynamically:
    static #allScalesList = Object.freeze(Array.from(this.#scaleToChromIntervalsMapping.keys()));

    // Most likely will not change so we can define it statically
    static #allChromDegreesList = Object.freeze([
        '1', 'b2', '2', 'b3',
        '3', '4', '#4', 'b5',
        '5', '#5', 'b6', '6',
        'bb7', 'b7', '7', 'b9',
        '9', '#9', '11', '#11',
        'b13', '13'
    ]);

    static #chordQualityToChordTypeMapping = Object.freeze(new Map([
        // Triads
        ['M', 'triad'],
        ['m', 'triad'],
        ['(b5)', 'triad'],
        ['+', 'triad'],
        // Seventh Chords
        ['maj7', 'seventhChord'],
        ['m7', 'seventhChord'],
        ['7', 'seventhChord'],
        ['m7b5', 'seventhChord'],
        ['m(maj7)', 'seventhChord'],
        ['+7', 'seventhChord'],
        ['+(maj7)', 'seventhChord'],
        ['dim7', 'seventhChord'],
        // More Chords
        ['', []],
    ]));

    // Will change if we add more qualities, so define it dynamically:
    static #allChordQualities = Array.from(this.#chordQualityToChromDegreesMapping.keys());

    /* -------------------------------------------------------------------------- */
    /*                                                                            */
    /*                                 METHODS                                    */
    /*                                                                            */
    /* -------------------------------------------------------------------------- */

    /**
     * 
     * This function might not be ever called directly.
     * scaleToChordQualities will most likely be accessed by 
     * scale and chord type by means of getChordQualitiesByScaleAndChordType(scaleType, chordType)
     * 
     * @param {*} scaleType 
     * @returns 
     */
    /*
    static getTriadAndSeventChordQualitiesByScale(scaleType) {
        if (this.#allScalesList.includes(scaleType)) {
            return this.#scaleToChordQualities.get(scaleType);
        } else {
            throw new Error(`Scale name "${scaleType}" is not included in "allScalesList"`)
        }
    };
    */

    /**
     * 
     * @param {*} scaleType 
     * @param {*} chordType 
     * @returns 
     */
    static getChordQualitiesByScaleAndChordType(scaleType, chordType) {
        if (!this.#allScalesList.includes(scaleType)) {
            throw new Error(`Scale name "${scaleType}" is not included in "allScalesList"`);
        } else if (chordType != 'triads' && chordType != 'seventhChords') {
            throw new Error(`${chordType} is an invalid chord type`);
        }
        return this.#scaleToChordQualities.get(scaleType).get(chordType);

    };

    /**
     * 
     * @param {*} chordQuality 
     * @returns 
     */
    static getChromaticDegreesByChordQuality(chordQuality) {
        if (!this.#allChordQualities.includes(chordQuality)) {
            throw new Error(`Chord quality "${chordQuality}" is not included in allChordQualities`)
        }
        return this.#chordQualityToChromDegreesMapping.get(chordQuality);

    };

    /**
     * 
     * @param {*} chordQuality 
     * @returns 
     */
    static getChordTypeByChordQuality(chordQuality) {
        if (!this.#allChordQualities.includes(chordQuality)) {
            throw new Error(`Chord quality "${chordQuality}" is not included in allChordQualities`)
        }
        return this.#chordQualityToChordTypeMapping.get(chordQuality);
    }

    /**
     * 
     * @param {*} scaleType 
     * @returns 
     */
    static getChromaticIntervalsByScale(scaleType) {
        if (!this.#allScalesList.includes(scaleType)) {
            throw new Error(`Scale name "${scaleType}" is not included in "allScalesList"`)
        }
        return this.#scaleToChromIntervalsMapping.get(scaleType);
    };

    /**
     * 
     * @param {*} chromDeg 
     * @returns 
     */
    static getChromaticIntervalByChromaticDegree(chromDeg) {
        if (!this.#allChromDegreesList.includes(chromDeg)) {
            throw new Error(`Chromatic degree "${chromDeg}" is not included in "chromaticDegreesToChromaticIntervalsMapping"`);
        }
        return this.#chromDegreesToChromIntervalsMapping.get(chromDeg);
    };

    /**
     * 
     * @param {*} chromDeg 
     */
    static convertChromDegreeToScaleDegreeOffset(chromDeg) {
        const NUM_OF_NOTES = 7;
        if (!this.#allChromDegreesList.includes(chromDeg)) {
            throw new Error(`${chromDeg} is not a valid chromatic degree`)
        }
        // Remove accidentals
        chromDeg = chromDeg.replaceAll('b', "");
        chromDeg = chromDeg.replaceAll('#', "");
        // Convert to Number
        var chromDegNum = Number(chromDeg);
        return (chromDegNum - 1) % NUM_OF_NOTES;
    }
}

export default MusicalStructures;