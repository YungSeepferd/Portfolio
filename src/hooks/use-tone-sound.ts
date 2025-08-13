import { useState, useCallback, useEffect } from 'react';
import { tonePlayer } from '../utils/tone-player';

export const useToneSound = (autoStart = false) => {
  const [isEnabled] = useState(true); // Sound always enabled
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initSound = async () => {
      if (autoStart && mounted && !isPlaying) {
        await tonePlayer.playAmbientLoop();
        setIsPlaying(true);
      }
    };

    initSound();

    // Cleanup on unmount
    return () => {
      mounted = false;
      if (isPlaying) {
        tonePlayer.stopAmbientLoop();
      }
    };
  }, [autoStart, isPlaying]);

  const playClick = useCallback(async () => {
    if (isEnabled) {
      await tonePlayer.playClick();
    }
  }, [isEnabled]);

  const playHover = useCallback(async () => {
    if (isEnabled) {
      await tonePlayer.playHover();
    }
  }, [isEnabled]);

  const toggleAmbient = useCallback(async () => {
    if (!isEnabled) return;

    if (isPlaying) {
      await tonePlayer.stopAmbientLoop();
    } else {
      await tonePlayer.playAmbientLoop();
    }
    setIsPlaying(!isPlaying);
  }, [isEnabled, isPlaying]);

  const playSuccess = useCallback(async () => {
    if (isEnabled) {
      await tonePlayer.playSuccess();
    }
  }, [isEnabled]);

  return {
    playClick,
    playHover,
    toggleAmbient,
    playSuccess,
    isEnabled,
    isPlaying,
  };
};
