import React from 'react';
import { Box, Typography, useTheme, Tooltip, Fade, Paper } from '@mui/material';
import BentoGrid, { BentoItem } from './BentoGrid';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const SkillCard = styled(Box)(({ theme, color = 'primary' }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  cursor: 'default',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
    '& .skill-icon': {
      transform: 'scale(1.1)',
    },
  },
}));

const SkillIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color = 'primary' }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette[color].contrastText,
  backgroundColor: theme.palette[color].main,
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  boxShadow: theme.shadows[2],
  '& svg': {
    width: 24,
    height: 24,
    transition: 'all 0.3s ease',
  },
}));

const SkillDescription = styled(Box)(({ theme }) => ({
  overflow: 'visible',
}));

const SkillTags = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  opacity: 1,
}));

const SkillsBento = ({ items = [] }) => {
  const theme = useTheme();
  
  // Define colors for different skill categories
  const colors = ['primary', 'secondary', 'success', 'warning', 'info', 'error'];
  
  return (
    <BentoGrid 
      columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
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
        const color = colors[index % colors.length];
        const Icon = item.icon;
        
        return (
          <BentoItem 
            key={item.title} 
            span={1}
            variant={'default'}
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
              <SkillCard color={color}>
                <Box display="flex" alignItems="center" mb={2}>
                  <SkillIcon className="skill-icon" color={color}>
                    {Icon && <Icon />}
                  </SkillIcon>
                  <Box ml={2}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette[color].main }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.subtitle || ''}
                    </Typography>
                  </Box>
                </Box>
                
                <SkillDescription>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                </SkillDescription>
                
                {item.skills && (
                  <SkillTags>
                    {item.skills.map((skill, i) => (
                      <Tooltip key={i} title={skill} arrow TransitionComponent={Fade}>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: i * 0.03 }}
                        >
                          <Paper
                            elevation={0}
                            sx={{
                              display: 'inline-block',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 4,
                              fontSize: '0.7rem',
                              fontWeight: 500,
                              backgroundColor: theme.palette[color].light + '40',
                              color: theme.palette[color].dark,
                              border: `1px solid ${theme.palette[color].light}80`,
                              whiteSpace: 'nowrap',
                              backdropFilter: 'blur(4px)',
                              '&:hover': {
                                backgroundColor: theme.palette[color].light + '60',
                              },
                            }}
                          >
                            {skill}
                          </Paper>
                        </motion.span>
                      </Tooltip>
                    ))}
                  </SkillTags>
                )}
              </SkillCard>
            </motion.div>
          </BentoItem>
        );
      })}
    </BentoGrid>
  );
};

export default SkillsBento;
