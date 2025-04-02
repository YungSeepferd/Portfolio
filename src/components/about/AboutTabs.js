import React from 'react';
import { Box, Tabs, Tab, Container, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { wallsData } from './AboutData';
import TabContent from './TabContent';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

const AboutTabs = ({ onSectionChange }) => {
  const theme = useTheme();
  const { activeSection, scrollToSection, sectionRefs } = useSmoothScroll(wallsData.length, { onChange: onSectionChange });

  return (
    <Box className="about-tabs-container" sx={{ width: '100%' }}>
      <Container maxWidth="lg" sx={{ ...theme.customSections.about.container }}>
        <Tabs
          value={activeSection}
          onChange={(_, newValue) => scrollToSection(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          centered
          sx={{
            mb: 4,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.secondary.main,
            },
            '& .MuiTab-root': {
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 500,
            },
          }}
        >
          {wallsData.map((wall, index) => (
            <Tab
              key={index}
              label={wall.title}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </Tabs>

        <Box sx={{ ...theme.customSections.about.tabContent }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <TabContent
                data={wallsData[activeSection]}
                ref={sectionRefs.current[activeSection]?.ref}
                sx={{
                  ...theme.customSections.about.contentCard,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            mt: theme.customSections.about.spacingBetweenSections,
          }}
        >
          {wallsData.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => scrollToSection(idx)}
              component={motion.div}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: idx === activeSection
                  ? theme.palette.secondary.main
                  : theme.palette.divider,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              role="button"
              aria-label={`Go to ${wallsData[idx].title} section`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection(idx)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AboutTabs;
