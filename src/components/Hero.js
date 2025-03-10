import React, { Fragment, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './Hero.css';

const geometries = [
  <sphereGeometry args={[0.2, 16, 16]} />,
  <boxGeometry args={[0.3, 0.3, 0.3]} />,
  <coneGeometry args={[0.2, 0.4, 16]} />,
  <torusGeometry args={[0.2, 0.05, 16, 100]} />,
];

const InteractiveShape = ({ initialPosition, velocity, shapeIndex, setShapeIndex }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const { mouse } = state;
    if (meshRef.current) {
      const distanceToMouse = meshRef.current.position.distanceTo(
        new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0)
      );
      meshRef.current.position.add(velocity);
      ['x', 'y', 'z'].forEach((axis) => {
        if (meshRef.current.position[axis] > 5 || meshRef.current.position[axis] < -5) {
          velocity[axis] *= -1;
        }
      });
      if (distanceToMouse < 2) {
        if (shapeIndex === 0) {
          meshRef.current.position.lerp(new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0), 0.05);
        } else if (shapeIndex === 1) {
          const dodgeDirection = new THREE.Vector3(
            meshRef.current.position.x - mouse.x * 5,
            meshRef.current.position.y - mouse.y * 5,
            0
          ).normalize();
          meshRef.current.position.addScaledVector(dodgeDirection, 0.1);
        } else if (shapeIndex === 2) {
          meshRef.current.rotation.x += 0.1;
          meshRef.current.rotation.y += 0.1;
        } else if (shapeIndex === 3) {
          const scale = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.3;
          meshRef.current.scale.set(scale, scale, scale);
        }
      }
      const hue = hovered ? 0 : (distanceToMouse / 10) * 360;
      meshRef.current.material.color.setHSL((hue % 360) / 360, 0.7, hovered ? 0.8 : 0.5);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={initialPosition}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setShapeIndex((prev) => (prev + 1) % geometries.length)}
    >
      {geometries[shapeIndex]}
      <meshStandardMaterial />
    </mesh>
  );
};

const InteractiveShapes = () => {
  const [shapeIndex, setShapeIndex] = useState(0);
  const velocities = useRef(
    Array.from({ length: 30 }, () =>
      new THREE.Vector3(
        THREE.MathUtils.randFloat(-0.02, 0.02),
        THREE.MathUtils.randFloat(-0.02, 0.02),
        THREE.MathUtils.randFloat(-0.02, 0.02)
      )
    )
  );

  return (
    <group>
      {Array.from({ length: 30 }).map((_, i) => (
        <InteractiveShape
          key={i}
          initialPosition={[
            THREE.MathUtils.randFloatSpread(10),
            THREE.MathUtils.randFloatSpread(10),
            THREE.MathUtils.randFloatSpread(10),
          ]}
          velocity={velocities.current[i]}
          shapeIndex={shapeIndex}
          setShapeIndex={setShapeIndex}
        />
      ))}
    </group>
  );
};

const fieldTags = ['Human-Computer Interaction', 'UX Design', 'Audio Design', 'Haptic Design'];

const TagList = () => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}
  >
    {fieldTags.map((tag, idx) => (
      <Fragment key={idx}>
        {idx === 2 && <br style={{ flexBasis: '100%' }} />}
        <span
          style={{
            backgroundColor: 'rgba(66,133,244,0.2)',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          {tag}
        </span>
      </Fragment>
    ))}
  </div>
);

const Hero = () => (
  <section
    id="hero"
    className="hero-section"
    style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}
  >
    <Canvas
      camera={{ position: [0, 0, 10] }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <InteractiveShapes />
      <OrbitControls enableZoom={false} />
    </Canvas>
    <div className="hero-content">
      <h1 className="display-3 text-orange">
        Todo
      </h1>
      <TagList />
    </div>
  </section>
);

export default Hero;