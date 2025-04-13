import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles, Box } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import createPortfolioTheme from './theme';
import { ModalProvider } from './context/ModalContext';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import AboutSection from './components/about/AboutSection';
import Work from './components/work/Work';
import FooterContact from './components/contact/FooterContact';
import ErrorBoundary from './components/common/ErrorBoundary';
import { SceneProvider } from './components/hero/background3d/SceneContext';

// Define global styles
const globalStyles = {
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  html: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    height: '100%',
    width: '100%',
  },
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: (theme) => theme.palette.background.default,
    color: (theme) => theme.palette.text.primary,
  },
  a: {
    textDecoration: 'none',
    color: (theme) => theme.palette.primary.main,
  },
  '#root': {
    height: '100%',
    width: '100%',
  },
};

function App() {
  // Create theme with user's preference
  const theme = createPortfolioTheme('dark'); // or based on user preference

  return (
    <ThemeProvider theme={theme}>
      {/* Reset CSS */}
      <CssBaseline />
      
      {/* Apply global styles */}
      <GlobalStyles styles={globalStyles} />
      
      <ModalProvider>
        <SceneProvider>
          <Router>
            <ErrorBoundary componentName="App">
              <Box className="App">
                <Header />
                <Box component="main">
                  <Hero />
                  <AboutSection />
                  <Work />
                </Box>
                <FooterContact />
              </Box>
            </ErrorBoundary>
          </Router>
        </SceneProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
