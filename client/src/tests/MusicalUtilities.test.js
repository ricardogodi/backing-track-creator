import MusicalUtilities from "../MusicalUtilities.js";
import { test, expect } from "vitest";
/**
 * Running all tests syntax
 * 
 * npx vitest
 * 
 */

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                TESTING:                                    */
/*                                                                            */
/*                         removePitchOctave(note)                            */
/*                                                                            */
/* -------------------------------------------------------------------------- */

// Testing in a loop
test.each([
    ["A4", "A"],
    ["A0", "A"],
    ["C8", "C"],
    ["A#5", "A#"],
    ["Bb", "Bb"],
    ["C1", "C"],
    ["Ab4", "Ab"],
    ["E#5", "E#"],

]) // Returns a function 
    ("Retrieves the correct curated note without the octave specification %s → %s", (note, expected) => {
        var curatedNote = MusicalUtilities.removePitchOctave(note);
        expect(curatedNote).toBe(expected);
    });

test.each([
    ["Y"],
    ["H#"],
    ["Xb"],
    ["Z7"]
])("Throws error for invalid input: %s", (note) => {
    expect(() => MusicalUtilities.removePitchOctave(note)).toThrow();
});

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                TESTING:                                    */
/*                                                                            */
/*                    removeAccidentalAndPitchOctave(note)                    */
/*                                                                            */
/* -------------------------------------------------------------------------- */
// Testing in a loop
test.each([
    ["Db", "D"],
    ["D#", "D"],
    ["D", "D"],
    ["Ebb", "E"],
    ["C#", "C"],
    ["Cb", "C"],
    ["C##", "C"],
    ["F#", "F"],
    ["Fb", "F"],

]) // Returns a function 
    ("Correctly removes accidental and pitch octave %s → %s", (note, expected) => {
        var cleanedNote = MusicalUtilities.removeAccidentalAndPitchOctave(note).toString();
        expect(cleanedNote).toBe(expected);
    });

    test.each([
        ["Y"],
        ["H#"],
        ["Xb"],
        ["Z7"]
    ])("Throws error for invalid input: %s", (note) => {
        expect(() => MusicalUtilities.removeAccidentalAndPitchOctave(note)).toThrow();
    });

    

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                TESTING:                                    */
/*                                                                            */
/*                      getScaleAlphaWithNoteAtBottom()                       */
/*                                                                            */
/* -------------------------------------------------------------------------- */

// Testing individually:
test("Retrieves the correct rotated array", () => {

    var scale = MusicalUtilities.getScaleAlphaWithNoteAtBottom("Db").toString();
    expect(scale).toBe("D,E,F,G,A,B,C");
});

// Testing in a loop
test.each([
    ["Db", "D,E,F,G,A,B,C"],
    ["Db4", "D,E,F,G,A,B,C"],
    ["C", "C,D,E,F,G,A,B"],
    ["E", "E,F,G,A,B,C,D"],
    ["E#", "E,F,G,A,B,C,D"],
    ["C#", "C,D,E,F,G,A,B"],
    ["B7", "B,C,D,E,F,G,A"],

]) // Returns a function 
    ("Retrieves the correct scale with base note of %s at the bottom → %s", (input, expected) => {
        var scale = MusicalUtilities.getScaleAlphaWithNoteAtBottom(input).toString();
        expect(scale).toBe(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                TESTING:                                    */
/*                                                                            */
/*                    getScaleAlphaWithNoteOnTop(topTarget)                   */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ["Db", "E,F,G,A,B,C,D"],
    ["Db4", "E,F,G,A,B,C,D"],
    ["C", "D,E,F,G,A,B,C"],
    ["E", "F,G,A,B,C,D,E"],
    ["E#", "F,G,A,B,C,D,E"],
    ["C#", "D,E,F,G,A,B,C"],
    ["B7", "C,D,E,F,G,A,B"],

]) // Returns a function 
    ("Retrieves the correct scale with base note of %s on top → %s", (input, expected) => {
        var scale = MusicalUtilities.getScaleAlphaWithNoteOnTop(input).toString();
        expect(scale).toBe(expected);
    });

test.each([
    ["Y"],
    ["H#"],
    ["Xb"],
    ["Z7"]
])("Throws error for invalid input: %s", (noteName) => {
    expect(() => MusicalUtilities.getScaleAlphaWithNoteOnTop(noteName)).toThrow();
});

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                TESTING:                                    */
/*                                                                            */
/*                   retrieveEnharmonic(noteTarget, index)                    */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([

    // Index = 0
    ["B", 0, "B#"],
    ["C", 0, "C"],
    ["D", 0, "Dbb"],

    // Index = 1
    ["C", 1, "C#"],
    ["D", 1, "Db"],

    // Index = 2
    ["C", 2, "C##"],
    ["D", 2, "D"],
    ["E", 2, "Ebb"],

    // Index = 3
    ["D", 3, "D#"],
    ["E", 3, "Eb"],

    // Index = 4
    ["D", 4, "D##"],
    ["E", 4, "E"],
    ["F", 4, "Fb"],

    // Index = 5
    ["E", 5, "E#"],
    ["F", 5, "F"],
    ["G", 5, "Gbb"],

    // Index = 6
    ["F", 6, "F#"],
    ["G", 6, "Gb"],

    // Index = 7
    ["F", 7, "F##"],
    ["G", 7, "G"],
    ["A", 7, "Abb"],

    // Index = 8
    ["G", 8, "G#"],
    ["A", 8, "Ab"],

    // Index = 9
    ["G", 9, "G##"],
    ["A", 9, "A"],
    ["B", 9, "Bbb"],

    // Index = 10
    ["A", 10, "A#"],
    ["B", 10, "Bb"],

    // Index = 11
    ["A", 11, "A##"],
    ["B", 11, "B"],
    ["C", 11, "Cb"],

]) // Returns a function 
    ("Retrieves the correct enharmonic with base note %s at index %s → %s", (noteTarget, index, expectedEnharmonic) => {
        var enharmonic = MusicalUtilities.retrieveEnharmonic(noteTarget, index);

        expect(enharmonic).toBe(expectedEnharmonic);
});

test.each([
    [12],
    [-1]
 
])("Throws error for invalid index: %s", (index) => {
    expect(() =>  MusicalUtilities.retrieveEnharmonic('C', index)).toThrow();
});

test.each([
    ['C', -1],
 
])("Throws error for invalid index: %s", (note, index) => {
    expect(() =>  MusicalUtilities.retrieveEnharmonic(note, index)).toThrow();
});