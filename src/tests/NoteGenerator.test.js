import NoteGenerator from "../NoteGenerator.js"
import { test, expect } from "vitest";

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                     generateChord(root, chordQuality)                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Testing triads
 */
test.each([
    ['E', 'M', ['E', 'G#', 'B']],
    ['C', 'm', ['C', 'Eb', 'G']],
    ['A#', 'M', ['A#', 'C##', 'E#']],
    ['Ab', 'm', ['Ab', 'Cb', 'Eb']],
    ['Eb', 'b5', ['Eb', 'Gb', 'Bbb']],
    ['D', '+', ['D', 'F#', 'A#']],
    ['F', 'b5', ['F', 'Ab', 'Cb']],
    ['Bb', 'b5', ['Bb', 'Db', 'Fb']],
    ['C#', 'M', ['C#', 'E#', 'G#']],
    ['D', 'b5', ['D', 'F', 'Ab']],
]) // Returns a function 
    ("Testing generateChord(): Retrieves the correct triad for root: %s, chordquality: %s → %s", (root, chordQuality, expected) => {
        var chord = NoteGenerator.generateChord(root, chordQuality);
        expect(chord).toEqual(expected);
    });

/**
 * Testing seventh chords
 */
test.each([
    ['E', 'maj7', ['E', 'G#', 'B', 'D#']],
    ['C', '7', ['C', 'E', 'G', 'Bb']],
    ['Ab', '7', ['Ab', 'C', 'Eb', 'Gb']],
    ['Eb', 'maj7', ['Eb', 'G', 'Bb', 'D']],
    ['Ab', 'm7b5', ['Ab', 'Cb', 'Ebb', 'Gb']],
    ['A', 'm7b5', ['A', 'C', 'Eb', 'G']],
    ['D#', 'dim7', ['D#', 'F#', 'A', 'C']],
    ['C', 'm7b5', ['C', 'Eb', 'Gb', 'Bb']],


]) // Returns a function 
    ("Testing generateChord(): Retrieves the correct seventh chord for root: %s, chordquality: %s → %s", (root, chordQuality, expected) => {
        var chord = NoteGenerator.generateChord(root, chordQuality);
        expect(chord).toEqual(expected);
    });

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                       generateScale(tonic, scaleName)                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Testing major scales
 */
test.each([
    ['E', ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']],
    ['Ab', ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G']],
    ['Cb', ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb']],
    ['F', ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']],
    ['G', ['G', 'A', 'B', 'C', 'D', 'E', 'F#']],
    ['Db', ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']],
    ['F#', ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#']],
    ['G#', ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##']],
    ['Eb', ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']],
    ['C', ['C', 'D', 'E', 'F', 'G', 'A', 'B']],
    ['C#', ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']],
    ['Dbb', ['Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cb']],
    ['A#', ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G##']],
    ['B#', ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A##']],
    ['Fb', ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb']],
    ['D', ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']],
    ['Gb', ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']],
    ['A', ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#',]],

]) // Returns a function 
    ("Testing generateScale(): Retrieves the correct major scale for tonic: %s → %s", (tonic, expected) => {
        var scale = NoteGenerator.generateScale(tonic, 'major')
        expect(scale).toEqual(expected);
    });

/**
 * Testing minor scales
 */
test.each([
    ['A', ['A', 'B', 'C', 'D', 'E', 'F', 'G']],
    ['Ab', ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']],
    ['C', ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb',]],
    ['A#', ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#']],
    ['B', ['B', 'C#', 'D', 'E', 'F#', 'G', 'A']],
    ['B#', ['B#', 'C##', 'D#', 'E#', 'F##', 'G#', 'A#']],
    ['F#', ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E']],
    ['F', ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb']],
    ['D', ['D', 'E', 'F', 'G', 'A', 'Bb', 'C']],
    ['D#', ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#']],
    ['E', ['E', 'F#', 'G', 'A', 'B', 'C', 'D']],
    ['G', ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F']],
    ['Eb', ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']],
    ['G#', ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#']],
    ['E#', ['E#', 'F##', 'G#', 'A#', 'B#', 'C#', 'D#']],
    ['Bb', ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab']],
    ['C#', ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B']],

]) // Returns a function 
    ("Testing generateScale(): Retrieves the correct minor scale for tonic: %s → %s", (tonic, expected) => {
        var scale = NoteGenerator.generateScale(tonic, 'minor')
        expect(scale).toEqual(expected);
    });

/**
 * Testing melodic minor scales
 */
test.each([
    ['A', ['A', 'B', 'C', 'D', 'E', 'F#', 'G#']],
    ['Ab', ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'G']],
    ['C', ['C', 'D', 'Eb', 'F', 'G', 'A', 'B',]],
    ['A#', ['A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G##']],
    ['B', ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A#']],
    ['B#', ['B#', 'C##', 'D#', 'E#', 'F##', 'G##', 'A##']],
    ['F#', ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E#']],
    ['F', ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'E']],
    ['D', ['D', 'E', 'F', 'G', 'A', 'B', 'C#']],
    ['D#', ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C##']],
    ['E', ['E', 'F#', 'G', 'A', 'B', 'C#', 'D#']],
    ['G', ['G', 'A', 'Bb', 'C', 'D', 'E', 'F#']],
    ['Eb', ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'D']],
    ['G#', ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F##']],
    ['E#', ['E#', 'F##', 'G#', 'A#', 'B#', 'C##', 'D##']],
    ['Bb', ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'A']],
    ['C#', ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B#']],

]) // Returns a function 
    ("Testing generateScale(): Retrieves the correct melodic scale for tonic: %s → %s", (tonic, expected) => {
        var scale = NoteGenerator.generateScale(tonic, 'melMinor')
        expect(scale).toEqual(expected);
    });

/**
 * Testing harmonic minor scales
 */
test.each([
    ['A', ['A', 'B', 'C', 'D', 'E', 'F', 'G#']],
    ['Ab', ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'G']],
    ['C', ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B',]],
    ['A#', ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G##']],
    ['B', ['B', 'C#', 'D', 'E', 'F#', 'G', 'A#']],
    ['B#', ['B#', 'C##', 'D#', 'E#', 'F##', 'G#', 'A##']],
    ['F#', ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E#']],
    ['F', ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'E']],
    ['D', ['D', 'E', 'F', 'G', 'A', 'Bb', 'C#']],
    ['D#', ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C##']],
    ['E', ['E', 'F#', 'G', 'A', 'B', 'C', 'D#']],
    ['G', ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F#']],
    ['Eb', ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'D']],
    ['G#', ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F##']],
    ['E#', ['E#', 'F##', 'G#', 'A#', 'B#', 'C#', 'D##']],
    ['Bb', ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'A']],
    ['C#', ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B#']],


]) // Returns a function 
    ("Testing generateScale(): Retrieves the correct harmonic scale for tonic: %s → %s", (tonic, expected) => {
        var scale = NoteGenerator.generateScale(tonic, 'harmMinor')
        expect(scale).toEqual(expected);
    });



/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                   TESTING:                                 */
/*                                                                            */
/*      realizeNotes(startNote, chromaticIntervalsStructure, noteLetters)     */
/*                                                                            */
/* -------------------------------------------------------------------------- */

// IMPORTANT NOTE: By testing either generateScale or generateChord, we are 
// indirectly testing realize notes, we might not need to directly test realizeNotes.
/*
var majorIntervalicStructure = MusicalCore.getChromaticIntervalsByScale('major');
var minorIntervalicStructure = MusicalCore.getChromaticIntervalsByScale('minor');
var melMinorIntervalicStructure = MusicalCore.getChromaticIntervalsByScale('melMinor');
var harmMinorIntervalicStructure = MusicalCore.getChromaticIntervalsByScale('harmMinor');

// Testing major scales
 
test.each([
    ['E', ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], majorIntervalicStructure, ['E', 'F', 'G', 'A', 'B', 'C', 'D']],
    ['Ab', ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], majorIntervalicStructure, ['A', 'B', 'C', 'D', 'E', 'F', 'G']],



]) // Returns a function 
    ("Testing realizeNotes(): Retrieves the correct major scale for tonic: %s → %s", (tonic, expected, structure, letters) => {
        var scale = NoteGenerator.realizeNotes(tonic, structure, letters)
        expect(scale).toEqual(expected);
    });


// Testing minor scales

test.each([
    ['A', ['A', 'B', 'C', 'D', 'E', 'F', 'G'], minorIntervalicStructure, ['A', 'B', 'C', 'D', 'E', 'F', 'G'],],
    ['Ab', ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'], minorIntervalicStructure, ['A', 'B', 'C', 'D', 'E', 'F', 'G'],],


]) // Returns a function 
    ("Testing realizeNotes(): Retrieves the correct minor scale for tonic: %s → %s", (tonic, expected, structure, letters) => {
        var scale = NoteGenerator.realizeNotes(tonic, structure, letters)
        expect(scale).toEqual(expected);
    });



// Testing melodic minor scales
 
test.each([
    ['A', ['A', 'B', 'C', 'D', 'E', 'F#', 'G#'], melMinorIntervalicStructure, ['A', 'B', 'C', 'D', 'E', 'F', 'G'],],
    ['F', ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'E'], melMinorIntervalicStructure, ['F', 'G', 'A', 'B', 'C', 'D', 'E'],],

]) // Returns a function 
    ("Testing realizeNotes(): Retrieves the correct melodic minor scale for tonic: %s → %s", (tonic, expected, structure, letters) => {
        var scale = NoteGenerator.realizeNotes(tonic, structure, letters)
        expect(scale).toEqual(expected);
    });


// Testing harmonic minor scales
 
test.each([
    ['A', ['A', 'B', 'C', 'D', 'E', 'F', 'G#'], harmMinorIntervalicStructure, ['A', 'B', 'C', 'D', 'E', 'F', 'G'],],
    ['Bb', ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'A'], harmMinorIntervalicStructure, ['B', 'C', 'D', 'E', 'F', 'G', 'A'],],

]) // Returns a function 
    ("Testing realizeNotes(): Retrieves the correct harmonic minor scale for tonic: %s → %s", (tonic, expected, structure, letters) => {
        var scale = NoteGenerator.realizeNotes(tonic, structure, letters)
        expect(scale).toEqual(expected);
    });
*/