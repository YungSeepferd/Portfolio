import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import AboutSection from './components/about/AboutSection';
import Work from './components/work/Work';
import FooterContact from './components/contact/FooterContact';
import GlobalErrorHandler from './components/common/GlobalErrorHandler';

/**
 * App Component
 * 
 * Root component that wraps the application with necessary providers
 * and renders the main layout components
 */
const App = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <Header />
        <main>
          <Hero />
          <AboutSection />
          <Work />
        </main>
        <FooterContact />
        <GlobalErrorHandler />
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
