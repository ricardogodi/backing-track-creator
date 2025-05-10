import Chord from "../Chord.js";
import VoicedChord from "../VoicedChord.js";
import ChordLinker from "../ChordLinker.js";

import { test, expect } from "vitest";

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*             linkTwoChords(prevChord, prevVoicedChord, curChord)            */
/*                                                                            */
/* -------------------------------------------------------------------------- */

// TRIAD FIRST
test.each([
    // Triad (no inversion) to triad
    ['C', 'M', ['C5', 'E5', 'G5'], 'C', 'M', ['C5', 'E5', 'G5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'D', 'm', ['A4', 'D5', 'F5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'E', 'm', ['B4', 'E5', 'G5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'F', 'M', ['C5', 'F5', 'A5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'G', 'M', ['B4', 'D5', 'G5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'A', 'm', ['C5', 'E5', 'A5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'B', 'b5', ['D5', 'F5', 'B5']],

    //['D', 'm', ['D4', 'F4', 'A4'], 'C', 'M', ['C4', 'E5', 'G5']],

    // Triad (no inversion) to seventh
    ['C', 'M', ['C5', 'E5', 'G5'], 'C', 'maj7', ['B4', 'E5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'D', 'm7', ['C5', 'F5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'E', 'm7', ['D5', 'G5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'F', 'maj7', ['E5', 'A5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'G', '7', ['B4', 'F5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'A', 'm7', ['C5', 'G5']],
    ['C', 'M', ['C5', 'E5', 'G5'], 'B', 'm7b5', ['D5', 'A5']],


    // Triad (second inversion) to triad
    ['C', 'M', ['G4', 'C5', 'E5'], 'C', 'M', ['G4', 'C5', 'E5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'D', 'm', ['F4', 'A4', 'D5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'E', 'm', ['G4', 'B4', 'E5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'F', 'M', ['A4', 'C5', 'F5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'G', 'M', ['G4', 'B4', 'D5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'A', 'm', ['A4', 'C5', 'E5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'B', 'b5', ['B4', 'D5', 'F5']],

    // Triad (second inversion) to seventh
    ['C', 'M', ['G4', 'C5', 'E5'], 'C', 'maj7', ['B4', 'E5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'D', 'm7', ['F4', 'C5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'E', 'm7', ['G4', 'D5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'F', 'maj7', ['A4', 'E5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'G', '7', ['B4', 'F5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'A', 'm7', ['G4', 'C5']],
    ['C', 'M', ['G4', 'C5', 'E5'], 'B', 'm7b5', ['A4', 'D5']],

    // Triad (first inversion) to triad
    ['C', 'M', ['E4', 'G4', 'C5'], 'C', 'M', ['E4', 'G4', 'C5']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'D', 'm', ['D4', 'F4', 'A4']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'E', 'm', ['E4', 'G4', 'B4']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'F', 'M', ['F4', 'A4', 'C5']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'G', 'M', ['D4', 'G4', 'B4']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'A', 'm', ['E4', 'A4', 'C5']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'B', 'b5', ['F4', 'B4', 'D5']],

    // Triad (first inversion) to seventh
    ['C', 'M', ['E4', 'G4', 'C5'], 'C', 'maj7', ['E4', 'B4']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'D', 'm7', ['F4', 'C5']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'E', 'm7', ['G4', 'D5']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'F', 'maj7', ['E4', 'A4']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'G', '7', ['F4', 'B4']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'A', 'm7', ['G4', 'C5']],
    ['C', 'M', ['E4', 'G4', 'C5'], 'B', 'm7b5', ['A4', 'D5']],

]) // Returns a function 
    (`Correctly linked two chords. prevChordRoot: %s | prevChordQuality: %s | prevVoicedNotes: %s |
    curChordRoot: %s | curChordQuality: %s | → %s`, (prevChordRoot, prevChordQuality, prevVoicedNotes, curChordRoot, curChordQuality, expected) => {

        var prevChord = new Chord(prevChordRoot, prevChordQuality);
        var prevVoicedChord = new VoicedChord(prevVoicedNotes, '');

        var curChord = new Chord(curChordRoot, curChordQuality);

        var concreteUpperVoices = ChordLinker.linkTwoChords(prevChord, prevVoicedChord, curChord)
        expect(concreteUpperVoices).toEqual(expected);
    });


// SEVENTH CHORD FIRST
test.each([
    // Seventh (7th on top) to triad
    ['C', 'maj7', ['E4', 'B4'], 'C', 'M', ['E4', 'G4', 'C5']],
    ['C', 'maj7', ['E4', 'B4'], 'D', 'm', ['D4', 'F4', 'A4']],
    ['C', 'maj7', ['E4', 'B4'], 'E', 'm', ['E4', 'G4', 'B4']],
    ['C', 'maj7', ['E4', 'B4'], 'F', 'M', ['C4', 'F4', 'A4']],
    ['C', 'maj7', ['E4', 'B4'], 'G', 'M', ['D4', 'G4', 'B4']],
    ['C', 'maj7', ['E4', 'B4'], 'A', 'm', ['E4', 'A4', 'C5']],
    ['C', 'maj7', ['E4', 'B4'], 'B', 'b5', ['D4', 'F4', 'B4']],

    // Seventh (7th on top) to seventh
    ['C', 'maj7', ['E4', 'B4'], 'C', 'maj7', ['E4', 'B4']],
    ['C', 'maj7', ['E4', 'B4'], 'D', 'm7', ['F4', 'C5']],
    ['C', 'maj7', ['E4', 'B4'], 'E', 'm7', ['D4', 'G4']],
    ['C', 'maj7', ['E4', 'B4'], 'F', 'maj7', ['E4', 'A4']],
    ['C', 'maj7', ['E4', 'B4'], 'G', '7', ['F4', 'B4']],
    ['C', 'maj7', ['E4', 'B4'], 'A', 'm7', ['G4', 'C5']],
    ['C', 'maj7', ['E4', 'B4'], 'B', 'm7b5', ['D4', 'A4']],

    // Seventh (3rd on top) to triad
    ['C', 'maj7', ['B4', 'E5'], 'C', 'M', ['C5', 'E5', 'G5']],
    ['C', 'maj7', ['B4', 'E5'], 'D', 'm', ['A4', 'D5', 'F5']],
    ['C', 'maj7', ['B4', 'E5'], 'E', 'm', ['B4', 'E5', 'G5']],
    ['C', 'maj7', ['B4', 'E5'], 'F', 'M', ['A4', 'C5', 'F5']],
    ['C', 'maj7', ['B4', 'E5'], 'G', 'M', ['B4', 'D5', 'G5']],
    ['C', 'maj7', ['B4', 'E5'], 'A', 'm', ['C5', 'E5', 'A5']],
    ['C', 'maj7', ['B4', 'E5'], 'B', 'b5', ['B4', 'D5', 'F5']],

    // Seventh (3rd on top) to seventh
    ['C', 'maj7', ['B4', 'E5'], 'C', 'maj7', ['B4', 'E5']],
    ['C', 'maj7', ['B4', 'E5'], 'D', 'm7', ['C5', 'F5']],
    ['C', 'maj7', ['B4', 'E5'], 'E', 'm7', ['D5', 'G5']],
    ['C', 'maj7', ['B4', 'E5'], 'F', 'maj7', ['A4', 'E5']],
    ['C', 'maj7', ['B4', 'E5'], 'G', '7', ['B4', 'F5']],
    ['C', 'maj7', ['B4', 'E5'], 'A', 'm7', ['C5', 'G5']],
    ['C', 'maj7', ['B4', 'E5'], 'B', 'm7b5', ['A4', 'D5']],

]) // Returns a function 
    (`Correctly linked two chords. prevChordRoot: %s | prevChordQuality: %s | prevVoicedNotes: %s |
        curChordRoot: %s | curChordQuality: %s | → %s`, (prevChordRoot, prevChordQuality, prevVoicedNotes, curChordRoot, curChordQuality, expected) => {

        var prevChord = new Chord(prevChordRoot, prevChordQuality);
        var prevVoicedChord = new VoicedChord(prevVoicedNotes, '');

        var curChord = new Chord(curChordRoot, curChordQuality);

        var concreteUpperVoices = ChordLinker.linkTwoChords(prevChord, prevVoicedChord, curChord)
        expect(concreteUpperVoices).toEqual(expected);
    });


/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*           linkTwoBassNotes(prevChord, prevVoicedChord, curChord)           */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*            triadToXCase(prevChord, prevVoicedChord, curChord)              */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*          seventhToXCase(prevChord, prevVoicedChord, curChord)              */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*            topDownConstruction(topNoteWithOctave, targetNotes)             */
/*                                                                            */
/* -------------------------------------------------------------------------- */
test.each([

    ['D6', ['C', 'E', 'G'], ['E5', 'G5', 'C6']],
    ['E6', ['E', 'G#', 'B#'], ['G#5', 'B#6', 'E6']],
    ['B#5', ['E', 'G#', 'B#'], ['E4', 'G#4', 'B#5']],
    ['Db5', ['G', 'B', 'D#'], ['G4', 'B4', 'D#5']],

]) // Returns a function 
    ("Retrieved the correct topDown concrete construction for top pivot %s and target notes %s → %s", (topNoteWithOctave, targetNotes, expected) => {

        var topDownConstruction = ChordLinker.topDownConstruction(topNoteWithOctave, targetNotes)
        expect(topDownConstruction).toEqual(expected);
    });


/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*            topDownRelativeConstruction(topNote, targetNotes)               */
/*                                                                            */
/* -------------------------------------------------------------------------- */


test.each([

    ['D', ['C', 'E', 'G',], ['E', 'G', 'C']],
    ['A', ['A', 'C#', 'E',], ['C#', 'E', 'A']],
    ['F', ['Gb', 'Bb', 'Db',], ['Gb', 'Bb', 'Db']],
    ['E', ['Ab', 'C', 'Eb',], ['Ab', 'C', 'Eb']],
    ['G', ['B', 'D', 'F',], ['B', 'D', 'F']],
    ['F', ['B', 'D', 'F',], ['B', 'D', 'F']],
    ['E', ['B', 'D', 'F',], ['F', 'B', 'D']],
    ['D', ['B', 'D', 'F',], ['F', 'B', 'D']],
    ['D', ['A', 'C', 'E#',], ['E#', 'A', 'C']],
    ['E', ['B', 'F',], ['F', 'B']],
    ['D', ['G', 'C',], ['G', 'C']],

]) // Returns a function 
    ("Retrieved the correct bottom-up relative construction for bottom pivot %s and target notes %s → %s", (topNote, targetNotes, expected) => {

        var topDownRelConstruction = ChordLinker.topDownRelativeConstruction(topNote, targetNotes)
        expect(topDownRelConstruction).toEqual(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*         bottomUpConstruction(bottomNoteWithOctave, targetNotes)            */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ['D#6', ['D', 'F#', 'A#'], ['D6', 'F#6', 'A#6']],
    ['E3', ['E#', 'G#', 'B#'], ['E#3', 'G#3', 'B#4']],

]) // Returns a function 
    ("Retrieved the correct bottom concrete construction for top pivot %s and target notes %s → %s", (bottomNoteWithOctave, targetNotes, expected) => {

        var bottomUpConstruction = ChordLinker.bottomUpConstruction(bottomNoteWithOctave, targetNotes)
        expect(bottomUpConstruction).toEqual(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*         bottomUpRelativeConstruction(bottomNote, targetNotes)              */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([

    ['D', ['C', 'E', 'G',], ['E', 'G', 'C']],
    ['D', ['C', 'E', 'G#',], ['E', 'G#', 'C']],
    ['A', ['A', 'C#', 'E',], ['A', 'C#', 'E']],
    ['C', ['C', 'E', 'G'], ['C', 'E', 'G']],
    ['G', ['C', 'E', 'G'], ['G', 'C', 'E']],
    ['E', ['C', 'E', 'G'], ['E', 'G', 'C']],
    ['F#', ['Eb', 'Gb', 'Bb'], ['Gb', 'Bb', 'Eb']],
    ['D#', ['Eb', 'Gb', 'Bb'], ['Eb', 'Gb', 'Bb']],
    ['G', ['C', 'Eb', 'G'], ['G', 'C', 'Eb']],
    ['E', ['C', 'G'], ['G', 'C']],
    ['B', ['A', 'E',], ['E', 'A']],

]) // Returns a function 
    ("Retrieved the correct bottom-up relative construction for bottom pivot %s and target notes %s → %s", (bottomNote, targetNotes, expected) => {

        var bottomUpRelConstruction = ChordLinker.bottomUpRelativeConstruction(bottomNote, targetNotes)
        expect(bottomUpRelConstruction).toEqual(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*              getHelperTriad(prevChord, prevVoicedChord)                    */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([

    ['C', ['B4', 'E5'], ['B4', 'E5', 'G5']],
    ['Ab', ['G4', 'C5'], ['G4', 'C5', 'Eb5']],
    ['F', ['E6', 'A6'], ['E6', 'A6', 'C7']],

]) // Returns a function 
    ("Retrieved the correct helper triad for root %s, quality maj7, with upperVoices %s → %s", (root, upperVoices, expected) => {

        var prevChord = new Chord(root, 'maj7');
        var preVoicedChord = new VoicedChord(upperVoices, '');

        var helperTriad = ChordLinker.getHelperTriad(prevChord, preVoicedChord)
        expect(helperTriad).toEqual(expected);
    });


test.each([

    ['C', ['Bb4', 'Eb5'], ['Bb4', 'Eb5', 'G5']],
    ['A', ['G5', 'C6'], ['G5', 'C6', 'E6']],

]) // Returns a function 
    ("Retrieved the correct helper triad for root %s, quality m7, with upperVoices %s → %s", (root, upperVoices, expected) => {

        var prevChord = new Chord(root, 'm7');
        var preVoicedChord = new VoicedChord(upperVoices, '');

        var helperTriad = ChordLinker.getHelperTriad(prevChord, preVoicedChord)
        expect(helperTriad).toEqual(expected);
    });



/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                      calculateDegree(root1, root2)                         */
/*                                                                            */
/* -------------------------------------------------------------------------- */
test.each([
    // Looking to the right
    ['D', 'D', 1],
    ['D', 'E', 2],
    ['Db', 'E', 2],
    ['D#', 'E', 2],
    ['D#', 'Eb', 2],
    ['C', 'C#', 1],
    ['Cb', 'C', 1],
    ['A', 'C', 3],
    ['B', 'D', 3],
    ['B', 'E', 4],
    ['G#', 'C', 4],
    ['G#', 'D', 5],
    ['C', 'Gb', 5],
    ['B', 'Gb', 6],
    ['C', 'Ab', 6],
    ['C', 'A#', 6],
    ['A', 'G', 7],
    ['B', 'A', 7],

]) // Returns a function 
    ("Retrieved the correct degree of %s given %s → %s ", (root1, root2, expected) => {

        var degree = ChordLinker.calculateDegree(root1, root2)
        expect(degree).toEqual(expected);
    });



/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*   getIndexHighestOrLowestSameLetterNote(noteTarget, index, direction)      */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    // Looking to the right
    ['A', 40, 'toTheRight', 50],
    ['A#', 40, 'toTheRight', 50],
    ['A##', 40, 'toTheRight', 50],
    ['A', 66, 'toTheRight', 74],
    ['C#', 40, 'toTheRight', 41],
    ['Bbb', 3, 'toTheRight', 3],
    ['G#', 3, 'toTheRight', 12],

    // Looking to the left
    ['Dbb', 45, 'toTheLeft', 39],
    ['Dbb', 60, 'toTheLeft', 51],
    ['C#', 30, 'toTheLeft', 26],
    ['A#', 30, 'toTheLeft', 22],
    ['F#', 50, 'toTheLeft', 43],

]) // Returns a function 
    ("Retrieved the correct index for note %s, starting from index %s, in direction %s → %s", (noteTarget, startIndex, direction, expected) => {

        var index = ChordLinker.getIndexHighestOrLowestSameLetterNote(noteTarget, startIndex, direction)
        expect(index).toEqual(expected);
    });






















