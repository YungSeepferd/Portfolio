import { useEffect, useCallback, useRef } from 'react';
import { useUIStore } from '../store';
import * as Tone from 'tone';

export const useToneInstrument = () => {
  // Master chain: synth -> delay -> reverb -> filter -> masterGain -> destination
  const masterGain = new Tone.Gain(0.2).toDestination();
  const filter = new Tone.Filter(1000, 'lowpass').connect(masterGain);
  const reverb = new Tone.Reverb({ decay: 3.2, wet: 0.12 }).connect(filter);
  const delay = new Tone.FeedbackDelay('8n', 0.25).connect(reverb);
  const synth = new Tone.PolySynth(Tone.Synth).connect(delay);
  const ambientActiveRef = useRef({ active: false, notes: [] });
  const lfoRef = useRef(null);
  const volumeRef = useRef(0.2);
  const soundEnabled = useUIStore((s) => s.soundEnabled);
  const soundVolume = useUIStore((s) => s.soundVolume);

  useEffect(() => {
    // Set initial parameters
    synth.set({
      envelope: {
        attack: 0.03,
        decay: 0.08,
        sustain: 0.25,
        release: 1.2,
      },
    });

    // Subtle slow LFO to gently modulate volume (breathing)
    const lfo = new Tone.LFO({
      frequency: 0.05, // ~20s cycle
      min: 0.85,
      max: 1.0,
      type: 'sine',
    });
    lfo.connect(masterGain.gain);
    lfo.start();
    lfoRef.current = lfo;

    return () => {
      // Stop any ambient voices
      try {
        if (ambientActiveRef.current.active && ambientActiveRef.current.notes?.length) {
          synth.triggerRelease(ambientActiveRef.current.notes);
        }
      } catch (e) {
        // noop
      }
      try {
        lfoRef.current?.stop();
      } catch (_e) {
        // noop
      }
      try {
        lfoRef.current?.disconnect();
      } catch (_e) {
        // noop
      }
      synth.dispose();
      masterGain.dispose();
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
    synth.triggerAttackRelease(note, '8n', now, velocity);

    // Automate filter cutoff
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(3000, now + 0.1);
    filter.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
  }, []);

  const playChord = useCallback(async (notes, velocity = 0.7) => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    const now = Tone.now();
    synth.triggerAttackRelease(notes, '4n', now, velocity);
  }, []);

  // Start a subtle ambient chord (sustained). Call stopAmbient to release.
  const startAmbient = useCallback(async (notes, volumeDb = -28) => {
    if (!Array.isArray(notes) || notes.length === 0) return;
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
    try {
      // Lower volume for ambient pad and gently fade in
      synth.set({ volume: volumeDb });
      const now = Tone.now();
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(volumeRef.current, now + 3.0);
      synth.triggerAttack(notes);
      ambientActiveRef.current = { active: true, notes };
    } catch (e) {
      // noop
    }
  }, []);

  const stopAmbient = useCallback(() => {
    try {
      if (ambientActiveRef.current.active && ambientActiveRef.current.notes?.length) {
        const now = Tone.now();
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.linearRampToValueAtTime(0, now + 1.5);
        synth.triggerRelease(ambientActiveRef.current.notes);
      }
    } catch (e) {
      // noop
    }
    ambientActiveRef.current = { active: false, notes: [] };
    // Reset synth volume to default-ish
    try {
      synth.set({ volume: 0 });
    } catch (e) {
      // noop
    }
  }, []);

  // React to global volume and enabled flags
  useEffect(() => {
    volumeRef.current = soundEnabled ? soundVolume : 0;
    const now = Tone.now();
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.linearRampToValueAtTime(volumeRef.current, now + 0.25);
  }, [soundEnabled, soundVolume]);

  return {
    playNote,
    playChord,
    startAmbient,
    stopAmbient,
    isStarted: Tone.context.state === 'running',
  };
};
