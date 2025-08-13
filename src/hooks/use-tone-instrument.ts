import { useCallback } from 'react';

/**
 * Mock useToneInstrument hook
 * Replaces Tone.js functionality with no-op functions to maintain component compatibility
 * while removing the problematic audio library that was causing crashes.
 */
export const useToneInstrument = () => {
  // Mock functions that do nothing but maintain the same API
  const playNote = useCallback(async (note: string, velocity = 0.7) => {
    // Optional: Add simple Web Audio API feedback here if needed
    console.log(`[Mock Audio] Playing note: ${note} at velocity: ${velocity}`);
  }, []);

  const playChord = useCallback(async (notes: string[], velocity = 0.7) => {
    console.log(`[Mock Audio] Playing chord: ${notes.join(', ')} at velocity: ${velocity}`);
  }, []);

  const startAmbient = useCallback(async (notes: string[], volumeDb = -28) => {
    console.log(`[Mock Audio] Starting ambient: ${notes.join(', ')} at volume: ${volumeDb}dB`);
  }, []);

  const stopAmbient = useCallback(() => {
    console.log('[Mock Audio] Stopping ambient');
  }, []);

  return {
    playNote,
    playChord,
    startAmbient,
    stopAmbient,
    isStarted: true, // Always return true since we're not using real audio
  };
};
