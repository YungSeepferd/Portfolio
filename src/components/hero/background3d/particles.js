import * as THREE from 'three';

/**
 * Creates a particle system for ambient background effects
 *
 * @param {Object} options - Particle system configuration
 * @param {number} options.count - Number of particles
 * @param {number} options.color - Particle color (hex)
 * @param {number} options.opacity - Particle opacity
 * @param {number} options.size - Particle size
 * @param {number} options.dispersion - How spread out the particles are
 * @returns {THREE.Points} Three.js Points object with particles
 */
export const createParticleSystem = ({
  count = 200,
  color = 0xffffff,
  opacity = 0.6,
  size = 0.03,
  dispersion = 20,
}) => {
  // Create particle geometry
  const particlesGeometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(count * 3);

  // Random positions in space
  for (let i = 0; i < count; i++) {
    // Spread particles in a sphere
    const i3 = i * 3;
    positionArray[i3] = (Math.random() - 0.5) * dispersion;
    positionArray[i3 + 1] = (Math.random() - 0.5) * dispersion;
    positionArray[i3 + 2] = (Math.random() - 0.5) * dispersion;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

  // Create particle material
  const particlesMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  // Create points system
  const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);

  return particleSystem;
};

/**
 * Animate particle system based on time and mouse position
 *
 * @param {THREE.Points} particleSystem - The particle system to animate
 * @param {number} time - Current time (usually from clock.elapsedTime)
 * @param {number} delta - Time since last frame
 * @param {Object} mousePosition - Normalized mouse position { x, y }
 */
export const animateParticles = (particleSystem, time, delta, mousePosition) => {
  if (!particleSystem || !particleSystem.geometry) return;

  const positions = particleSystem.geometry.attributes.position;
  const count = positions.count;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Simple floating motion
    positions.array[i3 + 1] += Math.sin(time * 0.1 + i * 0.1) * 0.005;

    // Small random motion
    positions.array[i3] += (Math.random() - 0.5) * 0.005;
    positions.array[i3 + 2] += (Math.random() - 0.5) * 0.005;

    // Mouse influence if available
    if (mousePosition) {
      positions.array[i3] += mousePosition.x * 0.0005;
      positions.array[i3 + 1] += mousePosition.y * 0.0005;
    }

    // Wrap particles if they go too far
    const maxDist = 15;
    const distSq =
      positions.array[i3] * positions.array[i3] +
      positions.array[i3 + 1] * positions.array[i3 + 1] +
      positions.array[i3 + 2] * positions.array[i3 + 2];

    if (distSq > maxDist * maxDist) {
      // Reset to random position near center
      positions.array[i3] = (Math.random() - 0.5) * 10;
      positions.array[i3 + 1] = (Math.random() - 0.5) * 10;
      positions.array[i3 + 2] = (Math.random() - 0.5) * 10;
    }
  }

  positions.needsUpdate = true;
};
