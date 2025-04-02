import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const KeyTakeaways = ({ takeaways = [], title = "Key Takeaways" }) => {
  if (!takeaways || takeaways.length === 0) return null;

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
      <Typography 
        variant="h4" 
        sx={{ mt: { xs: 4, md: 1 }, mb: 3 }}
      >
        {title}
      </Typography>
      
      <List>
        {takeaways.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

KeyTakeaways.propTypes = {
  takeaways: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
};

export default KeyTakeaways;
