import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useSceneState } from '../contexts/SceneContext';
import { PerformanceMetrics } from '../types';
import { PERFORMANCE_CONFIG } from '../constants';

export const usePerformanceMonitor = () => {
  const { gl } = useThree();
  const { performanceMode, setPerformanceMode } = useSceneState();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    drawCalls: 0,
    triangles: 0,
    points: 0,
  });

  const frameTimeRef = useRef<number[]>([]);
  const lastFrameTime = useRef(typeof performance !== 'undefined' ? performance.now() : 0);

  // Monitor frame rate and other metrics
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMetrics = () => {
      const now = performance.now();
      const frameDuration = now - lastFrameTime.current;
      lastFrameTime.current = now;

      // Update frame time history
      frameTimeRef.current.push(frameDuration);
      if (frameTimeRef.current.length > 60) {
        frameTimeRef.current.shift();
      }

      // Calculate average FPS
      const averageFrameTime =
        frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length;
      const currentFPS = 1000 / averageFrameTime;

      // Get WebGL metrics
      const info = gl.info;
      
      setMetrics({
        fps: Math.round(currentFPS),
        drawCalls: info.render?.calls || 0,
        triangles: info.render?.triangles || 0,
        points: info.render?.points || 0,
      });
    };

    const frameId = requestAnimationFrame(updateMetrics);
    return () => cancelAnimationFrame(frameId);
  }, [gl]);

  // Auto-adjust performance mode based on metrics
  useEffect(() => {
    if (performanceMode !== 'auto' || typeof window === 'undefined') return;

    const adjustPerformanceMode = () => {
      const { fps } = metrics;

      if (fps < 30) {
        setPerformanceMode('low');
      } else if (fps < 45) {
        setPerformanceMode('medium');
      } else {
        setPerformanceMode('high');
      }
    };

    const debounceTimer = setTimeout(adjustPerformanceMode, 1000);
    return () => clearTimeout(debounceTimer);
  }, [metrics, performanceMode, setPerformanceMode]);

  // Get current performance config
  const currentConfig = PERFORMANCE_CONFIG[performanceMode === 'auto' ? 'medium' : performanceMode];

  return {
    metrics,
    currentConfig,
  };
};

export default usePerformanceMonitor;
