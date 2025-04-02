import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, useTheme, Collapse } from '@mui/material';

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in child component tree,
 * logs errors, and displays fallback UI instead of component tree that crashed.
 * 
 * Features:
 * - Custom fallback UI
 * - Error details that can be expanded/collapsed
 * - Retry functionality for component-level errors
 * - Integration with theme system
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }
  
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
    
    // Track errors with analytics if available
    if (window.gtag) {
      try {
        window.gtag('event', 'error', {
          'event_category': 'JavaScript',
          'event_label': error.toString(),
          'value': this.props.componentName || 'unknown'
        });
      } catch (e) {
        console.error("Failed to log error to analytics", e);
      }
    }
  }
  
  handleRetry = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
  }
  
  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  }
  
  render() {
    if (this.state.hasError) {
      // Custom fallback provided by parent
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default error UI
      return (
        <ErrorFallback 
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          componentName={this.props.componentName}
          onRetry={this.handleRetry}
          showDetails={this.state.showDetails}
          toggleDetails={this.toggleDetails}
        />
      );
    }
    
    // When there's no error, render children normally
    return this.props.children;
  }
}

// Separate the fallback UI into its own component
const ErrorFallback = ({ 
  error, 
  errorInfo, 
  componentName, 
  onRetry, 
  showDetails, 
  toggleDetails 
}) => {
  // Use the theme in this functional component
  const theme = useTheme();
  
  const componentLabel = componentName 
    ? `in ${componentName} component` 
    : '';
  
  return (
    <Box
      sx={{
        padding: 3,
        margin: 2,
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.contrastText,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Something went wrong {componentLabel}
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        {error && error.toString()}
      </Typography>
      
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onRetry}
        >
          Try Again
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </Button>
        
        {errorInfo && (
          <Button 
            variant="text" 
            color="inherit"
            onClick={toggleDetails}
          >
            {showDetails ? 'Hide' : 'Show'} Technical Details
          </Button>
        )}
      </Box>
      
      {errorInfo && (
        <Collapse in={showDetails}>
          <Box 
            sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: 1,
              maxHeight: '200px',
              overflow: 'auto'
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Component Stack:
            </Typography>
            <pre style={{ 
              whiteSpace: 'pre-wrap', 
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              {errorInfo.componentStack}
            </pre>
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
  componentName: PropTypes.string,
};

export default ErrorBoundary;
