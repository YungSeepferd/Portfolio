import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '@mui/material';
import * as THREE from 'three';

/**
 * ThreadsBackground
 * 
 * Three.js-based animated threads background for the WhoAmI profile card.
 * Creates flowing vertical lines with wave effects and mouse interaction.
 * 
 * Inspired by React Bits Threads but implemented with Three.js/react-three-fiber
 * to leverage existing dependencies.
 */

const ThreadsMesh = ({ color, amplitude = 1, distance = 0, mousePos }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // Vertex shader - creates the wavy line effect
  const vertexShader = `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform float uAmplitude;
    uniform float uDistance;
    uniform vec2 uMouse;
    
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Create wave effect
      float wave = sin(pos.y * 10.0 + iTime * 2.0) * uAmplitude * 0.1;
      
      // Mouse interaction - subtle displacement
      vec2 mouseInfluence = (uMouse - 0.5) * 2.0;
      wave += mouseInfluence.x * 0.05;
      
      pos.x += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader - renders the lines with gradient
  const fragmentShader = `
    uniform vec3 uColor;
    uniform float iTime;
    varying vec2 vUv;
    
    void main() {
      // Create vertical lines pattern
      float lines = mod(vUv.x * 20.0, 1.0);
      float linePattern = smoothstep(0.45, 0.5, lines) - smoothstep(0.5, 0.55, lines);
      
      // Add subtle animation to line intensity
      float pulse = sin(iTime * 0.5 + vUv.y * 3.0) * 0.2 + 0.8;
      
      // Gradient fade at edges
      float edgeFade = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
      
      vec3 finalColor = uColor * linePattern * pulse * edgeFade;
      float alpha = linePattern * edgeFade * 0.6;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(1, 1) },
      uColor: { value: new THREE.Color(color) },
      uAmplitude: { value: amplitude },
      uDistance: { value: distance },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [color, amplitude, distance]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = state.clock.elapsedTime;
      
      // Update mouse position
      if (mousePos) {
        materialRef.current.uniforms.uMouse.value.set(mousePos.x, mousePos.y);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const ThreadsBackground = ({ 
  color = '#ff9800', 
  amplitude = 1, 
  distance = 0,
  enableMouseInteraction = false 
}) => {
  const theme = useTheme();
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef();

  // Convert hex color to RGB for Three.js
  const threeColor = useMemo(() => {
    return color || theme.palette.accent.main;
  }, [color, theme]);

  const handleMouseMove = React.useCallback((e) => {
    if (!enableMouseInteraction || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    
    setMousePos({ x, y });
  }, [enableMouseInteraction]);

  const handleMouseLeave = React.useCallback(() => {
    setMousePos({ x: 0.5, y: 0.5 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: enableMouseInteraction ? 'auto' : 'none',
        opacity: 0.3,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <ThreadsMesh 
          color={threeColor} 
          amplitude={amplitude} 
          distance={distance}
          mousePos={mousePos}
        />
      </Canvas>
    </div>
  );
};

export default ThreadsBackground;
