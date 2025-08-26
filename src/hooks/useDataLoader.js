import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * A hook for loading data with proper loading and error states
 * 
 * @param {Function|any} dataFetcher - Function that returns data (sync or async) or direct data
 * @param {Object} options - Configuration options
 * @param {any} options.defaultData - Default data to use before loading completes
 * @param {Function} options.validateData - Function to validate data
 * @param {Function} options.onSuccess - Callback for successful data load
 * @param {Function} options.onError - Callback for data load errors
 * @param {number} options.timeout - Timeout in ms (default: 10000)
 * @returns {Object} - Object containing data, loading state, error, and reload function
 */
const useDataLoader = (dataFetcher, options = {}) => {
  const {
    defaultData = null,
    validateData = () => true,
    onSuccess = () => {},
    onError = () => {},
    timeout = 10000,
  } = options;

  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use refs to track component mounted state and avoid memory leaks
  const isMountedRef = useRef(true);
  const dataFetcherRef = useRef(dataFetcher);
  const initialLoadCompleteRef = useRef(false);
  // Add loading state ref to avoid dependency issues
  const isLoadingRef = useRef(true);
  
  // Update ref whenever isLoading changes
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);
  
  // Manual reload function
  const reload = useCallback(() => {
    if (!isMountedRef.current) return;
    
    setIsLoading(true);
    setError(null);
    // Update the ref
    dataFetcherRef.current = dataFetcher;
    initialLoadCompleteRef.current = false;
  }, [dataFetcher]);

  // Main effect to load data - now we can remove isLoading from dependencies
  // since we're tracking it via ref
  useEffect(() => {
    // Skip if we've already completed the initial load
    if (initialLoadCompleteRef.current) return;
    
    let timeoutId = null;
    
    // Update the ref to the latest dataFetcher
    dataFetcherRef.current = dataFetcher;
    
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Special handling for non-function data (direct data)
        if (typeof dataFetcherRef.current !== 'function') {
          const directData = dataFetcherRef.current;
          
          // Validate the data
          if (!directData || !validateData(directData)) {
            throw new Error('Data validation failed for direct data');
          }
          
          // Update state if still mounted
          if (isMountedRef.current) {
            setData(directData);
            setIsLoading(false);
            initialLoadCompleteRef.current = true;
            if (onSuccess) onSuccess(directData);
          }
          return;
        }
        
        // Handle both synchronous functions and promise-returning functions
        const result = dataFetcherRef.current();
        
        // If result is already the data (not a promise), handle it directly
        if (!(result instanceof Promise)) {
          if (!validateData(result)) {
            throw new Error('Data validation failed for synchronous result');
          }
          
          if (isMountedRef.current) {
            setData(result);
            setIsLoading(false);
            initialLoadCompleteRef.current = true;
            if (onSuccess) onSuccess(result);
          }
          return;
        }
        
        // Handle promise as before
        const resolvedData = await result;
        
        // Validate the data
        if (!resolvedData || !validateData(resolvedData)) {
          throw new Error('Data validation failed');
        }
        
        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setData(resolvedData);
          setIsLoading(false);
          initialLoadCompleteRef.current = true;
          onSuccess(resolvedData);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err);
          setIsLoading(false);
          onError(err);
        }
      }
    };
    
    // Set timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (isMountedRef.current && isLoadingRef.current) {
        setIsLoading(false);
        setError(new Error('Loading timed out after ' + timeout + 'ms'));
        onError(new Error('Loading timed out after ' + timeout + 'ms'));
      }
    }, timeout);
    
    // Start fetching data
    fetchData();
    
    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    
    // dataFetcher is handled via ref to avoid unnecessary re-runs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateData, timeout, onSuccess, onError]);

  // Update dataFetcher ref when it changes
  useEffect(() => {
    dataFetcherRef.current = dataFetcher;
  }, [dataFetcher]);

  // Set isMounted to false on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return { data, isLoading, error, reload };
};

export default useDataLoader;
