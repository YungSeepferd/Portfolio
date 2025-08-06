import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import Header from './components/header/Header';
import FooterContact from './components/contact/FooterContact';
import ErrorBoundary from './components/common/ErrorBoundary';

// Import components directly to fix lazy loading issues
import Hero from './components/hero/Hero';
import Work from './components/work/Work';
import AboutSection from './components/about/AboutSection';
import ThemeDebugger from './components/dev/ThemeDebugger';

/**
 * Main App Component
 * This is the entry point for the application UI.
 */
const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <ModalProvider>
        <Router>
          <ErrorBoundary componentName="App">
            <div className="App">
              <Header />
              <main>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Hero />
                        <Work />
                        <AboutSection />
                      </>
                    }
                  />
                </Routes>
              </main>
              <FooterContact />
              {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
            </div>
          </ErrorBoundary>
        </Router>
      </ModalProvider>
    </CustomThemeProvider>
  );
};

export default App;
