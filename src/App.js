import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider, useThemeMode } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import AboutSection from './components/about/AboutSection';
import Work from './components/work/Work';
import FooterContact from './components/contact/FooterContact';

// Main app with theme applied
const AppContent = () => {
  // Only destructure theme from useThemeMode since we're not using mode directly
  const { theme } = useThemeMode();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ModalProvider>
        <Header />
        <main>
          <Hero />
          <AboutSection />
          <Work />
        </main>
        <FooterContact />
      </ModalProvider>
    </MuiThemeProvider>
  );
};

// Root component that wraps the app with context providers
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
