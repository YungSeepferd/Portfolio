import React from 'react';
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
import { getTypographyPreset, getSpacingPreset } from '../../../theme/presets';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * ChallengeSolutionMatrixSection
 *
 * Renders paired Challenge → Solution rows from a flat items array.
 * Auto-pairs items by scanning for alternating subtitles: "Challenge" then "Solution".
 * Uses projectColor shades for accents; avoids hard-coded error/success colors.
 */
const ChallengeSolutionMatrixSection = ({
  id,
  title,
  items = [],
  content,
  sectionNumber,
  sectionIndex,
  projectColor = 'primary',
}) => {
  const theme = useTheme();
  const eyebrowPreset = getTypographyPreset(theme, 'sectionEyebrow');
  const titlePreset = getTypographyPreset(theme, 'sectionTitle');

  // Format section number
  const formattedNumber = sectionNumber
    ? (typeof sectionNumber === 'number' ? sectionNumber.toString().padStart(2, '0') : sectionNumber)
    : (typeof sectionIndex === 'number' ? (sectionIndex + 1).toString().padStart(2, '0') : null);

  const accent = theme.palette[projectColor] || theme.palette.primary;
  const horizontal = getSpacingPreset('pageHorizontal');
  const accentMain = accent.main;
  const accentLight = accent.light || accent.main;
  const accentDark = accent.dark || accent.main;

  // Pair items: Challenge followed by Solution
  const pairs = [];
  if (Array.isArray(items)) {
    let i = 0;
    while (i < items.length) {
      const ch = items[i];
      const isChallenge = typeof ch?.subtitle === 'string' && /challenge/i.test(ch.subtitle);
      const next = items[i + 1];
      const isSolution = typeof next?.subtitle === 'string' && /solution/i.test(next.subtitle);
      if (isChallenge && isSolution) {
        pairs.push([ch, next]);
        i += 2;
      } else {
        // Fallback: attempt best-effort pairing
        if (isChallenge) {
          // Find next solution
          const j = items.slice(i + 1).findIndex((it) => typeof it?.subtitle === 'string' && /solution/i.test(it.subtitle));
          if (j !== -1) {
            const idx = i + 1 + j;
            pairs.push([ch, items[idx]]);
            // Skip solution item; continue after it
            i = idx + 1;
            continue;
          }
        }
        // If cannot pair, push as single challenge row; render only left cell
        pairs.push([ch, undefined]);
        i += 1;
      }
    }
  }

  const renderCard = (item, kind /* 'challenge' | 'solution' */) => {
    if (!item) return null;
    const isSolution = kind === 'solution';
    const bg = alpha(isSolution ? accentLight : accentMain, isSolution ? 0.10 : 0.08);
    const border = alpha(accentMain, isSolution ? 0.35 : 0.25);

    return (
      <Card
        elevation={0}
        sx={{
          height: '100%',
          borderRadius: 2,
          backgroundColor: bg,
          border: `1px solid ${border}`,
          transition: theme.transitions.create(['transform', 'box-shadow'], {
            duration: theme.transitions.duration.standard,
          }),
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
            {item.icon && (
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: alpha(accentMain, 0.15),
                  color: accentDark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}
                aria-hidden
              >
                {item.icon}
              </Box>
            )}
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {item.title}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              backgroundColor: alpha(accentMain, isSolution ? 0.20 : 0.12),
              color: accentDark,
              border: `1px solid ${alpha(accentMain, 0.35)}`,
              fontSize: '0.75rem',
              fontWeight: 600,
              mb: 1.5,
            }}
          >
            {isSolution ? 'Solution' : 'Challenge'}
          </Box>

          {item.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: item.features?.length ? 1.25 : 0 }}>
              {item.description}
            </Typography>
          )}

          {Array.isArray(item.features) && item.features.length > 0 && (
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {item.features.map((f, idx) => (
                <Typography key={idx} component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {f}
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box id={id} sx={{ scrollMarginTop: theme.spacing(10), mb: 8, maxWidth: '1200px', mx: 'auto', px: horizontal.px }}>
      {/* Section Header */}
      <Box sx={{ mb: 3 }}>
        {formattedNumber && (
          <Typography
            variant={eyebrowPreset.variant}
            component={eyebrowPreset.component}
            sx={{
              ...eyebrowPreset.sx,
              color: theme.palette[projectColor]?.main || theme.palette.primary.main,
              fontWeight: 700,
            }}
          >
            {formattedNumber}
          </Typography>
        )}
        {title && (
          <Typography variant={titlePreset.variant} component={titlePreset.component} sx={{ ...titlePreset.sx, scrollMarginTop: '80px' }}>
            {title}
          </Typography>
        )}
        {content && (
          <Box sx={{ mt: 1.5 }}>
            {typeof content === 'string' ? (
              <Typography variant="body1">{content}</Typography>
            ) : (
              content
            )}
          </Box>
        )}
      </Box>

      {/* Matrix rows */}
      <Grid container spacing={2}>
        {pairs.map(([challenge, solution], idx) => (
          <React.Fragment key={idx}>
            <Grid size={{ xs: 12, md: 5 }}>
              {renderCard(challenge, 'challenge')}
            </Grid>

            {/* Arrow indicator on md+ */}
            <Grid size={{ xs: 12, md: 2 }} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
              <ArrowForwardIcon sx={{ color: alpha(accentMain, 0.6), fontSize: 28 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              {renderCard(solution, 'solution')}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default ChallengeSolutionMatrixSection;
