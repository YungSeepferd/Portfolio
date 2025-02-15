import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroBG from '../assets/css/images/Moosach Musik Moritz.jpg';
import VRGLASSES from '../assets/css/images/VRBrille.JPG';
import gallery1 from '../assets/css/images/Cookout.png';
import gallery2 from '../assets/css/images/AMIAIBG.png';
import gallery3 from '../assets/css/images/AudioHaptics.png';
import gallery4 from '../assets/css/images/Cookout.png';
import project1Img from '../assets/css/images/FItnessapp.jpeg';
import project2Img from '../assets/css/images/VRBrille.JPG';
import './About.css';

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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none'
        }}
      ></div>

      <motion.div
        className="container d-flex flex-wrap align-items-center about-content"
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
            Hi! I'm Vincent Göke, a passionate audio-haptic UX designer and UX researcher.
            I love combining technology and human-centered design to create innovative and intuitive user experiences.
          </p>
          <p className="lead">
            My journey includes working on immersive audio experiences, context-aware smart home systems, and developing tools for haptic feedback design.
          </p>
        </div>
        {/* New 2x2 matrix for interest project cards */}
        <div className="col-md-6">
          <div className="row">
            <div className="col-6 mb-4">
              <div className="card">
                <img src={gallery1} alt="Coding" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Coding</h5>
                  <p className="card-text">Passionate about building efficient and clean code.</p>
                </div>
              </div>
            </div>
            <div className="col-6 mb-4">
              <div className="card">
                <img src={gallery2} alt="Prototyping" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Prototyping</h5>
                  <p className="card-text">Rapid prototyping to test innovative ideas.</p>
                </div>
              </div>
            </div>
            <div className="col-6 mb-4">
              <div className="card">
                <img src={gallery3} alt="Football" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Football</h5>
                  <p className="card-text">Embracing teamwork and strategic gameplay.</p>
                </div>
              </div>
            </div>
            <div className="col-6 mb-4">
              <div className="card">
                <img src={gallery4} alt="Research" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Research</h5>
                  <p className="card-text">In-depth analysis to drive design decisions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Projects Section */}
      <div className="container mt-5">
        <h3 className="text-orange display-5 mb-4">Additional Projects</h3>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <img
                src={project1Img}
                alt="Project 1"
                className="card-img-top"
                style={{ borderTopLeftRadius: 'calc(.25rem - 1px)', borderTopRightRadius: 'calc(.25rem - 1px)' }}
              />
              <div className="card-body">
                <h5 className="card-title">Project Title 1</h5>
                <p className="card-text">
                  Short description for project 1. Add details about the design process, technology used, and impact.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <img
                src={project2Img}
                alt="Project 2"
                className="card-img-top"
                style={{ borderTopLeftRadius: 'calc(.25rem - 1px)', borderTopRightRadius: 'calc(.25rem - 1px)' }}
              />
              <div className="card-body">
                <h5 className="card-title">Project Title 2</h5>
                <p className="card-text">
                  Short description for project 2. This section can include key insights, user research findings, or prototyping stages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;