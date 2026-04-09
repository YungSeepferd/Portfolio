import React from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import spacingTokens from '../../theme/spacing';

const SkillsBento = ({ items = [], showChips = true, maxChips }) => {
  const theme = useTheme();
  
  // Define colors for different skill categories
  const colors = ['primary.main', 'secondary.main', 'success.main', 'warning.main', 'info.main', 'error.main'];
  
  const getBgGradient = (index) => {
    const gradients = [
      'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.2) 100%)',
      'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.2) 100%)',
      'linear-gradient(135deg, rgba(67, 160, 71, 0.1) 0%, rgba(67, 160, 71, 0.2) 100%)',
      'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.2) 100%)',
      'linear-gradient(135deg, rgba(3, 169, 244, 0.1) 0%, rgba(3, 169, 244, 0.2) 100%)',
      'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.2) 100%)',
    ];
    return gradients[index % gradients.length];
  };
  
  return (
    <Grid container rowSpacing={spacingTokens.bento.rowGap} columnSpacing={spacingTokens.bento.columnGap} sx={{ mt: 3, mb: 4 }}>
      {items.map((item, index) => {
        const color = colors[index % colors.length];
        const bgGradient = getBgGradient(index);
        const Icon = item.icon;
        const [base, tone] = color.split('.');
        const paletteColor = (theme.palette[base] && theme.palette[base][tone]) || theme.palette.primary.main;
        
        return (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
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
                  {Icon && <Icon />}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  {item.subtitle && (
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      {item.subtitle}
                    </Typography>
                  )}
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1 }}>
                {item.description}
              </Typography>
              
              {showChips && item.skills && item.skills.length > 0 && (
                <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {(maxChips ? item.skills.slice(0, maxChips) : item.skills).map((skill, i) => (
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
              )}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SkillsBento;
