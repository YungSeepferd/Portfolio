import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroBG from '../assets/css/images/Moosach Musik Moritz.jpg';
import gallery1 from '../assets/css/images/Cookout.png';
import gallery2 from '../assets/css/images/AMIAIBG.png';
import gallery3 from '../assets/css/images/AudioHaptics.png';
import gallery4 from '../assets/css/images/Cookout.png';
import podcastProduction from '../assets/css/images/P&K.jpg';
import musicProduction from '../assets/css/images/Moosach Musik Moritz.jpg';
import ProjectOverlay from './ProjectOverlay';
import ProjectBubble from './ProjectBubble';
import useSlider from '../hooks/useSlider';
import './About.css';
import Button from './Button';

const About = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Overview projects array (6 projects)
  const overviewProjects = [
    {
      id: 1,
      title: "Coding",
      description: "Passionate about building efficient and clean code.",
      image: gallery1,
      details: "Detailed information regarding the Coding project."
    },
    {
      id: 2,
      title: "Prototyping",
      description: "Rapid prototyping to test innovative ideas.",
      image: gallery2,
      details: "Detailed information regarding the Prototyping project."
    },
    {
      id: 3,
      title: "Football",
      description: "Embracing teamwork and strategic gameplay.",
      image: gallery3,
      details: "Detailed information regarding the Football project."
    },
    {
      id: 4,
      title: "Research",
      description: "In-depth analysis to drive design decisions.",
      image: gallery4,
      details: "Detailed information regarding the Research project."
    },
    {
      id: 5,
      title: "Podcast Production",
      description: "Creating engaging audio content and production.",
      image: podcastProduction,
      details: "Detailed information regarding the Podcast Production project."
    },
    {
      id: 6,
      title: "Music Production",
      description: "Crafting soundscapes and producing original music.",
      image: musicProduction,
      details: "Detailed information regarding the Music Production project."
    }
  ];
  
  // Duplicate the array for an endless slider loop
  const sliderItems = [...overviewProjects, ...overviewProjects];
  
  // Use our custom hook passing in card width and number of original cards
  const cardWidth = 270; // card width + gap in px
  const { sliderX, handleNext, handlePrev } = useSlider(cardWidth, overviewProjects.length, 3000);

  return (
    <section
      id="about"
      className="about-section"
      style={{
        backgroundImage: `url(${heroBG})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}
    >
      <div className="about-overlay" />
      <motion.div
        className="container about-content"
        style={{ padding: "50px 20px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="about-text">
          <h2 className="about-heading">About Me</h2>
          <p className="about-paragraph">
            Hi! I'm Vincent Göke, a passionate audio-haptic UX designer and UX researcher.
            I love combining technology and human-centered design to create innovative and intuitive user experiences.
          </p>
          <p className="about-paragraph">
            My journey includes working on immersive audio experiences, context-aware smart home systems,
            and developing tools for haptic feedback design.
          </p>
        </div>

        <div className="slider-container">
          <div className="slider-wrapper">
            <motion.div
              className="overview-slider"
              animate={{ x: sliderX }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {sliderItems.map((project, index) => (
                <div key={index} className="overview-card">
                  <ProjectBubble image={project.image} alt={project.title} />
                  <div className="overview-card-body">
                    <h5 className="overview-card-title">{project.title}</h5>
                    <p className="overview-card-text">{project.description}</p>
                    <Button onClick={() => setSelectedProject(project)}>
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="slider-controls">
            <button className="slider-btn prev" onClick={handlePrev}>&larr;</button>
            <button className="slider-btn next" onClick={handleNext}>&rarr;</button>
          </div>
        </div>
      </motion.div>
      {selectedProject && (
        <ProjectOverlay
          project={{
            title: selectedProject.title,
            details: selectedProject.details,
            media: { type: 'image', src: selectedProject.image }
          }}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default About;