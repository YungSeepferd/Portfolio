import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroBG from '../assets/css/images/heroBG.png';

const About = () => {
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
      id="about"
      className="about-section"
      style={{
        position: 'relative',
        backgroundImage: `url(${heroBG})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for improved text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
        }}
      ></div>

      <motion.div
        className="container d-flex flex-wrap align-items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'relative',
          padding: '100px 0',
          color: 'white',
        }}
      >
        <div className="col-md-6">
          <h2 className="text-orange display-4">About Me</h2>
          <p className="lead">
            Hi! I'm Vincent Göke, a passionate haptic designer and UX researcher. I love combining technology and human-centered design to create innovative and intuitive user experiences.
          </p>
          <p className="lead">
            My journey includes working on immersive audio experiences, context-aware smart home systems, and developing tools for haptic feedback design.
          </p>
        </div>

        <div className="col-md-6">
          <div className="row">
            <div className="col-6 mb-4">
              <img src="assets/css/images/AudioHaptics.png" alt="Gallery 1" className="img-fluid rounded shadow-lg gallery-img" />
            </div>
            <div className="col-6 mb-4">
              <img src="images/photo2.jpg" alt="Gallery 2" className="img-fluid rounded shadow-lg gallery-img" />
            </div>
            <div className="col-6 mb-4">
              <img src="images/photo3.jpg" alt="Gallery 3" className="img-fluid rounded shadow-lg gallery-img" />
            </div>
            <div className="col-6 mb-4">
              <img src="images/P&K.jpg" alt="Gallery 4" className="img-fluid rounded shadow-lg gallery-img" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
