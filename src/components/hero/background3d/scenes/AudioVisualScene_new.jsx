// DEPRECATED: Use TorusGardenScene instead. This file re-exports the new scene for backward compatibility.
if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
  console.warn(
    '[deprecated] Import TorusGardenScene directly. AudioVisualScene_new.jsx will be removed.'
  );
}
export { default } from './TorusGardenScene';
