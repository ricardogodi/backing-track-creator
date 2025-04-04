import StylesLibrary from "./StylesLibrary.js";

class PianoBar {

    #leftConcreteChord;
    #rightConcreteChord;

    #hasLeftChord;
    #hasRightChord;

    #baseRhythm;
    #leftChordRhythm;
    #rightChordRhythm;



    //#rhythm;

    /**
     * 
     */
    constructor(rhythm) {

        this.#leftConcreteChord = null;
        this.#rightConcreteChord = null;

        this.#hasLeftChord = false;
        this.#hasRightChord = false;

       // console.log("piano constructor: ")
       // console.log(rhythm)
        this.#baseRhythm = [...rhythm]

        this.#leftChordRhythm = [...rhythm]
    }

    /**
     * 
     * @param {*} notes 
     */
    setLeftConcreteChord(notes) {

        this.#leftConcreteChord = notes;
        this.#hasLeftChord = true;
       // console.log("now has left chord")
    }

    /**
     * 
     * @param {*} notes 
     */
    setRightConcreteChord(notes) {

        this.#rightConcreteChord = notes;
        this.#hasRightChord = true;

        this.#leftChordRhythm = this.leftPartition(this.#leftChordRhythm);
        this.#rightChordRhythm = this.rightPartition(this.#leftChordRhythm);
    }

    /**
     * 
     * @returns 
     */
    getLeftConcreteChord() {

        return this.#leftConcreteChord
    }

    /**
     * 
     * @returns 
     */
    getRightConcreteChord() {

        return this.#rightConcreteChord
    }

    /**
     * 
     * @param {*} rhythm 
     */
    setPianoRhythm(rhythm) {
        
        this.#baseRhythm = this.deepCopyMap(rhythm)

        if (this.hasTwoChords()) {

            this.#leftChordRhythm = this.deepCopyMap(this.#baseRhythm)
            this.#rightChordRhythm = this.deepCopyMap(this.#baseRhythm)

            this.#leftChordRhythm = this.leftPartition(rhythm);
            this.#rightChordRhythm = this.leftPartition(rhythm);

        } else {

            this.#leftChordRhythm = this.deepCopyMap(this.#baseRhythm); // Set the whole rhythm
        }
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

       // console.log("this.#hasLeftChord is: ", this.#hasLeftChord )
       // console.log("this.#hasRightChord is: ", this.#hasRightChord)
       // console.log("left chord is: ", this.#leftConcreteChord)



        return this.#hasLeftChord || this.#hasRightChord;
    }

    hasTwoChords() {

        return this.#hasLeftChord && this.#hasRightChord;
    }

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

    deepCopyMap(originalMap) {
        
        const newMap = new Map();

        for (const [key, value] of originalMap) {
            // If the value is an array, create a new array with the same elements
            newMap.set(key, Array.isArray(value) ? [...value] : value);
        }

        return newMap;
    }
}

export default PianoBar;