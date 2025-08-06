import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Trail, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { themeColorToThreeColor } from '../utils/sceneThemeUtils';
import { useToneInstrument } from '../../../../hooks/useToneInstrument';

// Musical scale for the scene
const PENTATONIC_SCALE = ['C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5'];

// Create particle geometry for effects
const ParticleEffect = ({ position, color, active }) => {
  const points = useMemo(() => {
    const p = new Float32Array(30 * 3);
    for (let i = 0; i < 30; i++) {
      const radius = Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      p[i * 3] = position.x + radius * Math.cos(theta) * Math.sin(phi);
      p[i * 3 + 1] = position.y + radius * Math.sin(theta) * Math.sin(phi);
      p[i * 3 + 2] = position.z + radius * Math.cos(phi);
    }
    return p;
  }, [position]);

  return active ? (
    <Points positions={points}>
      <PointMaterial
        transparent
        size={0.1}
        color={color}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  ) : null;
};

import { useToneInstrument } from '../../../../hooks/useToneInstrument';

// Musical scale for the scene
const PENTATONIC_SCALE = [
  'C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5'
];
  
  // Create reverb impulse response
  const sampleRate = audioContext.sampleRate;
  const length = sampleRate * 2; // 2 seconds
  const impulse = audioContext.createBuffer(2, length, sampleRate);
  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleRate * 0.5));
    }
  }
  reverbNode.buffer = impulse;
  
  // Set up routing with effects
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(filterNode);
  filterNode.connect(delayNode);
  delayNode.connect(reverbNode);
  reverbNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);
  
  // Configure spatial audio
  pannerNode.panningModel = 'HRTF';
  pannerNode.distanceModel = 'inverse';
  pannerNode.refDistance = 1;
  pannerNode.maxDistance = 10000;
  pannerNode.rolloffFactor = 1;
  
  // Configure oscillators
  oscillator1.type = 'triangle';
  oscillator1.frequency.value = frequency;
  
  oscillator2.type = 'sine';
  oscillator2.frequency.value = frequency * 2;
  oscillator2.detune.value = 5;
  
  // Configure filter
  filterNode.type = 'lowpass';
  filterNode.frequency.value = 2000;
  filterNode.Q.value = 1;
  
  // Set initial gain to 0
  gainNode.gain.value = 0;
  
  // Start oscillators
  oscillator1.start();
  oscillator2.start();
  
  return {
    play: (startTime) => {
      const now = startTime || audioContext.currentTime;
      // Quick attack
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
      // Long release for more sustain
      gainNode.gain.setTargetAtTime(0, now + 0.1, 0.2);
      
      // Filter sweep for more movement
      filterNode.frequency.setValueAtTime(100, now);
      filterNode.frequency.exponentialRampToValueAtTime(3000, now + 0.1);
    },
    stop: () => {
      oscillator1.stop();
      oscillator2.stop();
    }
  };
};

/**
 * AudioVisualScene Component
 * Interactive musical scene with Tone.js integration
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
  const [showNextSceneMessage, setShowNextSceneMessage] = useState(false);
  
  // Tone.js instrument
  const { playNote, playChord, isStarted } = useToneInstrument();
  
  // Musical state
  const [lastNoteIndex, setLastNoteIndex] = useState(0);
  
  // Shapes state
  const [activeShapes, setActiveShapes] = useState([]);
  const maxShapes = 5;
  const shapesCollectedRef = useRef(0);
  
  // Initialize audio context on first interaction
  const initializeAudio = useCallback(() => {
    console.log('🎵 Initializing audio...', { audioInitialized });
    if (audioInitialized) {
      console.log('🎵 Audio already initialized, skipping');
      return;
    }
    
    try {
      const audioContext = createAudioContext();
      console.log('🎵 Audio context created:', { state: audioContext.state });
      audioContextRef.current = audioContext;
      
      // Create different notes for each shape with varying frequencies
      const notes = [
        261.63, // C4
        329.63, // E4
        392.00, // G4
        440.00, // A4
        523.25  // C5
      ];
      console.log('🎵 Creating synths for notes:', notes);
      
      // Initialize sounds object before populating
      soundsRef.current = {};
      
      // Create synths one by one with error handling
      notes.forEach(freq => {
        try {
          soundsRef.current[freq] = createSynth(audioContext, freq);
          console.log(`🎵 Created synth for frequency ${freq}`);
        } catch (error) {
          console.warn(`❌ Error creating synth for frequency ${freq}:`, error);
        }
      });
      
      setAudioInitialized(true);
      setShowAudioPrompt(false);
      console.log('🎵 Audio initialization complete');
    } catch (error) {
      console.warn('❌ Error initializing audio:', error);
      // Reset state in case of error
      audioContextRef.current = null;
      soundsRef.current = {};
    }
  }, [audioInitialized]);
  
  // Play sound with spatial audio and effects
  const playSound = useCallback((frequency, position) => {
    console.log('🔊 Attempting to play sound:', { frequency, position });
    
    if (!audioInitialized || !audioContextRef.current) {
      console.warn('⚠️ Cannot play sound - Audio not initialized:', { 
        audioInitialized, 
        contextExists: !!audioContextRef.current 
      });
      return;
    }
    
    try {
      const synth = soundsRef.current[frequency];
      console.log('🎹 Synth state:', { 
        exists: !!synth,
        hasPlayFunction: !!(synth && typeof synth.play === 'function'),
        hasPanner: !!(synth && synth.panner)
      });

      if (synth && typeof synth.play === 'function' && synth.panner) {
        // Update spatial position based on shape's position
        synth.panner.setPosition(position.x, position.y, position.z);
        console.log('📍 Updated spatial position:', { x: position.x, y: position.y, z: position.z });
        
        // Calculate delay time based on distance from camera
        const camera = new THREE.Vector3(0, 0, 5); // Assumed camera position
        const distance = position.distanceTo(camera);
        const delayTime = Math.min(distance * 0.1, 0.5); // Max delay of 0.5s
        console.log('⏱️ Calculated delay:', { distance, delayTime });
        
        if (audioContextRef.current.state === 'running') {
          console.log('▶️ Playing sound with context state: running');
          // Add slight random pitch variation for more organic sound
          const pitchVariation = 1 + (Math.random() * 0.1 - 0.05); // ±5%
          synth.play(audioContextRef.current.currentTime, delayTime, pitchVariation);
        } else if (audioContextRef.current.state === 'suspended') {
          console.log('⏸️ Audio context suspended, attempting to resume...');
          audioContextRef.current.resume().then(() => {
            console.log('▶️ Context resumed, now playing sound');
            synth.play(audioContextRef.current.currentTime, delayTime);
          });
        }
      }
    } catch (error) {
      console.error('❌ Error playing spatial sound:', error);
    }
  }, [audioInitialized]);
  
  // Generate a new musical shape
  const generateShape = useCallback(() => {
    const shapes = ['sphere', 'octahedron', 'icosahedron', 'dodecahedron'];
    
    // Dynamic position with musical meaning
    const noteIndex = (lastNoteIndex + 1) % PENTATONIC_SCALE.length;
    setLastNoteIndex(noteIndex);
    
    // Position based on musical scale - higher notes appear higher
    const radius = 4 + Math.random() * 3; // Closer to center for better interaction
    const angle = (noteIndex / PENTATONIC_SCALE.length) * Math.PI * 2; // Position around circle based on note
    const height = (noteIndex / PENTATONIC_SCALE.length) * 4 - 2; // Height based on note
    
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
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      note: notes[Math.floor(Math.random() * notes.length)],
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
    try {
      // Play note and chord with different timings
      playNote(note, 0.8);
      setTimeout(() => playChord(chordNotes, 0.4), 100);
      
      shapesCollectedRef.current += 1;
      
      if (shapesCollectedRef.current >= maxShapes) {
        setShowNextSceneMessage(true);
        
        // Play a final chord progression
        const playFinale = async () => {
          const baseNote = PENTATONIC_SCALE[0];
          const finalChords = [
            [baseNote, PENTATONIC_SCALE[2], PENTATONIC_SCALE[4]],
            [PENTATONIC_SCALE[1], PENTATONIC_SCALE[3], PENTATONIC_SCALE[5]],
            [PENTATONIC_SCALE[2], PENTATONIC_SCALE[4], PENTATONIC_SCALE[6]]
          ];
        
        // Trigger scene transition after a delay
        console.log('⏱️ Setting up transition timeout');
        setTimeout(() => {
          console.log('🔄 Executing transition cleanup');
          cleanupAudio();
          shapesCollectedRef.current = 0;
          setShowNextSceneMessage(false);
          setActiveShapes([]); // Clear shapes before transition
          console.log('✅ Transition cleanup complete');
        }, 2000);
      }
      
      console.log('🔄 Updating shape state');
      setActiveShapes(prev => {
        const updated = prev.map(s => s.id === shape.id ? { ...s, clicked: true } : s);
        console.log('✅ Shape state updated:', {
          totalShapes: updated.length,
          clickedShapes: updated.filter(s => s.clicked).length
        });
        return updated;
      });
    } catch (error) {
      console.error('❌ Error handling shape click:', error);
    }
  }, [playSound, maxShapes]);
  
  // Update shapes with animations
  useFrame(({ clock: frameTimer }) => {
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
    
    // Remove old shapes and add new ones
    setActiveShapes(prev => {
      const filtered = prev.filter(shape => 
        currentTime - shape.createdAt < 3 && !shape.clicked // Longer lifetime
      );
      
      // Add new shapes if needed, keeping more on screen
      while (filtered.length < 4) {
        filtered.push(generateShape());
      }
      
      return filtered;
    });
  });
  
  // Initialize audio on first render
  useEffect(() => {
    const handleFirstInteraction = () => {
      initializeAudio();
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [initializeAudio]);
  
  // Handle cleanup and transitions
  useEffect(() => {
    // Cleanup function for audio resources
    return () => {
      if (audioContextRef.current) {
        // Safely stop and cleanup all synths
        Object.values(soundsRef.current || {}).forEach((synth) => {
          try {
            if (synth && typeof synth.stop === 'function') {
              synth.stop();
            }
          } catch (error) {
            console.warn('Error cleaning up synth:', error);
          }
        });

        // Close audio context if it exists and is not already closed
        try {
          if (audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
          }
        } catch (error) {
          console.warn('Error closing audio context:', error);
        }
      }
    };
  }, []);
  
  // Progress indicator circles
  const ProgressIndicator = () => {
    return (
      <Html center position={[0, 3, 0]}>
        <div style={{
          display: 'flex',
          gap: '10px',
          background: 'rgba(0,0,0,0.3)',
          padding: '10px',
          borderRadius: '20px',
        }}>
          {Array.from({ length: maxShapes }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                background: i < shapesCollectedRef.current ? '#00ff00' : 'rgba(255,255,255,0.3)',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </div>
      </Html>
    );
  };

  return (
    <group>
      {activeShapes.map((shape) => {
        const Geometry = {
          box: THREE.BoxGeometry,
          sphere: THREE.SphereGeometry,
          cone: THREE.ConeGeometry,
          octahedron: THREE.OctahedronGeometry,
          tetrahedron: THREE.TetrahedronGeometry
        }[shape.shape];
        
        const shapeColor = shape.clicked ? '#00ff00' : themeColorToThreeColor(activeTheme.palette.primary.main);
        
        return (
          <group key={shape.id}>
            <mesh
              position={shape.position}
              rotation={shape.rotation}
              scale={shape.scale}
              onClick={() => handleShapeClick(shape)}
            >
              <primitive object={new Geometry()} />
              <meshPhongMaterial
                color={shapeColor}
                opacity={shape.clicked ? 0.2 : 0.8}
                transparent
                emissive={shapeColor}
                emissiveIntensity={shape.clicked ? 0.2 : 0.5}
                metalness={0.5}
                roughness={0.5}
              />
            </mesh>
            
            {/* Particle effect when clicked */}
            <ParticleEffect
              position={shape.position}
              color={shapeColor}
              active={shape.clicked}
            />
            
            {/* Energy trail following shape */}
            {!shape.clicked && (
              <Trail
                width={0.5}
                length={8}
                color={new THREE.Color(shapeColor)}
                attenuation={(t) => t * t}
              >
                <mesh position={shape.position}>
                  <sphereGeometry args={[0.02]} />
                  <meshBasicMaterial color={shapeColor} />
                </mesh>
              </Trail>
            )}
          </group>
        );
      })}
      
      {/* Progress Indicator */}
      <ProgressIndicator />
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
      <pointLight position={[5, 0, 5]} intensity={0.3} color={themeColorToThreeColor(activeTheme.palette.primary.main)} />
      
      {/* Add subtle fog for depth */}
      <fog attach="fog" args={['#000000', 10, 25]} />
      
      {/* Messages */}
      {(showAudioPrompt && !audioInitialized) && (
        <Html center position={[0, 0, 0]}>
          <div style={{
            color: '#fff',
            background: 'rgba(0,0,0,0.7)',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer'
          }} onClick={initializeAudio}>
            Click to enable sound
          </div>
        </Html>
      )}
      
      {showNextSceneMessage && (
        <Html center position={[0, 0, 0]}>
          <div style={{
            color: '#fff',
            background: 'rgba(0,0,0,0.7)',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            Great job! Moving to next scene...
          </div>
        </Html>
      )}
    </group>
  );
};

export default AudioVisualScene;
