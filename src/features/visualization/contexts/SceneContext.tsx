import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { useTheme } from '@mui/material';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { SHAPE_TYPES } from '../constants';
import { PerformanceMode } from '../types';

interface SceneState {
  currentShapeType: typeof SHAPE_TYPES[keyof typeof SHAPE_TYPES];
  isTransitioning: boolean;
  showParticles: boolean;
  mousePosition: { x: number; y: number };
  isDragging: boolean;
  isInteractionEnabled: boolean;
  hasInteraction: boolean;
  performanceMode: PerformanceMode;
  frameRate: number;
}

interface SceneContextValue extends SceneState {
  switchShapeType: () => void;
  toggleParticles: () => void;
  updateMousePosition: (position: { x: number; y: number }) => void;
  updateDragging: (dragging: boolean) => void;
  setInteractionEnabled: (enabled: boolean) => void;
  setPerformanceMode: (mode: PerformanceMode) => void;
  resetScene: () => void;
}

const defaultState: SceneState = {
  currentShapeType: SHAPE_TYPES.SPHERE,
  isTransitioning: false,
  showParticles: true,
  mousePosition: { x: 0, y: 0 },
  isDragging: false,
  isInteractionEnabled: true,
  hasInteraction: false,
  performanceMode: 'auto',
  frameRate: 60,
};

const SceneContext = createContext<SceneContextValue>({
  ...defaultState,
  switchShapeType: () => {},
  toggleParticles: () => {},
  updateMousePosition: () => {},
  updateDragging: () => {},
  setInteractionEnabled: () => {},
  setPerformanceMode: () => {},
  resetScene: () => {},
});

interface SceneProviderProps {
  children: React.ReactNode;
  initialPerformanceMode?: PerformanceMode;
}

export const SceneProvider: React.FC<SceneProviderProps> = ({
  children,
  initialPerformanceMode = 'auto',
}) => {
  const theme = useTheme();
  const { reducedMotion } = useAccessibility();
  const [state, setState] = useState<SceneState>({
    ...defaultState,
    performanceMode: initialPerformanceMode,
  });

  // Track frame rate
  const frameTimeRef = useRef<number[]>([]);
  const lastFrameTime = useRef(performance.now());

  // Update frame rate calculation
  useEffect(() => {
    const updateFrameRate = () => {
      const now = performance.now();
      const frameDuration = now - lastFrameTime.current;
      lastFrameTime.current = now;

      frameTimeRef.current.push(frameDuration);
      if (frameTimeRef.current.length > 60) {
        frameTimeRef.current.shift();
      }

      const averageFrameTime =
        frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length;
      const currentFPS = 1000 / averageFrameTime;

      setState((prev) => ({
        ...prev,
        frameRate: Math.round(currentFPS),
      }));
    };

    const frameId = requestAnimationFrame(updateFrameRate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Auto-adjust performance mode based on frame rate
  useEffect(() => {
    if (state.performanceMode !== 'auto') return;

    const lowPerformanceThreshold = 30;
    const highPerformanceThreshold = 55;

    if (state.frameRate < lowPerformanceThreshold) {
      setState((prev) => ({
        ...prev,
        showParticles: false,
      }));
    } else if (state.frameRate > highPerformanceThreshold && !reducedMotion) {
      setState((prev) => ({
        ...prev,
        showParticles: true,
      }));
    }
  }, [state.frameRate, state.performanceMode, reducedMotion]);

  // Handlers
  const switchShapeType = useCallback(() => {
    if (state.isTransitioning || !state.isInteractionEnabled) return;

    setState((prev) => {
      const currentIndex = Object.values(SHAPE_TYPES).indexOf(prev.currentShapeType);
      const nextIndex = (currentIndex + 1) % Object.values(SHAPE_TYPES).length;
      
      return {
        ...prev,
        currentShapeType: Object.values(SHAPE_TYPES)[nextIndex],
        isTransitioning: true,
        hasInteraction: true,
      };
    });

    // Reset transition state after animation
    setTimeout(
      () => setState((prev) => ({ ...prev, isTransitioning: false })),
      theme.transitions.duration.complex
    );
  }, [state.isTransitioning, state.isInteractionEnabled, theme.transitions.duration.complex]);

  const toggleParticles = useCallback(() => {
    setState((prev) => ({ ...prev, showParticles: !prev.showParticles }));
  }, []);

  const updateMousePosition = useCallback((position: { x: number; y: number }) => {
    setState((prev) => ({ ...prev, mousePosition: position }));
  }, []);

  const updateDragging = useCallback((dragging: boolean) => {
    setState((prev) => ({ ...prev, isDragging: dragging }));
  }, []);

  const setInteractionEnabled = useCallback((enabled: boolean) => {
    setState((prev) => ({ ...prev, isInteractionEnabled: enabled }));
  }, []);

  const setPerformanceMode = useCallback((mode: PerformanceMode) => {
    setState((prev) => ({ ...prev, performanceMode: mode }));
  }, []);

  const resetScene = useCallback(() => {
    setState(defaultState);
  }, []);

  const value = {
    ...state,
    switchShapeType,
    toggleParticles,
    updateMousePosition,
    updateDragging,
    setInteractionEnabled,
    setPerformanceMode,
    resetScene,
  };

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
};

export const useSceneState = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useSceneState must be used within a SceneProvider');
  }
  return context;
};

export default SceneContext;
