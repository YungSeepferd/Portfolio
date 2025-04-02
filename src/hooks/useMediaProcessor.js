import { useState, useEffect } from 'react';
import { processMedia } from '../utils/mediaUtils';

export const useMediaProcessor = (mediaItems = []) => {
  const [processed, setProcessed] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!mediaItems.length) {
      setProcessed([]);
      setLoading(false);
      return;
    }
    
    const processAllMedia = async () => {
      try {
        const results = await Promise.all(mediaItems.map(item => processMedia(item)));
        setProcessed(results.filter(Boolean));
      } catch (error) {
        console.error("Error processing media:", error);
      } finally {
        setLoading(false);
      }
    };
    
    processAllMedia();
  }, [mediaItems]);
  
  return { processed, loading };
};
