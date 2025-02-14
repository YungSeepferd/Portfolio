import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="background-overlay"></div> {/* Overlay for the background */}
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="display-3 text-orange">
          WhoAmI
        </motion.h1>
        <p className="lead">Haptitian | Master of Science in Engineering | UX Researcher & Haptic Designer</p>
        <motion.a href="#work" whileHover={{ scale: 1.1 }} className="btn btn-primary btn-lg mt-4">
          Contact Me
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;
