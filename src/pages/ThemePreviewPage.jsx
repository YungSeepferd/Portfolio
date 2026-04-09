import React from 'react';
import { useTheme } from '@mui/material';
import ThemePreview from '../components/dev/ThemePreview';

/**
 * ThemePreviewPage
 * 
 * A standalone page for previewing the theme in different configurations.
 * Only accessible in development mode.
 */
const ThemePreviewPage = () => {
  const theme = useTheme();

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        Theme Preview is only available in development mode
      </div>
    );
  }

  return <ThemePreview baseTheme={theme} />;
};

export default ThemePreviewPage;
