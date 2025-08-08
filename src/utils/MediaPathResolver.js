// Deprecated shim: prefer importing from './MediaPathResolver' (TypeScript)
// Keeping minimal re-exports to avoid breaking older paths if they still exist.
// If this file gets imported, warn developers in dev/test.
if (
  typeof console !== 'undefined' &&
  typeof process !== 'undefined' &&
  process &&
  process.env &&
  process.env.NODE_ENV !== 'production'
) {
  console.warn(
    '[deprecated] src/utils/MediaPathResolver.js is deprecated. Import from ./MediaPathResolver instead.'
  );
}

// Important: explicitly point to the TypeScript file to avoid resolving this JS shim again
export * from './MediaPathResolver.ts';
