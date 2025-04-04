import PianoBar from "./PianoBar.js";
import BassBar from "./BassBar.js";
import DrumsBar from "./DrumsBar.js";
import StylesLibrary from './StylesLibrary.js';

class Bar {

    #pianoBar;
    #bassBar;
    #drumsBar;

    /**
     * 
     */
    constructor() {

    
        this.#pianoBar = new PianoBar([16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        this.#bassBar = new BassBar(StylesLibrary.getBass('Rock', 'Bass 1'));
        this.#drumsBar = new DrumsBar(StylesLibrary.getBass('Rock', 'Drums 1'));
    }

    /**
     * 
     * @param {*} pianoBar 
     */
    setPianoBar(pianoBar) {

        this.#pianoBar = pianoBar;
    }

    /**
     * 
     * @param {*} bassBar 
     */
    setBassBar(bassBar) {

        this.#bassBar = bassBar;
    }

    /**
     * 
     * @param {*} drumsBar 
     */
    setDrumsBar(drumsBar) {

        this.#drumsBar = drumsBar;
    }

    /**
     * 
     * @returns 
     */
    getPianoBar() {

        return this.#pianoBar;
    }

    /**
     * 
     * @returns 
     */
    getBassBar() {

        return this.#bassBar;
    }
    
    /**
     * 
     * @returns 
     */
    getDrumsBar() {
        
        return this.#drumsBar;
    }
}

export default Bar;