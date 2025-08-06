import { useEffect, useCallback } from 'react';
import * as Tone from 'tone';

export const useToneInstrument = () => {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const filter = new Tone.Filter(1000, "lowpass").connect(Tone.Destination);
  const reverb = new Tone.Reverb(2.5).connect(filter);
  const delay = new Tone.FeedbackDelay("8n", 0.5).connect(reverb);
  
  useEffect(() => {
    // Set up effects chain
    synth.connect(delay);
    
    // Set initial parameters
    synth.set({
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    });

    return () => {
      synth.dispose();
      filter.dispose();
      reverb.dispose();
      delay.dispose();
    };
  }, []);

  const playNote = useCallback(async (note, velocity = 0.7) => {
    // Make sure Tone.js is started
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    // Get current time for scheduling
    const now = Tone.now();
    
    // Play the note with envelope
    synth.triggerAttackRelease(note, "8n", now, velocity);
    
    // Automate filter cutoff
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(3000, now + 0.1);
    filter.frequency.exponentialRampToValueAt(1000, now + 0.2);
  }, []);

  const playChord = useCallback(async (notes, velocity = 0.7) => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    const now = Tone.now();
    synth.triggerAttackRelease(notes, "4n", now, velocity);
  }, []);

  return {
    playNote,
    playChord,
    isStarted: Tone.context.state === 'running'
  };
};
