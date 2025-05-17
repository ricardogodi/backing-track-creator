import MusicalCore from "../MusicalCore";
import Chord from "../Chord";
import { test, expect } from "vitest";


/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                        constructor(root, quality)                          */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/*
* Input format: 
# root input, quality input, expected type, expected notes, expected baseTriad, expected upperVoices
*/
test.each([
    ['D', 'M', 'D', 'M', 'triad' , ['D','F#','A'], ['D','F#','A'], ['D','F#','A']],
    ['E', 'M', 'E', 'M', 'triad' , ['E','G#','B'], ['E','G#','B'], ['E','G#','B']],
    ['C', 'm', 'C', 'm', 'triad' , ['C','Eb','G'], ['C','Eb','G'],['C','Eb','G']],
    ['C', 'dim7', 'C', 'dim7', 'seventhChord' , ['C','Eb','Gb','Bbb'], ['C','Eb','Gb'],['Eb','Bbb']],
    ['C#', 'maj7', 'C#', 'maj7', 'seventhChord' , ['C#','E#','G#','B#'], ['C#','E#','G#'],['E#','B#']],
    ['F', 'm7b5', 'F', 'm7b5', 'seventhChord' , ['F','Ab','Cb','Eb'], ['F','Ab','Cb'],['Ab','Eb']],

])
("Retrieves the correct properties for %s, %s →  %s, %s, %s, %s , %s, %s", (root, quality, expRoot, expQuality, expType, expNotes, expBaseTriad, expUpperVoices) => {  
    var chord = new Chord(root, quality);
    var theRoot = chord.getRoot();
    var theQuality = chord.getQuality();
    var theType = chord.getType();
    var theNotes = chord.getNotes();
    var theBaseTriad = chord.getBaseTriad();
    var theUpperVoices = chord.getUpperVoices();

    expect(theRoot).toBe(expRoot);
    expect(theQuality).toBe(expQuality);
    expect(theType).toBe(expType);
    expect(theNotes).toEqual(expNotes);
    expect(theBaseTriad).toEqual(expBaseTriad);
    expect(theUpperVoices).toEqual(expUpperVoices);
});


/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                               setRoot(root)                                */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/*
* Input format: 
# initial root input, initial quality input, new root set, expected type, expected notes, expected baseTriad, expected upperVoices
*/

test.each([
    ['D', 'M', 'E', 'E', 'M', 'triad' , ['E','G#','B'], ['E','G#','B'], ['E','G#','B'],],
    ['E#', 'M', 'E', 'E', 'M', 'triad' , ['E','G#','B'], ['E','G#','B'], ['E','G#','B'],],
    ['F##', 'M', 'F#', 'F#', 'M', 'triad' , ['F#','A#','C#'], ['F#','A#','C#'],['F#','A#','C#'],],
    ['F#', 'M', 'F##', 'F##', 'M', 'triad' , ['F##','A##','C##'], ['F##','A##','C##'],['F##','A##','C##'],],
    // Important: Setting a new root does not change the quality of the chord
    ['D', 'maj7', 'E', 'E', 'maj7', 'seventhChord' , ['E','G#','B', 'D#'], ['E','G#','B'], ['G#', 'D#'],],
    ['C', 'm7b5', 'Ab', 'Ab', 'm7b5', 'seventhChord' , ['Ab','Cb','Ebb','Gb'], ['Ab','Cb','Ebb'], ['Cb','Gb'],],

])
("Retrieves the correct properties for %s, %s →  %s, %s, %s, %s , %s, %s", (initialRoot, initialQuality, newRoot, expRoot, expQuality, expType, expNotes, expBaseTriad, expUpperVoices) => {  
    var chord = new Chord(initialRoot, initialQuality);

    chord.setRoot(newRoot)

    expect(chord.getRoot()).toBe(expRoot);
    expect(chord.getQuality()).toBe(expQuality);
    expect(chord.getType()).toBe(expType);
    expect(chord.getNotes()).toEqual(expNotes);
    expect(chord.getBaseTriad()).toEqual(expBaseTriad);
    expect(chord.getUpperVoices()).toEqual(expUpperVoices);
});

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                 TESTING:                                   */
/*                                                                            */
/*                           setQuality(newQuality)                           */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/*
* Input format: 
# initial root input, initial quality input, new quality set, expected type, expected notes, expected baseTriad, expected upperVoices
*/

test.each([
    ['D', 'M', 'm', 'D', 'm', 'triad' , ['D','F','A'], ['D','F','A'], ['D','F','A']],
    ['C', 'M', 'm7', 'C', 'm7', 'seventhChord' , ['C','Eb','G', 'Bb'], ['C','Eb','G'], ['Eb','Bb']],
    ['F', 'maj7', 'm', 'F', 'm', 'triad' , ['F','Ab','C'], ['F','Ab','C'], ['F','Ab','C']],


])
("Retrieves the correct properties for %s, %s →  %s, %s, %s, %s , %s, %s", (initialRoot, initialQuality, newQuality, expRoot, expQuality, expType, expNotes, expBaseTriad, expUpperVoices) => {  
    var chord = new Chord(initialRoot, initialQuality);

    chord.setQuality(newQuality);

    expect(chord.getRoot()).toBe(expRoot);
    expect(chord.getQuality()).toBe(expQuality);
    expect(chord.getType()).toBe(expType);
    expect(chord.getNotes()).toEqual(expNotes);
    expect(chord.getBaseTriad()).toEqual(expBaseTriad);
    expect(chord.getUpperVoices()).toEqual(expUpperVoices);
});