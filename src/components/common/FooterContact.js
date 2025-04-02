import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';

/**
 * Consistent footer contact component for project overlays
 * Shows project links (if available) or a general contact button
 */
const FooterContact = ({ links = [], projectTitle = '', specialNote = '', sx = {} }) => {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 8, 
        py: 4, 
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        ...sx
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Interested in learning more about this project?
        </Typography>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          {links.length > 0 ? (
            links.map((link, idx) => (
              <Button 
                key={idx}
                variant="contained" 
                color="primary"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={link.icon}
                onClick={(e) => e.stopPropagation()}
                sx={{ 
                  mb: { xs: 1, sm: 0 },
                  // Apply standardized contact button styling
                  ...theme.customButtons.contact
                }}
              >
                {link.label}
              </Button>
            ))
          ) : (
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => {
                navigator.clipboard.writeText("vincent.goeke@proton.me");
                alert("Email copied to clipboard!");
              }}
              sx={theme.customButtons.contact}
            >
              Contact for More Info
            </Button>
          )}
        </Box>
        
        {specialNote && (
          <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
            {specialNote}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default FooterContact;
