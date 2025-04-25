class HarmonySequenceIterator {

    #harmonySeq
    #position

    /**
     * 
     * @param {*} harmonySeq 
     */
    constructor(harmonySeq) {
        this.#harmonySeq = harmonySeq;
        this.#position = 0;
    }

    /**
     * 
     * @returns 
     */
    hasNext() {
        if (this.#position < this.#harmonySeq.getNumOfBars()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @returns 
     */
    next() {
        let bar = this.#harmonySeq.getBarAt(this.#position)
        this.#position++;
        return bar
    }
}

export default HarmonySequenceIterator;