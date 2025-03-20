import React from 'react';
import ParallaxScroll from './ParallaxScroll';
import './AboutBackgroundMVP.css';

// Removed extraneous scrolling hook code that referenced undefined variables.
// Now, AboutBackgroundMVP simply renders ParallaxScroll with its content.
// You can add the appropriate content within the ParallaxScroll wrapper.

const AboutBackgroundMVP = () => {
  return (
    <ParallaxScroll>
      {/* ...existing About section content... */}
    </ParallaxScroll>
  );
};

export default AboutBackgroundMVP;
