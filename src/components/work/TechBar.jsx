import React from 'react';
import PropTypes from 'prop-types';
import TechnologyTags from './TechnologyTags';

/**
 * TechBar
 * Minimal wrapper around TechnologyTags to provide a stable entry point
 * for rendering technology chips across the Work section.
 */
const TechBar = ({ technologies = [], variant = 'default', size = 'small', sx = {}, ...rest }) => {
  if (!technologies || technologies.length === 0) return null;
  return (
    <TechnologyTags
      technologies={technologies}
      variant={variant}
      size={size}
      sx={sx}
      {...rest}
    />
  );
};

TechBar.propTypes = {
  technologies: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string })
    ])
  ),
  variant: PropTypes.oneOf(['default', 'hover', 'full']),
  size: PropTypes.oneOf(['small', 'medium', 'full', 'hover']),
  sx: PropTypes.object,
};

export default TechBar;

