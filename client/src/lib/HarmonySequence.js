import MusicalCore from "./MusicalCore.js";
import HarmonyBar from "./HarmonyBar.js";
import VoicedChord from "./VoicedChord.js";
import ChordLinker from "./ChordLinker.js"
import Chord from "./Chord.js";
import HarmonySequenceIterator from "./HarmonySequenceIterator.js"

class HarmonySequence {

    #bars;
    #initialHarmonicPosition;
    #firstChordType;
    #firstBarWithChordIndex;
    #numOfBars;
    #playback; // Observer
    #observers;

    /**
     * 
     */
    constructor() {
        this.#numOfBars = 4;
        this.#initializeBars();
        this.#initialHarmonicPosition = 0;
        this.#firstChordType = null;
        this.#firstBarWithChordIndex = -1;
        this.#observers = []
    }

    registerObserver(observer) {
        this.#observers.push(observer)
    }

    #notifyObservers() {
        this.#observers.forEach(observer => {
            if (typeof observer.updateHarmony === 'function') {
                observer.updateHarmony(this.createIterator());
            }
        });
    }

    getBarLabels() {
        const labels = [];
        for (let i = 0; i < this.#numOfBars; i++) {
            labels.push(this.#bars[i].getChordLabels());
        }
        return labels;
    }

    load(chords) {

        this.#numOfBars = chords.length;
        this.#initializeBars();

        chords.forEach((labelObj, barIndex) => {
            if (labelObj.left) {
                const quality = labelObj.left.quality === "" ? "M" : labelObj.left.quality;
                const chord = new Chord(labelObj.left.root, quality);
                this.insertChordAtBar(chord, barIndex, "left");
            }

            if (labelObj.middle) {
                const quality = labelObj.middle.quality === "" ? "M" : labelObj.middle.quality;
                const chord = new Chord(labelObj.middle.root, quality);
                this.insertChordAtBar(chord, barIndex, "middle");
            }

            if (labelObj.right) {
                const quality = labelObj.right.quality === "" ? "M" : labelObj.right.quality;
                const chord = new Chord(labelObj.right.root, quality);
                this.insertChordAtBar(chord, barIndex, "right");
            }
        });

        this.#notifyObservers();
    }

    transpose(numSemitones) {
        const transportedLabels = [];

        for (let i = 0; i < this.#numOfBars; i++) {
            const chordLabel = this.#bars[i].getChordLabels();
            const transported = {
                left: chordLabel.left
                    ? {
                        root: this.#transposeRoot(chordLabel.left.root, numSemitones),
                        quality: chordLabel.left.quality
                    }
                    : null,
                middle: chordLabel.middle
                    ? {
                        root: this.#transposeRoot(chordLabel.middle.root, numSemitones),
                        quality: chordLabel.middle.quality
                    }
                    : null,
                right: chordLabel.right
                    ? {
                        root: this.#transposeRoot(chordLabel.right.root, numSemitones),
                        quality: chordLabel.right.quality
                    }
                    : null
            };
            transportedLabels.push(transported);
        }

        this.load(transportedLabels)
    }

    #transposeRoot(root, numSemitones) {
        let index = MusicalCore.getIndexInOneOctaveChromaticScale(root);
        let scaleName = MusicalCore.getOneOctaveChromaticScaleByNote(root);
        let transported = scaleName[(index + numSemitones) % 12];
        return transported
    }

    reset() {
        this.#numOfBars = 4;
        this.#initializeBars();
        this.#notifyObservers();
    }

    /**
     * 
     */
    #initializeBars() {
        this.#bars = [];
        for (let i = 0; i < this.#numOfBars; i++) {
            this.#bars.push(new HarmonyBar());
        }
    }

    /**
     * 
     */
    addBar() {
        this.#bars.push(new HarmonyBar());
        this.#numOfBars++;
        this.#notifyObservers();
    }

    popBar() {
        if (this.#numOfBars <= 1) return;

        this.#bars.pop();
        this.#numOfBars--;

        // Recompute first bar with chord
        this.#firstBarWithChordIndex = this.findBarWithFirstChordIndex();

        if (this.#firstBarWithChordIndex !== -1) {
            const chord = this.#bars[this.#firstBarWithChordIndex].getLeftChord();
            this.#firstChordType = chord.getType();
            this.#linkAll(chord, this.#firstBarWithChordIndex, "left");
        }

        this.#notifyObservers();
    }

    /**
     * 
     * @returns 
     */
    getNumOfBars() {
        return this.#bars.length;
    }

    /**
     * 
     * @param {*} index 
     * @returns 
     */
    getBarAt(index) {
        return this.#bars[index]
    }

    /**
     * 
     * @returns 
     */
    createIterator() {
        return new HarmonySequenceIterator(this)
    }

    /**
     * 
     */
    changeInitialHarmonicPosition() {
        if (this.#firstChordType == 'triad') {
            let pos = this.#initialHarmonicPosition;
            this.#initialHarmonicPosition = (pos + 1) % 3;
        } else { // firstChordType == 'seventhChord'
            let pos = this.#initialHarmonicPosition;
            this.#initialHarmonicPosition = (pos + 1) % 2;
        }

        if (this.#firstBarWithChordIndex != -1) {
            var firstChord = this.#bars[this.#firstBarWithChordIndex].getLeftChord();
            const CHORD_POSITION = "left";
            this.#linkAll(firstChord, this.#firstBarWithChordIndex, CHORD_POSITION);
        }
        this.#notifyObservers();
    }

    /**
     * 
     * @param {*} chord 
     * @param {*} index 
     */
    insertChordAtBar(chord, barIndex, chordPosition) {
        // Validate index
        if ((barIndex < 0) || (barIndex >= this.#numOfBars)) {
            console.log(`numOfBars is: ${this.#numOfBars}`)
            throw new Error(`index ${barIndex} is out of bounds`);
        }

        const bar = this.#bars[barIndex];

        if (bar.hasTwoChords()) { // Bar has two chords
            if (chordPosition == 'left') { // Insert to the left
                bar.setLeftChord(chord);
            } else if (chordPosition == 'right') { // Insert to the right
                bar.setRightChord(chord);
            }
        } else if (bar.hasAChord()) {  // The only chord must be on the left
            if (chordPosition == 'left') {
                bar.setRightChord(bar.getLeftChord()); // Move left chord to the right 
                bar.setLeftChord(chord);
            } else if (chordPosition == 'middle') {
                bar.setLeftChord(chord)
            } else if (chordPosition == 'right') {
                bar.setRightChord(chord);
            }
        } else { // Bar has no chord
            bar.setLeftChord(chord);
        }

        if (this.#firstBarWithChordIndex == -1 || barIndex < this.#firstBarWithChordIndex) {
            this.#firstBarWithChordIndex = barIndex;
            this.#firstChordType = chord.getType();
        } else if (barIndex == this.#firstBarWithChordIndex && chordPosition == 0) {
            this.#firstChordType = chord.getType();
        }

        if (chordPosition == "middle") {
            this.#linkAll(chord, barIndex, "left");
        } else {
            this.#linkAll(chord, barIndex, chordPosition);
        }

        this.#notifyObservers();
    }

    /**
     * 
     * @param {*} barIndexFrom 
     * @param {*} barIndexTo 
     * @param {*} positionFrom 
     * @param {*} positionTo 
     */
    switchChords(barIndexFrom, barIndexTo, positionFrom, positionTo) {
        let barFrom = this.#bars[barIndexFrom]
        let barTo = this.#bars[barIndexTo]

        // First get the chord references
        let chordFrom;

        if (positionFrom == 'left') {
            chordFrom = barFrom.getLeftChord();
        } else if (positionFrom == 'right') {
            chordFrom = barFrom.getRightChord();
        }

        let chordTo;

        if (positionTo == 'left') {
            chordTo = barTo.getLeftChord();
        } else if (positionTo == 'right') {
            chordTo = barTo.getRightChord();
        }

        // Now we do the switching
        if (positionTo == 'left') {
            barTo.setLeftChord(chordFrom);
        } else if (positionTo == 'right') {
            barTo.setRightChord(chordFrom);
        }

        if (positionFrom == 'left') {
            barFrom.setLeftChord(chordTo);
        } else if (positionFrom == 'right') {
            barFrom.setRightChord(chordTo);
        }
    }

    /**
     * 
     * @param {*} barIndexFrom 
     * @param {*} barIndexTo 
     * @param {*} positionFrom 
     * @param {*} positionTo 
     */
    moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo) {

        let barFrom = this.#bars[barIndexFrom]
        let barTo = this.#bars[barIndexTo]
        let chordFrom;

        if (positionFrom == 'left') {
            chordFrom = barFrom.getLeftChord();
        } else if (positionFrom == 'middle') {
            chordFrom = barFrom.getLeftChord();
        } else if (positionFrom == 'right') {
            chordFrom = barFrom.getRightChord();
        }

        let chordTo;

        if (barTo.hasAChord() && !barTo.hasTwoChords()) { // barTo has exactly one chord
            chordTo = barTo.getLeftChord();
        } else if (barTo.hasTwoChords()) {
            if (positionTo == 'left') {
                chordTo = barTo.getLeftChord();
            } else if (positionTo == 'right') {
                chordTo = barTo.getRightChord();
            }
        }

        if (barFrom.hasAChord() && !barFrom.hasTwoChords()) { // Bar from has exactly one chord
            if (!barTo.hasAChord()) { // Bar to has no chords
                barTo.setLeftChord(chordFrom);
                barFrom.removeChordAtPosition(positionFrom);
            } else if (barTo.hasAChord() && !barTo.hasTwoChords()) { // Bar to has exactly chord
                if (positionTo == "left") {
                    barTo.setLeftChord(chordFrom);
                    barTo.setRightChord(chordTo); // Move left chord to the right
                    barFrom.removeChordAtPosition(positionFrom);
                } else if (positionTo == "middle") { // switch chords
                    barTo.setLeftChord(chordFrom);
                    barFrom.setLeftChord(chordTo);
                } else if (positionTo == "right") {
                    barTo.setLeftChord(chordTo);  // Move right chord to the left
                    console.log(barTo.getLeftChord())
                    barTo.setRightChord(chordFrom);
                    barFrom.removeChordAtPosition(positionFrom);
                }
            } else if (barTo.hasTwoChords()) { // Bar to has two chords
                if (positionTo == "left") {
                    barTo.setLeftChord(chordFrom);
                    barFrom.setLeftChord(chordTo);
                } else if (positionTo == "right") {
                    barTo.setRightChord(chordFrom);
                    barFrom.setLeftChord(chordTo);
                }
            }
        } else if (barFrom.hasTwoChords()) { // Bar from has two chords
            if (!barTo.hasAChord()) { // Bar to has no chords
                if (positionFrom == "left") {
                    barTo.setLeftChord(chordFrom);
                    barFrom.setLeftChord(barFrom.getRightChord()); // Move right chord to the left
                    barFrom.removeChordAtPosition("right") // Remove the chord from the right
                } else if (positionFrom == "right") {
                    barTo.setLeftChord(chordFrom);
                    barFrom.removeChordAtPosition("right") // Just remove the right chord  
                }
            } else if (barTo.hasAChord() && !barTo.hasTwoChords()) { // Bar to has exactly chord
                if (positionTo == "left") {
                    barTo.setLeftChord(chordFrom);
                    barTo.setRightChord(chordTo); // Move left chord to the right
                    if (positionFrom == "left") {
                        barFrom.setLeftChord(barFrom.getRightChord()) // Move right chord to the left
                        barFrom.removeChordAtPosition("right"); // Remove right chord
                    } else if (positionFrom == "right") {
                        barFrom.removeChordAtPosition("right");
                    }
                } else if (positionTo == "middle") { // switch chords
                    barTo.setLeftChord(chordFrom);
                    if (positionFrom == "left") {
                        barFrom.setLeftChord(chordTo)
                    } else if (positionFrom == "right") {
                        barFrom.setRightChord(chordTo)
                    }
                } else if (positionTo == "right") {
                    barTo.setRightChord(chordFrom);
                    if (positionFrom == "left") {
                        barFrom.setLeftChord(barFrom.getRightChord()) // Move right chord to the left
                        barFrom.removeChordAtPosition("right"); // Remove right chord
                    } else if (positionFrom == "right") {
                        barFrom.removeChordAtPosition("right");
                    }
                }
            } else if (barTo.hasTwoChords()) {  // Bar to has two chords
                if (positionTo == "left") {
                    barTo.setLeftChord(chordFrom);
                    if (positionFrom == "left") {
                        barFrom.setLeftChord(chordTo);
                    } else if (positionFrom == "right") {
                        barFrom.setRightChord(chordTo);
                    }
                } else if (positionTo == "right") {
                    barTo.setRightChord(chordFrom);
                    if (positionFrom == "left") {
                        barFrom.setLeftChord(chordTo);
                    } else if (positionFrom == "right") {
                        barFrom.setRightChord(chordTo);
                    }
                }
            }
        }
        this.#firstBarWithChordIndex = this.findBarWithFirstChordIndex();
        let firstChord = this.#bars[this.#firstBarWithChordIndex].getLeftChord();
        this.#firstChordType = firstChord.getType();
        this.#linkAll(firstChord, this.#firstBarWithChordIndex, "left")
        this.#notifyObservers();
    }

    /**
     * 
     * @param {*} barIndex 
     * @param {*} removePosition 
     * @returns 
     */
    removeChordAtBarAndPosition(barIndex, removePosition) {
        if (barIndex < 0 || barIndex >= this.#bars.length) {
            console.error(`Invalid barIndex: ${barIndex}`);
            return;
        }

        let bar = this.#bars[barIndex];

        bar.removeChordAtPosition(removePosition);
        this.#firstBarWithChordIndex = this.findBarWithFirstChordIndex();
        // We want to link all the chords from the start
        if (this.#firstBarWithChordIndex != -1) { // There is a chord in the sequence
            let bar = this.#bars[this.#firstBarWithChordIndex];
            let chord = bar.getLeftChord(); // Get the very first chord
            this.#firstChordType = chord.getType();
            this.#linkAll(chord, this.#firstBarWithChordIndex, 0)
        }
        this.#notifyObservers();
    }

    /**
     * 
     * @returns 
     */
    findBarWithFirstChordIndex() {
        let size = this.#numOfBars;
        for (let i = 0; i < size; i++) {
            if (this.#bars[i].hasAChord()) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 
     * @param {*} curChord 
     * @param {*} barIndex 
     */
    #linkAll(curChord, barIndex, chordPosition) {
        let prevChordIndex = this.#getLeftChordIndex(barIndex, chordPosition);
        var curVoicedUpperNotes;
        var curBassConcrete;

        if (prevChordIndex != -1) { // There is a chord to the left
            const leftBar = this.#bars[prevChordIndex];
            let prevVoicedChord;
            let prevChord;

            if (barIndex == prevChordIndex) { // Left chord is in the same bar!
                prevVoicedChord = leftBar.getLeftVoicedChord();
                prevChord = leftBar.getLeftChord();
            } else { // Left chord is in a different bar
                if (leftBar.hasRightChord()) {
                    prevVoicedChord = leftBar.getRightVoicedChord();
                    prevChord = leftBar.getRightChord();
                } else {  // Bar on the left must have one chord
                    prevVoicedChord = leftBar.getLeftVoicedChord();
                    prevChord = leftBar.getLeftChord();
                }
            }

            // Pass VoicedChord, Chord object arguments
            curVoicedUpperNotes = ChordLinker.linkTwoChords(prevChord, prevVoicedChord, curChord);
            curBassConcrete = ChordLinker.linkTwoBassNotes(prevChord, prevVoicedChord, curChord);

        } else { // There is no chord to the left
            // set initial position
            curVoicedUpperNotes = this.#upperVoicesInitialPosition(curChord);
            curBassConcrete = this.#bassInitialPosition(curChord);
        }

        let newVoicedChord = new VoicedChord(curVoicedUpperNotes, curBassConcrete); // Create the VoicedChord

        if (chordPosition == 'left') {
            this.#bars[barIndex].setVoicedLeftChord(newVoicedChord);
        } else if (chordPosition == 'right') {
            this.#bars[barIndex].setVoicedRightChord(newVoicedChord);
        }

        let nextChordBarIndex = this.#getRightChordIndex(barIndex, chordPosition);

        if (nextChordBarIndex != -1) { // There is a chord to the right 
            let rightBar = this.#bars[nextChordBarIndex]
            if (nextChordBarIndex == barIndex) { // Next chord in the same bar! 
                let nextChord = rightBar.getRightChord(); // Get next bar's Chord object
                this.#linkAll(nextChord, nextChordBarIndex, "right"); // Pass next bar's Chord object, and it's index
            } else {
                let nextChord = rightBar.getLeftChord(); // Get next bar's Chord object
                this.#linkAll(nextChord, nextChordBarIndex, "left"); // Pass next bar's Chord object, and it's index
            }
        } // We do not recurse
    }

    /**
     * 
     * @param {*} barIndex 
     * @returns 
     */
    #getLeftChordIndex(barIndex, chordPosition) {
        let size = this.#bars.length;
        // Validate index
        if (barIndex < 0 || barIndex >= size) {
            throw new Error(`index ${barIndex} inside getLeftChordIndex(index) is out of bounds `);
        }

        if (chordPosition == "right") {  // Starting chord is on the right, therefore it must have a left chord
            return barIndex;
        }

        // If we get here, the starting chord is on the left. 
        // We can start looking for the chord
        for (let i = barIndex - 1; i >= 0; i--) {
            if (this.#bars[i].hasLeftChord()) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 
     * @param {*} index 
     * @returns 
     */
    #getRightChordIndex(barIndex, chordPosition) {
        let size = this.#bars.length;
        // Validate index
        if (barIndex < 0 || barIndex >= size) {
            throw new Error(`index ${index} inside getRightChordIndex(index) is out of bounds `);
        }

        const bar = this.#bars[barIndex]
        if (chordPosition == "left" && bar.hasTwoChords()) {
            // Chord is on the left and bar has two chords. Then the chord on the right is the one in the same bar
            return barIndex;
        }

        for (let i = barIndex + 1; i < size; i++) {
            if (this.#bars[i].hasLeftChord()) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 
     * @param {*} chord 
     * @returns 
     */
    #upperVoicesInitialPosition(chord) {
        var upperVoices = chord.getUpperVoices();
        let pos = this.#initialHarmonicPosition;
        var targetNotes;
        if (this.#firstChordType == 'triad') {
            if (pos == 0) {
                targetNotes = MusicalCore.rotateStructure(upperVoices, 0);
            }
            if (pos == 1) {
                targetNotes = MusicalCore.rotateStructure(upperVoices, 1);
            }
            if (pos == 2) {
                targetNotes = MusicalCore.rotateStructure(upperVoices, 2);
            }
        } else { // this.#firstChordType == 'seventhChord'
            if (pos == 0) {
                targetNotes = MusicalCore.rotateStructure(upperVoices, 0);
            }
            if (pos == 1) {
                targetNotes = MusicalCore.rotateStructure(upperVoices, 1);
            }
        }

        /*let lowerVoice = targetNotes[0]; // Lower note
        // Transform to the note in the fourth octave
        lowerVoice = lowerVoice + "4";*/

        // determine A3 to be the lowest
        let horIndex = 36;/*MusicalCore.getIndexInFullPitchChromaticScale(lowerVoice);*/
        let allChromScales = MusicalCore.getAllFullPitchChromaticScales();
        let length = targetNotes.length;
        var voicedUpperVoices = []
        for (let i = 0; i < length; i++) {
            let nextTargetNote = targetNotes[i];
            let found = false;
            while (!found) {
                for (let [_, chromScale] of allChromScales) {
                    let nextNote = chromScale[horIndex];
                    let noteWithoutOctave = MusicalCore.removePitchOctave(nextNote);
                    if (noteWithoutOctave == nextTargetNote) {
                        voicedUpperVoices.push(nextNote);
                        found = true;
                        break;
                    }
                }
                horIndex++;
            }
        }
        return voicedUpperVoices;
    }

    /**
     * 
     * @param {*} chord 
     * @returns 
     */
    #bassInitialPosition(chord) {
        var bassTarget = chord.getRoot();
        let horIndex = 12;  // A1
        let allChromScales = MusicalCore.getAllFullPitchChromaticScales();
        var concreteBass;
        let found = false;

        while (!found) {
            for (let [_, chromScale] of allChromScales) {
                let nextNote = chromScale[horIndex];
                let noteWithoutOctave = MusicalCore.removePitchOctave(nextNote);
                if (noteWithoutOctave == bassTarget) {
                    concreteBass = nextNote;
                    found = true;
                    break;
                }
            }
            horIndex++;
        }
        ChordLinker.setAverageBass(concreteBass);
        ChordLinker.setHighestBass(concreteBass);
        ChordLinker.setLowestBass(concreteBass);
        return concreteBass;
    }

    printState() {
        for (let i = 0; i < this.#numOfBars; i++) {
            let nextBar = this.#bars[i]
            if (nextBar.hasTwoChords()) {
                nextBar.getLeftChord().printState();
                nextBar.getLeftVoicedChord().printState();

                nextBar.getRightChord().printState();
                nextBar.getRightVoicedChord().printState();
            } else if (nextBar.hasAChord()) {

                nextBar.getLeftChord().printState();
                nextBar.getLeftVoicedChord().printState();
            }
        }
    }
}

export default HarmonySequence;