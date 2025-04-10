import * as THREE from 'three';
import { extend } from '@react-three/fiber';

/**
 * Custom Particle class for 3D scenes
 * This extends THREE.Object3D to create a base for particles
 */
class Particle extends THREE.Object3D {
  constructor(props = {}) {
    super();
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.lifespan = props.lifespan || 1.0;
    this.decay = props.decay || 0.01;
    this.size = props.size || 1.0;
    this.color = props.color || new THREE.Color(1, 1, 1);
  }

  update(delta) {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= this.decay;
    this.acceleration.multiplyScalar(0);
  }

  isDead() {
    return this.lifespan < 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
}

// Register with React Three Fiber
extend({ Particle });

export default Particle;
