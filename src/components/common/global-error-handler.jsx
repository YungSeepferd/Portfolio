import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Container, Divider } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Global Error Handler Component
 *
 * Captures unhandled errors across the application and displays
 * an emergency UI with options to recover.
 */
const GlobalErrorHandler = () => {
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Set up global error handling
  useEffect(() => {
    // Handler for uncaught exceptions
    const handleGlobalError = (event) => {
      event.preventDefault();

      setError({
        message: event.error?.message || 'An unexpected error occurred',
        stack: event.error?.stack || 'No stack trace available',
      });

      // Log to console
      console.error('Global error caught:', event.error);

      // You could also report to an error monitoring service here
      // if (window.Sentry) window.Sentry.captureException(event.error);
    };

    // Handler for unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      event.preventDefault();

      setError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack || 'No stack trace available',
        type: 'promise',
      });

      // Log to console
      console.error('Unhandled promise rejection:', event.reason);
    };

    // Add event listeners
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Clean up listeners
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Reload the page
  const handleReload = () => {
    window.location.reload();
  };

  // Go to home page
  const handleGoHome = () => {
    window.location.href = '/';
  };

  // Toggle error details
  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  // Don't render anything unless there's an error
  if (!error) return null;

  return (
  <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    backgroundColor: (_t) => _t.palette.background.default,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />

          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
            We apologize for the inconvenience. The application encountered an unexpected error.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={handleReload}
              size="large"
            >
              Reload Page
            </Button>

            <Button variant="outlined" startIcon={<HomeIcon />} onClick={handleGoHome} size="large">
              Go to Home
            </Button>
          </Box>

          <Button variant="text" color="inherit" onClick={toggleDetails} sx={{ mb: 2 }}>
            {showDetails ? 'Hide Technical Details' : 'Show Technical Details'}
          </Button>

          {showDetails && (
            <Box sx={{ width: '100%', textAlign: 'left' }}>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle2" color="error" gutterBottom>
                Error Message:
              </Typography>

                  <Typography
                    variant="body2"
                    component="div"
                    sx={(_t) => ({ mb: 2, fontFamily: _t.typography.fontFamily })}
                  >
                <Box
                  component="pre"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    p: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: 1,
                  }}
                >
                  {error.message}
                </Box>
              </Typography>

              {error.stack && (
                <>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Stack Trace:
                  </Typography>

                  <Typography
                    variant="body2"
                    component="div"
                    sx={(_t) => ({ fontFamily: _t.typography.fontFamily, fontSize: '0.75rem' })}
                  >
                    <Box
                      component="pre"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        p: 1,
                        borderRadius: 1,
                        maxHeight: '200px',
                        overflow: 'auto',
                      }}
                    >
                      {error.stack}
                    </Box>
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default GlobalErrorHandler;
