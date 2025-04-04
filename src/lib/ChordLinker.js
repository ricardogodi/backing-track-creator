import MusicalCore from "./MusicalCore.js";
import Chord from "./Chord.js"
import VoicedChord from "./VoicedChord.js";

class ChordLinker {

    static #highestBassIndex;
    static #averageBassIndex;
    static #lowestBassIndex;

    /**
     * 
     * @param {*} highestBass 
     */
    static setHighestBass(highestBass) {
        this.#highestBassIndex = MusicalCore.getIndexInFullPitchChromaticScale(highestBass);
    }

    /**
     * 
     * @param {*} averageBass 
     */
    static setAverageBass(averageBass) {
       this.#averageBassIndex = MusicalCore.getIndexInFullPitchChromaticScale(averageBass);
    }

    /**
     * 
     * @param {*} lowestBass 
     */
    static setLowestBass(lowestBass) {
        this.#lowestBassIndex = MusicalCore.getIndexInFullPitchChromaticScale(lowestBass);
    }

    /**
     * 
     * @param {*} prevChord 
     * @param {*} prevVoicedChord 
     * @param {*} curChord 
     * @returns 
     */
    static linkTwoChords(prevChord, prevVoicedChord, curChord) {

        var prevType = prevChord.getType();
        if (prevType == 'triad') {
            return this.#triadToXCase(prevChord, prevVoicedChord, curChord);
        } else { // prevType == 'seventhChord'
            return this.#seventhToXCase(prevChord, prevVoicedChord, curChord);
        }
    }

    /**
     * 
     * @param {*} prevChord 
     * @param {*} prevVoicedChord 
     * @param {*} curChord 
     * @returns 
     */
    static linkTwoBassNotes(prevChord, prevVoicedChord, curChord) {

        var prevConcreteBass = prevVoicedChord.getConcreteBass();
        var bassTarget = curChord.getRoot();

        var curChordDegreeRelativeToPrevChord = this.#calculateDegree(prevChord.getRoot(), curChord.getRoot());

        var direction = 0;

        switch (curChordDegreeRelativeToPrevChord) {

            case 1:

                direction = 1; // upwards             NASTY BUG HERE G -> Gb         G2 -> Gb3
                break;

            case 2:

                direction = 1; 
                break;

            case 3:

                direction = 1; 
                break;
                
            case 4:

                direction = this.#determineMotion(prevConcreteBass);
                break;

            case 5:

                direction = this.#determineMotion(prevConcreteBass);
                break;

            case 6:

                direction = -1; // downwards
                break;

            case 7:

                direction = -1;
                break;

            default:
                throw new Error ("Something is wrong");
        }

        var concreteBass = this.#findBass(prevConcreteBass, bassTarget, direction);
        
        // Validate concreteBass
        var concreteBassIndex = MusicalCore.getIndexInFullPitchChromaticScale(concreteBass);
        
        if (concreteBassIndex < 7) {  // E1 (at index 7) is the bass's lowest note
     
            var scale = MusicalCore.getFullPitchChromaticScaleByNote(concreteBass); 
            concreteBass = scale[concreteBassIndex + 12];   // Transpose bass one octave higher
        }

        if (concreteBassIndex > 31) {  // E3 (at index ) highest wav file
     
            var scale = MusicalCore.getFullPitchChromaticScaleByNote(concreteBass); 
            concreteBass = scale[concreteBassIndex - 12];   // Transpose bass one octave lower
        }

        var curConcreteBassIndex = MusicalCore.getIndexInFullPitchChromaticScale(concreteBass);
        
        if (curConcreteBassIndex > this.#highestBassIndex) {

            this.#highestBassIndex = curConcreteBassIndex;
        }

        if (curConcreteBassIndex < this.#lowestBassIndex) {

            this.#lowestBassIndex = curConcreteBassIndex
        }

        this.#averageBassIndex = (this.#lowestBassIndex + this.#highestBassIndex) / 2;

        return concreteBass;
    }

    /**
     * 
     * @param {*} prevChord 
     * @param {*} prevVoicedChord 
     * @param {*} curChord 
     * @returns 
     */
    static #triadToXCase(prevChord, prevVoicedChord, curChord) {

        var curChordDegreeRelativeToPrevChord = this.#calculateDegree(prevChord.getRoot(), curChord.getRoot());
        var prevUpperStructureConcrete = prevVoicedChord.getVoicedUpperVoices();
        let length = prevUpperStructureConcrete.length;

        var prevHighPivotWithOctave = prevUpperStructureConcrete[length - 1];
        var prevLowPivotWithOctave = prevUpperStructureConcrete[0];

        var targetTriadNotes = curChord.getBaseTriad();

        var curConcreteTriad;

        switch (curChordDegreeRelativeToPrevChord) {

            case 1:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            case 2:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            case 3:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            case 4:

                curConcreteTriad = this.#bottomUpConstruction(prevLowPivotWithOctave, targetTriadNotes)
                break;

            case 5:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            case 6:

                curConcreteTriad = this.#bottomUpConstruction(prevLowPivotWithOctave, targetTriadNotes)
                break;

            case 7:

                curConcreteTriad = this.#bottomUpConstruction(prevLowPivotWithOctave, targetTriadNotes)
                break;

            default:
                throw new Error('ERROR!')
        }

        var curType = curChord.getType();

        if (curType == 'triad') {

            return curConcreteTriad;

        } else { // curType == 'seventh'

            let length = curConcreteTriad.length;
            var curTriadHighPivotWithOctave = curConcreteTriad[length - 1];
            var curTriadLowPivotWithOctave = curConcreteTriad[0];
            var targetNotes = curChord.getUpperVoices();
            var upperStructureConcrete;

            switch (curChordDegreeRelativeToPrevChord) {

                case 1:

                    upperStructureConcrete = this.#topDownConstruction(curTriadHighPivotWithOctave, targetNotes)
                    break;

                case 2:

                    upperStructureConcrete = this.#bottomUpConstruction(curTriadLowPivotWithOctave, targetNotes)
                    break;

                case 3:

                    upperStructureConcrete = this.#bottomUpConstruction(curTriadLowPivotWithOctave, targetNotes)
                    break;

                case 4:

                    upperStructureConcrete = this.#topDownConstruction(curTriadHighPivotWithOctave, targetNotes)
                    break;

                case 5:

                    upperStructureConcrete = this.#bottomUpConstruction(curTriadLowPivotWithOctave, targetNotes)
                    break;

                case 6:

                    upperStructureConcrete = this.#topDownConstruction(curTriadHighPivotWithOctave, targetNotes)
                    break;

                case 7:

                    upperStructureConcrete = this.#topDownConstruction(curTriadHighPivotWithOctave, targetNotes)
                    break;

                default:
                    throw new Error('ERROR!')
            }

            return upperStructureConcrete;
        }
    }

    /**
     * 
     * @param {*} prevChord 
     * @param {*} prevVoicedChord 
     * @param {*} curChord 
     * @returns 
     */
    static #seventhToXCase(prevChord, prevVoicedChord, curChord) {

        var curChordDegreeRelativeToPrevChord = this.#calculateDegree(prevChord.getRoot(), curChord.getRoot());
        var prevUpperStructureConcrete = prevVoicedChord.getVoicedUpperVoices();

        var third = prevChord.getNotes()[1];
        var length = prevUpperStructureConcrete.length;
        var highNote = prevUpperStructureConcrete[length - 1];

        if (third == MusicalCore.removePitchOctave(highNote)) {

            prevUpperStructureConcrete = this.#getHelperTriad(prevChord, prevVoicedChord);
            length = prevUpperStructureConcrete.length;
        }

        var prevHighPivotWithOctave = prevUpperStructureConcrete[length - 1];
        var prevLowPivotWithOctave = prevUpperStructureConcrete[0];

        var targetTriadNotes = curChord.getBaseTriad();

        var curConcreteTriad;

        switch (curChordDegreeRelativeToPrevChord) {

            case 1:

                curConcreteTriad = this.#bottomUpConstruction(prevLowPivotWithOctave, targetTriadNotes)
                break;

            case 2:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            case 3:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            case 4:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            case 5:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            case 6:

                curConcreteTriad = this.#bottomUpConstruction(prevLowPivotWithOctave, targetTriadNotes)
                break;

            case 7:

                curConcreteTriad = this.#topDownConstruction(prevHighPivotWithOctave, targetTriadNotes)
                break;

            default:
                throw new Error('ERROR!')
        }


        var curType = curChord.getType();

        if (curType == 'triad') {

            return curConcreteTriad;

        } else { // curType == 'seventh'

            let length = curConcreteTriad.length;
            var curTriadHighPivotWithOctave = curConcreteTriad[length - 1];
            var curTriadLowPivotWithOctave = curConcreteTriad[0];
            var targetNotes = curChord.getUpperVoices();
            var upperStructureConcrete;

            switch (curChordDegreeRelativeToPrevChord) {

                case 1:

                    upperStructureConcrete = this.#topDownConstruction(curTriadHighPivotWithOctave, targetNotes)
                    break;

                case 2:

                    upperStructureConcrete = this.#bottomUpConstruction(curTriadLowPivotWithOctave, targetNotes)
                    break;

                case 3:
                    upperStructureConcrete = this.#topDownConstruction(curTriadHighPivotWithOctave, targetNotes)
                    break;

                case 4:

                    upperStructureConcrete = this.#bottomUpConstruction(curTriadLowPivotWithOctave, targetNotes)
                    break;

                case 5:

                    upperStructureConcrete = this.#topDownConstruction(curTriadHighPivotWithOctave, targetNotes)
                    break;

                case 6:

                    upperStructureConcrete = this.#bottomUpConstruction(curTriadLowPivotWithOctave, targetNotes)
                    break;

                case 7:

                    upperStructureConcrete = this.#topDownConstruction(curTriadHighPivotWithOctave, targetNotes)
                    break;

                default:
                    throw new Error('ERROR!')
            }

            return upperStructureConcrete;
        }
    }

    /**
     * 
     * @param {*} topNoteWithOctave 
     * @param {*} targetNotes - Must not have octave 
     * @returns 
     * 
     * 
     */
    static #topDownConstruction(topNoteWithOctave, targetNotes) {

        var allFullPitchNotes = MusicalCore.getAllValidNotesInFullPitchRange();

        if (!allFullPitchNotes.has(topNoteWithOctave)) {

            throw new Error(`bottomNoteWithOctave = ${topNoteWithOctave} is not in scientific notation`);
        }

        var topNoteWithoutOctave = MusicalCore.removePitchOctave(topNoteWithOctave);
        var orderedNotes = this.#topDownRelativeConstruction(topNoteWithoutOctave, targetNotes);

        var topNoteWithOctaveIndex = MusicalCore.getIndexInFullPitchChromaticScale(topNoteWithOctave);
        var horIndex = this.#getIndexHighestOrLowestSameLetterNote(topNoteWithOctave, topNoteWithOctaveIndex, 'toTheRight')

        var allFullPitchScales = MusicalCore.getAllFullPitchChromaticScales();
        var upperStructureConcrete = [];

        let found = false;
        for (let i = orderedNotes.length - 1; i >= 0; i--) {

            let nextTargetNote = orderedNotes[i];

            found = false;

            while (!found) {

                for (let [_, scale] of allFullPitchScales) {

                    let nextNote = scale[horIndex];
                    let nextNoteCurated = MusicalCore.removePitchOctave(nextNote);

                    if (nextTargetNote == nextNoteCurated) {

                        upperStructureConcrete.unshift(nextNote);
                        found = true;
                        break;
                    }
                }

                horIndex--
            }
        }

        return upperStructureConcrete;
    }

    /**
     * 
     * @param {*} topNote 
     * @param {*} targetNotes 
     * @returns 
     */
    static #topDownRelativeConstruction(topNote, targetNotes) {

        var targetNotesSet = new Set();
        var noteLetterToRealNoteMap = new Map();

        let size = targetNotes.length;

        for (let i = 0; i < size; i++) {

            let nextNote = targetNotes[i];
            let nextNoteCurated = MusicalCore.removeAccidentalAndPitchOctave(nextNote);
            targetNotesSet.add(nextNoteCurated);
            noteLetterToRealNoteMap.set(nextNoteCurated, nextNote);
        }

        var relConstruction = []
        var scaleWithTopNoteLast = MusicalCore.getScaleAlphaWithNoteOnTop(topNote);
        var scaleSize = scaleWithTopNoteLast.length;

        var index = scaleSize - 1;

        while (targetNotesSet.size != 0) {

            let nextNote = scaleWithTopNoteLast[index % scaleSize];

            if (targetNotesSet.has(nextNote)) {

                relConstruction.unshift(noteLetterToRealNoteMap.get(nextNote));
                targetNotesSet.delete(nextNote);
            }

            index--;

        }

        return relConstruction;
    }

    /**
     * 
     * @param {*} bottomNoteWithOctave 
     * @param {*} targetNotes 
     * @returns 
     */
    static #bottomUpConstruction(bottomNoteWithOctave, targetNotes) {

        var allFullPitchNotes = MusicalCore.getAllValidNotesInFullPitchRange();

        if (!allFullPitchNotes.has(bottomNoteWithOctave)) {

            throw new Error(`bottomNoteWithOctave = ${bottomNoteWithOctave} is not in scientific notation`);
        }

        var bottomNoteWithoutOctave = MusicalCore.removePitchOctave(bottomNoteWithOctave);
        var orderedNotes = this.#bottomUpRelativeConstruction(bottomNoteWithoutOctave, targetNotes);

        var bottomNoteWithOctaveIndex = MusicalCore.getIndexInFullPitchChromaticScale(bottomNoteWithOctave);
        var horIndex = this.#getIndexHighestOrLowestSameLetterNote(bottomNoteWithOctave, bottomNoteWithOctaveIndex, 'toTheLeft');
        var allFullPitchScales = MusicalCore.getAllFullPitchChromaticScales();
        var upperStructureConcrete = [];

        let found = false;

        for (let i = 0; i < orderedNotes.length; i++) {

            let nextTargetNote = orderedNotes[i];
            found = false;

            while (!found) {

                for (let [_, scale] of allFullPitchScales) {

                    let nextNote = scale[horIndex];
                    let nextNoteCurated = MusicalCore.removePitchOctave(nextNote);

                    if (nextTargetNote == nextNoteCurated) {

                        upperStructureConcrete.push(nextNote);
                        found = true;
                        break;
                    }
                }
                horIndex++;
            }

        }
        return upperStructureConcrete;
    }

    /**
     * 
     * @param {*} bottomNote 
     * @param {*} targetNotes 
     * @returns 
     */
    static #bottomUpRelativeConstruction(bottomNote, targetNotes) {

        var targetNotesSet = new Set();
        var noteLetterToRealNoteMap = new Map();

        let size = targetNotes.length;

        for (let i = 0; i < size; i++) {

            let nextNote = targetNotes[i];
            let nextNoteCurated = MusicalCore.removeAccidentalAndPitchOctave(nextNote);
            targetNotesSet.add(nextNoteCurated);
            noteLetterToRealNoteMap.set(nextNoteCurated, nextNote);
        }

        var relConstruction = []
        var scaleWithBottomNoteLast = MusicalCore.getScaleAlphaWithNoteAtBottom(bottomNote);
        var scaleSize = scaleWithBottomNoteLast.length;

        var index = 0;

        while (targetNotesSet.size != 0) {

            let nextNote = scaleWithBottomNoteLast[index % scaleSize];

            if (targetNotesSet.has(nextNote)) {

                relConstruction.push(noteLetterToRealNoteMap.get(nextNote));
                targetNotesSet.delete(nextNote);
            }
            index++;
        }
        return relConstruction;
    }

    /**
     * 
     * @param {*} prevChord 
     * @param {*} prevVoicedChord 
     * @returns 
     */
    static #getHelperTriad(prevChord, prevVoicedChord) {

        let prevUpperStructureConcrete = prevVoicedChord.getVoicedUpperVoices();

        if (prevUpperStructureConcrete.length != 2) {

            throw new Error('prevVoicedChord upper voices does not have only two voices');
        }

        let length = prevUpperStructureConcrete.length;
        let highNote = prevUpperStructureConcrete[length - 1];

        let fifth = prevChord.getNotes()[2];

        var allChromaticScales = MusicalCore.getAllFullPitchChromaticScales();
        var index = MusicalCore.getIndexInFullPitchChromaticScale(highNote);

        var target;
        var found = false;

        while (!found) {

            for (let [_, scale] of allChromaticScales) {

                let nextNote = scale[index];
                let nextNoteCurated = MusicalCore.removePitchOctave(nextNote);

                if (fifth == nextNoteCurated) {

                    target = nextNote;
                    found = true;
                    break;
                }
            }

            index++;
        }

        var helperTriad = [...prevUpperStructureConcrete];
        helperTriad.push(target);
        return helperTriad;
    }

    /**
     * 
     * @param {*} root1 
     * @param {*} root2 
     * @returns 
     */
    static #calculateDegree(root1, root2) {

        root1 = MusicalCore.removeAccidentalAndPitchOctave(root1);
        root2 = MusicalCore.removeAccidentalAndPitchOctave(root2);
        var alphabetScale = MusicalCore.getScaleAlphaWithNoteAtBottom(root1);
        return alphabetScale.indexOf(root2) + 1;
    }

    /**
     * 
     * @param {*} noteTarget 
     * @param {*} index 
     * @param {*} direction 
     * @returns 
     */
    static #getIndexHighestOrLowestSameLetterNote(noteTarget, index, direction) {

        var allFullPitchScales = MusicalCore.getAllFullPitchChromaticScales();

        var noteTargetLetter = MusicalCore.removeAccidentalAndPitchOctave(noteTarget);

        var highestIndexSoFar = -1;

        let columnHasNote = false;
        let noSameLetterHasBeenFound = true;

        do {

            columnHasNote = false;

            for (let [_, scale] of allFullPitchScales) {

                let nextNote = scale[index];
                let nextNoteLetter = MusicalCore.removeAccidentalAndPitchOctave(nextNote);

                if (nextNoteLetter == noteTargetLetter) {

                    highestIndexSoFar = index;
                    columnHasNote = true;
                    noSameLetterHasBeenFound = false;
                    break;
                }
            }

            if (direction == 'toTheRight') {

                index++;

            } else { // 'toTheLeft'

                index--;
            }

        } while (columnHasNote || noSameLetterHasBeenFound);

        return highestIndexSoFar;
    }

    /**
     * 
     * @param {*} prevConcreteBass 
     * @returns 
     */
    static #determineMotion(prevConcreteBass) {

        var prevConcreteBassIndex = MusicalCore.getIndexInFullPitchChromaticScale(prevConcreteBass);

        if (prevConcreteBassIndex >= this.#averageBassIndex ) {  

            return -1;
        }
        return 1;
    }

    /**
     * 
     * @param {*} prevConcreteBass 
     * @param {*} bassTarget 
     * @param {*} direction 
     * @returns 
     */
    static #findBass(prevConcreteBass, bassTarget, direction) {

        var horIndex = -1

        var index = MusicalCore.getIndexInFullPitchChromaticScale(prevConcreteBass)

        if (direction == 1) {

            var horIndex = this.#getIndexHighestOrLowestSameLetterNote(prevConcreteBass, index, 'toTheLeft')

        } else if (direction == -1) {

            var horIndex = this.#getIndexHighestOrLowestSameLetterNote(prevConcreteBass, index, 'toTheRight')
        }


        //var index = MusicalCore.getIndexInFullPitchChromaticScale(prevConcreteBass)

       // var horIndex = this.#getIndexHighestOrLowestSameLetterNote(topNoteWithOctave, topNoteWithOctaveIndex, 'toTheRight')

       // var horIndex = MusicalCore.getIndexInFullPitchChromaticScale(prevConcreteBass)

        var concreteBass = null;

        var allChromaticScales = MusicalCore.getAllFullPitchChromaticScales();

        var found = false;

        while(!found) {

            for (let [_,scale] of allChromaticScales) {

                var nextNote = scale[horIndex];
                var nextNoteCurated = MusicalCore.removePitchOctave(nextNote);

                if (nextNoteCurated == bassTarget) {

                    concreteBass = nextNote;
                    found = true;
                    break;
                }
            }

            if (direction == 1) {

                horIndex++;

            } else if (direction == -1) {

                horIndex--;
            } 

        }
        return concreteBass;
    }
}

export default ChordLinker;