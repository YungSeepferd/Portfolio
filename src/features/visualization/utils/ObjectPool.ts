/**
 * A generic object pool for efficient object reuse
 */
export class ObjectPool<T> {
  private available: T[] = [];
  private inUse: Set<T> = new Set();
  private factory: () => T;

  constructor(factory: () => T, initialSize = 0) {
    this.factory = factory;
    
    // Pre-fill pool if initial size provided
    for (let i = 0; i < initialSize; i++) {
      this.available.push(this.factory());
    }
  }

  /**
   * Get an object from the pool or create a new one
   */
  get(): T {
    let object: T;
    
    if (this.available.length > 0) {
      object = this.available.pop()!;
    } else {
      object = this.factory();
    }

    this.inUse.add(object);
    return object;
  }

  /**
   * Release an object back to the pool
   */
  release(object: T): void {
    if (this.inUse.has(object)) {
      this.inUse.delete(object);
      this.available.push(object);
    }
  }

  /**
   * Release all objects currently in use
   */
  releaseAll(): void {
    this.inUse.forEach(object => {
      this.available.push(object);
    });
    this.inUse.clear();
  }

  /**
   * Get the number of objects currently in use
   */
  get activeCount(): number {
    return this.inUse.size;
  }

  /**
   * Get the number of available objects in the pool
   */
  get availableCount(): number {
    return this.available.length;
  }

  /**
   * Get the total number of objects managed by the pool
   */
  get totalCount(): number {
    return this.activeCount + this.availableCount;
  }
}
