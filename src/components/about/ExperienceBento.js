import React, { useCallback } from 'react';
import { Box, Typography, useTheme, Grid, Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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

  const handleJump = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <Grid container rowSpacing={spacingTokens.bento.rowGap} columnSpacing={spacingTokens.bento.columnGap} sx={{ mt: 3, mb: 4 }}>
      {items.map((item, index) => {
        const color = getColor(index);
        const bgGradient = getBgGradient(index);
        const Icon = getIcon(item.type || 'work');
        const [base, tone] = color.split('.');
        const paletteColor = (theme.palette[base] && theme.palette[base][tone]) || theme.palette.primary.main;
        const anchorId = `exp-item-${index}`;
        const subtitle = item.subtitle || '';
        const isRangeLike = /\d{2}\/\d{4}/.test(subtitle) || /–/.test(subtitle) || /present/i.test(subtitle);
        const rangeFromSubtitle = subtitle.includes('|') ? subtitle.split('|').pop().trim() : (isRangeLike ? subtitle.trim() : '');
        const rangeLabel = item.duration || rangeFromSubtitle || '';
        
        return (
          <Grid item xs={12} md={12} key={`${item.id || item.title}-${index}`}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '180px 1fr', lg: '220px 1fr' }, columnGap: 2 }}>
              {/* Timeline gutter (separate from card) */}
              <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' }, pt: 1 }}>
                {/* Range label */}
                <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'right', display: 'block', pr: 3 }}>
                  {rangeLabel || ' '}
                </Typography>
                {/* Connectors and dot */}
                {index > 0 && (
                  <Box aria-hidden sx={(t) => ({ position: 'absolute', left: 'calc(100% - 10px)', top: `calc(-${t.spacing(spacingTokens.bento.rowGap / 2)})`, height: `calc(18px + ${t.spacing(spacingTokens.bento.rowGap / 2)})`, width: '2px', bgcolor: t.palette.divider })} />
                )}
                <Box
                  role="button"
                  aria-label={`Jump to ${item.title}`}
                  tabIndex={0}
                  onClick={() => handleJump(anchorId)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleJump(anchorId)}
                  sx={{
                    position: 'absolute',
                    left: 'calc(100% - 10px)',
                    top: '18px',
                    width: 12,
                    height: 12,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                    cursor: 'pointer',
                    zIndex: 2,
                    '&:hover': { boxShadow: `0 0 0 3px ${theme.palette.primary.light}` },
                  }}
                />
                {index < items.length - 1 && (
                  <Box aria-hidden sx={(t) => ({ position: 'absolute', left: 'calc(100% - 10px)', top: '24px', height: `calc(100% - 24px + ${t.spacing(spacingTokens.bento.rowGap / 2)})`, width: '2px', bgcolor: t.palette.divider })} />
                )}
              </Box>

              {/* Content card column */}
              <Box
                id={anchorId}
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

                {item.attachments && item.attachments.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {item.attachments.map((att, i) => (
                      <Button
                        key={`${att.label}-${i}`}
                        variant="outlined"
                        color="primary"
                        startIcon={<PictureAsPdfIcon />}
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textTransform: 'none' }}
                      >
                        {att.label}
                      </Button>
                    ))}
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
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ExperienceBento;
