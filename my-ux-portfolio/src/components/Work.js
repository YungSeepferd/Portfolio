import React from 'react';
import { motion } from 'framer-motion';

function Work() {
  const projects = [
    {
      id: 1,
      title: 'Fitness Tracker UX Design',
      description: 'Developed a user-centered design for a fitness tracking app, focusing on intuitive navigation and real-time feedback to help users achieve goals.',
      image: '/images/case-study-1-thumb.jpg',
    },
    {
      id: 2,
      title: 'Remote Team Food Delivery Concept',
      description: 'Created a video prototype for a food delivery service aimed at remote teams, incorporating collaborative ordering and meal-sharing features.',
      image: '/images/case-study-2-thumb.jpg',
    },
    {
      id: 3,
      title: 'VR Audio Meditation Experience',
      description: 'Designed immersive audio experiences for VR-based meditation, enhancing mindfulness through dynamic soundscapes.',
      image: '/images/AudioHaptics.png',
    },
    {
      id: 4,
      title: 'Haptic Feedback Prototyping Kit',
      description: 'Built a prototyping kit for designers to explore haptic feedback in interaction design, simplifying iteration and testing processes.',
      image: '/images/case-study-4-thumb.jpg',
    },
    {
      id: 5,
      title: 'Smart Home Audio Controls',
      description: 'Developed a context-aware audio system for smart home environments, optimizing sound output based on user preferences and room acoustics.',
      image: '/images/case-study-5-thumb.jpg',
    },
    {
      id: 6,
      title: 'Podcast Production Studio UX',
      description: 'Redesigned the workflow for podcast creators, improving collaboration tools and simplifying the editing process.',
      image: '../assets/css/images/heroBG.png',
    },
  ];

  return (
    <section id="work" className="bg-dark text-white">
      <h2 className="display-3 text-orange text-center py-5">My Work</h2>
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="project-section vh-100 d-flex align-items-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container">
            <div className={`row ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
              <div className="col-md-6">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="img-fluid rounded shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center">
                <h3 className="text-orange display-4">{project.title}</h3>
                <p className="lead">{project.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

export default Work;
