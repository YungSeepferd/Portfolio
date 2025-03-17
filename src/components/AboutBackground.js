import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// This component controls the camera position based on the active tab.
const CameraController = ({ activeTab }) => {
  const { camera } = useThree();
  const targetPos = new THREE.Vector3();
  // Map active tabs to target camera positions:
  // Core: center; Highlights: shift right (simulate zooming in on that area); Biography: shift left and pull back.
  if (activeTab === 'Core') {
    targetPos.set(0, 0, 50);
  } else if (activeTab === 'Highlights') {
    targetPos.set(20, 0, 45);
  } else if (activeTab === 'Biography') {
    targetPos.set(-20, 0, 55);
  }
  useFrame(() => {
    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// Each realm is positioned in a different X location. Also its scale is animated to pop when active.
const Realm = ({ children, position, highlighted, extraScale = 1 }) => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      // When highlighted, animate to a larger scale.
      const targetScale = highlighted ? extraScale * 1 : extraScale * 0.7;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });
  return <group ref={ref} position={position}>{children}</group>;
};

const BiographyRealm = () => {
  // Create a waving line:
  const points = [];
  const amplitude = 5, wavelength = 20;
  for (let x = -wavelength; x <= wavelength; x += 0.5) {
    points.push(new THREE.Vector3(x, Math.sin((x / wavelength) * Math.PI * 2) * amplitude, 0));
  }
  const lineRef = useRef();
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.z += 0.01;
    }
  });
  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry" setFromPoints={points} />
      <lineBasicMaterial attach="material" color="#888888" />
    </line>
  );
};

const CoreRealm = () => (
  <>
    <gridHelper args={[60, 20, "#555555", "#555555"]} />
    {[-10, 0, 10].map((x, i) => (
      <mesh key={i} position={[x, 1.5, i === 1 ? 0 : (i === 0 ? -10 : 5)]}>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial color="#888888" emissive="#111111" />
      </mesh>
    ))}
  </>
);

const HighlightsRealm = () => {
  const cubes = Array.from({ length: 10 });
  return (
    <>
      {cubes.map((_, idx) => (
        <mesh
          key={idx}
          position={[
            THREE.MathUtils.randFloatSpread(30),
            THREE.MathUtils.randFloatSpread(20),
            THREE.MathUtils.randFloatSpread(30)
          ]}
          rotation={[0, 0, 0]}
          castShadow
        >
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#666666" roughness={0.8} emissive="#111111" />
        </mesh>
      ))}
    </>
  );
};

const AboutBackground = ({ activeTab }) => {
  return (
    <Canvas
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      camera={{ position: [0, 0, 50], fov: 75 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={0.7} />
      <CameraController activeTab={activeTab} />
      {/* Place realms at different X positions */}
      <Realm highlighted={activeTab === 'Biography'} position={[-30, 0, 0]} extraScale={1.2}>
        <BiographyRealm />
      </Realm>
      <Realm highlighted={activeTab === 'Core'} position={[0, 0, 0]} extraScale={1}>
        <CoreRealm />
      </Realm>
      <Realm highlighted={activeTab === 'Highlights'} position={[30, 0, 0]} extraScale={1.2}>
        <HighlightsRealm />
      </Realm>
    </Canvas>
  );
};

export default AboutBackground;