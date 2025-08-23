import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SceneContextState {
  quality: 'low' | 'medium' | 'high';
  isSceneLoading: boolean;
  enableEffects: boolean;
  enableInteractivity: boolean;
  effectsIntensity: number;
  animationSpeed: number;
}

interface SceneContextValue extends SceneContextState {
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
  setSceneLoading: (isLoading: boolean) => void;
  toggleEffects: () => void;
  toggleInteractivity: () => void;
  setEffectsIntensity: (intensity: number) => void;
  setAnimationSpeed: (speed: number) => void;
}

const defaultContextValue: SceneContextValue = {
  quality: 'medium',
  isSceneLoading: true,
  enableEffects: true,
  enableInteractivity: true,
  effectsIntensity: 1.0,
  animationSpeed: 1.0,
  setQuality: () => {},
  setSceneLoading: () => {},
  toggleEffects: () => {},
  toggleInteractivity: () => {},
  setEffectsIntensity: () => {},
  setAnimationSpeed: () => {},
};

export const SceneContext = createContext<SceneContextValue>(defaultContextValue);

export const useSceneContext = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useSceneContext must be used within a SceneProvider');
  }
  return context;
};

interface SceneProviderProps {
  children: ReactNode;
  initialQuality?: 'low' | 'medium' | 'high';
}

export const SceneProvider: React.FC<SceneProviderProps> = ({ 
  children,
  initialQuality = 'medium' 
}) => {
  // State for managing scene settings
  const [state, setState] = useState<SceneContextState>({
    quality: initialQuality,
    isSceneLoading: true,
    enableEffects: true,
    enableInteractivity: true,
    effectsIntensity: 1.0,
    animationSpeed: 1.0,
  });

  // Handler to set scene quality
  const setQuality = useCallback((quality: 'low' | 'medium' | 'high') => {
    setState(prev => ({ ...prev, quality }));
  }, []);

  // Handler to set scene loading state
  const setSceneLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isSceneLoading: isLoading }));
  }, []);

  // Handler to toggle effects on/off
  const toggleEffects = useCallback(() => {
    setState(prev => ({ ...prev, enableEffects: !prev.enableEffects }));
  }, []);

  // Handler to toggle interactivity on/off
  const toggleInteractivity = useCallback(() => {
    setState(prev => ({ ...prev, enableInteractivity: !prev.enableInteractivity }));
  }, []);

  // Handler to set effects intensity
  const setEffectsIntensity = useCallback((intensity: number) => {
    setState(prev => ({ ...prev, effectsIntensity: intensity }));
  }, []);

  // Handler to set animation speed
  const setAnimationSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, animationSpeed: speed }));
  }, []);

  // Combine state and handlers
  const contextValue = {
    ...state,
    setQuality,
    setSceneLoading,
    toggleEffects,
    toggleInteractivity,
    setEffectsIntensity,
    setAnimationSpeed,
  };

  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
};

export default SceneProvider;
