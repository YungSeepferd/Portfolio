/**
 * Utility functions for handling different media types
 */

/**
 * Determines if a file is a video based on extension or object type
 * @param {string|Object} file - File URL or media object 
 * @returns {boolean} True if the file is a video
 */
export const isVideo = (file) => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
  const src = typeof file === 'string' ? file : file?.src || '';
  
  // Check if src contains any video extension
  return videoExtensions.some(ext => src.toLowerCase().includes(ext)) ||
    (file?.type && file.type.includes('video'));
};

/**
 * Creates a video thumbnail image from a video file
 * @param {string|Object} video - Video URL or object
 * @returns {Promise<string>} Thumbnail data URL
 */
export const createVideoThumbnail = async (video) => {
  return new Promise((resolve) => {
    try {
      const videoSrc = typeof video === 'string' ? video : video?.src || '';
      const videoEl = document.createElement('video');
      
      videoEl.crossOrigin = 'anonymous';
      videoEl.src = videoSrc;
      videoEl.muted = true;
      videoEl.currentTime = 1; // Seek to 1 second
      
      videoEl.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        
        try {
          const thumbnail = canvas.toDataURL('image/jpeg');
          resolve(thumbnail);
        } catch (e) {
          // If toDataURL fails (e.g., CORS issues), return a default thumbnail
          resolve(null);
        } finally {
          videoEl.pause();
          videoEl.src = '';
        }
      };
      
      videoEl.onerror = () => resolve(null);
      
      // Fallback in case onloadeddata never fires
      setTimeout(() => resolve(null), 3000);
    } catch (error) {
      console.error("Error creating video thumbnail:", error);
      resolve(null);
    }
  });
};

/**
 * Gets the appropriate component type for media
 * @param {string|Object} media - Media URL or object
 * @returns {string} 'video' or 'image'
 */
export const getMediaType = (media) => {
  return isVideo(media) ? 'video' : 'image';
};
