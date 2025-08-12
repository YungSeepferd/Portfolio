import React from 'react';
import { Box, Typography, Stack } from '@mui/material'; // Added Stack for better spacing and alignment
import ActionButton from './ActionButton';
import { resolveMediaPath } from '../../services/ImageService';

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

// Centralized icon and color logic (migrated from buttonStyles.js)
const getLinkIcon = (label) => {
  if (!label) return <OpenInNewIcon />;
  const normalizedLabel = label.toLowerCase();
  if (normalizedLabel.includes('github')) return <GitHubIcon />;
  if (normalizedLabel.includes('paper') || normalizedLabel.includes('article'))
    return <ArticleIcon />;
  if (normalizedLabel.includes('pdf') || normalizedLabel.includes('presentation'))
    return <SlideshowIcon />;
  if (normalizedLabel.includes('demo') || normalizedLabel.includes('try'))
    return <DesignServicesIcon />;
  if (normalizedLabel.includes('view') || normalizedLabel.includes('visit'))
    return <OpenInNewIcon />;
  return <OpenInNewIcon />;
};

const getLinkColor = (label) => {
  if (!label) return 'primary';
  const normalizedLabel = label.toLowerCase();
  if (normalizedLabel.includes('github')) return 'info';
  if (normalizedLabel.includes('paper') || normalizedLabel.includes('pdf')) return 'secondary';
  if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) return 'success';
  return 'primary';
};

const ProjectLinks = ({ prototype, presentation, links = [], title = '' }) => {
  // Handle links as either array or object for backward compatibility
  const linksArray = Array.isArray(links)
    ? links
    : links && typeof links === 'object'
      ? Object.values(links)
      : [];

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
      <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
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
        {linksArray.length > 0 &&
          linksArray.map((link, index) => {
            // Determine icon and color based on label
            const icon = link.icon || getLinkIcon(link.label);
            const color = link.color || getLinkColor(link.label);

            // Determine content type for modal handling
            let contentType = link.contentType || 'external';
            if (!link.contentType) {
              if (link.url && link.url.endsWith('.pdf')) {
                contentType = 'pdf';
              } else if (
                link.url &&
                (link.url.includes('figma.com') || link.url.includes('prototype'))
              ) {
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
                color={color}
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
