import { describe, it, expect } from 'vitest';
import { MediaPathResolver } from './MediaPathResolver';

import { beforeEach } from 'vitest';

describe('MediaPathResolver', () => {
  // Use the singleton instance
  let resolver: MediaPathResolver;

  describe('isImageType', () => {
    it('correctly identifies supported image types', () => {
      expect(resolver.isImageType('test.jpg')).toBe(true);
      expect(resolver.isImageType('test.jpeg')).toBe(true);
      expect(resolver.isImageType('test.png')).toBe(true);
      expect(resolver.isImageType('test.gif')).toBe(true);
      expect(resolver.isImageType('test.webp')).toBe(true);
      expect(resolver.isImageType('test.svg')).toBe(true);
    });

    it('returns false for unsupported file types', () => {
      expect(resolver.isImageType('test.mp4')).toBe(false);
      expect(resolver.isImageType('test.pdf')).toBe(false);
      expect(resolver.isImageType('test')).toBe(false);
    });
  });

  describe('resolveMediaPath', () => {
    it('resolves relative paths correctly', () => {
      const path = 'images/test.jpg';
      const resolved = resolver.resolveMediaPath(path);
      expect(resolved).toMatch(/^\/.*\/images\/test.jpg$/);
    });

    it('preserves absolute paths', () => {
      const path = '/absolute/path/test.jpg';
      const resolved = resolver.resolveMediaPath(path);
      expect(resolved).toBe(path);
    });

    it('handles URLs correctly', () => {
      const url = 'https://example.com/image.jpg';
      const resolved = resolver.resolveMediaPath(url);
      expect(resolved).toBe(url);
    });
  });

  describe('getMediaType', () => {
    it('correctly identifies image types', () => {
      expect(resolver.getMediaType('test.jpg')).toBe('image');
      expect(resolver.getMediaType('test.png')).toBe('image');
    });

    it('correctly identifies video types', () => {
      expect(resolver.getMediaType('test.mp4')).toBe('video');
      expect(resolver.getMediaType('test.webm')).toBe('video');
    });

    it('correctly identifies PDF type', () => {
      expect(resolver.getMediaType('test.pdf')).toBe('pdf');
    });

    it('correctly identifies 3D model types', () => {
      expect(resolver.getMediaType('test.gltf')).toBe('model');
      expect(resolver.getMediaType('test.glb')).toBe('model');
    });

    it('returns undefined for unknown types', () => {
      expect(resolver.getMediaType('test.unknown')).toBeUndefined();
    });
  });
});
