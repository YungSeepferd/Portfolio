import { useState, useEffect, useRef, useCallback } from 'react';

interface DataLoaderOptions<T> {
  defaultData?: T | null;
  validateData?: (data: T) => boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  timeout?: number;
}

interface DataLoaderResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
}

/**
 * A hook for loading data with proper loading and error states
 *
 * @template T - The type of data being loaded
 * @param {(() => Promise<T> | T) | T} dataFetcher - Function that returns data (sync or async) or direct data
 * @param {DataLoaderOptions<T>} options - Configuration options
 * @returns {DataLoaderResult<T>} - Object containing data, loading state, error, and reload function
 */
function useDataLoader<T>(
  dataFetcher: (() => Promise<T> | T) | { (): Promise<T> | T } | T,
  options: DataLoaderOptions<T> = {}
): DataLoaderResult<T> {
  const {
    defaultData = null,
    validateData = () => true,
    onSuccess = () => {},
    onError = () => {},
    timeout = 10000,
  } = options;

  const [data, setData] = useState<T | null>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Use refs to track component mounted state and avoid memory leaks
  const isMountedRef = useRef(true);
  const dataFetcherRef = useRef(dataFetcher);

  // Keep dataFetcher up to date
  useEffect(() => {
    dataFetcherRef.current = dataFetcher;
  }, [dataFetcher]);

  // Cleanup mounted state on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadData = useCallback(async () => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Handle both function and direct value cases
      const current = dataFetcherRef.current;
      const fetchedData =
        typeof current === 'function' ? await (current as () => Promise<T> | T)() : (current as T);

      if (!isMountedRef.current) return;

      if (!validateData(fetchedData)) {
        throw new Error('Invalid data format received');
      }

      setData(fetchedData);
      onSuccess(fetchedData);
    } catch (err) {
      if (!isMountedRef.current) return;
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      onError(error);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [validateData, onSuccess, onError]);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        setError(new Error('Data loading timed out'));
        setIsLoading(false);
      }
    }, timeout);

    loadData();

    return () => {
      clearTimeout(loadTimeout);
    };
  }, [loadData, timeout]);

  const reload = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return { data, isLoading, error, reload };
}

export default useDataLoader;
