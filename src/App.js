import React from 'react';
import { CssBaseline } from '@mui/material';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
// import Work from './components/work'; // Commented out missing component
import AboutSection from './components/about/AboutSection';
import FooterContact from './components/contact/FooterContact';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeDebugger from './components/dev/ThemeDebugger';

/**
 * Main App component
 */
function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <ModalProvider>
        <ErrorBoundary componentName="Header">
          <Header />
        </ErrorBoundary>
        
        <ErrorBoundary componentName="Hero">
          <Hero />
        </ErrorBoundary>
        
        {/* Work section temporarily disabled
        <ErrorBoundary componentName="Work">
          <Work />
        </ErrorBoundary>
        */}
        
        <ErrorBoundary componentName="About">
          <AboutSection />
        </ErrorBoundary>
        
        <ErrorBoundary componentName="Contact">
          <FooterContact />
        </ErrorBoundary>
        
        {/* Only show theme debugger in development */}
        {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
