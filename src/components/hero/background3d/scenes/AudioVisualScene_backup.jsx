import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useToneInstrument } from '../../../../hooks/useToneInstrument';

// Musical scale for the scene
const PENTATONIC_SCALE = ['C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5'];

// Create particle geometry for effects
const AudioVisualScene = ({ color = new THREE.Color(), mousePosition, isTransitioning, theme }) => {

/**
 * AudioVisualScene Component - Simplified and improved
 * Interactive musical torus rings with better UX
 */
const AudioVisualScene = ({
  color = new THREE.Color(),
  mousePosition,
  isTransitioning,
  theme
}) => {
  const localTheme = useTheme();
  const activeTheme = theme || localTheme;
  
  // Scene state
  const { clock } = useThree();
  const maxShapes = 5; // Reduced for better performance
  
  // Audio setup
  const { playNote, playChord, isStarted } = useToneInstrument();
  
  // Shape management - simplified
  const [activeShapes, setActiveShapes] = useState([]);
  const audioInitialized = useRef(false);
  const shapesCollectedRef = useRef(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  // Initialize audio context
  const initializeAudio = useCallback(() => {
    if (!audioInitialized.current && isStarted) {
      try {
        playChord(['C4', 'E4', 'G4'], 0.6);
        audioInitialized.current = true;
        console.log('✅ Audio initialized for AudioVisualScene');
      } catch (error) {
        console.warn('⚠️ Audio initialization failed:', error);
      }
    }
  }, [isStarted, playChord]);

  // Create floating musical shape (torus rings)
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
    const rotationSpeed = (Math.random() - 0.5) * 2;
    const floatSpeed = 0.5 + Math.random() * 0.5;
    const floatRange = 0.5 + Math.random() * 0.5;
    
    return {
      id: Math.random(),
      position,
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: Math.random() * 0.3 + 0.4, // Slightly smaller range for better visibility
      shape: 'torus', // Use consistent torus shape
      note: PENTATONIC_SCALE[index % PENTATONIC_SCALE.length],
      noteIndex: index % PENTATONIC_SCALE.length,
      createdAt: clock.getElapsedTime(),
      clicked: false,
      // Animation parameters
      rotationSpeed,
      floatSpeed,
      floatRange,
      initialY: height, // Store initial height for floating animation
      initialScale: Math.random() * 0.3 + 0.4
    };
  }, [clock]);

  // Handle musical shape interaction
  const handleShapeClick = useCallback((shape) => {
    if (shape.clicked) return;

    // Play the shape's note and a supporting chord
    const note = PENTATONIC_SCALE[shape.noteIndex];
    const chordNotes = [
      note,
      PENTATONIC_SCALE[(shape.noteIndex + 2) % PENTATONIC_SCALE.length],
      PENTATONIC_SCALE[(shape.noteIndex + 4) % PENTATONIC_SCALE.length]
    ];

    console.log(`🎵 Playing note: ${note} at position:`, {
      x: shape.position.x.toFixed(2),
      y: shape.position.y.toFixed(2),  
      z: shape.position.z.toFixed(2)
    });

    try {
      // Play chord instead of single note for richer sound
      playChord(chordNotes, 0.7);
      shapesCollectedRef.current++;
      
      // Mark shape as clicked
      setActiveShapes(prev => prev.map(s => 
        s.id === shape.id ? { ...s, clicked: true } : s
      ));

      // Show completion message and transition after collecting all shapes
      if (shapesCollectedRef.current >= maxShapes) {
        setShowCompletionMessage(true);
        setTimeout(() => {
          shapesCollectedRef.current = 0;
          setShowCompletionMessage(false);
          setActiveShapes([]); // Clear shapes for next round
        }, 3000);
      }
    } catch (error) {
      console.error('❌ Error playing musical shape:', error);
    }
  }, [playChord, maxShapes, setShowCompletionMessage]);

  // Initialize shapes
  useEffect(() => {
    const newShapes = [];
    for (let i = 0; i < maxShapes; i++) {
      newShapes.push(createMusicalShape(i));
    }
    setActiveShapes(newShapes);
  }, [maxShapes, createMusicalShape]);

  // Initialize audio
  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  // Update shapes with animations
  useFrame(({ clock: frameTimer }) => {
    if (isTransitioning) return;

    const currentTime = frameTimer.getElapsedTime();
    
    // Update existing shapes' animations
    setActiveShapes(prev => {
      return prev.map(shape => {
        if (shape.clicked) return shape;
        
        // Rotate shape
        shape.rotation.x += shape.rotationSpeed * 0.02;
        shape.rotation.y += shape.rotationSpeed * 0.015;
        
        // Float up and down
        const floatOffset = Math.sin(currentTime * shape.floatSpeed) * shape.floatRange;
        shape.position.y = shape.initialY + floatOffset;
        
        // Pulse scale if not clicked
        const scalePulse = Math.sin(currentTime * 2) * 0.1;
        shape.scale = shape.initialScale + (shape.clicked ? 0 : scalePulse);
        
        return shape;
      });
    });
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
