import React from 'react';
import { Box, Typography, Stack } from '@mui/material'; // Added Stack for better spacing and alignment
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
  // Handle links as either array or object for backward compatibility
  const linksArray = Array.isArray(links) ? links : 
                    (links && typeof links === 'object' ? Object.values(links) : []);
  
  if (!prototype && !presentation && linksArray.length === 0) {
    return null;
  }
  
  // Resolve presentation path if present
  const presentationPath = presentation ? resolveMediaPath(presentation) : null;
  
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Learn more about {title}
      </Typography>
      
      {/* Use Stack for better button layout with consistent spacing */}
      <Stack 
        direction="row" 
        flexWrap="wrap" 
        spacing={2} 
        justifyContent="center"
        sx={{ mt: 2 }}
      >
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
        {linksArray.length > 0 && linksArray.map((link, index) => {
          // Determine icon based on link type/label
          let icon = link.icon || <OpenInNewIcon />;
          if (!link.icon) {
            if (link.type === 'github' || (link.label && link.label.toLowerCase().includes('github'))) {
              icon = <GitHubIcon />;
            } else if (link.type === 'paper' || (link.label && link.label.toLowerCase().includes('paper'))) {
              icon = <ArticleIcon />;
            } else if (link.type === 'code' || (link.label && link.label.toLowerCase().includes('code'))) {
              icon = <CodeIcon />;
            }
          }
          
          // Determine content type for modal handling
          let contentType = link.contentType || 'external';
          if (!link.contentType) {
            if (link.url && link.url.endsWith('.pdf')) {
              contentType = 'pdf';
            } else if (link.url && (link.url.includes('figma.com') || link.url.includes('prototype'))) {
              contentType = 'iframe';
            }
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
      </Stack>
    </Box>
  );
};

export default ProjectLinks;