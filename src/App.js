import React from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Work from './components/work/Work';
import AboutSection from './components/about/AboutSection';
import FooterContact from './components/contact/FooterContact';
// Removed unused CSSVariables import
import { CssBaseline, Box } from '@mui/material';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ThemeDebugger from './components/dev/ThemeDebugger';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModalProvider>
        <ErrorBoundary>
          <Box className="app-container">
            <Header />
            
            <main>
              <ErrorBoundary fallback={<div>Something went wrong with the hero section. Please refresh the page.</div>}>
                <Hero />
              </ErrorBoundary>

              <ErrorBoundary fallback={<div>Something went wrong with the work section. Please refresh the page.</div>}>
                <Work />
              </ErrorBoundary>
              
              <ErrorBoundary fallback={<div>Something went wrong with the about section. Please refresh the page.</div>}>
                <AboutSection />
              </ErrorBoundary>
              
              
              <ErrorBoundary fallback={<div>Something went wrong with the contact section. Please refresh the page.</div>}>
                <FooterContact />
              </ErrorBoundary>
            </main>
          </Box>
        </ErrorBoundary>
        
        {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
