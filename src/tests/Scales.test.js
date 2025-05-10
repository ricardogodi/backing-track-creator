import Scales from "../Scales.js";
import { test, expect } from "vitest";

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                TESTING:                                    */
/*                                                                            */
/*                      getAllFullPitchChromaticScales()                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/*
*   This function is tested indirectly
*/

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                TESTING:                                    */
/*                                                                            */
/*                      getAllOneOctaveChromaticScales()                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/*
*    This function is tested indirectly
*/

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                    getChromaticScaleNameByNote(note)                       */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/**
 * 
 */
test.each([
    ["C##", "doubleSharp"],
    ["B#", "doubleSharp"],
    ["C", "sharp"],
    ["A", "sharp"],
    ["A#", "sharp"],
    ["F", "sharp"],
    ["Bb", "flat"],
    ["Ab", "flat"],
    ["Cb", "doubleFlat"],
    ["Abb", "doubleFlat"],
]) // Returns a function 
    ("Retrieves the correct chromatic scale type name for %s → Expected: %s", (input, expected) => {
        var scaleName = Scales.getChromaticScaleNameByNote(input)
        expect(scaleName).toBe(expected);
    });

/*
* Testing invalid inputs
*/
test.each([
    ["Y"],
    ["H#"],
    ["Xb"],
    ["Z7"],
    ["Abbb"],
    ["bA"],
])("Correclty throws Error since %s is not a note", (noteName) => {
    expect(() => Scales.getChromaticScaleNameByNote(noteName)).toThrow();
});

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               getFullPitchChromaticScaleByType(chromScaleType)             */
/*                                                                            */
/* -------------------------------------------------------------------------- */

// Test individually
test("Retrieves the correct length of doubleSharpFullPitchRange", () => {
    expect(Scales.getFullPitchChromaticScaleByType('doubleSharp').length).toBe(88);
});

/**
 * Testing whether the length is correct
 */
test.each([
    ["doubleSharp", 88],
    ["sharp", 88],
    ["flat", 88],
    ["doubleFlat", 88]
]) // Returns a function 
    ("Retrieves the correct full pitch chromatic scale length for %s → %s", (input, expected) => {
        var scale = Scales.getFullPitchChromaticScaleByType(input).length
        expect(scale).toBe(expected);
    });

/**
 * Testing the actual scales
 */
var doubleSharpFullPitchScale =  `G##0,A#0,A##0,B#1,C#1,C##1,D#1,D##1,E#1,F#1,F##1,G#1,G##1,A#1,A##1,B#2,C#2,C##2,D#2,D##2,E#2,F#2,F##2,G#2,G##2,A#2,A##2,B#3,C#3,C##3,D#3,D##3,E#3,F#3,F##3,G#3,G##3,A#3,A##3,B#4,C#4,C##4,D#4,D##4,E#4,F#4,F##4,G#4,G##4,A#4,A##4,B#5,C#5,C##5,D#5,D##5,E#5,F#5,F##5,G#5,G##5,A#5,A##5,B#6,C#6,C##6,D#6,D##6,E#6,F#6,F##6,G#6,G##6,A#6,A##6,B#7,C#7,C##7,D#7,D##7,E#7,F#7,F##7,G#7,G##7,A#7,A##7,B#8`;
var sharpFullPitchScale = `A0,A#0,B0,C1,C#1,D1,D#1,E1,F1,F#1,G1,G#1,A1,A#1,B1,C2,C#2,D2,D#2,E2,F2,F#2,G2,G#2,A2,A#2,B2,C3,C#3,D3,D#3,E3,F3,F#3,G3,G#3,A3,A#3,B3,C4,C#4,D4,D#4,E4,F4,F#4,G4,G#4,A4,A#4,B4,C5,C#5,D5,D#5,E5,F5,F#5,G5,G#5,A5,A#5,B5,C6,C#6,D6,D#6,E6,F6,F#6,G6,G#6,A6,A#6,B6,C7,C#7,D7,D#7,E7,F7,F#7,G7,G#7,A7,A#7,B7,C8`;
var flatFullPitchScale = `A0,Bb0,B0,C1,Db1,D1,Eb1,E1,F1,Gb1,G1,Ab1,A1,Bb1,B1,C2,Db2,D2,Eb2,E2,F2,Gb2,G2,Ab2,A2,Bb2,B2,C3,Db3,D3,Eb3,E3,F3,Gb3,G3,Ab3,A3,Bb3,B3,C4,Db4,D4,Eb4,E4,F4,Gb4,G4,Ab4,A4,Bb4,B4,C5,Db5,D5,Eb5,E5,F5,Gb5,G5,Ab5,A5,Bb5,B5,C6,Db6,D6,Eb6,E6,F6,Gb6,G6,Ab6,A6,Bb6,B6,C7,Db7,D7,Eb7,E7,F7,Gb7,G7,Ab7,A7,Bb7,B7,C8`;
var doubleFlatFullPitchScale = `Bbb0,Bb0,Cb0,Dbb1,Db1,Ebb1,Eb1,Fb1,Gbb1,Gb1,Abb1,Ab1,Bbb1,Bb1,Cb1,Dbb2,Db2,Ebb2,Eb2,Fb2,Gbb2,Gb2,Abb2,Ab2,Bbb2,Bb2,Cb2,Dbb3,Db3,Ebb3,Eb3,Fb3,Gbb3,Gb3,Abb3,Ab3,Bbb3,Bb3,Cb3,Dbb4,Db4,Ebb4,Eb4,Fb4,Gbb4,Gb4,Abb4,Ab4,Bbb4,Bb4,Cb4,Dbb5,Db5,Ebb5,Eb5,Fb5,Gbb5,Gb5,Abb5,Ab5,Bbb5,Bb5,Cb5,Dbb6,Db6,Ebb6,Eb6,Fb6,Gbb6,Gb6,Abb6,Ab6,Bbb6,Bb6,Cb6,Dbb7,Db7,Ebb7,Eb7,Fb7,Gbb7,Gb7,Abb7,Ab7,Bbb7,Bb7,Cb7,Dbb8`;

test.each([
    ["doubleSharp", doubleSharpFullPitchScale],
    ["sharp", sharpFullPitchScale],
    ["flat", flatFullPitchScale],
    ["doubleFlat", doubleFlatFullPitchScale]
])
("Retrieves the correct actual scale for scale name → %s", (input, expected) => {  
    var returnedFullPitchScale = Scales.getFullPitchChromaticScaleByType(input).toString()
    expect(returnedFullPitchScale).toBe(expected);
});

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               getFullPitchChromaticScaleByNote(note)                       */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ["C##", doubleSharpFullPitchScale],
    ["C", sharpFullPitchScale],
    ["Bb", flatFullPitchScale],
    ["Abb", doubleFlatFullPitchScale],
    ["Cb", doubleFlatFullPitchScale],
    ["G", sharpFullPitchScale],
    ["A", sharpFullPitchScale],
    ["B", sharpFullPitchScale],
    ["D", sharpFullPitchScale],
    ["E", sharpFullPitchScale],
    ["F", sharpFullPitchScale],
    ["C#", sharpFullPitchScale],
    ["D#", sharpFullPitchScale],
    ["E#", doubleSharpFullPitchScale],
    ["B#", doubleSharpFullPitchScale],
    ["Fb", doubleFlatFullPitchScale],
    ["A#", sharpFullPitchScale],
    ["A##", doubleSharpFullPitchScale],
    ["Ebb", doubleFlatFullPitchScale],
    ["Dbb", doubleFlatFullPitchScale],
])
("Retrieves the correct actual scale for scale name for note %s", (input, expected) => {  
    var returnedFullPitchScale = Scales.getFullPitchChromaticScaleByNote(input).toString()
    expect(returnedFullPitchScale).toBe(expected);
});

/*
* Testing invalid inputs
*/
test.each([
    ["Abbb"],
    ["Bbbb#"],
    ["A###"],
    ["E##"],
])("Correclty throws Error since %s is not a note", (noteName) => {
    expect(() => Scales.getFullPitchChromaticScaleByNote(noteName)).toThrow();
});

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               getIndexInFullPitchChromaticScale(scientificNote)            */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/**
 * 
 */
test.each([
    ["A0", 0],
    ["Bbb0", 0],
    ["G##0", 0],
    ["C8", 87],
    ["B#8", 87],
    ["Dbb8", 87],
    ["Abb7", 82],
    ["G7", 82],
    ["F##7", 82],
    ["Cb7", 86],
    ["B7", 86],
    ["A##7", 86],
])
("Retrieves the correct index in the full pitch chromatic scale of note in scientific pitch notation  %s → %s", (input, expected) => {
    var index = Scales.getIndexInFullPitchChromaticScale(input)
    expect(index).toBe(expected);
});

/*
* Testing invalid inputs
*/
test.each([
    ["Ab"],
    ["C"],
    ["A"],
    ["E"],
    ["D"],
    ["Eb"],
    ["E#"],
    ["E0"],
    ["0"],
    ["XYZ"],
])("Correclty throws Error since %s is not a note in scientific notation", (note) => {
    expect(() => Scales.getIndexInFullPitchChromaticScale(note)).toThrow();
});

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               getOneOctaveChromaticScaleByType(chromScaleType)             */
/*                                                                            */
/* -------------------------------------------------------------------------- */
var doubleSharpChromaticScale = `B#,C#,C##,D#,D##,E#,F#,F##,G#,G##,A#,A##`
var sharpChromaticScale = `C,C#,D,D#,E,F,F#,G,G#,A,A#,B`
var flatChromaticScale = `C,Db,D,Eb,E,F,Gb,G,Ab,A,Bb,B`
var doubleFlatChromaticScale = `Dbb,Db,Ebb,Eb,Fb,Gbb,Gb,Abb,Ab,Bbb,Bb,Cb`


test.each([
    ["doubleSharp", doubleSharpChromaticScale],
    ["sharp", sharpChromaticScale],
    ["flat", flatChromaticScale],
    ["doubleFlat", doubleFlatChromaticScale],
])
("Retrieves the correct actual scale for scale name for chromatic scale type %s", (input, expected) => {  
    var returnedFullPitchScale = Scales.getOneOctaveChromaticScaleByType(input).toString()
    expect(returnedFullPitchScale).toBe(expected);
});

/*
* Testing invalid inputs
*/
test.each([
    ["shrap"],
    ["doubleflat"],
    ["flatt"],
    ["doubleShrap"],

])("Correclty throws Error since %s is not a valid chromatic scale type", (chromScaleType) => {
    expect(() => Scales.getOneOctaveChromaticScaleByType(chromScaleType)).toThrow();
});


/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               getOneOctaveChromaticScaleByNote(note)                       */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ["C##", doubleSharpChromaticScale],
    ["C", sharpChromaticScale],
    ["Bb", flatChromaticScale],
    ["Bbb", doubleFlatChromaticScale],
    ["E#", doubleSharpChromaticScale],
    ["A", sharpChromaticScale],
    ["Eb", flatChromaticScale],
    ["Ebb", doubleFlatChromaticScale],
    ["B#", doubleSharpChromaticScale],
    ["A#", sharpChromaticScale],
    ["Db", flatChromaticScale],
    ["Dbb", doubleFlatChromaticScale],
    
])
("Retrieves the correct actual scale for scale name for note %s", (input, expected) => {  
    var returnedFullPitchScale = Scales.getOneOctaveChromaticScaleByNote(input).toString()
    expect(returnedFullPitchScale).toBe(expected);
});

/*
* Testing invalid inputs
*/
test.each([
    ["bB"],
    ["B33"],
    ["0"],
    ["XYZ"],

])("Correclty throws Error since %s is not a note", (index) => {
    expect(() => Scales.getOneOctaveChromaticScaleByNote(index)).toThrow();
});



/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               getIndexInOneOctaveChromaticScale(note)                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ["A0", 9],
    ["Bbb0", 9],
    ["G##0", 9],
    ["C8", 0],
    ["B#8", 0],
    ["Dbb8", 0],
    ["C#5", 1],
    ["D#", 3],
    ["E", 4],
    ["F", 5],
    ["Fb3", 4],
    ["A4", 9],
    ["Bb", 10],
])
("Retrieves the correct index in the one octave chromatic scale of note %s → %s", (input, expected) => {
    var index = Scales.getIndexInOneOctaveChromaticScale(input);
    expect(index).toBe(expected);
});

/*
* Testing invalid inputs
*/
test.each([
    ["bB"],
    ["B33"],
    ["0"],
    ["XYZ"],

])("Correclty throws Error since %s is not a note", (index) => {
    expect(() => Scales.getIndexInOneOctaveChromaticScale(index)).toThrow();
});


/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                  */
/*                                                                            */
/*                        getScaleAlphabetCAtBottom()                         */
/*                                                                            */
/* -------------------------------------------------------------------------- */


test.each([
    [['C','D','E','F','G','A','B']]
])
("Correctly retrieves the scale alphabet → %s", (expected) => {
    var scale = Scales.getScaleAlphabetCAtBottom();
    expect(scale).toEqual(expected);
});
