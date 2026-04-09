import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import spacingTokens from '../../theme/spacing';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const EducationBento = () => {
  const theme = useTheme();
  
  const educationItems = [
    {
      title: 'M.Sc. in Engineering — Human-Computer Interaction',
      subtitle: '(Joint) Paris-Lodron University Salzburg & FH Salzburg, AT | 10/2022 – 02/2025',
      description: (
        <>
          <Box component="span" sx={{ fontWeight: 700 }}>Thesis:</Box> Prototyping Emotions — A Modular Methodological Workshop Toolkit for Teaching Novice Interaction Designers the Creation of Low‑Fidelity Single‑Modal On‑Body Affective Haptic Prototypes in Tandem Teams.
        </>
      ),
      link: 'https://www.fh-salzburg.ac.at/studium/ct/human-computer-interaction-joint-master',
      modules: [
        'HCI Theory & Paradigms; Foundations of HCI Methodologies',
        'Applied Prototyping Skills for HCI',
        'Human Factors & Design Principles; Experience Engineering Methods',
        'Interaction Design; Design Thinking for Digital Innovation',
        'Ethics & Sustainability; Diversity & Intercultural Aspects; Societal & Legal Aspects in HCI',
        'Contextual Analysis & Capturing; Contextual Interaction Design',
        'Interaction Approaches & Technologies',
        'Research Trends in HCI; HCI Related Disciplines; HCI Research Project',
        'Advanced Contextual Interfaces; Complex Interactive Systems',
        'Design of Innovative Interactions; Impacts of Future Technologies',
        'User Experience in Practice; Experience Leadership & Innovation Management; HCI Industry Project',
      ],
      highlights: [
        'Exchange Semester (WS24/25) at Taipei Tech (NTUT)',
        'Analytical Sketching course (principles of interaction design)',
        'Traditional Mandarin A1 (7 hrs/week)'
      ],
      icon: SchoolIcon,
      color: 'primary.main',
      gridArea: 'master',
      bgImage: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.2) 100%)'
    },
    {
      title: 'B.Sc. — Media Informatics (HMI)',
      subtitle: 'Ludwig‑Maximilians‑Universität (LMU), Munich, DE | 10/2018 – 02/2022',
      description: (
        <>
          <Box component="span" sx={{ fontWeight: 700 }}>Thesis:</Box> Passenger Reroute: Phone‑Based Intervention in Self‑Driving Cars.
        </>
      ),
      courses: [
        // UX & design
        'Interaction Design',
        'User Experience II (Human Factors in Engineering)',
        'Concept Development',
        // Quant & research
        'Statistics 1 for Media Informatics',
        'Participation in User Studies (Practical Training)',
        // Web & programming
        'Web Design 1–3 (VHB)',
        'Multimedia Programming',
        'Algorithms & Data Structures',
        // Systems
        'Operating Systems',
        'Practical Course Operating Systems',
        'Computer Architecture',
        'Computer Networks & Distributed Systems',
        'Database Systems',
        'IT Security',
        // Media & graphics
        'Digital Media',
        'Media Technology',
        'Computer Graphics',
        // Theory & analysis
        'Theoretical CS & Linear Algebra',
        'Analysis for Computer Scientists',
        // Seminar
        'Seminar in Media Informatics',
      ],
      highlights: [
        'Seminar paper: Approaches to meditative VR experiences with breathwork biofeedback and spatial audio for mindfulness practices',
      ],
      link: 'https://www.ifi.lmu.de/studium/studienverlauf/modulzuordnungen/medieninfo_mci/medba2022mmi/index.html',
      icon: MenuBookIcon,
      color: 'secondary.main',
      gridArea: 'bachelor',
      bgImage: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.2) 100%)'
    },
    {
      title: 'Diploma “Audio Designer”',
      subtitle: 'music support group GmbH / DEUTSCHE POP, Munich, DE | 10/2017 – 03/2019',
      description: 'Audio Design & Engineering with a focus on studio workflows, sound design, and music production.',
      audioCourses: [
        'Music Assistant (10/2017 – 03/2018, 94%)',
        'Sound Assistant (10/2017 – 03/2018, 89%)',
        'Audio Engineer (04/2018 – 09/2018, 86%)',
        'Beat Designer (04/2018 – 09/2018, 94%)',
        'Technical Tonmeister (10/2018 – 03/2019, 88%)',
        'Music Designer (10/2018 – 03/2019, 97%)'
      ],
      competencies: [
        'Studio recording workflows and microphone techniques',
        'Editing, mixing, and critical listening fundamentals',
        'Beat production and sound synthesis basics',
        'Session management and technical operations',
        'DAW proficiency: Ableton Live, Logic Pro, Pro Tools'
      ],
      icon: AutoStoriesIcon,
      color: 'success.main',
      gridArea: 'diploma',
      bgImage: 'linear-gradient(135deg, rgba(67, 160, 71, 0.1) 0%, rgba(67, 160, 71, 0.2) 100%)'
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.about.gridGap, width: '100%', mt: 3, mb: 4 }}>
      {educationItems.map((item, idx) => {
        const { title, subtitle, description, link, courses, modules, highlights, audioCourses, competencies, icon: Icon, color, gridArea, bgImage } = item;
        const anchorId = `edu-item-${idx}`;
        const hasPipe = typeof subtitle === 'string' && subtitle.includes('|');
        const rangeLabel = hasPipe ? subtitle.split('|').pop().trim() : '';
        return (
        <Box
          key={title}
          sx={{
            gridArea,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '180px 1fr', lg: '220px 1fr' },
            columnGap: 2,
          }}
        >
          {/* Timeline gutter (separate from card) */}
          <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' }, pt: 1 }}>
            {/* Range label */}
            <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'right', display: 'block', pr: 3 }}>
              {rangeLabel || ' '}
            </Typography>
            {/* Connectors and dot */}
            {idx > 0 && (
              <Box aria-hidden sx={(t) => ({ position: 'absolute', left: 'calc(100% - 10px)', top: `calc(-${t.spacing(spacingTokens.about.gridGap / 2)})`, height: `calc(18px + ${t.spacing(spacingTokens.about.gridGap / 2)})`, width: '2px', bgcolor: t.palette.divider })} />
            )}
            <Box
              role="button"
              aria-label={`Jump to ${title}`}
              tabIndex={0}
              onClick={() => { const el = document.getElementById(anchorId); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { const el = document.getElementById(anchorId); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}
              sx={{
                position: 'absolute',
                left: 'calc(100% - 10px)',
                top: '18px',
                width: 12,
                height: 12,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                bgcolor: theme.palette.primary.main,
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                cursor: 'pointer',
                zIndex: 2,
                '&:hover': { boxShadow: `0 0 0 3px ${theme.palette.primary.light}` },
              }}
            />
            {idx < educationItems.length - 1 && (
              <Box aria-hidden sx={(t) => ({ position: 'absolute', left: 'calc(100% - 10px)', top: '24px', height: `calc(100% - 24px + ${t.spacing(spacingTokens.about.gridGap / 2)})`, width: '2px', bgcolor: t.palette.divider })} />
            )}
          </Box>

          {/* Card content */}
          <Box
            id={anchorId}
            sx={{
              p: 3,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
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
                background: bgImage,
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: `${color}20`,
                color: color,
                mr: 2,
                flexShrink: 0
              }}
            >
              <Icon />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>{title}</Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1 }}>
            {description}
          </Typography>
          {Boolean(link) && (
            <Typography 
              variant="body2" 
              component="a" 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}
            >
              Program page ↗
            </Typography>
          )}
          {/* Subtle link to related project in Work section (by slug) */}
          {(title?.includes('M.Sc.') || title?.includes('B.Sc.')) && (
            <Box sx={{ mt: 0.75 }}>
              <Typography
                variant="body2"
                component="a"
                href="#work"
                sx={{ color: 'text.secondary', textDecoration: 'none', fontStyle: 'italic' }}
              >
                See project →
              </Typography>
            </Box>
          )}
          {Array.isArray(modules) && modules.length > 0 && (
            <Box sx={{ mt: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Selected courses
              </Typography>
              <Box component="ul" sx={(theme) => ({ pl: 2.5, m: 0, columnCount: { xs: 1, md: 2 }, columnGap: theme.spacing(2) })}>
                {modules.slice(0, 8).map((m) => (
                  <Typography key={m} component="li" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                    {m}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          {Array.isArray(courses) && courses.length > 0 && (
            <Box sx={{ mt: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Selected courses
              </Typography>
              <Box component="ul" sx={(theme) => ({ pl: 2.5, m: 0, columnCount: { xs: 1, md: 2 }, columnGap: theme.spacing(2) })}>
                {courses.map((c) => (
                  <Typography key={c} component="li" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                    {c}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          {Array.isArray(highlights) && highlights.length > 0 && (
            <Box sx={{ mt: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Highlights
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                {highlights.map((h, i) => (
                  <Typography key={`${title}-hl-${i}`} component="li" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {/* Master-specific related WIP paper subtle link */}
              {title?.includes('M.Sc.') && (
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 0.75 }}>
                  Related: Work-in-Progress paper (EuroHaptics 2024)
                  {' '}
                  <Box
                    component="a"
                    href="#work"
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    see project →
                  </Box>
                </Typography>
              )}
            </Box>
          )}
          {Array.isArray(competencies) && competencies.length > 0 && (
            <Box sx={{ mt: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Competencies
              </Typography>
              <Box component="ul" sx={(theme) => ({ pl: 2.5, m: 0, columnCount: { xs: 1, md: 2 }, columnGap: theme.spacing(2) })}>
                {competencies.map((c) => (
                  <Typography key={c} component="li" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                    {c}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          {Array.isArray(audioCourses) && audioCourses.length > 0 && (
            <Box sx={{ mt: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Diploma courses
              </Typography>
              <Box component="ul" sx={(theme) => ({ pl: 2.5, m: 0, columnCount: { xs: 1, md: 2 }, columnGap: theme.spacing(2) })}>
                {audioCourses.map((c) => (
                  <Typography key={c} component="li" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                    {c}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          
          </Box>
        </Box>
        );
      })}
    </Box>
  );
}

export default EducationBento;
