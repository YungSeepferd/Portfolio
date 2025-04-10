import React, { useState, useRef, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SmoothTabNavigator Component
 * 
 * A smooth tab navigation system for work/project section
 * with adaptive layout and animated transitions
 */
const SmoothTabNavigator = ({ 
  tabs, 
  initialTab = 0,
  onChange,
  variant = "fullWidth", 
  alignIndicator = "bottom",
  tabProps = {},
  panelProps = {},
  ...props 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(initialTab);
  const [tabsWidth, setTabsWidth] = useState(0);
  const tabsRef = useRef(null);

  useEffect(() => {
    // Set correct initial tab
    if (initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
    
    // Measure tabs container width for animations
    if (tabsRef.current) {
      setTabsWidth(tabsRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (tabsRef.current) {
        setTabsWidth(tabsRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialTab, activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (onChange && typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  // Animation variants for tab panels
  const tabPanelVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction * 30
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction * -30,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  // Track direction for animations
  const [direction, setDirection] = useState(0);

  // Update direction when active tab changes
  useEffect(() => {
    const nextTab = initialTab;
    if (nextTab !== activeTab) {
      setDirection(nextTab > activeTab ? 1 : -1);
      setActiveTab(nextTab);
    }
  }, [initialTab, activeTab]);

  return (
    <Box 
      sx={{ 
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        // Remove excessive padding
        px: { 
          xs: '10px', 
          sm: '20px',
          md: '30px',
          lg: '40px',
        },
        boxSizing: 'border-box',
      }}
    >
      {/* Tabs */}
      <Box 
        ref={tabsRef}
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          mb: 3,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : variant}
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="tab navigation"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            },
            ...tabProps.sx,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={`tab-${index}`}
              label={tab.label}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
              disableRipple
              {...tabProps}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          // Ensure enough space for content
          minHeight: '400px',
          ...panelProps.sx,
        }}
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={`panel-${activeTab}`}
            custom={direction}
            variants={tabPanelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              width: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            <Box
              role="tabpanel"
              id={`tabpanel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              sx={{
                width: '100%',
                // Remove excessive padding
                p: { xs: 1, sm: 2 },
                ...panelProps,
              }}
            >
              {tabs[activeTab]?.content || 
                <Typography>No content available for this tab</Typography>}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default SmoothTabNavigator;
