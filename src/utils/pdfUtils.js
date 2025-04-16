/**
 * Utilities for handling PDF files and paths
 */

/**
 * Processes a PDF URL to ensure it can be properly loaded in the application.
 * 
 * @param {string} url - The original PDF URL
 * @returns {string} - Processed URL ready for use
 */
export const getPdfUrl = (url) => {
  if (!url) return '';
  
  try {
    let processedUrl = url.trim();
    
    // Handle src/ references by converting to public path
    if (processedUrl.startsWith('src/')) {
      processedUrl = processedUrl.replace('src/', '/');
    }
    
    // Ensure the URL starts with a slash if it's a relative path
    if (!processedUrl.startsWith('/') && !processedUrl.startsWith('http')) {
      processedUrl = `/${processedUrl}`;
    }
    
    return processedUrl;
  } catch (error) {
    console.error('Error processing PDF URL:', error, url);
    return url; // Return original if processing fails
  }
};

/**
 * Extracts a readable filename from a PDF URL
 * 
 * @param {string} url - The PDF URL
 * @returns {string} - The extracted filename
 */
export const getPdfFileName = (url) => {
  if (!url) return 'document.pdf';
  
  try {
    // Get the last part of the path
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    
    // If filename includes query parameters, remove them
    if (filename.includes('?')) {
      return filename.split('?')[0];
    }
    
    return filename || 'document.pdf';
  } catch (error) {
    console.error('Error extracting PDF filename:', error);
    return 'document.pdf';
  }
};

/**
 * Helper function to check if a file exists
 * @param {string} url - URL to check 
 * @returns {Promise<boolean>} - Promise resolving to true if file exists
 */
export const checkFileExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};
