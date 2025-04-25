import Bar from './Bar.js'
import PianoBar from './PianoBar.js';
import DrumsBar from './DrumsBar.js';
import BassBar from './BassBar.js';
import StylesLibrary from './StylesLibrary.js';
import MusicalCore from './MusicalCore.js';

class Playback {

    #bars;
    #numOfBars;
    #tempo;

    #pianoVolume;
    #drumsVolume;
    #bassVolume;

    #pianoSamplesObj;
    #bassSamplesObj;
    #drumsPlayerObj

    #pianoEventIDs;
    #bassEventIDs;
    #drumsEventIDs;

    #pianoSampler;
    #bassSampler

    #mainLoop;
    #playbackStartTime = 0;
    #hasPlayed = false

    // 
    #bassRhythm;
    #pianoRhythm;
    #drumsRhythm;

    #subdivisionDuration;

    /**
     * 
     */
    constructor() {

        this.#numOfBars = 4;
        this.#initializeBars();

        this.#pianoVolume = new Tone.Volume(0).toDestination();
        this.#drumsVolume = new Tone.Volume(0).toDestination();
        this.#bassVolume = new Tone.Volume(0).toDestination();

        this.#tempo = 120;
        Tone.getTransport().bpm.value = this.#tempo;

        this.#pianoSamplesObj = {};
        this.#bassSamplesObj = {};
        this.#drumsPlayerObj = {};

        this.#pianoEventIDs = [];
        this.#bassEventIDs = [];
        this.#drumsEventIDs = [];

        this.#bassRhythm = StylesLibrary.getBass('Rock', 'Bass 1');
        this.#pianoRhythm = [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.#drumsRhythm = StylesLibrary.getDrums('Rock', 'Drums 1');

        this.setDrumsRhythm(this.#drumsRhythm);

        this.#setupDrumsPlayer();
        this.#loopSetup();
    }

    calculateSubdivision() {

        let arrayLength = this.#bassRhythm.get('root').length;

        if (arrayLength == 16) {

            this.#subdivisionDuration = Tone.Time('16n').toSeconds();

        } else if (arrayLength == 12) {

            this.#subdivisionDuration = Tone.Time('8t').toSeconds();

        } else if (arrayLength == 32) {

            console.log("subdivision is 32")
            this.#subdivisionDuration = Tone.Time('32n').toSeconds();

        }
    }

    async startTone() {
        await Tone.start();
    }

    /**
     * 
     */
    #initializeBars() {

        this.#bars = [];

        for (let i = 0; i < this.#numOfBars; i++) {
            this.#bars.push(new Bar());
        }
    }

    changeTempo(newTempo) {

        if (this.#tempo !== newTempo) {
            Tone.Transport.cancel();
            this.#tempo = newTempo;
            Tone.Transport.bpm.value = this.#tempo;

        }

        console.log(`tempo is now: ${Tone.Transport.bpm.value }`)
    }

    async play() {

        this.#playbackStartTime = Tone.now();

        if (!this.#hasPlayed) {
            await Tone.start();
            this.#hasPlayed = true
        }

        if (Tone.Transport.state == 'stopped') {

            console.log('Playing...')
            this.mutePiano(false)
            this.muteBass(false)
            this.muteDrums(false)

            Tone.Transport.start("+0.1"); // Start the transport
            this.#mainLoop.start(); // Start the main loop

        } else if (Tone.Transport.state == 'started') {

            console.log("Loop state is started")
        }
    }

    stop() {
        
        if (Tone.Transport.state == 'started') {

            console.log('Stopped...')
            this.mutePiano(true)
            this.muteBass(true)
            this.muteDrums(true)

            Tone.Transport.stop();
            this.#mainLoop.stop();

        } else if (Tone.Transport.state == 'stopped') {

            console.log("Loop state is stopped")
        }
    }

    /**
    * Mute/unmute the piano.
    * @param {boolean} mute - true to mute, false to unmute
    */
    mutePiano(mute) {
        this.#pianoVolume.volume.value = mute ? -Infinity : 0;
    }

    /**
     * Mute/unmute the bass.
     * @param {boolean} mute - true to mute, false to unmute
     */
    muteBass(mute) {
        this.#bassVolume.volume.value = mute ? -Infinity : 0;
    }

    /**
     * Mute/unmute the drums.
     * @param {boolean} mute - true to mute, false to unmute
     */
    muteDrums(mute) {
        this.#drumsVolume.volume.value = mute ? -Infinity : 0;
    }

    /**
     * 
     * This method is called by HarmonySequence
     * 
     * @param {*} harmSeqBars 
     */
    updateHarmony(harmSeqIterator) {
        
        let length = this.#numOfBars;
        this.#bars = [];

        while(harmSeqIterator.hasNext()) {

            let harmonyBar = harmSeqIterator.next();
            let bar = new Bar();

            let pianoBar = new PianoBar(this.#pianoRhythm);
            let bassBar = new BassBar(this.#bassRhythm);
            let drumsBar = new DrumsBar(this.#drumsRhythm);

            bar.setPianoBar(pianoBar);
            bar.setBassBar(bassBar);
            bar.setDrumsBar(drumsBar)

            this.#bars.push(bar);

            if (harmonyBar.hasTwoChords()) {

                let leftVoicedChord = harmonyBar.getLeftVoicedChord();
                let concreteLeftChord = leftVoicedChord.getVoicedUpperVoices()
                let concreteLeftChordBass = leftVoicedChord.getConcreteBass()

                pianoBar.setLeftConcreteChord(concreteLeftChord)
                bassBar.setLeftChordRoot(concreteLeftChordBass, harmonyBar.getLeftChord().getNotes())

                let rightVoicedChord = harmonyBar.getRightVoicedChord();
                let concreteRightChord = rightVoicedChord.getVoicedUpperVoices()
                let concreteRightChordBass = rightVoicedChord.getConcreteBass()

                pianoBar.setRightConcreteChord(concreteRightChord)
                bassBar.setRightChordRoot(concreteRightChordBass, harmonyBar.getRightChord().getNotes());

                this.#updatePianoSampler(concreteLeftChord);
                this.#updatePianoSampler(concreteRightChord);

                this.#updateBassSampler(concreteLeftChordBass, bassBar.getLeftChordFifth());
                this.#updateBassSampler(concreteRightChordBass, bassBar.getRightChordFifth());

            } else if (harmonyBar.hasAChord()) {

                let leftVoicedChord = harmonyBar.getLeftVoicedChord();
                let concreteLeftChord = leftVoicedChord.getVoicedUpperVoices()
                let concreteLeftChordBass = leftVoicedChord.getConcreteBass()

                pianoBar.setLeftConcreteChord(concreteLeftChord)
                bassBar.setLeftChordRoot(concreteLeftChordBass, harmonyBar.getLeftChord().getNotes())

                this.#updatePianoSampler(concreteLeftChord);
                this.#updateBassSampler(concreteLeftChordBass, bassBar.getLeftChordFifth());
            }
            
        }

        Tone.Transport.cancel();
    }

    /**
     * 
     * @param {*} nextBarVoicesArray 
     * 
     * 
     */
    #updatePianoSampler(nextBarVoicesArray) {

        var length = nextBarVoicesArray.length;

        for (let i = 0; i < length; i++) {

            let nextNote = nextBarVoicesArray[i];

            let index = MusicalCore.getIndexInFullPitchChromaticScale(nextNote)
            let sharpChromScale = MusicalCore.getFullPitchChromaticScaleByType('sharp'); // Get the 'sharp' chromatic scale: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

            let enharmInSharpScale = sharpChromScale[index]; // Get enharmonic equivalente from the 'sharp' chromatic scale

            let enharmWithSharpWord = enharmInSharpScale.replace('#', 'sharp')
            let path = 'piano_audio_samples/' + enharmWithSharpWord + '.wav';

            if (!(nextNote in this.#pianoSamplesObj)) {

                this.#pianoSamplesObj[nextNote] = path; // Map properly named note to the path of its corresponding wav file
            }
        }

        this.#pianoSampler = new Tone.Sampler(this.#pianoSamplesObj).connect(this.#pianoVolume);
    }

    #updateBassSampler(root, fifth) {

        let rootIndex = MusicalCore.getIndexInFullPitchChromaticScale(root);
        let fifthIndex = MusicalCore.getIndexInFullPitchChromaticScale(fifth)

        let sharpChromScale = MusicalCore.getFullPitchChromaticScaleByType('sharp');

        let rootEnharmInSharpScale = sharpChromScale[rootIndex];
        let fifthEnharmInSharpScale = sharpChromScale[fifthIndex];

        let rootEnharmWithSharpWord = rootEnharmInSharpScale.replace('#', 'sharp')
        let fifthEnharmWithSharpWord = fifthEnharmInSharpScale.replace('#', 'sharp')

        let rootPath = 'bass_audio_samples/' + rootEnharmWithSharpWord + '.wav';
        let fifthPath = 'bass_audio_samples/' + fifthEnharmWithSharpWord + '.wav';

        if (!(root in this.#bassSamplesObj)) {

            this.#bassSamplesObj[root] = rootPath; // Map properly named note to the path of its corresponding wav file
        }

        if (!(fifth in this.#bassSamplesObj)) {

            this.#bassSamplesObj[fifth] = fifthPath; // Map properly named note to the path of its corresponding wav file
        }

        this.#bassSampler = new Tone.Sampler(this.#bassSamplesObj).connect(this.#bassVolume);
    }

    /**
     * 
     */
    #setupDrumsPlayer() {

        for (let i = 0; i < this.#numOfBars; i++) {

            let nextBarRhythm = this.#bars[0].getDrumsBar().getDrumsRhythm()

            for (let [drumComponent, rhythm] of nextBarRhythm) {

                let path = 'drums_audio_samples/' + drumComponent + '.wav';

                if (!(drumComponent in this.#drumsPlayerObj)) {
                   
                    this.#drumsPlayerObj[drumComponent] = new Tone.Player(path).connect(this.#drumsVolume); // Map properly named note to the path of its corresponding wav file
                }
            }
        }
    }


    #loopSetup() {
       
        this.#mainLoop = new Tone.Loop((loopTime) => {

            this.#schedulePiano(loopTime);
            this.#scheduleBass(loopTime);
            this.#scheduleDrums(loopTime);
        }, this.#numOfBars + "m");
    }

    /**
     * Schedules piano events based on the rhythm and chords.
     * @param {*} loopTime - The time at which the loop starts.
     */
    #schedulePiano(loopTime) {

       
        var sixteenthNoteDuration = Tone.Time('16n').toSeconds();

        // Helper function to schedule notes
        const scheduleNotes = (notes, rhythm, barIndex, loopTime) => {

            for (let note of notes) {

                let size = rhythm.length;

                for (let sixteenth = 0; sixteenth < size; sixteenth++) {

                    let noteDurationInTermsOfSixteenths = rhythm[sixteenth];

                    if (noteDurationInTermsOfSixteenths > 0) {

                        let measureOffset = Tone.Time(barIndex.toString() + 'm').toSeconds();
                        let whenExactly = loopTime + measureOffset + (sixteenth * sixteenthNoteDuration) - this.#playbackStartTime;
                        const actualDuration = noteDurationInTermsOfSixteenths * sixteenthNoteDuration;

                        const eventID = Tone.Transport.scheduleOnce((time) => {

                            this.#pianoSampler.triggerAttackRelease(note, actualDuration, time);

                        }, whenExactly);

                        this.#pianoEventIDs.push(eventID);
                    }
                }
            }
        }

        for (let i = 0; i < this.#numOfBars; i++) {

            let pianoBar = this.#bars[i].getPianoBar();

            // Skip if there is no chord
            if (!pianoBar.hasAChord()) {

                continue;
            }

            if (pianoBar.hasTwoChords()) {

                let leftChordNotes = pianoBar.getLeftConcreteChord();
                let leftChordRhythm = pianoBar.getLeftChordRhythm();
                scheduleNotes(leftChordNotes, leftChordRhythm, i, loopTime);

                let rightChordNotes = pianoBar.getRightConcreteChord();
                let rightChordRhythm = pianoBar.getRightChordRhythm();
                scheduleNotes(rightChordNotes, rightChordRhythm, i, loopTime);

            } else { // pianoBar has one chord exactly

                let leftChordNotes = pianoBar.getLeftConcreteChord();
                let leftChordRhythm = pianoBar.getLeftChordRhythm();
                scheduleNotes(leftChordNotes, leftChordRhythm, i, loopTime);
            }
        }
    }

    #scheduleBass(loopTime) {

        let subdivisionDuration;

        let arrayLength = this.#bassRhythm.get('root').length;

        if (arrayLength == 16) {

            subdivisionDuration = Tone.Time('16n').toSeconds();

        } else if (arrayLength == 12) {

            subdivisionDuration = Tone.Time('8t').toSeconds();

        } else if (arrayLength == 32) {

            console.log("subdivision is 32")
            subdivisionDuration = Tone.Time('32n').toSeconds();

        }


        const scheduleNotes = (notes, bassRhythm, barIndex, loopTime) => {


            for (let [voice, rhythm] of bassRhythm) {

                let arrayLength = rhythm.length;       

            let subdivisionDuration;

            if (arrayLength == 16) {
    
                subdivisionDuration = Tone.Time('16n').toSeconds();
    
            } else if (arrayLength == 12) {
    
                subdivisionDuration = Tone.Time('8t').toSeconds();
    
            } else if (arrayLength == 32) {
    
               
                subdivisionDuration = Tone.Time('32n').toSeconds();
    
            }


                let note = notes.get(voice);
                let size = rhythm.length;

                for (let subdivision = 0; subdivision < size; subdivision++) {
                    let noteDurationInTermsOfSubdivisions = rhythm[subdivision];

                    if (noteDurationInTermsOfSubdivisions > 0) {

                        let measureOffset = Tone.Time(barIndex.toString() + 'm').toSeconds();
                        let whenExactly = loopTime + measureOffset + (subdivision * subdivisionDuration) - this.#playbackStartTime;
                        const actualDuration = noteDurationInTermsOfSubdivisions * subdivisionDuration;

                        const eventID = Tone.Transport.scheduleOnce((time) => {

                            this.#bassSampler.triggerAttackRelease(note, actualDuration, time);
                        }, whenExactly);

                        this.#bassEventIDs.push(eventID);
                    }
                }
            }
        };

        // Schedule notes for each bar
        for (let i = 0; i < this.#numOfBars; i++) {
            let bassBar = this.#bars[i].getBassBar();

            // Skip if there is no chord
            if (!bassBar.hasAChord()) {
                continue;
            }

            if (bassBar.hasTwoChords()) {
                let leftChordNotes = bassBar.getLeftChordVoices();
                let leftChordRhythm = bassBar.getLeftChordRhythm();
                scheduleNotes(leftChordNotes, leftChordRhythm, i, loopTime);

                let rightChordNotes = bassBar.getRightChordVoices();
                let rightChordRhythm = bassBar.getRightChordRhythm();
                scheduleNotes(rightChordNotes, rightChordRhythm, i, loopTime);
            } else { // bassBar has one chord exactly
                let leftChordNotes = bassBar.getLeftChordVoices();
                let leftChordRhythm = bassBar.getLeftChordRhythm();
                scheduleNotes(leftChordNotes, leftChordRhythm, i, loopTime);
            }
        }
    }

    #scheduleDrums(loopTime) {

        for (let i = 0; i < this.#numOfBars; i++) {

            let drumsBar = this.#bars[i].getDrumsBar();
            let components = drumsBar.getDrumsRhythm();

            for (let [component, rhythm] of components) {


                let subdivisionDuration;
                let arrayLength = rhythm.length;


                if (arrayLength == 16) {
        
                    subdivisionDuration = Tone.Time('16n').toSeconds();
        
                } else if (arrayLength == 12) {
        
                    subdivisionDuration = Tone.Time('8t').toSeconds();
        
                } else if (arrayLength == 32) {
        
                   
                    subdivisionDuration = Tone.Time('32n').toSeconds();
        
                }
        

                let size = rhythm.length;

                for (let sixteenth = 0; sixteenth < size; sixteenth++) {

                    let noteDurationInTermsOfSixteenths = rhythm[sixteenth];

                    var measureOffset = Tone.Time(i.toString() + 'm').toSeconds();

                    let whenExactly = loopTime + measureOffset + (sixteenth * subdivisionDuration) - this.#playbackStartTime

                    if (noteDurationInTermsOfSixteenths > 0) {

                        const eventID = Tone.Transport.scheduleOnce((time) => {
                            console.log(`component is: ${component}`)
                            this.#drumsPlayerObj[component].start(time)


                        }, whenExactly);

                        this.#drumsEventIDs.push(eventID)
                    }

                }
            }
        }
    }

    /**
     * 
     */
    printState() {

        console.log("");

        for (let i = 0; i < this.#numOfBars; i++) {

            console.log(`Bar: ${i}`)
            let nextBar = this.#bars[i];
            let nextPianoBar = nextBar.getPianoBar();

            let notes = nextPianoBar.getPianoVoices();

            let rhythm = nextPianoBar.getPianoVoicesRhythm();

            if (notes != null) {

                for (let note of notes) {

                    console.log(`Next note: ${note}`)
                }

                console.log(rhythm);
            }

            console.log("");
        }

        console.log('Piano samples:');
        for (let key in this.#pianoSamplesObj) {

            console.log(`${key} -> ${this.#pianoSamplesObj[key]}`);
        }

        console.log("");

        console.log('Bass samples:');
        for (let key in this.#bassSamplesObj) {

            console.log(`${key} -> ${this.#bassSamplesObj[key]}`);
        }
    }



    /**
     * 
     * @param {*} newRhythm 
     */
    setPianoRhythm(newRhythm) {

        this.#pianoRhythm = newRhythm

        let length = this.#numOfBars;

        for (let i = 0; i < length; i++) {

            let nextPianoBar = this.#bars[i].getPianoBar();
            nextPianoBar.setPianoRhythm(newRhythm);
        }

        Tone.Transport.cancel();

    }

    /**
     * 
     * @param {*} newRhythm 
     */
    setBassRhythm(newRhythm) {

        this.#bassRhythm = newRhythm

        let length = this.#numOfBars;


        for (let i = 0; i < length; i++) {

            let nextBassBar = this.#bars[i].getBassBar();
            nextBassBar.setBassRhythm(newRhythm);
        }

        this.calculateSubdivision()
        Tone.Transport.cancel();
    }

    /**
     * 
     * @param {*} newRhythm 
     */
    setDrumsRhythm(newRhythm) {

        this.#drumsRhythm = newRhythm

        let length = this.#numOfBars;

        for (let i = 0; i < length; i++) {

            let nextDrumsBar = this.#bars[i].getDrumsBar();
            nextDrumsBar.setDrumsRhythm(newRhythm);
        }
        this.#setupDrumsPlayer()

        Tone.Transport.cancel();
    }

    /**
     * 
     * @param {*} newRhythm 
     * @param {*} index 
     */
    setPianoRhythmAtIndex(newRhythm, index) {

        let pianoBar = this.#bars[index].getPianoBar();
        pianoBar.setPianoRhythm(newRhythm);

    }

    /**
     * 
     * @param {*} newRhythm 
     * @param {*} index 
     */
    setBassRhythmAtIndex(newRhythm, index) {

        let bassBar = this.#bars[index].getBassBar();
        bassBar.setBassRhythm(newRhythm);
    }

    /**
     * 
     * @param {*} newRhythm 
     * @param {*} index 
     */
    setDrumsRhythmAtIndex(newRhythm, index) {

        let drumsBar = this.#bars[index].getDrumsBar();
        drumsBar.setDrumsRhythm(newRhythm);
    }
}

export default Playback;


/*
  clearAllEvents() {
 
              this.#pianoEventIDs.forEach((eventId) => Tone.getTransport().clear(eventId));
              this.#bassEventIDs.forEach((eventId) => Tone.getTransport().clear(eventId));
              this.#drumsEventIDs.forEach((eventId) => Tone.getTransport().clear(eventId));
              Tone.Transport.cancel();
          
              // Reset event arrays after clearing them
              this.#pianoEventIDs = [];
              this.#bassEventIDs = [];
              this.#drumsEventIDs = [];
          }
      

*/



