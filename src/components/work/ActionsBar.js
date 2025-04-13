import React from 'react';
import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import TechBar from './TechBar';
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
 * ActionsBar Component
 * 
 * Displays technologies on the left and action buttons on the right in a single bar.
 */
const ActionsBar = ({ technologies = [], links = [], prototype, presentation, title = "" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Don't render if nothing to show
  if (!technologies.length && !links.length && !prototype && !presentation) {
    return null;
  }
  
  // Standardize links array
  const linksArray = Array.isArray(links) ? links : 
                    (links && typeof links === 'object' ? Object.values(links) : []);
  
  // Resolve presentation path if present
  const presentationPath = presentation ? resolveMediaPath(presentation) : null;
  
  // Create action buttons
  const createActionButtons = () => {
    const buttons = [];
    
    // Presentation PDF button
    if (presentationPath) {
      buttons.push(
        <ActionButton
          key="presentation-button"
          label="View Presentation"
          href={presentationPath}
          icon={<SlideshowIcon />}
          variant="outlined"
          color="primary"
          contentType="pdf"
          openInPopup={true}
          size="small"
        />
      );
    }
    
    // Prototype button
    if (prototype) {
      buttons.push(
        <ActionButton
          key="prototype-button"
          label="Try Prototype"
          href={prototype}
          icon={<DesignServicesIcon />}
          variant="outlined"
          color="success"
          contentType="iframe"
          openInPopup={true}
          size="small"
        />
      );
    }
    
    // Additional links - limit to 3 to avoid overcrowding
    if (linksArray.length > 0) {
      linksArray.slice(0, 3).forEach((link, index) => {
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
        
        buttons.push(
          <ActionButton
            key={`link-button-${index}`}
            label={link.label || 'View Resource'}
            href={resolvedUrl}
            icon={icon}
            variant="outlined"
            color={link.color || 'primary'}
            contentType={contentType}
            openInPopup={link.openInPopup !== false}
            size="small"
          />
        );
      });
    }
    
    return buttons;
  };
  
  // Render mobile layout (stacked) or desktop layout (side-by-side)
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 0,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          width: '100%',
          gap: 2,
        }}
      >
        {/* Technologies on the left */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {technologies && technologies.length > 0 ? (
            <TechBar
              technologies={technologies}
              variant="outlined"
              size="small"
            />
          ) : null}
        </Box>
        
        {/* Action Buttons on the right */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
            alignItems: 'center',
          }}
        >
          {createActionButtons()}
        </Box>
      </Box>
    </Paper>
  );
};

export default ActionsBar;
