import MusicalCore from "./MusicalCore.js";
import HarmonyBar from "./HarmonyBar.js";
import Chord from "./Chord.js";
import VoicedChord from "./VoicedChord.js";
import ChordLinker from "./ChordLinker.js"
import Playback from "./Playback.js";


class HarmonySequence {

    #bars;
    #initialHarmonicPosition;
    #firstChordType;
    #firstBarWithChordIndex;
    #numOfBars;

    #playback; // Observer

    /**
     * 
     * @param {*} playback 
     */
    constructor(playback) {

        this.#numOfBars = 4;
        this.#initializeBars();

        this.#initialHarmonicPosition = 0;
        this.#firstChordType = null;
        this.#firstBarWithChordIndex = -1;

        this.#playback = playback;
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
    }

    getNumOfBars() {

        console.log(`this.#bars.length: ${this.#bars.length}`)
        return this.#bars.length;
    }

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
            this.#linkAll(firstChord, this.#firstBarWithChordIndex);
        }

        this.#playback.updateHarmony(this.#bars);
    }

    /**
     * 
     * @param {*} chord 
     * @param {*} index 
     */
    insertChordAtBar(chord, barIndex, chordPosition) { // 0 ->left, 1 -> middle(replace)   2 -> right 

        /*
        we can only insert to the right when bar already has a chord
        */

        // Validate index
        if ((barIndex < 0) || (barIndex >= this.#numOfBars)) {
            throw new Error(`index ${index} is out of bounds`);
        }

        const bar = this.#bars[barIndex];

        if (bar.hasTwoChords()) { // Bar has two chords

            console.log("Bar has two chords")

            if (chordPosition == 'left') { // Insert to the left

                bar.setLeftChord(chord);

            } else if (chordPosition == 'right') { // Insert to the right

                bar.setRightChord(chord);

            }

        } else if (bar.hasAChord()) {  // The only chord must be on the left

            console.log("Bar has one chord exactly")

            if (chordPosition == 'left') {

                console.log("Inserting to the left")

                bar.setRightChord(bar.getLeftChord()); // Move left chord to the right 
                bar.setLeftChord(chord);

            } else if (chordPosition == 'middle') {

                console.log("Inserting to the 'middle''")

                bar.setLeftChord(chord)

            } else if (chordPosition == 'right') {

                bar.setRightChord(chord);

            }

        } else { // Bar has no chord

            console.log("Bar has no chord")
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

        this.#playback.updateHarmony(this.#bars);
    }

    switchChords(barIndexFrom, barIndexTo, positionFrom, positionTo) {

        console.log(`Switching chord at barIndex ${barIndexFrom}, position ${positionFrom}, WITH barIndex ${barIndexTo}, position ${positionTo}`)

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

    moveChord(barIndexFrom, barIndexTo, positionFrom, positionTo) {

        console.log(`barIndexFrom: ${barIndexFrom} barIndexTo: ${barIndexTo} positionFrom: ${positionFrom} positionTo: ${positionTo}`)

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
                //console.log(`chordTo is: ${chordTo}`)
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


                    console.log("NOW WE ARE HERE")
                    
                    barTo.setLeftChord(chordTo);  // Move right chord to the left
                    
                    console.log(barTo.getLeftChord())
                    barTo.setRightChord(chordFrom);


                    barFrom.removeChordAtPosition(positionFrom);
                    console.log(`barFrom has two chords? ${barFrom.hasTwoChords()}`)
                    console.log(`barTo has two chords? ${barTo.hasTwoChords()}`)

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
                    console.log("FROG")
                    barTo.setLeftChord(chordFrom);
                    barFrom.removeChordAtPosition("right") // Just remove the right chord  
                    console.log(`barFrom ${barIndexFrom} has two chords? ${barFrom.hasTwoChords()}`)      
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

                    //console.log("POTENTIAL BUG")

                    barTo.setLeftChord(chordFrom);

                    if (positionFrom == "left") {
                       // console.log("WEIRD")
                        barFrom.setLeftChord(chordTo)

                    } else if (positionFrom == "right") {
                        
                        barFrom.setRightChord(chordTo)
                    }

                } else if (positionTo == "right") {
                  

                    barTo.setRightChord(chordFrom);
                    // barTo.setRightChord(chordTo); // Move left chord to the right

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

/*

        if (barTo.hasAChord()) {

            console.log("Bar to has chord")
            this.switchChords(barIndexFrom, barIndexTo, positionFrom, positionTo);

        } else { // Bar we are moving the chord to does not have a chord

            let chordFrom;

            if (positionFrom == 'left') {

                chordFrom = barFrom.getLeftChord()

            } else if (positionFrom == 'right') {

                chordFrom = barFrom.getRightChord()
            }

            // Insert chord into empty bar
            barTo.setLeftChord(chordFrom);

            // Remove chord from
            this.removeChordAtBarAndPosition(barIndexFrom, positionFrom);
        }*/

        this.#firstBarWithChordIndex = this.findBarWithFirstChordIndex();
        console.log(  `firstBarWithChordIndex is:  ${ this.#firstBarWithChordIndex}` )
        let firstChord = this.#bars[this.#firstBarWithChordIndex].getLeftChord();
        this.#firstChordType = firstChord.getType();

        this.#linkAll(firstChord, this.#firstBarWithChordIndex, "left")
        this.#playback.updateHarmony(this.#bars);
    }

    removeChordAtBarAndPosition(barIndex, removePosition) {

        if (barIndex < 0 || barIndex >= this.#bars.length) {
            console.error(`Invalid barIndex: ${barIndex}`);
            return;
        }

        //console.log(`Removing at bar ${barIndex} and position ${removePosition}`)

        let bar = this.#bars[barIndex];

        console.log("right before removing")
        bar.removeChordAtPosition(removePosition);
        
             this.#firstBarWithChordIndex = this.findBarWithFirstChordIndex();
     
             // We want to link all the chords from the start
             if (this.#firstBarWithChordIndex != -1) { // There is a chord in the sequence
             
                 let bar = this.#bars[this.#firstBarWithChordIndex];
                 let chord = bar.getLeftChord(); // Get the very first chord
                 this.#firstChordType = chord.getType();
     
                 this.#linkAll(chord, this.#firstBarWithChordIndex, 0)
             }
     
             this.#playback.updateHarmony(this.#bars);
             
    }

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


        //console.log("LINKING!!!!!!!!")

        let prevChordIndex = this.#getLeftChordIndex(barIndex, chordPosition);
        //console.log("prevChordIndex", prevChordIndex)

        var curVoicedUpperNotes;
        var curBassConcrete;

        if (prevChordIndex != -1) { // There is a chord to the left

            // console.log("chordposition: ", chordPosition)
            const leftBar = this.#bars[prevChordIndex];
            // console.log("prevChordIndex: ", prevChordIndex)

            let prevVoicedChord;
            let prevChord;

            if (barIndex == prevChordIndex) { // Left chord is in the same bar!

                prevVoicedChord = leftBar.getLeftVoicedChord();
                prevChord = leftBar.getLeftChord();
                // console.log("prevchord should be: ", prevChord)

            } else { // Left chord is in a different bar

                if (leftBar.hasRightChord()) {

                    prevVoicedChord = leftBar.getRightVoicedChord();
                    prevChord = leftBar.getRightChord();

                } else {  // Bar on the left must have one chord

                    // console.log("must have exe")
                    prevVoicedChord = leftBar.getLeftVoicedChord();
                    prevChord = leftBar.getLeftChord();
                }

                // console.log("prevChord is: ", prevChord)
            }

            //console.log(`Prev chord is: ${prevChord.getUpperVoices()}`)
            //console.log(`Prev voiced chord is: ${prevVoicedChord.getVoicedUpperVoices()}`)

            // Pass VoicedChord, Chord object arguments
            curVoicedUpperNotes = ChordLinker.linkTwoChords(prevChord, prevVoicedChord, curChord);

            //console.log(`Cur chord: ${curChord.getUpperVoices()}`)
            //console.log(`Concrete voiced upper notes now are: ${curVoicedUpperNotes}`)

            curBassConcrete = ChordLinker.linkTwoBassNotes(prevChord, prevVoicedChord, curChord);

        } else { // There is no chord to the left
            // set initial position
            curVoicedUpperNotes = this.#upperVoicesInitialPosition(curChord);
            curBassConcrete = this.#bassInitialPosition(curChord);
        }


        let newVoicedChord = new VoicedChord(curVoicedUpperNotes, curBassConcrete); // Create the VoicedChord

        // console.log("curVoicedUpperNotess ", curVoicedUpperNotes)

        if (chordPosition == 'left') {

            this.#bars[barIndex].setVoicedLeftChord(newVoicedChord);
            //console.log("it was set")

        } else if (chordPosition == 'right') {

            this.#bars[barIndex].setVoicedRightChord(newVoicedChord);
        }

        let nextChordBarIndex = this.#getRightChordIndex(barIndex, chordPosition);

        // console.log("RIGHT BEFORE THE THING")
        if (nextChordBarIndex != -1) { // There is a chord to the right 
            //  console.log(" INSIDE THAT THING!")

            let rightBar = this.#bars[nextChordBarIndex]

            if (nextChordBarIndex == barIndex) { // Next chord in the same bar! 
                //  console.log("YUP SAME BAR!")
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

        // console.log("well... the position is:", chordPosition)
        if (chordPosition == "left" && bar.hasTwoChords()) {
            //console.log("should have exe...")
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

            let nextBar = this.#bars[i];

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