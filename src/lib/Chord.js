import MusicalCore from "./MusicalCore.js";

class Chord {

    // Base properties
    #root;
    #quality;
    
    // Dependent properties
    #type;
    #notes;
    #baseTriad;
    #upperVoices;

    /**
     * 
     * @param {*} root 
     * @param {*} quality 
     */
    constructor(root, quality) {

        this.#root = root;
        this.#quality = quality;
        this.#setDependentProperties();
    }

    /**
     * 
     * @returns 
     */
    getRoot() {

        return this.#root;
    }

    /**
     * 
     * @returns 
     */
    getQuality() {

        return this.#quality;
    }

    /**
     * 
     * @returns 
     */
    getType() {

        return this.#type;
    }

    /**
     * 
     * @returns 
     */
    getNotes() {

        return this.#notes;
    }

    /**
     * 
     * @returns 
     */
    getBaseTriad() {

        return this.#baseTriad;
    }

    /**
     * 
     * @returns 
     */
    getUpperVoices() {

        return this.#upperVoices;
    }

    /**
     * 
     * @param {*} newRoot 
     * 
     * Setting a new root does not change the quality of the chord.
     * Example:
     * Initially we have root = D, quality = maj7.
     * After setting the root to E we get root = E, quality = maj7
     */
    setRoot(newRoot) {

        if (this.#root != newRoot) {
            this.#root = newRoot;
            this.#setDependentProperties();
        }
    }

    /**
     * 
     * @param {*} newQuality 
     */
    setQuality(newQuality) {

        if (this.#quality != newQuality) {
            this.#quality = newQuality;
            this.#setDependentProperties();
        }
    }

    /**
     * 
     */
    #setDependentProperties() {

        this.#notes = Object.freeze(MusicalCore.generateChord(this.#root, this.#quality));
        this.#type = Object.freeze(MusicalCore.getChordTypeByChordQuality(this.#quality));
        this.#baseTriad = this.#setBaseTriad();  // must freeze
        this.#upperVoices = this.#setUpperVoices();  // must freeze
    }

    /**
     * 
     * @returns 
     */
    #setBaseTriad() {

        if (this.#notes == null) {
            throw new Error('notes is null')
        } else {
            return this.#notes.slice(0, 3);
        }
    }

    /**
     * 
     * @returns 
     */
    #setUpperVoices() {

        if (this.#notes == null) {

            throw new Error('"notes" is null')
        }

        if (this.#type != 'triad' && this.#type != 'seventhChord') {

            throw new Error('"type" is neither triad or seventhChord')
        }
     
        if (this.#type == 'triad') {

            return this.#notes.slice(0, 3);

        } else { // this.#type == 'seventhChord'
           
            let third = this.#notes[1];
            let seventh = this.#notes[3];
            var upperVoicesSeventhChord = [];
            
            upperVoicesSeventhChord.push(third);
            upperVoicesSeventhChord.push(seventh);

            return upperVoicesSeventhChord;
        }
    }

    /**
     * 
     */
    printState() {
        console.log('---------------------------------------------------------------------');
        console.log('                      Printing current Chord state:                  ');
        console.log('---------------------------------------------------------------------');
        console.log();
        console.log(`Root:                  ${this.#root}`);
        console.log(`Quality:               ${this.#quality}`);
        console.log(`Chord Type:            ${this.#type}`);
        console.log();
        console.log(`Chord Notes:           ${this.#notes.join(", ")}`);
        console.log(`Base Triad:            ${this.#baseTriad.join(", ")}`);
        console.log(`Upper Voices:          ${this.#upperVoices.join(", ")}`);
        console.log();
        console.log('---------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------');
    }
}

export default Chord;
