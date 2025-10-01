import React from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import spacingTokens from '../../theme/spacing';
// Removed SkillsBento in WhoAmI to avoid redundancy with narrative boxes

import WhoamiImage from '../../assets/images/About Me/Whoami.JPG';

const WhoAmIBento = () => {
  const theme = useTheme();
  
  const getBgGradient = (colorKey) => {
    const gradientMap = {
      'primary.main': 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.2) 100%)',
      'secondary.main': 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.2) 100%)',
      'info.main': 'linear-gradient(135deg, rgba(3, 169, 244, 0.1) 0%, rgba(3, 169, 244, 0.2) 100%)',
      'warning.main': 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.2) 100%)',
      'success.main': 'linear-gradient(135deg, rgba(67, 160, 71, 0.1) 0%, rgba(67, 160, 71, 0.2) 100%)',
    };
    return gradientMap[colorKey] || gradientMap['primary.main'];
  };

  const items = [
    // Row 1
    {
      key: 'skills-image',
      raw: true,
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Box sx={{ height: '100%', width: '100%', borderRadius: 2, overflow: 'hidden' }}>
          <Box
            component="img"
            src={WhoamiImage}
            alt="Vincent Göke"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      )
    },
    {
      key: 'intro',
      title: 'Introduction',
      color: 'text.primary',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5, mb: 2 }}>
            Research-driven design grounded in evidence. I balance user needs with technical constraints through systematic inquiry—contextual interviews, usability testing, and thematic analysis. Accessibility is foundational, not optional. My work prioritizes clarity and calm interaction patterns that build user confidence through consistent, well-tested design systems.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 0 }}>
            B.Sc. Media Informatics (LMU Munich), M.Sc. Human-Computer Interaction (FH Salzburg). Specialized in multimodal interaction design through two thesis projects: autonomous vehicle passenger interfaces and affective haptic prototyping methodologies. Currently exploring LLM integration for design workflows and teaching analytical sketching at Taipei Tech.
          </Typography>
        </>
      )
    },
    {
      key: 'beyond-work',
      title: 'Beyond Work',
      color: 'text.primary',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Outside of design, I explore electronic music production and creative coding projects. I enjoy cooking, gaming, and supporting FC Schalke 04. These interests fuel my creativity and keep me curious about new forms of interaction and expression.
        </Typography>
      )
    },

    // Row 2 - Core Competencies from Skills & Technologies
    {
      key: 'design',
      title: 'Design',
      color: 'info',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Systems-focused interaction design. Rapid prototyping from wireframes to high-fidelity mockups in Figma. Design system development with attention to component reusability and front-end handoff. Information architecture informed by card sorting and tree testing.
        </Typography>
      )
    },
    {
      key: 'research',
      title: 'Research',
      color: 'success',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Methodical user research. SUS and STS-AD evaluation, semi-structured interviews, diary studies, contextual inquiry. ATLAS.ti for AI-assisted thematic analysis. Workshop facilitation for participatory design. Literature review and systematic comparison of interaction patterns.
        </Typography>
      )
    },
    {
      key: 'development',
      title: 'Development',
      color: 'warning',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Frontend implementation with React, TypeScript, and Three.js. Responsive layouts with Material UI. WCAG accessibility standards. Hardware prototyping with Arduino for embedded systems. On-body haptic actuators (ERM/LRA/VC) and audio-to-haptic mapping.
        </Typography>
      )
    },

    // Row 3 - Continued Core Competencies
    {
      key: 'audio',
      title: 'Audio',
      color: 'secondary',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Audio design and engineering since 2015. Procedural audio systems with Tone.js and RNBO. Postproduction for streaming publications. Music production in Ableton Live and Logic Pro. Signal processing for interactive installations and procedurally generated relaxation feedback.
        </Typography>
      )
    },
    {
      key: 'teaching',
      title: 'Teaching',
      color: 'info',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Workshop design and facilitation for design teams. Developed modular toolkit for teaching novice designers haptic prototyping. Educational UX work at MM-Mental Motions—curriculum templates, interactive workbook PDFs, video editing, teaching stack standardization.
        </Typography>
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
          Cross-functional teamwork with developers, stakeholders, and researchers. Clear handoff documentation. Asana for task management. Preference for calm, structured communication. Co-winning Tourism Tech Festival Hackathon (first place, Mastercard challenge) demonstrated collaborative execution under tight constraints.
        </Typography>
      )
    },
  ];

  return (
    <Box>
      {/* Top row - Image and description boxes */}
      <Grid container rowSpacing={spacingTokens.bento.rowGap} columnSpacing={spacingTokens.bento.columnGap} sx={{ mt: 3, mb: 4 }}>
        {items.slice(0, 3).map((item, idx) => {
          const colorKey = `${item.color}.main`;
          const bgGradient = getBgGradient(colorKey);
          
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.key}>
              {item.raw ? (
                <Box sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
                  {item.body}
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 'auto',
                    backgroundColor: 'rgba(245, 245, 245, 0.6)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    },
                    transition: theme.transitions.create(['transform', 'box-shadow'], {
                      duration: theme.transitions.duration.standard,
                    }),
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: bgGradient,
                      opacity: 0.3,
                      transition: 'opacity 0.3s ease-in-out',
                      zIndex: 0,
                    },
                    '& > *': {
                      position: 'relative',
                      zIndex: 1,
                    }
                  }}
                >
                  {item.icon && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: `${colorKey}20`,
                          color: colorKey,
                          mr: 2,
                          flexShrink: 0
                        }}
                      >
                        <item.icon />
                      </Box>
                      {item.title && (
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {item.title}
                        </Typography>
                      )}
                    </Box>
                  )}
                  {!item.icon && item.title && (
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                      {item.title}
                    </Typography>
                  )}
                  <Box>
                    {item.body}
                  </Box>
                </Box>
              )}
            </Grid>
          );
        })}
      </Grid>

      {/* Skills chips removed in WhoAmI to avoid duplication; see Skills & Technology tab for detailed chips. */}
    </Box>
  );
};

export default WhoAmIBento;
