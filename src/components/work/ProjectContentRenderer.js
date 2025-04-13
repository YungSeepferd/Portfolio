import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { resolveMediaPath } from '../../utils/MediaPathResolver';
import { isVideo } from '../../utils/mediaUtils';
import LazyImage from '../common/LazyImage';
import VideoPlayer from '../common/VideoPlayer';

// Styled components for different content types
const ContentWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

/**
 * Renders different types of project content including text, lists, grids, and media
 */
const ProjectContentRenderer = ({ content, layout = 'standard' }) => {
  if (!content) return null;
  
  // Handle different content types
  if (typeof content === 'string') {
    // Simple text content
    return (
      <ContentWrapper>
        <Typography variant="body1">{content}</Typography>
      </ContentWrapper>
    );
  }
  
  if (Array.isArray(content)) {
    // Array of items could be paragraphs, list items, grid items, etc.
    if (layout === 'list') {
      return (
        <ContentWrapper>
          <List>
            {content.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </ContentWrapper>
      );
    }
    
    if (layout === 'grid') {
      return (
        <ContentWrapper>
          <Grid container spacing={3}>
            {content.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                  {typeof item === 'string' ? (
                    <Typography>{item}</Typography>
                  ) : (
                    <RenderGridItem item={item} />
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </ContentWrapper>
      );
    }
    
    // Default array rendering as paragraphs
    return (
      <ContentWrapper>
        {content.map((paragraph, index) => (
          <Typography key={index} variant="body1" paragraph>
            {paragraph}
          </Typography>
        ))}
      </ContentWrapper>
    );
  }
  
  if (content.type === 'media') {
    // Media content (image or video)
    const mediaSrc = resolveMediaPath(content.src);
    const mediaAlt = content.alt || 'Project media';
    
    return (
      <ContentWrapper>
        {content.caption && (
          <Typography variant="subtitle1" gutterBottom align="center">
            {content.caption}
          </Typography>
        )}
        
        <Box 
          sx={{ 
            width: '100%', 
            height: content.height || '400px',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {isVideo(mediaSrc) ? (
            <VideoPlayer src={mediaSrc} poster={content.poster} title={mediaAlt} />
          ) : (
            <LazyImage
              src={mediaSrc}
              alt={mediaAlt}
              style={{ objectFit: content.objectFit || 'cover' }}
            />
          )}
        </Box>
        
        {content.description && (
          <Typography variant="body2" sx={{ mt: 1 }} align="center" color="text.secondary">
            {content.description}
          </Typography>
        )}
      </ContentWrapper>
    );
  }
  
  // Unknown content type
  return (
    <ContentWrapper>
      <Typography variant="body1">
        {JSON.stringify(content)}
      </Typography>
    </ContentWrapper>
  );
};

// Helper component to render grid items
const RenderGridItem = ({ item }) => {
  if (!item) return null;
  
  if (item.title) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>{item.title}</Typography>
        {item.description && <Typography variant="body2">{item.description}</Typography>}
      </Box>
    );
  }
  
  if (item.icon) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {item.icon}
        <Typography sx={{ ml: 1 }}>{item.text}</Typography>
      </Box>
    );
  }
  
  return <Typography>{item}</Typography>;
};

export default ProjectContentRenderer;
