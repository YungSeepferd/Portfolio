import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useToneSound } from '../../hooks/useToneSound';

export function CassettePlayerWithSound(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/cassette_player_4k.gltf');
  // Set autoStart to true to begin playing immediately
  const { playClick, toggleAmbient } = useToneSound(true);

  const handleClick = async () => {
    await playClick(); // Just play the click sound on interaction
    toggleAmbient(); // Toggle the ambient sound
  };

  return (
    <group ref={group} {...props} dispose={null} onClick={handleClick}>
      {/* Your existing cassette player model code here */}
    </group>
  );
}
