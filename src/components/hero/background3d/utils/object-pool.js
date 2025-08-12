/**
 * ObjectPool
 *
 * A utility for reusing Three.js objects to improve performance
 * and reduce garbage collection pauses
 */

class ObjectPool {
  constructor(factory, initialSize = 50) {
    this.factory = factory;
    this.pool = [];
    this.activeObjects = new Set();

    // Pre-populate the pool
    this.expand(initialSize);
  }

  // Get an object from the pool or create a new one
  get() {
    let object;

    if (this.pool.length > 0) {
      object = this.pool.pop();
    } else {
      object = this.factory();
    }

    this.activeObjects.add(object);
    return object;
  }

  // Return an object to the pool
  release(object) {
    if (this.activeObjects.has(object)) {
      this.activeObjects.delete(object);
      this.pool.push(object);
    }
  }

  // Add more objects to the pool
  expand(count) {
    for (let i = 0; i < count; i++) {
      this.pool.push(this.factory());
    }
  }

  // Clear the pool
  clear() {
    this.pool = [];
    this.activeObjects.clear();
  }

  // Get the number of objects in the pool
  get size() {
    return this.pool.length;
  }

  // Get the number of active objects
  get activeCount() {
    return this.activeObjects.size;
  }

  // Get total objects (active + pooled)
  get totalCount() {
    return this.pool.length + this.activeObjects.size;
  }
}

export default ObjectPool;
