import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ActionButton from '../common/ActionButton';
import { resolveMediaPath } from '../../utils/MediaPathResolver';

// Import MUI icons
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';

/**
 * ProjectLinks Component
 * 
 * Displays action buttons for various project resources like
 * presentations, prototypes, code repositories, etc.
 */
const ProjectLinks = ({ prototype, presentation, links = [], title = "" }) => {
  if (!prototype && !presentation && (!links || links.length === 0)) {
    return null;
  }
  
  // Resolve presentation path if present
  const presentationPath = presentation ? resolveMediaPath(presentation) : null;
  
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Learn more about {title}
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2
      }}>
        {/* Presentation PDF button */}
        {presentationPath && (
          <ActionButton
            label="View Presentation"
            href={presentationPath}
            icon={<SlideshowIcon />}
            variant="contained"
            color="primary"
            contentType="pdf"
            openInPopup={true}
          />
        )}
        
        {/* Prototype button */}
        {prototype && (
          <ActionButton
            label="Try Prototype"
            href={prototype}
            icon={<DesignServicesIcon />}
            variant="outlined"
            color="success"
            contentType="iframe"
            openInPopup={true}
          />
        )}
        
        {/* Additional links */}
        {links && links.length > 0 && links.map((link, index) => {
          // Determine icon based on link type/label
          let icon = <OpenInNewIcon />;
          if (link.type === 'github' || link.label?.toLowerCase().includes('github')) {
            icon = <GitHubIcon />;
          } else if (link.type === 'paper' || link.label?.toLowerCase().includes('paper')) {
            icon = <ArticleIcon />;
          } else if (link.type === 'code' || link.label?.toLowerCase().includes('code')) {
            icon = <CodeIcon />;
          }
          
          // Determine content type for modal handling
          let contentType = 'external';
          if (link.url?.endsWith('.pdf')) {
            contentType = 'pdf';
          } else if (link.url?.includes('figma.com') || link.url?.includes('prototype')) {
            contentType = 'iframe';
          }
          
          // Resolve URL if it's a local path
          const resolvedUrl = resolveMediaPath(link.url);
          
          return (
            <ActionButton
              key={`link-${index}`}
              label={link.label || 'View Resource'}
              href={resolvedUrl}
              icon={icon}
              variant={link.primary ? 'contained' : 'outlined'}
              color={link.color || 'primary'}
              contentType={contentType}
              openInPopup={link.openInPopup !== false}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ProjectLinks;