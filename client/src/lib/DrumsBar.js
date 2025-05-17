import StylesLibrary from "./StylesLibrary.js";

class DrumsBar {

    #drumsRythm;

    /**
     * 
     */
    constructor(rhythm) {
        this.#drumsRythm = rhythm
    }

    /**
     * 
     * @param {*} components 
     */
    setDrumsRhythm(components) { 
        this.#drumsRythm = new Map();
        for (let [component, rhythm] of components) {  
            let newRhythmArr = structuredClone(rhythm);
            this.#drumsRythm.set(component,newRhythmArr);
        }
    }

    /**
     * 
     * @returns 
     */
    getDrumsRhythm() {
        return this.#drumsRythm;
    }
}

export default DrumsBar;