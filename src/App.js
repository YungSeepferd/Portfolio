import React from 'react';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import AboutSection from './components/about/AboutSection';
import Work from './components/work/Work';
import FooterContact from './components/contact/FooterContact';

/**
 * Main App Component
 * This is the entry point for the application UI.
 */
function App() {
  return (
    <CustomThemeProvider>
      <ModalProvider>
        <div className="App">
          <Header />
          <main>
            <Hero />
            <AboutSection />
            <Work />
          </main>
          <FooterContact />
        </div>
      </ModalProvider>
    </CustomThemeProvider>
  );
}

export default App;
