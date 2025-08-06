import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useToneInstrument } from '../../../../hooks/useToneInstrument';

// Musical scale for the scene
const PENTATONIC_SCALE = ['C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5'];

/**
 * AudioVisualScene Component - Simplified and improved
 * Interactive musical torus rings with better UX
 */
const AudioVisualScene = ({ _color, _mousePosition, isTransitioning, theme }) => {
  const activeTheme = useTheme();
  const { clock } = useThree();
  
  // Shape management state
  const maxShapes = 5;
  const [activeShapes, setActiveShapes] = useState([]);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const shapesCollectedRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);
  const shapeIdCounterRef = useRef(0);
  
  // Audio integration
  const { playChord, isStarted } = useToneInstrument();
  
  const initAudioAndGestures = useCallback(async () => {
    if (!isStarted) {
      try {
        // Initialize audio context if not already started
        console.log('Initializing audio for AudioVisualScene');
      } catch (error) {
        console.warn('Could not initialize audio:', error);
      }
    }
  }, [isStarted]);

  useEffect(() => {
    initAudioAndGestures();
  }, [initAudioAndGestures]);

  const createMusicalShape = useCallback((index) => {
    const angle = (index / maxShapes) * Math.PI * 2;
    const radius = 4 + Math.random() * 3; // Closer to center for better interaction
    const height = (index / maxShapes) * 4 - 2; // Height based on note
    
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
    
    // Add animation parameters
    const rotationSpeed = 0.5 + Math.random() * 0.3;
    const pulsePhase = Math.random() * Math.PI * 2;
    
    return {
      id: shapeIdCounterRef.current++,
      position: position.toArray(),
      rotation: [0, 0, 0],
      scale: 1,
      note: PENTATONIC_SCALE[index % PENTATONIC_SCALE.length],
      clicked: false,
      rotationSpeed,
      pulsePhase,
      baseScale: 0.8 + Math.random() * 0.4
    };
  }, []);

  // Handle shape clicking with musical feedback
  const handleShapeClick = useCallback((shape) => {
    if (shape.clicked) return;
    
    // Play a beautiful chord instead of single note
    const baseNoteIndex = PENTATONIC_SCALE.indexOf(shape.note);
    const chordNotes = [
      PENTATONIC_SCALE[baseNoteIndex],
      PENTATONIC_SCALE[(baseNoteIndex + 2) % PENTATONIC_SCALE.length],
      PENTATONIC_SCALE[(baseNoteIndex + 4) % PENTATONIC_SCALE.length]
    ];
    
    try {
      playChord(chordNotes, '0.5');
    } catch (error) {
      console.warn('Audio playback error:', error);
    }
    
    // Update shape state
    setActiveShapes(prev => 
      prev.map(s => 
        s.id === shape.id 
          ? { ...s, clicked: true }
          : s
      )
    );
    
    shapesCollectedRef.current++;
    
    // Check for completion
    if (shapesCollectedRef.current >= maxShapes) {
      setShowCompletionMessage(true);
      setTimeout(() => {
        setShowCompletionMessage(false);
        // Reset scene for replay
        setActiveShapes([]);
        shapesCollectedRef.current = 0;
      }, 4000);
    }
  }, [playChord]);

  // Spawn shapes gradually
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    // Spawn shapes every 2 seconds if not all spawned
    if (activeShapes.length < maxShapes && 
        elapsedTime - lastSpawnTimeRef.current > 2.0) {
      
      const newShape = createMusicalShape(activeShapes.length);
      setActiveShapes(prev => [...prev, newShape]);
      lastSpawnTimeRef.current = elapsedTime;
    }
    
    // Animate existing shapes
    setActiveShapes(prev => prev.map(shape => {
      const time = elapsedTime * shape.rotationSpeed;
      const pulse = Math.sin(time + shape.pulsePhase) * 0.1 + 1;
      
      return {
        ...shape,
        rotation: [time * 0.3, time * 0.5, time * 0.2],
        scale: shape.clicked ? shape.baseScale * 0.5 : shape.baseScale * pulse
      };
    }));
  });

  return (
    <group>
      {/* Enhanced lighting for better visibility */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight 
        position={[-10, -5, -10]} 
        intensity={0.8}
        color={activeTheme.palette.secondary.main}
      />
      
      {/* Musical torus shapes */}
      {activeShapes.map((shape) => (
        <group key={shape.id}>
          <mesh
            position={shape.position}
            rotation={shape.rotation}
            scale={shape.scale}
            onClick={(e) => {
              e.stopPropagation();
              handleShapeClick(shape);
            }}
          >
            {/* Use torus geometry for better visual consistency */}
            <torusGeometry args={[1, 0.3, 8, 16]} />
            <meshStandardMaterial
              color={shape.clicked ? '#00ff00' : activeTheme.palette.primary.main}
              transparent
              opacity={shape.clicked ? 0.3 : 0.8}
              emissive={shape.clicked ? '#00ff00' : activeTheme.palette.secondary.main}
              emissiveIntensity={shape.clicked ? 0.3 : 0.4}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          
          {/* Subtle glow effect for active shapes */}
          {!shape.clicked && (
            <mesh position={shape.position} scale={shape.scale * 1.2}>
              <torusGeometry args={[1, 0.3, 8, 16]} />
              <meshBasicMaterial
                color={activeTheme.palette.primary.main}
                transparent
                opacity={0.1}
              />
            </mesh>
          )}
        </group>
      ))}
      
      {/* Instructions UI */}
      <Html center position={[0, -5, 0]}>
        <div style={{
          color: activeTheme.palette.text.primary,
          textAlign: 'center',
          padding: '1rem 1.5rem',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: '12px',
          maxWidth: '320px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
            🎵 Musical Torus Garden
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
            Click on the floating rings to create harmonies
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
            Progress: {shapesCollectedRef.current} / {maxShapes}
          </p>
        </div>
      </Html>

      {/* Completion message */}
      {showCompletionMessage && (
        <Html center position={[0, 3, 0]}>
          <div style={{
            color: activeTheme.palette.primary.main,
            textAlign: 'center',
            padding: '1.5rem 2rem',
            background: 'rgba(0,0,0,0.8)',
            borderRadius: '16px',
            border: `2px solid ${activeTheme.palette.primary.main}`,
            backdropFilter: 'blur(15px)',
            animation: 'pulse 2s infinite',
            boxShadow: `0 0 20px ${activeTheme.palette.primary.main}40`
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>🎉 Harmonic Resonance!</h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>
              You've created a beautiful musical composition!
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default AudioVisualScene;
