import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as CustomThemeProvider } from './context/theme-context';
import { ModalProvider } from './context/modal-context';
import Header from './components/header/header';
import FooterContact from './components/contact/footer-contact';
import ErrorBoundary from './components/common/error-boundary';

// Import components directly to fix lazy loading issues
import Hero from './components/hero/Hero';
import Work from './components/work/Work';
import AboutSection from './components/about/about-section';
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
