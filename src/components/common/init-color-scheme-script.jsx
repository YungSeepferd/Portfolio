import * as React from 'react';
import PropTypes from 'prop-types';

/**
 * InitColorSchemeScript Component
 *
 * Prevents flashing of the wrong theme during server-side rendering.
 * This component should be used in the application's document or root component.
 *
 * Based on MUI's getInitColorSchemeScript function.
 */
function InitColorSchemeScript(props) {
  const { defaultMode = 'system', modeStorageKey = 'theme-mode' } = props;

  // This script runs before React hydration, setting the correct color scheme
  // to prevent flickering when the page loads
  const scriptContent = `
    (function() {
      try {
        // Try to get the stored mode from localStorage
        var storedMode = localStorage.getItem('${modeStorageKey}');
        var mode = storedMode || '${defaultMode}';
        
        // Check if the mode is 'system', then use prefers-color-scheme
        if (mode === 'system') {
          // Check for system preference
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (mql.matches) {
            mode = 'dark';
          } else {
            mode = 'light';
          }
        }
        
        // Apply the appropriate mode to document
        document.documentElement.setAttribute('data-mui-color-scheme', mode);
        document.documentElement.setAttribute('data-theme-mode', mode);
        
        // Also store in localStorage for session persistence
        if (!storedMode) {
          localStorage.setItem('${modeStorageKey}', mode);
        }
        
        // Also set appropriate classes for custom CSS targeting
        document.documentElement.classList.remove('light-mode', 'dark-mode');
        document.documentElement.classList.add(mode + '-mode');
      } catch (e) {
        // Fallback if localStorage is not available
        console.error('Error accessing localStorage:', e);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

InitColorSchemeScript.propTypes = {
  defaultMode: PropTypes.oneOf(['light', 'dark', 'system']),
  modeStorageKey: PropTypes.string,
};

export default InitColorSchemeScript;
