/* eslint-disable no-undef */
import { useState, useEffect, useCallback, useRef } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: IntersectionObserverOptions = {}): [
  (node: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
] {
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState<Element | null>(null);

  // Use useRef to keep track of the observer instance for proper cleanup
  const observerRef = useRef<IntersectionObserver | null>(null);

  const frozen = isIntersecting && freezeOnceVisible;

  // Memoize the updateEntry function to ensure consistent reference
  const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIsIntersecting(entry.isIntersecting);
    setEntry(entry);
  }, []);

  // Setup the intersection observer
  useEffect(() => {
    // Don't observe if frozen or no node to observe
    if (frozen || !node) {
      // Clean up existing observer if any
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    // Create new observer and store in ref
    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observerRef.current = observer;
    observer.observe(node);

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [node, threshold, root, rootMargin, frozen, updateEntry]);

  // Function to obtain the ref
  const ref = useCallback((node: Element | null) => {
    if (node) setNode(node);
  }, []);

  return [ref, !!entry?.isIntersecting, entry];
}

export default useIntersectionObserver;
