import { useState, useCallback } from 'react';
import { soundSynth } from '../utils/sound-synthesizer';

export const useSynthSound = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize audio context on first user interaction
  const initializeAudio = useCallback(() => {
    if (!isInitialized) {
      soundSynth.resumeAudioContext();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const playClick = useCallback(() => {
    initializeAudio();
    if (isEnabled) soundSynth.createClickSound();
  }, [isEnabled, initializeAudio]);

  const playHover = useCallback(() => {
    if (isEnabled) soundSynth.createHoverSound();
  }, [isEnabled]);

  const playAmbient = useCallback(() => {
    if (isEnabled) soundSynth.createAmbientDrone();
  }, [isEnabled]);

  const playSuccess = useCallback(() => {
    if (isEnabled) soundSynth.createSuccessSound();
  }, [isEnabled]);

  return {
    playClick,
    playHover,
    playAmbient,
    playSuccess,
    isEnabled,
    setIsEnabled,
  };
};
