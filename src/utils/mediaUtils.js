import { isVideo } from './mediaHelper';
import { analyzeImage } from './imageAnalyzer';

/**
 * Unified media processing function
 */
export const processMedia = (media) => {
  if (!media) return null;
  
  // Process based on type
  return isVideo(media) ? 
    { type: 'video', src: typeof media === 'string' ? media : media.src || '' } : 
    analyzeImage(media);
};

// Additional functions can be added here...
