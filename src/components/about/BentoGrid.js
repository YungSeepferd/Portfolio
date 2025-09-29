import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import spacingTokens from '../../theme/spacing';
import { motion, AnimatePresence } from 'framer-motion';

const BentoGrid = ({ 
  children, 
  columns = { xs: 1, sm: 2, md: 2, lg: 3 },
  templateColumns = null, // e.g. { xs: 'repeat(1, 1fr)', md: 'repeat(12, 1fr)' }
  autoRows = null, // e.g. { xs: 'minmax(160px, auto)', md: 'minmax(180px, auto)' }
  containerSx = {},
  itemSx = {},
  enableHoverEffect = true,
  enableStagger = true,
  staggerDelay = 0.1
}) => {
  const theme = useTheme();
  const [hoveredItem, setHoveredItem] = useState(null);

  // Stagger animation variants for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: enableStagger ? staggerDelay : 0,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: enableHoverEffect ? {
      y: -4,
      boxShadow: theme.shadows[8],
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    } : {}
  };

  const hasGapOverride =
    containerSx && (
      Object.prototype.hasOwnProperty.call(containerSx, 'gap') ||
      Object.prototype.hasOwnProperty.call(containerSx, 'rowGap') ||
      Object.prototype.hasOwnProperty.call(containerSx, 'columnGap')
    );

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        display: 'grid',
        gridTemplateColumns: templateColumns || {
          xs: '1fr',
          sm: `repeat(${columns.sm || 2}, 1fr)`,
          md: `repeat(${columns.md || 2}, 1fr)`,
          lg: `repeat(${columns.lg || 3}, 1fr)`
        },
        gridAutoRows: autoRows || undefined,
        ...(hasGapOverride ? {} : { gap: spacingTokens.bento.rowGap }),
        width: '100%',
        mt: 3,
        mb: 4,
        ...containerSx
      }}
    >
      <AnimatePresence>
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={enableHoverEffect ? "hover" : {}}
            onHoverStart={() => enableHoverEffect && setHoveredItem(index)}
            onHoverEnd={() => enableHoverEffect && setHoveredItem(null)}
            style={{
              position: 'relative',
              height: '100%',
              // Let children/BentoItem define their own surfaces/borders
              ...itemSx
            }}
          >
            {hoveredItem === index && enableHoverEffect && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${theme.palette.primary.light}20, transparent 70%)`,
                  zIndex: 1,
                  pointerEvents: 'none',
                  opacity: 0.3
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
            {React.cloneElement(child, {
              style: {
                position: 'relative',
                zIndex: 2,
                height: '100%',
                ...child.props.style
              }
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export const BentoItem = ({ 
  children, 
  span = 1, 
  colSpan = null, // number or { xs, sm, md, lg }
  rowSpan = null, // number or { xs, sm, md, lg }
  sx = {}, 
  variant = 'default',
  elevation = 1,
  ...props 
}) => {
  const theme = useTheme();
  
  const variants = {
    default: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        borderColor: theme.palette.primary.main,
      }
    },
    elevated: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[elevation],
      '&:hover': {
        boxShadow: theme.shadows[elevation + 2],
      }
    },
    filled: {
      backgroundColor: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      }
    },
    gradient: {
      background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.secondary.light}10)`,
      border: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
      }
    },
    plain: {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      p: 0,
    }
  };

  // Compute responsive span styles
  const toSpanObject = (val, fallback) => {
    if (val == null) return fallback;
    if (typeof val === 'number' || typeof val === 'string') {
      const n = typeof val === 'number' ? val : parseInt(val, 10);
      return { xs: `span ${n}` };
    }
    // assume object
    const out = {};
    for (const k of Object.keys(val)) {
      const v = val[k];
      out[k] = typeof v === 'number' ? `span ${v}` : v;
    }
    return out;
  };

  const gridColumnVal = toSpanObject(colSpan, { xs: 'span 1', sm: `span ${Math.min(span, 2)}` });
  const gridRowVal = rowSpan ? toSpanObject(rowSpan, undefined) : undefined;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        gridColumn: gridColumnVal,
        ...(gridRowVal ? { gridRow: gridRowVal } : {}),
        height: '100%',
        alignSelf: 'stretch',
        borderRadius: theme.shape.borderRadius * 2,
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        ...variants[variant] || variants['default'],
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BentoGrid;
