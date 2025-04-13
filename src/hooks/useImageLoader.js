import { useState, useEffect } from 'react';

/**
 * Custom hook to track loading status of multiple images
 * 
 * @param {Array} images - Array of image URLs or objects with src property
 * @returns {Object} - Loading status information
 */
const useImageLoader = (images = []) => {
  const [loadingStatus, setLoadingStatus] = useState({
    loaded: 0,
    total: 0,
    isComplete: false,
    progress: 0,
    errors: []
  });

  useEffect(() => {
    if (!images || !images.length) {
      setLoadingStatus({
        loaded: 0,
        total: 0,
        isComplete: true,
        progress: 100,
        errors: []
      });
      return;
    }

    // Reset the loading status when images change
    setLoadingStatus({
      loaded: 0,
      total: images.length,
      isComplete: false,
      progress: 0,
      errors: []
    });

    // Create new Image objects to preload
    const imageObjects = images.map(img => {
      const src = typeof img === 'string' ? img : img?.src;
      if (!src) return null;
      
      const imgObj = new Image();
      imgObj.src = src;
      return { img: imgObj, src };
    }).filter(Boolean);

    if (imageObjects.length === 0) {
      setLoadingStatus({
        loaded: 0,
        total: 0,
        isComplete: true,
        progress: 100,
        errors: []
      });
      return;
    }

    // Track loaded and error counts
    let loadedCount = 0;
    const errors = [];

    const updateStatus = () => {
      const progress = Math.round((loadedCount / imageObjects.length) * 100);
      setLoadingStatus({
        loaded: loadedCount,
        total: imageObjects.length,
        isComplete: loadedCount === imageObjects.length,
        progress,
        errors
      });
    };

    // Set up load and error handlers for each image
    imageObjects.forEach(({ img, src }) => {
      img.onload = () => {
        loadedCount++;
        updateStatus();
      };

      img.onerror = () => {
        loadedCount++;
        errors.push(src);
        updateStatus();
      };

      // If image is already complete, trigger onload immediately
      if (img.complete) {
        img.onload();
      }
    });

    // Cleanup function
    return () => {
      // Remove event listeners
      imageObjects.forEach(({ img }) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [images]);

  return loadingStatus;
};

export default useImageLoader;
