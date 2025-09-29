import React from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import spacingTokens from '../../theme/spacing';
import { motion } from 'framer-motion';

import WhoamiImage from '../../assets/images/About Me/Whoami.JPG';

const BioCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  overflow: 'visible',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  cursor: 'default',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));

const BioDescription = styled(Box)(({ theme }) => ({
  overflow: 'visible',
}));

const WhoAmIBento = () => {
  const theme = useTheme();

  const items = [
    // Row 1 - full-bleed image from Skills & Technology
    {
      key: 'skills-image',
      raw: true,
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Box sx={{ height: '100%', width: '100%', borderRadius: 0, overflow: 'hidden' }}>
          <Box
            component="img"
            src={WhoamiImage}
            alt="Skills & Technology"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      )
    },
    {
      key: 'philosophy',
      title: 'Design Philosophy',
      color: 'secondary',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          I practice evidence‑based design that balances user needs, business goals, and technical feasibility. Accessibility and inclusion are non‑negotiable; clarity, calmness, and learnability guide my decisions.
        </Typography>
      )
    },
    {
      key: 'background',
      title: 'Background',
      color: 'info',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Media Informatics → Human‑Computer Interaction. Blending research, prototyping, and front‑end craft with a strong audio/haptics interest and hands‑on workshop facilitation.
        </Typography>
      )
    },

    // Row 2
    {
      key: 'ai-automation',
      title: 'AI & Automation',
      color: 'info',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Box component="ul" sx={(t) => ({ pl: t.spacing(spacingTokens.content.listIndent), m: 0, mt: 1 })}>
          {['Local LLM APIs', 'n8n workflow automation'].map((t) => (
            <Typography key={t} component="li" variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {t}
            </Typography>
          ))}
        </Box>
      )
    },
    {
      key: 'hardware',
      title: 'Hardware & Prototyping',
      color: 'warning',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Box component="ul" sx={(t) => ({ pl: t.spacing(spacingTokens.content.listIndent), m: 0, mt: 1 })}>
          {['Arduino', 'Adafruit ItsyBitsy', 'Embedded (basics)', 'Physical prototyping'].map((t) => (
            <Typography key={t} component="li" variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {t}
            </Typography>
          ))}
        </Box>
      )
    },
    {
      key: 'collaboration',
      title: 'Collaboration',
      color: 'primary',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Team processes, documentation, and shared ownership. Clear roles, explicit handoffs, and calm comms.
        </Typography>
      )
    },

    // Row 3
    {
      key: 'research',
      title: 'Research Focus',
      color: 'success',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Box component="ul" sx={(theme) => ({ pl: theme.spacing(spacingTokens.content.listIndent), m: 0, mt: 1, columnCount: { xs: 1, md: 1 }, columnGap: theme.spacing(2) })}>
          {[
            'Contextual inquiry',
            'Semi‑structured interviews',
            'Thematic analysis',
            'Digital ethnography',
            'Expert review',
            'ATLAS.ti (AI‑assisted)'
          ].map((t) => (
            <Typography key={t} component="li" variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {t}
            </Typography>
          ))}
        </Box>
      )
    },
    {
      key: 'beyond',
      title: 'Beyond Work',
      color: 'secondary',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Electronic music, creative coding, and outdoors. Lifelong supporter of FC Schalke 04.
        </Typography>
      )
    },
    {
      key: 'improving',
      title: 'Currently Improving',
      color: 'info',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Box component="ul" sx={(t) => ({ pl: t.spacing(spacingTokens.content.listIndent), m: 0, mt: 1 })}>
          {['Golang', 'Analytical sketching'].map((t) => (
            <Typography key={t} component="li" variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {t}
            </Typography>
          ))}
        </Box>
      )
    },
  ];

  return (
    <Grid
      container
      rowSpacing={spacingTokens.bento.rowGap}
      columnSpacing={spacingTokens.bento.columnGap}
      sx={{ mt: 1, mb: 2, alignItems: 'stretch' }}
    >
      {items.map((item, idx) => {
        const color = item.color;
        return (
          <Grid item xs={12} sm={6} md={4} key={item.key} sx={{ display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              style={{ width: '100%', height: '100%' }}
            >
              {item.raw ? (
                item.body
              ) : (
                <BioCard sx={item.noBorder ? { border: 'none', height: '100%' } : { height: '100%' }}>
                  {item.title && (
                    <Typography
                      variant="overline"
                      sx={{ color: theme.palette[color].main, letterSpacing: 1, opacity: 0.9 }}
                    >
                      {item.title}
                    </Typography>
                  )}
                  <BioDescription>
                    {item.body}
                  </BioDescription>
                </BioCard>
              )}
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WhoAmIBento;
