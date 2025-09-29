import React from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import spacingTokens from '../../theme/spacing';

const ExperienceBento = ({ items = [] }) => {
  const theme = useTheme();
  
  const getIcon = (type) => {
    switch (type) {
      case 'work':
        return WorkIcon;
      case 'freelance':
        return BusinessCenterIcon;
      case 'education':
        return SchoolIcon;
      default:
        return WorkIcon;
    }
  };
  
  const getColor = (index) => {
    const colors = ['primary.main', 'secondary.main', 'success.main', 'warning.main', 'info.main'];
    return colors[index % colors.length];
  };
  
  const getBgGradient = (index) => {
    const gradients = [
      'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.2) 100%)',
      'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.2) 100%)',
      'linear-gradient(135deg, rgba(67, 160, 71, 0.1) 0%, rgba(67, 160, 71, 0.2) 100%)',
      'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.2) 100%)',
      'linear-gradient(135deg, rgba(3, 169, 244, 0.1) 0%, rgba(3, 169, 244, 0.2) 100%)',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Grid container rowSpacing={spacingTokens.bento.rowGap} columnSpacing={spacingTokens.bento.columnGap} sx={{ mt: 3, mb: 4 }}>
      {items.map((item, index) => {
        const color = getColor(index);
        const bgGradient = getBgGradient(index);
        const Icon = getIcon(item.type || 'work');
        const [base, tone] = color.split('.');
        const paletteColor = (theme.palette[base] && theme.palette[base][tone]) || theme.palette.primary.main;
        
        return (
          <Grid item xs={12} md={6} key={`${item.id || item.title}-${index}`}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 'auto',
                backgroundColor: 'rgba(245, 245, 245, 0.6)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
                transition: theme.transitions.create(['transform', 'box-shadow'], {
                  duration: theme.transitions.duration.standard,
                }),
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: bgGradient,
                  opacity: 0.3,
                  transition: 'opacity 0.3s ease-in-out',
                  zIndex: 0,
                },
                '& > *': {
                  position: 'relative',
                  zIndex: 1,
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: `${color}20`,
                    color: color,
                    mr: 2,
                    flexShrink: 0
                  }}
                >
                  <Icon />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {item.subtitle}
                  </Typography>
                  {item.duration && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                      {item.duration}
                    </Typography>
                  )}
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1 }}>
                {item.description}
              </Typography>
              
              {item.link && (
                <Typography 
                  variant="body2" 
                  component="a" 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600, display: 'inline-block', mb: 1 }}
                >
                  View details ↗
                </Typography>
              )}
              
              {item.responsibilities && item.responsibilities.length > 0 && (
                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Key Responsibilities
                  </Typography>
                  <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                    {item.responsibilities.map((resp, i) => (
                      <Typography key={i} component="li" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                        {resp}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
              
              {item.skills && item.skills.length > 0 && (
                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Skills & Technologies
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {item.skills.map((skill, i) => (
                      <Box 
                        key={i}
                        sx={{
                          px: 1,
                          py: 0.25,
                          borderRadius: 0.5,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          backgroundColor: `${color}15`,
                          color: paletteColor,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        {skill}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ExperienceBento;
