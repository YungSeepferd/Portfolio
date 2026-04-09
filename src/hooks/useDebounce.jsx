import { useEffect, useState } from 'react';

/**
 * Custom debounce hook to limit the frequency of function calls
 * @param {any} value - The value to be debounced
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - Debounced value
 */
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
