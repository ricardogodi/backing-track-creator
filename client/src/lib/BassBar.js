import StylesLibrary from "./StylesLibrary.js";
import MusicalCore from "./MusicalCore.js";

class BassBar {

    #leftChordRoot;
    #rightChordRoot;

    #leftHarmonicContext;
    #rightHarmonicContext;

    #leftChordFifth;
    #rightChordFifth;

    #leftChordRootAndFifth;
    #rightChordRootAndFifth;

    #hasLeftChord;
    #hasRightChord;

    #baseRhythm;
    #leftChordRhythm;
    #rightChordRhythm;

    /**
     * 
     */
    constructor(rhythm) {

        this.#leftChordRoot = null;
        this.#rightChordRoot = null;

        this.#leftHarmonicContext = null;
        this.#rightHarmonicContext = null;

        this.#leftChordFifth = null;
        this.#rightChordFifth = null;

        this.#leftChordRootAndFifth = null;
        this.#rightChordRootAndFifth = null;

        this.#hasLeftChord = false;
        this.#hasRightChord = false;

        this.#baseRhythm = this.deepCopyMap(rhythm); 
        this.#leftChordRhythm = this.deepCopyMap(rhythm);

    }

    /**
     * 
     * @param {*} concreteBass 
     * @param {*} harmonicContext 
     */
    setLeftChordRoot(concreteBass, harmonicContext) {
        this.#leftChordRoot = concreteBass;
        this.#leftHarmonicContext = harmonicContext;
        this.#leftChordFifth = this.determineConcreteFifth(0);
        this.#leftChordRootAndFifth = new Map([
            ['root', this.#leftChordRoot],
            ['5th', this.#leftChordFifth]
        ])
        this.#hasLeftChord = true;
    }

    /**
     * 
     * @param {*} concreteBass 
     * @param {*} harmonicContext 
     */
    setRightChordRoot(concreteBass, harmonicContext) {
        this.#rightChordRoot = concreteBass;
        this.#rightHarmonicContext = harmonicContext;
        this.#rightChordFifth = this.determineConcreteFifth(1);
        this.#rightChordRootAndFifth = new Map([
            ['root', this.#rightChordRoot],
            ['5th', this.#rightChordFifth]
        ])

        this.#hasRightChord = true;

        this.#rightChordRhythm = this.deepCopyMap(this.#baseRhythm);
        this.#leftChordRhythm =  this.deepCopyMap(this.#baseRhythm);
       
        this.#leftChordRhythm.set('root', this.leftPartition(this.#baseRhythm.get('root')))
        this.#leftChordRhythm.set('5th', this.leftPartition(this.#baseRhythm.get('5th')))

        this.#rightChordRhythm.set('root', this.rightPartition(this.#baseRhythm.get('root')))
        this.#rightChordRhythm.set('5th', this.rightPartition(this.#baseRhythm.get('5th')))
    }

    /**
     * 
     * @param {*} rhythm 
     */
    setBassRhythm(rhythm) {
        this.#baseRhythm = this.deepCopyMap(rhythm)

        if (this.hasTwoChords()) {
            this.#leftChordRhythm = this.deepCopyMap(this.#baseRhythm)
            this.#rightChordRhythm = this.deepCopyMap(this.#baseRhythm)

            this.#leftChordRhythm.set('root', this.leftPartition(this.#baseRhythm.get('root')))
            this.#leftChordRhythm.set('5th', this.leftPartition(this.#baseRhythm.get('5th')))

            this.#rightChordRhythm.set('root', this.rightPartition(this.#baseRhythm.get('root')))
            this.#rightChordRhythm.set('5th', this.rightPartition(this.#baseRhythm.get('5th')))
        } else {
            this.#leftChordRhythm = this.deepCopyMap(this.#baseRhythm); // Set the whole rhythm
        }
    }

    /**
     * 
     * @returns 
     */
    getLeftChordRoot() {
        return this.#leftChordRoot;
    }

    /**
     * 
     * @returns 
     */
    getRightChordRoot() {
        return this.#rightChordRoot;
    }

    /**
     * 
     * @returns 
     */
    getLeftChordFifth() {
        return this.#leftChordFifth;
    }

    /**
     * 
     * @returns 
     */
    getRightChordFifth() {
        return this.#rightChordFifth;
    }

    /**
     * 
     * @returns 
     */
    getLeftChordVoices() {
        return this.#leftChordRootAndFifth
    }

    /**
     * 
     * @returns 
     */
    getRightChordVoices() {
        return this.#rightChordRootAndFifth
    }


    /**
     * 
     * @returns 
     */
    getLeftChordRhythm() {
        return this.#leftChordRhythm;
    }

    /**
    * 
    * @returns 
    */
    getRightChordRhythm() {
        return this.#rightChordRhythm;
    }

    /**
     * 
     * @returns 
     */
    hasAChord() {
        return this.#hasLeftChord || this.#hasRightChord;
    }

    /**
    * 
    * @returns 
    */
    hasTwoChords() {
        return this.#hasLeftChord && this.#hasRightChord;
    }

    /**
     * 
     * @param {*} chordPosition 
     * @returns 
     */
    determineConcreteFifth(chordPosition) {
        let root;
        let fifthTarget;

        if (chordPosition == 0) {
            root = this.#leftChordRoot;
            fifthTarget = this.#leftHarmonicContext[2];
        } else if (chordPosition == 1) {
            root = this.#rightChordRoot;
            fifthTarget = this.#rightHarmonicContext[2];
        }

        var allFullPitchScales = MusicalCore.getAllFullPitchChromaticScales();
        var lowerLimit = MusicalCore.getIndexInFullPitchChromaticScale('E1');
        var found = false;
        var concreteFifth = null;
        var rootIndex = MusicalCore.getIndexInFullPitchChromaticScale(root);
        var horIndex = rootIndex;
        var lowerLimitHit = false;

        while (!found) {
            if ((horIndex <= lowerLimit) && !found) {
                lowerLimitHit = true;
            }

            for (let [_, scale] of allFullPitchScales) {
                let nextNote = scale[horIndex];
                let nextNoteCurated = MusicalCore.removePitchOctave(nextNote);
                if (fifthTarget == nextNoteCurated) {
                    concreteFifth = nextNote;
                    found = true;
                    break;
                }
            }

            if (lowerLimitHit) {
                horIndex++;
            } else {
                horIndex--;
            }
        }
        return concreteFifth;
    }

    /**
     * 
     * @param {*} fullRhythm 
     * @returns 
     */
    leftPartition(fullRhythm) {
        let length = fullRhythm.length;
        let half = Math.floor(length / 2);
        const newArray = new Array(length).fill(0);
        for (let i = 0; i < half; i++) {
            newArray[i] = fullRhythm[i];
            let remainingIndices = half - i;
            if (newArray[i] > remainingIndices) {
                newArray[i] = remainingIndices;
            }
        }
        return newArray;
    }

    /**
     * 
     * @param {*} fullRhythm 
     * @returns 
     */
    rightPartition(fullRhythm) {
        let length = fullRhythm.length;
        let offset = Math.floor(length / 2);
        const newArray = new Array(length).fill(0);
        for (let i = 0; i < offset; i++) {
            newArray[offset + i] = fullRhythm[i];
        }

        for (let i = offset; i < length; i++) {
            let remainingIndices = length - i;
            if (newArray[i] > remainingIndices) {
                newArray[i] = remainingIndices;
            }
        }
        return newArray;
    }

    /**
     * 
     * @param {*} originalMap 
     * @returns 
     */
    deepCopyMap(originalMap) {
        const newMap = new Map();
        for (const [key, value] of originalMap) {
            // If the value is an array, create a new array with the same elements
            newMap.set(key, Array.isArray(value) ? [...value] : value);
        }
        return newMap;
    }
}

export default BassBar;