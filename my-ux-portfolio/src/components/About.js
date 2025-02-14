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
        className="container d-flex flex-wrap align-items-center justify-content-between"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'relative',
          padding: '100px 0',
          color: 'white',
        }}
      >
        {/* Text Section */}
        <div className="text-section col-md-6">
          <h2 className="text-orange display-4">About Me</h2>
          <p className="lead">
            Hi! I'm Vincent Göke, a passionate haptic designer and UX researcher with a background in
            human-computer interaction. My work focuses on creating emotionally engaging and intuitive user
            experiences that bridge the gap between technology and human interaction.
          </p>
          <p className="lead">
            With expertise spanning immersive audio experiences, smart home solutions, and prototyping for
            haptic feedback, I bring ideas to life by seamlessly blending creativity and cutting-edge technology.
          </p>
        </div>

        {/* Photo Gallery Section */}
        <div className="photo-gallery col-md-6 d-flex flex-wrap justify-content-between">
          <div className="gallery-tile mb-4">
            <img src="" alt="Gallery 1" className="img-fluid rounded shadow-lg gallery-img" />
          </div>
          <div className="gallery-tile mb-4">
            <img src="images/photo2.jpg" alt="Gallery 2" className="img-fluid rounded shadow-lg gallery-img" />
          </div>
          <div className="gallery-tile mb-4">
            <img src="images/photo3.jpg" alt="Gallery 3" className="img-fluid rounded shadow-lg gallery-img" />
          </div>
          <div className="gallery-tile mb-4">
            <img src="images/photo4.jpg" alt="Gallery 4" className="img-fluid rounded shadow-lg gallery-img" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
