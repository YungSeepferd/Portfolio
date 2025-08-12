import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Link, Stack, useTheme } from '@mui/material';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('cookieConsent');
    if (!consentStatus) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    window.dispatchEvent(new Event('cookieConsentAccepted'));
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    window.dispatchEvent(new Event('cookieConsentDeclined'));
  };

  if (!showBanner) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.snackbar,
        p: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '4px 4px 0 0',
      }}
    >
      <Box maxWidth="lg" mx="auto">
        <Stack spacing={2}>
          <Typography variant="body1">
            This website uses cookies to enhance your browsing experience and analyze site traffic.
            By accepting, you consent to our use of cookies for these purposes. Read our{' '}
            <Link href="/privacy-policy" target="_blank" rel="noopener">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/cookie-policy" target="_blank" rel="noopener">
              Cookie Policy
            </Link>{' '}
            to learn more.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={handleDecline}
              sx={{ color: theme.palette.text.primary }}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              onClick={handleAccept}
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              Accept
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CookieConsent;
