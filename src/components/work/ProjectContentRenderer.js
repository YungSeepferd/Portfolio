import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import VideoPlayer from '../common/VideoPlayer';

// Styled components for different content types
const ContentWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

/**
 * Renders different types of project content including text, lists, grids, and media
 * Assumes all media is already normalized and imported.
 */
const ProjectContentRenderer = ({ content, layout = 'standard' }) => {
  if (!content) return null;

  // If content is a valid React element, render as-is
  if (React.isValidElement(content)) return content;

  // Simple string content
  if (typeof content === 'string') {
    return (
      <ContentWrapper>
        <Typography variant="body1">{content}</Typography>
      </ContentWrapper>
    );
  }

  // Array of paragraphs or items
  if (Array.isArray(content)) {
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
    // Default: render as paragraphs
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

  // Normalized media object (image or video)
  if (content.type === 'media' || content.type === 'image' || content.type === 'video') {
    const mediaAlt = content.alt || 'Project media';
    return (
      <ContentWrapper>
        {content.caption && (
          <Typography variant="subtitle1" gutterBottom align="center">
            {content.caption}
          </Typography>
        )}
        <Box sx={{ width: '100%', height: content.height || '400px', borderRadius: 1, overflow: 'hidden' }}>
          {content.type === 'video' ? (
            <VideoPlayer src={content.src} poster={content.poster} title={mediaAlt} />
          ) : (
            <img
              src={content.src}
              alt={mediaAlt}
              style={{ width: '100%', height: '100%', objectFit: content.objectFit || 'cover' }}
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
