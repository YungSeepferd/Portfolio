import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import Header from './components/header/Header';
import FooterContact from './components/contact/FooterContact';
import LoadingFallback from './components/common/LoadingFallback';

// Lazy load heavy components for better performance
const Hero = lazy(() => import('./components/hero/Hero'));
const AboutSection = lazy(() => import('./components/about/AboutSection'));
const Work = lazy(() => import('./components/work/Work'));
const ThemeDebugger = lazy(() => import('./components/dev/ThemeDebugger'));

/**
 * Main App Component
 * This is the entry point for the application UI.
 */
function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
      <CustomThemeProvider>
        <ModalProvider>
          <div className="App">
            <Header />
            <main>
              <Suspense fallback={<LoadingFallback />}>
                <Hero />
                <Work />
                <AboutSection />
              </Suspense>
            </main>
            <FooterContact />
            {process.env.NODE_ENV === 'development' && (
              <Suspense fallback={null}>
                <ThemeDebugger />
              </Suspense>
            )}
          </div>
        </ModalProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  );
}

export default App;
