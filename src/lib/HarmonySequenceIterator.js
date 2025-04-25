class HarmonySequenceIterator {

    #harmonySeq
    #position

    constructor(harmonySeq) {
        this.#harmonySeq = harmonySeq;
        this.#position = 0;
    }

    hasNext() {
        if (this.#position < this.#harmonySeq.getNumOfBars()) {
            return true;
        } else {
            return false;
        }
    }

    next() {
        let bar = this.#harmonySeq.getBarAt(this.#position)
        this.#position++;
        return bar
    }
}

export default HarmonySequenceIterator;