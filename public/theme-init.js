(function () {
  const storageKey = 'theme-mode';

  try {
    const storedMode = localStorage.getItem(storageKey);
    const resolvedMode = storedMode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : (storedMode || 'dark');

    document.documentElement.setAttribute('data-mui-color-scheme', resolvedMode);
    document.documentElement.setAttribute('data-theme-mode', resolvedMode);
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${resolvedMode}-mode`);

    if (!storedMode) {
      localStorage.setItem(storageKey, resolvedMode);
    }
  } catch {
    document.documentElement.setAttribute('data-mui-color-scheme', 'dark');
    document.documentElement.setAttribute('data-theme-mode', 'dark');
    document.documentElement.classList.remove('light-mode');
    document.documentElement.classList.add('dark-mode');
  }
})();
