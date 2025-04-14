/**
 * useDataLoader Hook
 * 
 * A custom React hook for consistently handling data loading across the application.
 * Manages loading states, error handling, and data processing with a unified API.
 * 
 * @param {Function} dataSource - Function that returns data or Promise that resolves to data
 * @param {Object} options - Configuration options for data loading
 * @returns {Object} Object containing data, loading state, error state, and control functions
 */
import { useState, useEffect, useCallback, useRef } from 'react';

const useDataLoader = (dataSource, options = {}) => {
  // Destructure options with defaults
  const {
    defaultData = [],
    autoLoad = true,
    processingFunction = (data) => data,
    loadingDelay = 0,
    onSuccess = () => {},
    onError = () => {},
    validateData = (data) => Array.isArray(data) || typeof data === 'object',
  } = options;

  // Store dependencies in a ref to avoid issues with the dependency array
  const dependenciesRef = useRef({
    dataSource,
    processingFunction,
    defaultData,
    loadingDelay,
    validateData,
    onSuccess,
    onError,
    // Store additional dependencies here if provided
    ...(options.dependencies ? { additionalDeps: options.dependencies } : {})
  });

  // Update the ref when dependencies change
  useEffect(() => {
    dependenciesRef.current = {
      dataSource,
      processingFunction,
      defaultData,
      loadingDelay,
      validateData,
      onSuccess,
      onError,
      ...(options.dependencies ? { additionalDeps: options.dependencies } : {})
    };
  }, [
    dataSource, 
    processingFunction, 
    defaultData, 
    loadingDelay, 
    validateData, 
    onSuccess, 
    onError, 
    options.dependencies
  ]);

  // State management
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Add error classification
  const [errorType, setErrorType] = useState(null);
  const [errorSeverity, setErrorSeverity] = useState('warning');
  
  // Add recovery attempt tracking
  const [recoveryAttempts, setRecoveryAttempts] = useState(0);
  const maxRecoveryAttempts = options.maxRecoveryAttempts || 3;

  // Function to classify error
  const classifyError = useCallback((err) => {
    if (!err) {
      return { type: null, severity: 'warning' };
    }
    
    // Network errors
    if (err.name === 'NetworkError' || err.message?.includes('network') || err.message?.includes('fetch')) {
      return { type: 'network', severity: 'warning' };
    }
    
    // Data validation errors
    if (err.message?.includes('validation') || err.message?.includes('invalid data')) {
      return { type: 'validation', severity: 'error' };
    }
    
    // Authentication errors
    if (err.message?.includes('unauthorized') || err.message?.includes('forbidden') || 
        err.status === 401 || err.status === 403) {
      return { type: 'authentication', severity: 'error' };
    }
    
    // Default: unknown error
    return { type: 'unknown', severity: 'error' };
  }, []);

  // Enhanced load data function
  const loadData = useCallback(async () => {
    // Reset error states
    setError(null);
    setErrorType(null);
    
    // Access current dependencies
    const deps = dependenciesRef.current;
    
    // Set loading after delay (if specified)
    const loadingTimer = setTimeout(() => {
      setIsLoading(true);
    }, deps.loadingDelay);

    try {
      // Get data from source - handle both functions and values
      const rawData = typeof deps.dataSource === 'function' 
        ? await deps.dataSource()
        : deps.dataSource;

      // Clear loading timer
      clearTimeout(loadingTimer);
      
      // Validate data
      if (!rawData || !deps.validateData(rawData)) {
        const validationError = new Error('Invalid data received from data source');
        validationError.name = 'ValidationError';
        throw validationError;
      }

      // Process data if needed
      const processedData = await deps.processingFunction(rawData);
      
      // Update state
      setData(processedData);
      setIsLoading(false);
      setHasLoaded(true);
      setRecoveryAttempts(0); // Reset recovery attempts on success
      
      // Call success callback
      deps.onSuccess(processedData);
      
      return processedData;
    } catch (err) {
      // Clear loading timer
      clearTimeout(loadingTimer);
      
      // Classify error
      const { type, severity } = classifyError(err);
      
      // Handle error
      console.error('Error loading data:', err);
      setIsLoading(false);
      setError(err);
      setErrorType(type);
      setErrorSeverity(severity);
      
      // Call error callback
      deps.onError(err, { type, severity, recoveryAttempts });
      
      return deps.defaultData;
    }
  }, [classifyError, recoveryAttempts]); // Added missing dependencies to the dependency array

  // Auto-recovery for network errors
  useEffect(() => {
    if (error && errorType === 'network' && recoveryAttempts < maxRecoveryAttempts) {
      const recoveryTimer = setTimeout(() => {
        console.info(`Attempting data recovery (${recoveryAttempts + 1}/${maxRecoveryAttempts})...`);
        setRecoveryAttempts(prev => prev + 1);
        loadData();
      }, 2000 * (recoveryAttempts + 1)); // Exponential backoff
      
      return () => clearTimeout(recoveryTimer);
    }
  }, [error, errorType, recoveryAttempts, maxRecoveryAttempts, loadData]);

  // Reload function - manually trigger data reload
  const reload = useCallback((options = {}) => {
    const { resetAttempts = true, force = false, silently = false } = options;
    
    if (resetAttempts) {
      setRecoveryAttempts(0);
    }
    
    if (!silently) {
      setIsLoading(true);
    }
    
    if (force) {
      // For forced reloads, reset all state
      setError(null);
      setErrorType(null);
      setHasLoaded(false);
    }
    
    return loadData();
  }, [loadData]);

  // Reset function - clear data and errors
  const reset = useCallback(() => {
    setData(dependenciesRef.current.defaultData);
    setError(null);
    setErrorType(null);
    setHasLoaded(false);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    errorType,
    errorSeverity,
    hasLoaded,
    recoveryAttempts,
    maxRecoveryAttempts,
    reload,
    reset,
    // Add new helper to check if we should show retry button
    canRetry: error && (recoveryAttempts < maxRecoveryAttempts),
    // Add new property to check if in recovery mode
    isRecovering: error && recoveryAttempts > 0 && recoveryAttempts < maxRecoveryAttempts,
  };
};

export default useDataLoader;
