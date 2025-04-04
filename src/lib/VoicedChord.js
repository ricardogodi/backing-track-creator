class VoicedChord {

    #voicedUpperVoices;
    #concreteBass;

    /**
     * 
     * @param {*} voicedUpperVoices 
     * @param {*} concreteBass 
     */
    constructor(voicedUpperVoices, concreteBass) {

        this.#voicedUpperVoices = voicedUpperVoices;
        this.#concreteBass = concreteBass;
    }
    
    /**
     * 
     * @returns 
     */
    getVoicedUpperVoices() {

        return this.#voicedUpperVoices;
    }

    /**
     * 
     * @returns 
     */
    getConcreteBass() {

        return this.#concreteBass;
    }

    /**
     * 
     * @param {*} voicedUpperVoices 
     */
    setVoicedUpperVoices(voicedUpperVoices) {

        this.#voicedUpperVoices = voicedUpperVoices;
    }   

    /**
     * 
     * @param {*} concreteBass 
     */
    setConcreteBass(concreteBass) {
        
        this.#concreteBass = concreteBass;
    }


    printState() {
        console.log('---------------------------------------------------------------------');
        console.log('                      Printing current Chord state:                  ');
        console.log('---------------------------------------------------------------------');
        console.log();
        console.log(`Upper Voices:                  ${this.#voicedUpperVoices}`);
        console.log(`Concrete Bass:                 ${this.#concreteBass}`);
        console.log();
        console.log('---------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------');
    }
}

export default VoicedChord;