import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import FooterContact from './components/FooterContact';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Work />
      <About />
      <FooterContact />
    </div>
  );
}

export default App;
