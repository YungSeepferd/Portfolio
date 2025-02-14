import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroBG from '../assets/css/images/heroBG.png'; // Adjust the path as necessary

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${heroBG})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <h1 className="display-3 text-orange">WhoAmI</h1>
        <p className="lead">Haptitian | UX Researcher | Haptic Designer</p>
      </motion.div>
    </section>
  );
};

export default Hero;