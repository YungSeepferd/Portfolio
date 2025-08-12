import React from 'react';
import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import AboutSection from '../components/about/AboutSection';
import Work from '../components/work/Work';
import FooterContact from '../components/contact/FooterContact';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <Work />
      </main>
      <FooterContact />
    </>
  );
};

export default HomePage;
