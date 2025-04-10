import React from 'react';
import { CssBaseline } from '@mui/material';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Work from './components/work/Work';
import AboutSection from './components/about/AboutSection';
import FooterContact from './components/contact/FooterContact';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ThemeDebugger from './components/dev/ThemeDebugger';
import ContentContainer from './components/common/ContentContainer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      
      <ModalProvider>
        <ErrorBoundary>
          <div className="App">
            <Header />
            <CssBaseline />
            <main>
              <ErrorBoundary fallback={<div>Something went wrong with the hero section. Please refresh the page.</div>}>
                
                  <Hero />
                
              </ErrorBoundary>

              <ErrorBoundary fallback={<div>Something went wrong with the work section. Please refresh the page.</div>}>
                <ContentContainer>
                  <Work />
                </ContentContainer>
              </ErrorBoundary>
              
              <ErrorBoundary fallback={<div>Something went wrong with the about section. Please refresh the page.</div>}>
                <ContentContainer>
                  <AboutSection />
                </ContentContainer>
              </ErrorBoundary>
              
              <ErrorBoundary fallback={<div>Something went wrong with the contact section. Please refresh the page.</div>}>
                <ContentContainer>
                  <FooterContact />
                </ContentContainer>
              </ErrorBoundary>
            </main>
          </div>
        </ErrorBoundary>
        
        {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
