import React, { useState, useEffect, useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useThemeMode } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import { navItems, socialLinks } from '../../config/uiConfig';
import NavLinks from './NavLinks';
import useActiveSection from '../../hooks/useActiveSection';
import { modalFooterTokens } from '../../theme/components/modalFooter';

const Header = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track active section for navigation indicators
  const sectionIds = useMemo(() => navItems.map(item => item.target), []);
  const activeSection = useActiveSection(sectionIds, 0.4, '-10% 0px -50% 0px');
  
  const isFirstMount = React.useRef(true);
  
  const headerAnimation = useMemo(() => ({
    initial: isFirstMount.current ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 },
    animate: { y: 0, opacity: 1 },
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      delay: 0.2
    }
  }), []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Use modal footer glassmorphism tokens for consistency
  const glassTokens = useMemo(() => 
    mode === 'dark' 
      ? modalFooterTokens.footer.glassmorphic.dark
      : modalFooterTokens.footer.glassmorphic.light
  , [mode]);

  return (
    <motion.div
      initial={headerAnimation.initial}
      animate={headerAnimation.animate}
      transition={headerAnimation.transition}
      key="header-animation"
    >
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: glassTokens.background,
          backdropFilter: glassTokens.backdropFilter,
          WebkitBackdropFilter: glassTokens.WebkitBackdropFilter,
          transition: theme.transitions.create(
            ['border-bottom'],
            { duration: 0.3 }
          ),
          borderBottom: isScrolled 
            ? `1px solid ${theme.palette.divider}`
            : 'none',
          color: theme.palette.text.primary,
          width: '100vw',
          maxWidth: '100vw',
          left: 0,
        }}
      >
        <Container
          maxWidth={false}
          disableGutters={true}
          sx={{
            px: 0, // Remove all horizontal padding at the top level
            width: '100vw',
            maxWidth: '100vw',
            mx: 0,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <ScrollLink
                to="hero"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Box 
                  component="div" 
                  sx={{ 
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    letterSpacing: '-0.5px',
                    color: theme.palette.text.primary,
                    paddingLeft: { xs: '8px', sm: '12px', md: '8px', lg: '20px' },
                    transition: 'padding 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    <Box
                      component="img"
                      src="/favicon.svg"
                      alt="VG Logo"
                      sx={{
                        height: { xs: '24px', sm: '28px' },
                        width: { xs: '24px', sm: '28px' },
                        display: 'block'
                      }}
                    />
                  </motion.div>
                </Box>
              </ScrollLink>
              {/* Social icons OUTSIDE ScrollLink to avoid nested <a> */}
              {socialLinks.map(link => link.icon === 'LinkedIn' && (
                <IconButton
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  variant="glassmorphic"
                  size="medium"
                  aria-label={link.ariaLabel}
                >
                  <LinkedInIcon />
                </IconButton>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <NavLinks 
                navItems={navItems} 
                variant="desktop" 
                activeSection={activeSection}
                endSlot={<ThemeToggle mode={mode} onToggle={toggleTheme} />}
              />
              <Box 
                sx={{ 
                  mx: 2, 
                  px: 2.5, 
                  py: 0.75,
                  backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? theme.palette.background.subtle
                    : (theme.palette.background.subtle || 'rgba(0,0,0,0.03)'),
                  borderRadius: (theme) => theme.shape?.radius?.pill || 999,
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: theme.palette.primary.dark,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  WORK IN PROGRESS
                </Box>
              </Box>
              {/* ThemeToggle moved into NavLinks via endSlot */}
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            <Box 
              component="div" 
              sx={{ 
                fontWeight: 700,
                fontSize: '1.5rem',
                color: theme.palette.primary.main
              }}
            >
              <Box
                component="img"
                src="/favicon.svg"
                alt="VG Logo"
                sx={{
                  height: '28px',
                  width: '28px'
                }}
              />
            </Box>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            <NavLinks 
              navItems={navItems} 
              variant="mobile" 
              activeSection={activeSection} 
              onClick={handleDrawerToggle}
              endSlot={<ThemeToggle mode={mode} onToggle={toggleTheme} />}
            />
          </List>
        </Box>
      </Drawer>
    </motion.div>
  );
};

export default Header;
