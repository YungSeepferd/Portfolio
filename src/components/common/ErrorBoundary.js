import React, { Component } from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import BugReportIcon from '@mui/icons-material/BugReport';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * Enhanced ErrorBoundary Component
 * 
 * Catches and handles JavaScript errors anywhere in the child component tree.
 * Provides detailed error reporting and recovery options.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      componentStack: '',
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Capture error details for logging and display
    this.setState({
      errorInfo,
      componentStack: errorInfo?.componentStack || 'No stack trace available'
    });

    // Log error to monitoring service or console
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo?.componentStack);

    // Track error with analytics if available
    if (window.gtag) {
      window.gtag('event', 'error', {
        error_message: error?.message || 'Unknown error',
        error_component: this.props.componentName || 'Unknown component',
        error_stack: errorInfo?.componentStack?.substring(0, 500) || 'No stack trace',
        error_type: error?.name || 'Unknown type'
      });
    }
  }

  handleRefresh = () => {
    // Attempt to recover by refreshing the component
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null,
      componentStack: '',
      showDetails: false
    });
  }

  handleReload = () => {
    // Reload the entire page as a last resort
    window.location.reload();
  }

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  }

  render() {
    const { hasError, error, componentStack, showDetails } = this.state;
    const { 
      componentName = 'Component', 
      fallback,
      errorStyles,
      children
    } = this.props;

    if (hasError) {
      // Render custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Otherwise, render default error UI
      return (
        <Box 
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            width: '100%',
            textAlign: 'center',
            ...errorStyles
          }}
        >
          <ErrorOutlineIcon 
            color="error" 
            sx={{ fontSize: 48, mb: 2 }} 
          />
          
          <Typography variant="h5" color="error" gutterBottom>
            {componentName} encountered a problem
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '600px' }}>
            {error?.message || 'An unexpected error occurred. We apologize for the inconvenience.'}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={this.handleRefresh}
            >
              Try Again
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<BugReportIcon />}
              onClick={this.toggleDetails}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </Box>
          
          {showDetails && (
            <Paper elevation={2} sx={{ p: 2, width: '100%', maxWidth: '800px', overflow: 'auto', textAlign: 'left' }}>
              <Typography variant="subtitle2" color="error" gutterBottom>
                Error Details:
              </Typography>
              
              <Typography variant="body2" component="div" sx={{ mb: 2, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {error?.toString() || 'Unknown error'}
                </Box>
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Component Stack:
              </Typography>
              
              <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                <Box component="pre" sx={{ 
                  whiteSpace: 'pre-wrap', 
                  wordBreak: 'break-word',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  p: 1,
                  borderRadius: 1,
                  maxHeight: '200px',
                  overflow: 'auto'
                }}>
                  {componentStack}
                </Box>
              </Typography>
            </Paper>
          )}
        </Box>
      );
    }

    // If no error, render children normally
    return children;
  }
}

export default ErrorBoundary;
