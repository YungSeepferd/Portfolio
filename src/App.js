import React from 'react';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import AboutSection from './components/about/AboutSection';
import Work from './components/work/Work';
import FooterContact from './components/contact/FooterContact';
import ThemeDebugger from './components/dev/ThemeDebugger';

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
            <Work />
            <AboutSection />
          </main>
          <FooterContact />
          {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
        </div>
      </ModalProvider>
    </CustomThemeProvider>
  );
}

export default App;
