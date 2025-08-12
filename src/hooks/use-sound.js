import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

export const useSound = (url, distance = 1) => {
  const sound = useRef();
  const { camera } = useThree();

  useEffect(() => {
    // Create an audio listener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // Create a positional audio source
    const positionalAudio = new THREE.PositionalAudio(listener);
    sound.current = positionalAudio;

    // Load the sound
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(url, (buffer) => {
      positionalAudio.setBuffer(buffer);
      positionalAudio.setRefDistance(distance);
      positionalAudio.setLoop(false);
    });

    return () => {
      if (sound.current) {
        sound.current.disconnect();
      }
      if (listener) {
        camera.remove(listener);
      }
    };
  }, [camera, url, distance]);

  const play = () => {
    if (sound.current && !sound.current.isPlaying) {
      sound.current.play();
    }
  };

  const stop = () => {
    if (sound.current && sound.current.isPlaying) {
      sound.current.stop();
    }
  };

  return { play, stop, sound };
};
