import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * KeyTakeaways Component
 * 
 * Displays a list of key takeaways from a project.
 * Supports consistent heading hierarchy through titleVariant and titleComponent props.
 */
const KeyTakeaways = ({ 
  takeaways = [], 
  title = "Key Takeaways",
  titleVariant = "h4",
  titleComponent = "h4",
  headingColor = null // Added headingColor prop
}) => {
  const theme = useTheme();
  
  if (!takeaways || takeaways.length === 0) return null;
  
  // If headingColor is not provided, use the default from theme
  const titleColor = headingColor || theme.palette.text.primary;
  
  const animationSettings = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.2 },
    viewport: { once: true }
  };
  
  return (
    <Box 
      component={motion.div}
      {...animationSettings}
    >
      {title && (
        <Typography 
          variant={titleVariant} 
          component={titleComponent}
          sx={{ 
            mb: 3,
            color: titleColor // Apply the heading color
          }}
        >
          {title}
        </Typography>
      )}
      
      <List sx={{ 
        '& .MuiListItem-root': {
          alignItems: 'flex-start',
          pb: 1
        }
      }}>
        {takeaways.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
              <CheckCircleIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText 
              primary={item} 
              primaryTypographyProps={{ 
                variant: 'body1',
                fontWeight: 400
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

KeyTakeaways.propTypes = {
  takeaways: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  titleVariant: PropTypes.string,
  titleComponent: PropTypes.string,
  headingColor: PropTypes.string
};

export default KeyTakeaways;
