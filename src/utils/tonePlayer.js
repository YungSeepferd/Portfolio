import * as Tone from 'tone';

class TonePlayer {
  constructor() {
    this.initialized = false;
    this.synth = null;
    this.ambientSynth = null;
    this.clickSynth = null;
    this.filter = null;
    // Auto-initialize when the class is instantiated
    this.autoInit();
  }

  async autoInit() {
    // Set a small timeout to ensure the context starts after the page loads
    setTimeout(() => {
      this.initialize();
    }, 100);
  }

  async initialize() {
    if (this.initialized) return;

    // Start audio context
    await Tone.start();
    
    // Click synth for UI interactions
    this.clickSynth = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: {
        attack: 0.0006,
        decay: 0.1,
        sustain: 0,
        release: 0.1
      }
    }).toDestination();

    // Main synth for ambient sounds
    this.ambientSynth = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 1.5,
      modulationIndex: 10,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 1.0,
        release: 0.8
      },
      modulation: {
        type: "square"
      },
      modulationEnvelope: {
        attack: 0.5,
        decay: 0.01,
        sustain: 1.0,
        release: 0.5
      }
    });

    // Add effects
    this.filter = new Tone.Filter({
      type: "lowpass",
      frequency: 1000,
      rolloff: -12
    });

    const reverb = new Tone.Reverb({
      decay: 5,
      wet: 0.3
    });

    // Connect effects chain
    this.ambientSynth.chain(this.filter, reverb, Tone.Destination);
    
    this.initialized = true;
  }

  async playClick() {
    await this.initialize();
    this.clickSynth.triggerAttackRelease("C2", "32n", undefined, 0.3);
  }

  async playHover() {
    await this.initialize();
    this.clickSynth.triggerAttackRelease("G2", "16n", undefined, 0.1);
  }

  async playAmbientLoop() {
    await this.initialize();
    
    // Create a sequence of notes for the ambient sound
    const notes = ["C4", "E4", "G4", "B4"];
    const sequence = new Tone.Sequence(
      (time, note) => {
        this.ambientSynth.triggerAttackRelease(note, "2n", time, 0.2);
        // Modulate filter frequency for movement
        this.filter.frequency.rampTo(
          Math.random() * 2000 + 500,
          "4n",
          time
        );
      },
      notes,
      "4n"
    );

    // Start the sequence
    sequence.start();
    Tone.Transport.start();
  }

  async stopAmbientLoop() {
    if (!this.initialized) return;
    Tone.Transport.stop();
    this.ambientSynth.releaseAll();
  }

  async playSuccess() {
    await this.initialize();
    const now = Tone.now();
    // Play an ascending arpeggio
    this.ambientSynth.triggerAttackRelease("C4", "8n", now, 0.3);
    this.ambientSynth.triggerAttackRelease("E4", "8n", now + 0.1, 0.3);
    this.ambientSynth.triggerAttackRelease("G4", "8n", now + 0.2, 0.3);
    this.ambientSynth.triggerAttackRelease("C5", "4n", now + 0.3, 0.3);
  }
}

export const tonePlayer = new TonePlayer();
