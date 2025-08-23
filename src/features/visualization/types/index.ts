export type PerformanceMode = 'low' | 'medium' | 'high' | 'auto';

export interface Vector2 {
  x: number;
  y: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface SceneConfig {
  maxParticles: number;
  particleSize: number;
  mouseInfluence: number;
  transitionDuration: number;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  accent: string;
}

export interface PerformanceMetrics {
  fps: number;
  drawCalls: number;
  triangles: number;
  points: number;
}
