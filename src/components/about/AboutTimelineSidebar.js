import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { experienceItems } from './AboutData';

// Education timeline data (antichronological sorting applied later)
const educationBase = [
  {
    title: 'M.Sc. HCI (AT)',
    range: '10/2022 – 02/2025',
    subtitle: 'Salzburg | FH Salzburg & PLUS',
  },
  {
    title: 'B.Sc. Media Informatics',
    range: '10/2018 – 02/2022',
    subtitle: 'LMU Munich',
  },
  {
    title: 'Diploma Audio Designer',
    range: '10/2017 – 03/2019',
    subtitle: 'DEUTSCHE POP, Munich',
  },
];

// Lightweight vertical timeline (no @mui/lab dependency)
// Props: type: 'experience' | 'education', sticky: boolean, compact: boolean, hideHeader: boolean, offsetTop?: number
const AboutTimelineSidebar = ({ type = 'experience', sticky = true, compact = false, hideHeader = false, offsetTop = null }) => {
  const theme = useTheme();

  const educationTimeline = educationBase;

  const parseRange = (range) => {
    if (!range) return { start: 0, end: 0 };
    const parts = range.split('–').map((s) => s.trim());
    const toNum = (mmYYYY) => {
      if (!mmYYYY || /present/i.test(mmYYYY)) return Number.MAX_SAFE_INTEGER;
      const [mm, yyyy] = mmYYYY.split('/').map((x) => x.trim());
      const m = parseInt(mm, 10) || 1;
      const y = parseInt(yyyy, 10) || 1970;
      return y * 100 + m; // comparable number
    };
    const start = toNum(parts[0]);
    const end = toNum(parts[1] || parts[0]);
    return { start, end };
  };

  const items = useMemo(() => {
    if (type === 'education') {
      return [...educationTimeline].sort((a, b) => parseRange(b.range).end - parseRange(a.range).end);
    }
    // experience
    const normalized = (experienceItems || []).map((e) => {
      const subtitle = e.subtitle || '';
      const hasPipe = subtitle.includes('|');
      const title = e.title;
      const where = hasPipe ? subtitle.split('|')[0].trim() : '';
      const isRangeLike = /\d{2}\/\d{4}/.test(subtitle) || /\s–\s/.test(subtitle);
      const range = hasPipe ? subtitle.split('|').pop().trim() : (isRangeLike ? subtitle.trim() : '');
      return { title, range, subtitle: where };
    });
    return normalized.sort((a, b) => parseRange(b.range).end - parseRange(a.range).end);
  }, [type, educationTimeline]);

  return (
    <Box
      aria-label={`${type} timeline`}
      sx={{
        display: { xs: 'none', md: 'block' },
        position: sticky ? 'sticky' : 'static',
        top: sticky ? (offsetTop !== null ? offsetTop : (theme.mixins?.toolbar?.minHeight || theme.spacing(8))) : 'auto',
        alignSelf: sticky ? 'start' : 'auto',
        pl: 2,
        minWidth: 0,
      }}
    >
      {!hideHeader && (
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          {type === 'education' ? 'Education Timeline' : 'Experience Timeline'}
        </Typography>
      )}
      <Box
        sx={{
          position: 'relative',
          mt: 1,
          ml: 1.5,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: theme.palette.divider,
          },
        }}
      >
        {items.map((item, idx) => (
          <Box key={`${item.title}-${idx}`} sx={{ position: 'relative', pl: 3, pb: 1.5 }}>
            <Box
              sx={{
                position: 'absolute',
                left: '-5px',
                top: '4px',
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main,
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {item.range || '—'}
            </Typography>
            {!compact && (
              <>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {item.title}
                </Typography>
                {item.subtitle && (
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {item.subtitle}
                  </Typography>
                )}
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AboutTimelineSidebar;
