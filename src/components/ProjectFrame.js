import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './Work.css'; // Ensure this file contains the necessary styles

const ProjectFrame = ({ title, description, media, index }) => {
  return (
    <motion.div
      className="project-section d-flex align-items-center outer-box"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container">
        <div className={`row ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
          <div className="col-md-6 image-container">
            {media.type === 'image' ? (
              <motion.img
                src={media.src}
                alt={title}
                className="project-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <motion.video
                src={media.src}
                alt={title}
                className="project-video"
                controls
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center text-container">
            <h3 className="text-orange display-4">{title}</h3>
            <p className="lead">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ProjectFrame.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  media: PropTypes.shape({
    type: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProjectFrame;