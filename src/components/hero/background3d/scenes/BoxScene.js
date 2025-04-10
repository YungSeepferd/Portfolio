import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SHAPE_TYPES } from '../constants';
import Particle from '../ParticleComponent';

const BoxScene = ({ isActive, ...props }) => {
  const group = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, []);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed * (isActive ? 1 : 0.5);
      const a = Math.cos(t) + Math.sin(t * 1.1) / 10;
      const b = Math.sin(t) + Math.cos(t * 1.2) / 10;
      const s = Math.cos(t);
      particle.mx += (0 - particle.mx) * 0.02;
      particle.my += (0 - particle.my) * 0.02;
      group.current.children[i].position.set(
        (particle.mx / aspect) * a + xFactor + Math.cos((t + factor) / 10) * 5,
        (particle.my / aspect) * b + yFactor + Math.sin((t + factor) / 10) * 5,
        (particle.my / aspect) * b + zFactor + Math.sin((t + factor) / 10) * 5
      );
      group.current.children[i].scale.set(s, s, s);
    });
  });

  return (
    <group ref={group}>
      {particles.map((particle, i) => (
        <Particle key={i} />
      ))}
    </group>
  );
};

export default BoxScene;