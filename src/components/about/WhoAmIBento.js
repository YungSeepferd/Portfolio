import React from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import spacingTokens from '../../theme/spacing';
import SkillsBento from './SkillsBento';
import { designCompetencyItems } from './AboutData';

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
      key: 'philosophy',
      title: 'Design Philosophy',
      color: 'secondary',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          I aim for evidence‑based design that balances what people need, what the business wants, and what is realistic to build. Accessibility and inclusion are not add‑ons. They are the foundation. I try to keep things clear, calm, and easy to learn so people can use them with confidence.
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
          I started in Media Informatics and later focused on Human‑Computer Interaction. I mix research with hands‑on prototyping and front‑end code. I am also curious about audio and haptic interfaces. Over time, I began running workshops to help teams move from ideas to working solutions.
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
          Crafting intuitive and engaging user experiences through thoughtful design: UI/UX Design, Interaction Design, Wireframing, Prototyping, Visual Design, User Flows, Information Architecture.
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
          Uncovering user needs and validating design decisions through research: User Research, Usability Testing, A/B Testing, Heuristic Evaluation, User Interviews, Data Analysis, Thematic Analysis.
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
          Bringing designs to life with clean, accessible code: Frontend Development, Responsive Design, Design Systems, Accessibility, Mobile Development, Sensor Integration, Haptic Feedback.
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
          Designing immersive audio experiences and sound interactions: Sound Design, Audio Programming, Music Production, Interactive Audio, Spatial Audio, Signal Processing, Audio-Visual Integration.
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
          Empowering others through knowledge sharing and mentorship: Workshop Facilitation, Curriculum Development, Technical Instruction, Mentoring, Public Speaking, Knowledge Transfer, Documentation.
        </Typography>
      )
    },
    {
      key: 'project-management',
      title: 'Project Management',
      color: 'primary',
      colSpan: { xs: 1, sm: 1, md: 1 },
      rowSpan: { xs: 1, md: 1 },
      body: (
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1.5 }}>
          Leading projects from concept to successful delivery: Agile Methodologies, Scrum, Kanban, Team Leadership, Stakeholder Management, Requirements Gathering, Roadmapping.
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
          const [base, tone] = colorKey.split('.');
          const paletteColor = (theme.palette[base] && theme.palette[base][tone]) || theme.palette.primary.main;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={item.key}>
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
                  {item.title && (
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

      {/* Bottom rows - SkillsBento with icons and tags */}
      <SkillsBento items={designCompetencyItems} />
    </Box>
  );
};

export default WhoAmIBento;
