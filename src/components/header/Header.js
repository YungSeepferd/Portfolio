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

const Header = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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

  const transparentBgColor = mode === 'dark' 
    ? 'rgba(10, 22, 40, 0.7)'  
    : 'rgba(248, 250, 252, 0.7)';

  return (
    <motion.div
      initial={headerAnimation.initial}
      animate={headerAnimation.animate}
      transition={headerAnimation.transition}
      key="header-animation"
    >
      <AppBar 
        position="fixed" 
        elevation={isScrolled ? 4 : 0}
        sx={{
          backgroundColor: isScrolled 
            ? theme.palette.background.paper
            : transparentBgColor,
          transition: theme.transitions.create(
            ['background-color', 'box-shadow'],
            { duration: 0.3 }
          ),
          backdropFilter: 'blur(10px)',
          borderBottom: isScrolled 
            ? `1px solid ${theme.palette.divider}`
            : 'none',
          color: theme.palette.text.primary,
          width: '100%',
        }}
      >
        <Container
          maxWidth={false}
          disableGutters={true}
          sx={{
            px: { 
              xs: '20px',
              sm: '30px',
              md: '40px',
              lg: '50px',
            },
            width: '100%',
            mx: 0,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
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
                  fontSize: '1.5rem',
                  letterSpacing: '-0.5px',
                  color: theme.palette.text.primary,
                  paddingLeft: { xs: '8px', sm: '16px', md: '20px', lg: '32px' },
                  transition: 'padding 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5
                }}
              >
                Vincent Göke
                {socialLinks.map(link => link.icon === 'LinkedIn' && (
                  <IconButton
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    size="small"
                    sx={{
                      ml: 1,
                      color: theme.palette.secondary.dark,
                      backgroundColor: 'rgba(194,247,80,0.10)',
                      '&:hover': { backgroundColor: 'rgba(194,247,80,0.18)' },
                      p: 0.5
                    }}
                    aria-label={link.ariaLabel}
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                ))}
              </Box>
            </ScrollLink>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <NavLinks navItems={navItems} variant="desktop" />
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                <ThemeToggle mode={mode} onToggle={toggleTheme} />
              </Box>
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
              VG
            </Box>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            <NavLinks navItems={navItems} variant="mobile" onClick={handleDrawerToggle} />
          </List>
        </Box>
      </Drawer>
    </motion.div>
  );
};

export default Header;