import Playback from "./Playback.js";
import HarmonySequence from "./HarmonySequence.js";
import Chord from "./Chord.js"
var chord1 = new Chord('C','maj7')
var chord2 = new Chord('D','maj7')
var chord3 = new Chord('E','maj7')
var chord4 = new Chord('F','maj7')


var hs = new HarmonySequence()
hs.insertChordAtBar(chord1,0,'left')
hs.insertChordAtBar(chord2,1,'left')
hs.insertChordAtBar(chord3,2,'left')
hs.insertChordAtBar(chord4,3,'left')

hs.moveChord(0,1,'left','right')


console.log(hs.getBarLabels())