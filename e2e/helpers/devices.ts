export const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'mobile-393', width: 393, height: 852 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'wide-1920', width: 1920, height: 1080 },
];

export const EMULATED_DEVICES = [
  'Pixel 7',
  'iPhone 15 Pro',
  'iPad Pro 11',
];

export const THEMES = ['light', 'dark'] as const;

export const MOTION_PREFS = [
  '(prefers-reduced-motion: no-preference)',
  '(prefers-reduced-motion: reduce)'
];

export const LOCALES = ['en', 'de'];
