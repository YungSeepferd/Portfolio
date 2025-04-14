import { useState, useEffect } from 'react';

/**
 * A hook for loading data with proper loading and error states
 * 
 * @param {Function|any} dataFetcher - Function that returns data (sync or async) or direct data
 * @param {Object} options - Configuration options
 * @param {any} options.defaultData - Default data to use before loading completes
 * @param {Function} options.validateData - Function to validate data
 * @param {number} options.timeout - Timeout in ms (default: 10000)
 * @returns {Object} - Object containing data, loading state, and error
 */
const useDataLoader = (dataFetcher, options = {}) => {
  const {
    defaultData = null,
    validateData = () => true,
    timeout = 10000,
  } = options;

  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;
    
    // Start loading
    setIsLoading(true);
    setError(null);
    
    // Set timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        console.error('Data loading timeout');
        setIsLoading(false);
        setError(new Error('Loading timed out after ' + timeout + 'ms'));
      }
    }, timeout);
    
    // Create a promise wrapper that handles both async and sync functions
    const fetchData = async () => {
      try {
        // Handle if dataFetcher is not a function but direct data
        if (typeof dataFetcher !== 'function') {
          console.log('Direct data provided instead of a fetcher function');
          const directData = dataFetcher;
          
          // Log to debug what's coming back
          console.log('Data received directly:', directData ? '✓' : '✗', 
            Array.isArray(directData) ? 
              `(Array of ${directData.length} items)` : 
              typeof directData);
        
          // Validate the data
          if (!directData || !validateData(directData)) {
            throw new Error('Data validation failed for direct data');
          }
          
          // Only update state if component is still mounted
          if (isMounted) {
            setData(directData);
            setIsLoading(false);
          }
          return;
        }
        
        console.log('Fetching data using:', dataFetcher.name || 'unnamed function');
        
        // Handle both synchronous and asynchronous data fetchers
        const result = dataFetcher();
        const resolvedData = result instanceof Promise ? await result : result;
        
        // Log to debug what's coming back
        console.log('Data received:', resolvedData ? '✓' : '✗', 
          Array.isArray(resolvedData) ? 
            `(Array of ${resolvedData.length} items)` : 
            typeof resolvedData);
        
        // Validate the data
        if (!resolvedData || !validateData(resolvedData)) {
          throw new Error('Data validation failed');
        }
        
        // Only update state if component is still mounted
        if (isMounted) {
          setData(resolvedData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup
    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [dataFetcher, validateData, timeout, isLoading]); // Added isLoading to dependency array

  return { data, isLoading, error };
};

export default useDataLoader;
