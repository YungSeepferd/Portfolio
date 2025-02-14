import React from 'react';
import { motion } from 'framer-motion';
import heroBG from '../assets/css/images/heroBG.png'; // Example image; adjust as needed
import HapticsBG from '../assets/css/images/Haptics.png'; 
import AMIAIBG from '../assets/css/images/AMIAIBG.png'; 
import HackathonBG from '../assets/css/images/HackathonBG.jpg'; 
import BachelorBG from '../assets/css/images/heroBG.png'; 
import './Work.css'; // Add a new CSS file for custom styles


function Work() {
  const projects = [
    {
      id: 1,
      title: 'Master Thesis',
      description: 'Exploring novel approaches in human-computer interaction through advanced haptic feedback systems.',
      image: heroBG,
    },
    {
      id: 2,
      title: 'Affective State Change Through Procedurally Generated Haptics',
      description: 'Research on how procedurally generated haptic feedback influences affective state changes in users.',
      image: HapticsBG,
    },
    {
      id: 3,
      title: 'AMIAI',
      description: 'Artificial Music Intelligence and Interaction: A collaborative project on AI-driven music creation and interaction systems.',
      image: AMIAIBG,
    },
    {
      id: 4,
      title: 'Hackathon',
      description: 'Participated in a 48-hour hackathon, developing an innovative AR-based navigation system for visually impaired users.',
      image: HackathonBG,
    },
    {
      id: 5,
      title: 'Bachelor Thesis',
      description: 'Investigating user-centered design methodologies for VR environments in educational settings.',
      image: BachelorBG,
    },
  ];

  return (
    <section id="work" className="bg-dark text-white">
      <h2 className="display-3 text-orange text-center py-5">My Work</h2>
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="project-section d-flex align-items-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container">
            <div className={`row ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
              <div className="col-md-6 image-container">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center text-container">
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
