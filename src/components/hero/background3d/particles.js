import * as THREE from 'three';
import { extend } from '@react-three/fiber';

/**
 * Custom Particle Class
 * Extends THREE.Object3D to create a reusable particle component
 */
class Particle extends THREE.Object3D {
  constructor() {
    super();
    // Initialize particle properties
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.age = 0;
    this.lifetime = 1;
    this.size = 1;
  }
  
  update(deltaTime) {
    // Implementation for particle behavior
    this.age += deltaTime;
    this.velocity.add(this.acceleration.clone().multiplyScalar(deltaTime));
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
  }
}

// Register the Particle class with R3F
extend({ Particle });

export { Particle };
