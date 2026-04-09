/**
 * WebGL Detection Utility
 * 
 * Detects WebGL support in the browser and returns capability information.
 * Used to determine whether to show a fallback UI instead of the 3D canvas.
 */

// Check if WebGL context can be created
const testWebGLContext = () => {
  try {
    const canvas = document.createElement('canvas');
    // Try to get a WebGL2 context first, then fall back to WebGL1
    let context = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch (e) {
    return false;
  }
};

// Check for specific WebGL capabilities
const getWebGLCapabilities = () => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!context) {
      return {
        supported: false,
        version: null,
        maxTextureSize: 0,
        vendor: null,
        renderer: null
      };
    }

    const gl = context;
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    return {
      supported: true,
      version: gl instanceof WebGL2RenderingContext ? 2 : 1,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : null,
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null,
      antialias: gl.getContextAttributes()?.antialias ?? false
    };
  } catch (e) {
    return {
      supported: false,
      version: null,
      maxTextureSize: 0,
      vendor: null,
      renderer: null,
      error: e.message
    };
  }
};

/**
 * Check if WebGL is supported in the current browser
 * @returns {boolean} True if WebGL is supported
 */
export const isWebGLSupported = () => {
  // Server-side rendering check
  if (typeof window === 'undefined') {
    return false;
  }
  return testWebGLContext();
};

/**
 * Get detailed WebGL capabilities
 * @returns {Object} WebGL capability information
 */
export const getWebGLInfo = () => {
  if (typeof window === 'undefined') {
    return {
      supported: false,
      version: null,
      maxTextureSize: 0,
      vendor: null,
      renderer: null,
      error: 'Server-side rendering'
    };
  }
  return getWebGLCapabilities();
};

/**
 * Hook-friendly singleton that caches the WebGL detection result
 * to avoid repeated context creation checks
 */
let cachedWebGLSupport = null;

export const getCachedWebGLSupport = () => {
  if (cachedWebGLSupport === null) {
    cachedWebGLSupport = isWebGLSupported();
  }
  return cachedWebGLSupport;
};

// Reset cache (mainly for testing)
export const resetWebGLCache = () => {
  cachedWebGLSupport = null;
};

export default {
  isWebGLSupported,
  getWebGLInfo,
  getCachedWebGLSupport,
  resetWebGLCache
};
