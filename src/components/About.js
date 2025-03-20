// Summary: The About page displays an “About Me” heading and then integrates the horizontal scrolling sections
// via both AboutBackgroundMVP and ParallaxScroll components.
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AboutBackgroundMVP from './AboutBackgroundMVP';
import './About.css';

const About = () => {
  return (
    <div id="about" className="about">
      <div className="horizontal-scroll-wrapper">
        <AboutBackgroundMVP />
      </div>
      {/* Removed duplicate rendering of ParallaxScroll */}
    </div>
  );
};

export default About;