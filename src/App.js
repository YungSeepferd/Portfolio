import React from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Work from './components/work/Work';
import AboutSection from './components/about/AboutSection';
import FooterContact from './components/contact/FooterContact';
import CSSVariables from './CSSVariables';
import { CssBaseline, Box } from '@mui/material';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <Box className="App">
      <CssBaseline />
      <CSSVariables />
      <ErrorBoundary fallback={<div>Something went wrong with the header. Please refresh the page.</div>}>
        <Header />
      </ErrorBoundary>
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
    </Box>
  );
}

export default App;
