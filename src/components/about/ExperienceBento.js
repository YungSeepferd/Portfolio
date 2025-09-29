import React from 'react';
import { Box, Typography, useTheme, Divider, Tooltip, Fade, IconButton } from '@mui/material';
import BentoGrid, { BentoItem } from './BentoGrid';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import LaunchIcon from '@mui/icons-material/Launch';

const ExperienceCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color = 'primary' }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
    transition: 'all 0.3s ease',
  },
}));

const ExperienceIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color = 'primary' }) => ({
  width: 48,
  height: 48,
  borderRadius: '16%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette[color].contrastText,
  background: `linear-gradient(135deg, ${theme.palette[color].main}, ${theme.palette[color].dark})`,
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  '& svg': {
    width: 24,
    height: 24,
    transition: 'all 0.3s ease',
  },
}));

const ExperienceBento = ({ items = [] }) => {
  const theme = useTheme();
  
  const getIcon = (type) => {
    switch (type) {
      case 'work':
        return <WorkIcon />;
      case 'freelance':
        return <BusinessCenterIcon />;
      case 'education':
        return <SchoolIcon />;
      default:
        return <WorkIcon />;
    }
  };
  
  const getColor = (index) => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'info'];
    return colors[index % colors.length];
  };

  return (
    <BentoGrid 
      columns={{ xs: 1, md: 2 }}
      enableHoverEffect={true}
      staggerDelay={0.05}
      containerSx={{ 
        '& > *': {
          transition: 'all 0.3s ease',
        },
      }}
      itemSx={{ borderRadius: 0 }}
    >
      {items.map((item, index) => {
        const color = getColor(index);
        const Icon = getIcon(item.type || 'work');
        
        return (
          <BentoItem 
            key={`${item.id || item.title}-${index}`} 
            span={1}
            variant="default"
            elevation={1}
            sx={{
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRadius: 0,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ExperienceCard color={color}>
                <Box display="flex" alignItems="flex-start" mb={2}>
                  <ExperienceIcon color={color}>
                    {Icon}
                  </ExperienceIcon>
                  <Box ml={2} flexGrow={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700, 
                          lineHeight: 1.2,
                          color: theme.palette[color].main,
                        }}>
                          {item.title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 0.5 }}>
                          {item.subtitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {item.duration}
                        </Typography>
                      </Box>
                      {item.link && (
                        <Tooltip title="View details" arrow TransitionComponent={Fade}>
                          <IconButton 
                            size="small" 
                            href={item.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: theme.palette[color].main,
                              '&:hover': {
                                backgroundColor: `${theme.palette[color].light}20`,
                              },
                            }}
                          >
                            <LaunchIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    
                    <Divider sx={{ my: 2, borderColor: 'divider' }} />
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ lineHeight: 1.7 }}
                    >
                      {item.description}
                    </Typography>
                    {item.responsibilities && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                          Key Responsibilities
                        </Typography>
                        <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                          {item.responsibilities.map((resp, i) => (
                            <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                              <Typography variant="body2" color="text.secondary">{resp}</Typography>
                            </motion.li>
                          ))}
                        </Box>
                      </Box>
                    )}
                    {item.skills && (
                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {item.skills.map((skill, i) => (
                          <Tooltip key={i} title={skill} arrow TransitionComponent={Fade}>
                            <Box sx={{
                              display: 'inline-block',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.7rem',
                              fontWeight: 500,
                              backgroundColor: `${theme.palette[color].light}20`,
                              color: theme.palette[color].dark,
                              border: `1px solid ${theme.palette[color].light}50`,
                              whiteSpace: 'nowrap',
                              backdropFilter: 'blur(4px)'
                            }}>
                              {skill}
                            </Box>
                          </Tooltip>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              </ExperienceCard>
            </motion.div>
          </BentoItem>
        );
      })}
    </BentoGrid>
  );
};

export default ExperienceBento;
