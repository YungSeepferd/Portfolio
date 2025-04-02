import React from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Work from './components/work/Work';
import AboutSection from './components/about/AboutSection';
import FooterContact from './components/contact/FooterContact';
import CSSVariables from './CSSVariables';
import { CssBaseline, Box } from '@mui/material';

function App() {
  return (
    <Box className="App">
      <CssBaseline /> {/* Properly position CssBaseline here */}
      <CSSVariables />
      <Header />
      <Hero />
      <Work />
      <AboutSection />
      <FooterContact />
    </Box>
  );
}

export default App;
