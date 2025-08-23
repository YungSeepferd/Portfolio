/**
 * Media utilities for handling and optimizing images and videos
 */
import { useState, useEffect } from 'react';

/**
 * Image format options
 */
export type ImageFormat = 'webp' | 'jpg' | 'png' | 'avif';

/**
 * Image size options
 */
export type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'original';

/**
 * Video format options
 */
export type VideoFormat = 'mp4' | 'webm';

/**
 * Video quality options
 */
export type VideoQuality = 'low' | 'medium' | 'high';

/**
 * Interface for image optimization options
 */
export interface ImageOptions {
  format?: ImageFormat;
  size?: ImageSize;
  quality?: number; // 0-100
  lazy?: boolean;
}

/**
 * Interface for video optimization options
 */
export interface VideoOptions {
  format?: VideoFormat;
  quality?: VideoQuality;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  lazy?: boolean;
}

/**
 * Size dimensions mapping for responsive images
 */
export const IMAGE_SIZES = {
  xs: 320,
  sm: 640,
  md: 960,
  lg: 1280,
  xl: 1920,
  original: -1,
};

/**
 * Gets the optimized image URL based on provided options
 * @param path Base path to the image
 * @param options Image optimization options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(path: string, options: ImageOptions = {}): string {
  const { format = 'webp', size = 'original', quality = 80 } = options;
  
  // For external URLs, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Handle local paths
  const basePath = path.split('.').slice(0, -1).join('.');
  const width = IMAGE_SIZES[size];
  
  if (width === -1) {
    // Return original image with desired format
    return `${basePath}.${format}`;
  }
  
  return `${basePath}-${width}.${format}?q=${quality}`;
}

/**
 * Gets an array of srcset values for responsive images
 * @param path Base path to the image
 * @param format Image format
 * @param quality Image quality
 * @returns Array of srcset strings
 */
export function getImageSrcSet(
  path: string,
  format: ImageFormat = 'webp',
  quality: number = 80
): string {
  // For external URLs, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  const basePath = path.split('.').slice(0, -1).join('.');
  
  return Object.entries(IMAGE_SIZES)
    .filter(([_, width]) => width !== -1) // Skip 'original'
    .map(([_, width]) => `${basePath}-${width}.${format}?q=${quality} ${width}w`)
    .join(', ');
}

/**
 * Gets the optimized video URL based on provided options
 * @param path Base path to the video
 * @param options Video optimization options
 * @returns Optimized video URL
 */
export function getOptimizedVideoUrl(path: string, options: VideoOptions = {}): string {
  const { format = 'mp4', quality = 'medium' } = options;
  
  // For external URLs, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Handle local paths
  const basePath = path.split('.').slice(0, -1).join('.');
  return `${basePath}-${quality}.${format}`;
}

/**
 * Custom hook to check if an image is loaded
 * @param src Image source URL
 * @returns Boolean indicating if image is loaded
 */
export function useImageLoaded(src: string): boolean {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (!src) {
      setLoaded(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(false);
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return loaded;
}

/**
 * Custom hook to check if a resource (image, video, etc.) is loaded
 * @param path Resource path
 * @param resourceType Type of resource
 * @returns Object with loading state and error
 */
export function useResourceLoaded(
  path: string,
  resourceType: 'image' | 'video' | 'audio' = 'image'
): { loaded: boolean; error: boolean } {
  const [state, setState] = useState({ loaded: false, error: false });
  
  useEffect(() => {
    if (!path) {
      setState({ loaded: false, error: false });
      return;
    }
    
    let element: any;
    
    if (resourceType === 'image') {
      element = new Image();
      element.onload = () => setState({ loaded: true, error: false });
      element.onerror = () => setState({ loaded: false, error: true });
      element.src = path;
    } else if (resourceType === 'video') {
      element = document.createElement('video');
      element.oncanplaythrough = () => setState({ loaded: true, error: false });
      element.onerror = () => setState({ loaded: false, error: true });
      element.src = path;
    } else if (resourceType === 'audio') {
      element = document.createElement('audio');
      element.oncanplaythrough = () => setState({ loaded: true, error: false });
      element.onerror = () => setState({ loaded: false, error: true });
      element.src = path;
    }
    
    return () => {
      if (element) {
        element.onload = null;
        element.oncanplaythrough = null;
        element.onerror = null;
      }
    };
  }, [path, resourceType]);
  
  return state;
}
