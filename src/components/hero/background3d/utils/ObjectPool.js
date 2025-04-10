/**
 * Object Pool - Reuse objects instead of creating new ones
 * Significant performance improvement for mobile devices
 */
export class ObjectPool {
  constructor(size, createFn) {
    this.pool = Array(size).fill().map(() => ({ inUse: false, object: createFn() }));
  }

  get() {
    const available = this.pool.find(item => !item.inUse);
    if (available) {
      available.inUse = true;
      return available.object;
    }
    return null;
  }

  release(object) {
    const poolItem = this.pool.find(item => item.object === object);
    if (poolItem) {
      poolItem.inUse = false;
    }
  }

  reset() {
    this.pool.forEach(item => { item.inUse = false; });
  }
}

export default ObjectPool;
