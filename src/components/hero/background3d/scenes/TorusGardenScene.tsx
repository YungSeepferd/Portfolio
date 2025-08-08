import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useToneInstrument } from '../../../../hooks/useToneInstrument';

type TorusGardenSceneProps = {
  color?: THREE.Color;
  mousePosition?: { x: number; y: number } | null;
  isTransitioning?: boolean;
  easterEggActive?: boolean;
  interactionCount?: number;
};

const PENTATONIC_SCALE = ['C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5'] as const;

type ShapeData = {
  id: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  baseScale: number;
  scale: number;
  targetScale: number;
  rotationSpeed: number;
  pulsePhase: number;
  note: (typeof PENTATONIC_SCALE)[number];
  clicked: boolean;
  visible: boolean;
  meshRef: React.RefObject<THREE.Mesh>;
};

/**
 * TorusGardenScene
 * Optimized musical torus rings scene variant without per-frame React state updates.
 */
const TorusGardenScene: React.FC<TorusGardenSceneProps> = ({ isTransitioning }) => {
  const theme = useTheme();
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const shapesCollectedRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);
  const visibleCountRef = useRef(0);
  const maxShapes = 5;

  const { playChord, isStarted } = useToneInstrument();

  // Pre-create shapes data once
  const shapesRef = useRef<ShapeData[]>([]);
  if (shapesRef.current.length === 0) {
    const temp: ShapeData[] = [];
    for (let i = 0; i < maxShapes; i++) {
      const angle = (i / maxShapes) * Math.PI * 2;
      const radius = 4 + Math.random() * 3;
      const height = (i / maxShapes) * 4 - 2;
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );

      temp.push({
        id: i,
        position,
        rotation: new THREE.Euler(0, 0, 0),
        baseScale: 0.8 + Math.random() * 0.4,
        scale: 0.0001, // will lerp in when visible
        targetScale: 1,
        rotationSpeed: 0.5 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        note: PENTATONIC_SCALE[i % PENTATONIC_SCALE.length],
        clicked: false,
        visible: false,
        meshRef: React.createRef<THREE.Mesh>(),
      });
    }
    shapesRef.current = temp;
  }

  // Initialize audio lazily
  useEffect(() => {
    // Touch the hook to ensure Tone is initialized on first interaction.
    // Provide a no-op statement to satisfy no-empty lint rule.
    void isStarted;
  }, [isStarted]);

  const handleShapeClick = useCallback(
    (shape: ShapeData) => {
      if (shape.clicked) return;

      // Play a simple pentatonic triad around the shape's note
      const baseIndex = PENTATONIC_SCALE.indexOf(shape.note);
      const chordNotes = [
        PENTATONIC_SCALE[baseIndex],
        PENTATONIC_SCALE[(baseIndex + 2) % PENTATONIC_SCALE.length],
        PENTATONIC_SCALE[(baseIndex + 4) % PENTATONIC_SCALE.length],
      ];
      try {
        playChord(chordNotes, 0.5);
      } catch (e) {
        // noop
      }

      // Mark clicked and animate scale down
      shape.clicked = true;
      shape.targetScale = shape.baseScale * 0.5;
      shapesCollectedRef.current += 1;

      if (shapesCollectedRef.current >= maxShapes) {
        setShowCompletionMessage(true);
        // Reset after a short celebration
        setTimeout(() => {
          setShowCompletionMessage(false);
          // Reset shapes for replay
          shapesRef.current.forEach((s) => {
            s.clicked = false;
            s.targetScale = s.baseScale;
          });
          shapesCollectedRef.current = 0;
        }, 3000);
      }
    },
    [playChord]
  );

  // Animate without React state churn
  useFrame(({ clock }) => {
    if (isTransitioning) return;

    const elapsed = clock.getElapsedTime();

    // Spawn shapes gradually by toggling visibility on the mesh
    if (
      visibleCountRef.current < maxShapes &&
      elapsed - lastSpawnTimeRef.current > 1.6 // a bit faster than before
    ) {
      const nextIndex = visibleCountRef.current;
      const s = shapesRef.current[nextIndex];
      if (s && s.meshRef.current) {
        s.visible = true;
        s.targetScale = s.baseScale; // grow in
        s.meshRef.current.visible = true;
      }
      visibleCountRef.current += 1;
      lastSpawnTimeRef.current = elapsed;
    }

    // Animate existing shapes
    for (const s of shapesRef.current) {
      if (!s.visible) continue;
      const t = elapsed * s.rotationSpeed;
      const pulse = Math.sin(t + s.pulsePhase) * 0.1 + 1;

      // Rotation
      s.rotation.set(t * 0.3, t * 0.5, t * 0.2);

      // Scale towards target with a subtle pulse
      const desired = (s.clicked ? s.targetScale : s.baseScale * pulse) || s.baseScale;
      s.scale += (desired - s.scale) * 0.15;

      // Apply to mesh
      const m = s.meshRef.current;
      if (m) {
        m.position.copy(s.position);
        m.rotation.copy(s.rotation);
        m.scale.setScalar(s.scale);
      }
    }
  });

  // Dispose materials/geometries on unmount
  useEffect(() => {
    return () => {
      for (const s of shapesRef.current) {
        const m = s.meshRef.current as any;
        if (m) {
          if (m.geometry) m.geometry.dispose();
          if (m.material) {
            if (Array.isArray(m.material)) m.material.forEach((mat: any) => mat.dispose?.());
            else m.material.dispose?.();
          }
        }
      }
    };
  }, []);

  // Pre-created torus geometry to share among meshes (smaller allocations)
  const geometry = useMemo(() => new THREE.TorusGeometry(1, 0.3, 8, 16), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color={theme.palette.secondary.main} />

      {shapesRef.current.map((shape) => (
        <group key={shape.id}>
          <mesh
            ref={shape.meshRef}
            visible={shape.visible}
            onClick={(e) => {
              e.stopPropagation();
              handleShapeClick(shape);
            }}
          >
            <primitive object={geometry} attach="geometry" />
            <meshStandardMaterial
              color={shape.clicked ? '#00ff00' : theme.palette.primary.main}
              transparent
              opacity={shape.clicked ? 0.3 : 0.8}
              emissive={
                shape.clicked
                  ? new THREE.Color('#00ff00')
                  : new THREE.Color(theme.palette.secondary.main)
              }
              emissiveIntensity={shape.clicked ? 0.3 : 0.4}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Soft glow ring when not clicked */}
          <mesh visible={shape.visible && !shape.clicked} position={shape.position}>
            <primitive object={geometry} attach="geometry" />
            <meshBasicMaterial color={theme.palette.primary.main} transparent opacity={0.1} />
          </mesh>
        </group>
      ))}

      {/* UI */}
      <Html center position={[0, -5, 0]}>
        <div
          style={{
            color: theme.palette.text.primary,
            textAlign: 'center',
            padding: '1rem 1.5rem',
            background: 'rgba(0,0,0,0.6)',
            borderRadius: 12,
            maxWidth: 320,
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 600 }}>
            Musical Torus Garden
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
            Tap the rings to create harmonies
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
            Progress: {shapesCollectedRef.current} / {maxShapes}
          </p>
        </div>
      </Html>

      {showCompletionMessage && (
        <Html center position={[0, 3, 0]}>
          <div
            style={{
              color: theme.palette.primary.main,
              textAlign: 'center',
              padding: '1.2rem 1.6rem',
              background: 'rgba(0,0,0,0.75)',
              borderRadius: 14,
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 18px ${theme.palette.primary.main}40`,
            }}
          >
            <strong>Harmonic Resonance!</strong>
            <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>You created a musical pattern.</div>
          </div>
        </Html>
      )}
    </group>
  );
};

export default TorusGardenScene;
