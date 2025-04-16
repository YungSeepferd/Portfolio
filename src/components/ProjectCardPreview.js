import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import ActionButtonGroup from './ActionButtonGroup';
import SkillTags from './SkillTags';

/**
 * ProjectCardPreview Component
 * 
 * Displays a preview of a project card with action buttons and skill tags.
 * 
 * @param {Object} props
 * @param {string} props.imageUrl - URL of the image to display
 * @param {string} props.title - Title of the project
 * @param {Array} props.actions - Array of action objects for ActionButtonGroup
 * @param {Array} props.skillTags - Array of skill tags to display
 */
const ProjectCardPreview = ({ imageUrl, title, actions = [], skillTags = [] }) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={imageUrl} alt={title} style={{ width: '100%', display: 'block' }} />
      {/* Action buttons: top center */}
      <Box
        sx={{
          position: 'absolute',
          top: 16, // or 0 for flush to top
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          width: 'auto',
          pointerEvents: 'none', // let buttons handle their own pointer events
        }}
      >
        <ActionButtonGroup
          actions={actions}
          sx={{
            width: 'auto', // prevent stretching
            pointerEvents: 'auto', // allow interaction
          }}
        />
      </Box>
      {/* Skill tags: bottom center */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16, // or 0 for flush to bottom
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          width: 'auto',
        }}
      >
        <SkillTags tags={skillTags} />
      </Box>
    </Box>
  );
};

ProjectCardPreview.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.node,
      variant: PropTypes.string,
      color: PropTypes.string,
      size: PropTypes.string,
      contentType: PropTypes.string,
      openInPopup: PropTypes.bool,
      sx: PropTypes.object,
      onClick: PropTypes.func,
    })
  ),
  skillTags: PropTypes.arrayOf(PropTypes.string),
};

export default ProjectCardPreview;