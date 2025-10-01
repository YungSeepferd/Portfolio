import React from 'react';
import { Button, ListItem, Stack, useTheme, Box } from '@mui/material';
import { scroller } from 'react-scroll';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';

/**
 * NavLinks component for rendering navigation items with enhanced pill-style animations
 * @param {Array} navItems - Navigation items array
 * @param {string} variant - 'desktop' | 'mobile'
 * @param {string} activeSection - Currently active section ID
 * @param {function} [onClick] - Optional click handler (for mobile drawer)
 * @param {React.ReactNode} [endSlot] - Optional element rendered at the end of the nav (e.g., ThemeToggle)
 */
const NavLinks = ({ navItems, variant = 'desktop', activeSection, onClick, endSlot }) => {
  const theme = useTheme();
  // Safe radius fallbacks (project uses shape.borderRadiusScale without 'full')
  const radiusScale = theme.shape?.radius || theme.shape?.borderRadiusScale || {};
  const radius = {
    sm: radiusScale.sm ?? 4,
    xl: radiusScale.xl ?? 16,
    full: radiusScale.full ?? '999px',
  };
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
  // Handler to scroll to section
  const handleScroll = (target) => {
    scroller.scrollTo(target, {
      smooth: true,
      offset: -70,
      duration: 500,
    });
    if (onClick) onClick();
  };

  if (variant === 'mobile') {
    const items = navItems.map((item) => (
      <ListItem 
        key={item.name} 
        disablePadding
        sx={{ justifyContent: 'center', mb: 1 }}
      >
        <Button
          variant={item.isCallToAction ? 'contained' : 'text'}
          color={item.isCallToAction ? 'primary' : 'inherit'}
          fullWidth
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: item.isCallToAction ? radius.xl : radius.sm,
            textTransform: 'none',
            fontWeight: item.isCallToAction ? 600 : 500,
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: item.isCallToAction 
                ? 'primary.dark' 
                : 'action.hover',
            },
          }}
          onClick={() => handleScroll(item.target)}
        >
          {item.name}
        </Button>
      </ListItem>
    ));

    if (endSlot) {
      items.push(
        <ListItem key="end-slot" disablePadding sx={{ justifyContent: 'center', mt: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 1.5,
              py: 0.75,
              borderRadius: radius.full,
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.08)
                : alpha(theme.palette.common.black, 0.06),
              border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
              width: '100%',
            }}
          >
            {endSlot}
          </Box>
        </ListItem>
      );
    }

    return items;
  }

  // Desktop: Enhanced pill-style navigation with PillNav-inspired animations
  return (
    <Stack direction="row" alignItems="center" gap={2} pr={{ md: 3, lg: 5 }}>
      {/* Pills container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.375,
        }}
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.target;
          const isHovered = hoveredIndex === index;
          const isCallToAction = item.isCallToAction;
        
          return (
            <Box 
              key={item.target} 
              sx={{ 
                position: 'relative',
                overflow: 'hidden',
                borderRadius: radius.full,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Expanding circle background - subtle transparency */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1.2 : 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.15)
                    : alpha(theme.palette.common.black, 0.15),
                  transform: 'translateX(-50%)',
                  transformOrigin: 'center bottom',
                  zIndex: 1,
                }}
              />
              
              <Button
                variant="text"
                size="small"
                sx={{
                  minWidth: 'auto',
                  position: 'relative',
                  zIndex: 2,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  letterSpacing: '0.5px',
                  px: 2.5,
                  py: 0.875,
                  borderRadius: radius.full,
                  backgroundColor: isCallToAction
                    ? theme.palette.primary.main
                    : theme.palette.mode === 'dark'
                      ? alpha(theme.palette.common.white, 0.1)
                      : alpha(theme.palette.common.white, 0.95),
                  color: isCallToAction
                    ? theme.palette.primary.contrastText
                    : isActive
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  transition: theme.transitions.create(['color'], {
                    duration: theme.transitions.duration.short,
                  }),
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                  },
                }}
                onClick={() => handleScroll(item.target)}
              >
                {item.name}
              </Button>
              
              {/* Active indicator dot */}
              {isActive && !isCallToAction && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    zIndex: 4,
                  }}
                />
              )}
            </Box>
          );
        })}

        {/* End slot (e.g., ThemeToggle) inside container */}
        {endSlot && (
          <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: radius.full }}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 2.5,
                  py: 0.875,
                  borderRadius: radius.full,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.1)
                    : alpha(theme.palette.common.white, 0.95),
                  color: theme.palette.text.primary,
                }}
              >
                {endSlot}
              </Box>
            </motion.div>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default NavLinks;
