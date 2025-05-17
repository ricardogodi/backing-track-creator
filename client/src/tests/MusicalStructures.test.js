import MusicalStructures from "../MusicalStructures.js"
import { test, expect } from "vitest";

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*         getChordQualitiesByScaleAndChordType(scaleName, chordType)         */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ["major", 'triads', ['M', 'm', 'm', 'M', 'M', 'm', 'b5']],
    ["major", 'seventhChords', ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5']],
    ["minor", 'triads', ['m', 'b5', 'M', 'm', 'm', 'M', 'M']],
    ["minor", 'seventhChords', ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', '7']],
    ["melMinor", 'triads', ['m', 'm', '+', 'M', 'M', 'b5', 'b5']],
    ["melMinor", 'seventhChords', ['m(maj7)', 'm7', '+(maj7)', '7', '7', 'm7b5', 'm7b5']],
    ["harmMinor", 'triads', ['m', 'b5', '+', 'm', 'M', 'M', 'b5']],
    ["harmMinor", 'seventhChords', ['m(maj7)', 'm7b5', '+(maj7)', 'm7', '7', 'maj7', 'dim7']]
]) // Returns a function 

    ("Retrieves the correct chord qualities list for %s and %s: → %s", (scaleName, chordType, expected) => {
        
        var qualities = MusicalStructures.getChordQualitiesByScaleAndChordType(scaleName, chordType);
        expect(qualities).toEqual(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               getChromaticDegreesByChordQuality(chordQuality)              */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ['M', ['1', '3', '5']],
    ['m', ['1', 'b3', '5']],
    ['b5', ['1', 'b3', 'b5']],
    ['+', ['1', '3', '#5']],
    // Seventh Chords
    ['maj7', ['1', '3', '5', '7']],
    ['m7', ['1', 'b3', '5', 'b7']],
    ['7', ['1', '3', '5', 'b7']],
    ['m7b5', ['1', 'b3', 'b5', 'b7']],
    ['m(maj7)', ['1', 'b3', '5', '7']],
    ['+7', ['1', '3', '#5', 'b7']],
    ['+(maj7)', ['1', '3', '#5', '7']],
    ['dim7', ['1', 'b3', 'b5', 'bb7']],
    
]) // Returns a function 
    ("Retrieves the correct chromatic degrees list for %s → %s", (chordQuality, expected) => {
        
        var chromaticDegrees = MusicalStructures.getChromaticDegreesByChordQuality(chordQuality)  
        expect(chromaticDegrees).toEqual(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               getChordTypeByChordQuality(chordQuality)                     */
/*                                                                            */
/* -------------------------------------------------------------------------- */
test.each([
    ['M', 'triad'],
    ['m', 'triad'],
    ['b5', 'triad'],
    ['+', 'triad'],
    ['maj7', 'seventhChord'],
    ['m7', 'seventhChord'],
    ['7', 'seventhChord'],
    ['dim7', 'seventhChord']

]) // Returns a function 
    ("Retrieves the correct chord type for chord quality %s → %s", (chordQuality, expected) => {
        
        var chordType = MusicalStructures.getChordTypeByChordQuality(chordQuality)      
        expect(chordType).toEqual(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                   getChromaticIntervalsByScale(scaleName)                  */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ['major', [0, 2, 4, 5, 7, 9, 11]],
    ['minor', [0, 2, 3, 5, 7, 8, 10]],
    ['melMinor', [0, 2, 3, 5, 7, 9, 11]],
    ['harmMinor', [0, 2, 3, 5, 7, 8, 11]],

]) // Returns a function 
    ("Retrieves the correct chromatic intervals list for %s → %s", (scaleName, expected) => {
        
        var chromaticIntervals = MusicalStructures.getChromaticIntervalsByScale(scaleName)      
        expect(chromaticIntervals).toEqual(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                getChromaticIntervalByChromaticDegree(chromDeg)             */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ['1', 0],
    // 2nd's
    ['b2', 1],
    ['2', 2],
    // 3rd's
    ['b3', 3],
    ['3', 4],
    // 4th's
    ['4', 5],
    ['#4', 6],
    // 5th's
    ['b5', 6],
    ['5', 7],
    ['#5', 8],
    // 6th's
    ['b6', 8],
    ['6', 9],
    // 7th's
    ['bb7', 9],
    ['b7', 10],
    ['7', 11],
    // 3rd's
    ['b9', 1],
    ['9', 2],
    ['#9', 3],
    // 3rd's
    ['11', 5],
    ['#11', 6],
    // 3rd's
    ['b13', 8],
    ['13', 9]

]) // Returns a function 
    ("Retrieves the correct chromatic interval for %s → %s", (chromDegree, expected) => {
        
        var chromaticInterval = MusicalStructures.getChromaticIntervalByChromaticDegree(chromDegree)      
        expect(chromaticInterval).toEqual(expected);
    });


/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*               convertChromDegreeToScaleDegreeOffset(chromDeg)              */
/*                                                                            */
/* -------------------------------------------------------------------------- */

test.each([
    ['1', 0],
    ['b2', 1],
    ['2',  1],
    ['b3', 2],
    ['3', 2],
    ['4', 3],
    ['#4',  3],
    ['b5', 4],
    ['5', 4],
    ['#5', 4],
    ['b6', 5],
    ['6', 5],
    ['bb7', 6],
    ['b7', 6],
    ['7', 6],
    ['b9', 1],
    ['9', 1],
    ['#9', 1],
    ['11', 3],
    ['#11', 3],
    ['b13', 5],
    ['13', 5],

]) // Returns a function 
    ("Retrieves the correct scale degree offset for %s → %s", (chromDeg, expected) => {
        
        var offset = MusicalStructures.convertChromDegreeToScaleDegreeOffset(chromDeg)    
        expect(offset).toEqual(expected);
    });
