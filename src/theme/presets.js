import themeSpacing from './spacing';
import typography from './typography';

const convertSpacingMap = (map = {}) => {
  return Object.entries(map).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'number' ? themeSpacing(value) : value;
    return acc;
  }, {});
};

const typographyMerge = (base = {}, overrides = {}) => ({
  ...base,
  ...overrides,
});

const TYPOGRAPHY_PRESETS = {
  heroTitle: (theme) => ({
    variant: 'h1',
    component: 'h1',
    sx: typographyMerge(typography.h1, {
      fontSize: {
        xs: typography.h2.fontSize,
        sm: '3.125rem',
        md: typography.h1.fontSize,
        lg: '4rem',
      },
      letterSpacing: typography.h1.letterSpacing ?? '-0.02em',
    }),
  }),
  heroSubtitle: (theme) => ({
    variant: 'h4',
    component: 'h2',
    sx: typographyMerge(typography.h4, {
      fontWeight: 500,
      color: theme.palette ? theme.palette.primary.main : undefined,
      fontSize: {
        xs: typography.subtitle1.fontSize,
        sm: typography.h6.fontSize,
        md: typography.h4.fontSize,
      },
    }),
  }),
  bodyLong: () => ({
    variant: 'body1',
    component: 'p',
    sx: typographyMerge(typography.body1, {
      lineHeight: 1.7,
    }),
  }),
  cardTitle: () => ({
    variant: 'h6',
    component: 'h3',
    sx: typographyMerge(typography.h6, {
      fontWeight: 600,
      lineHeight: 1.25,
      fontSize: {
        xs: '1.25rem',
        sm: '1.375rem',
        md: '1.5rem',
      },
    }),
  }),
  cardBody: () => ({
    variant: 'body2',
    component: 'p',
    sx: typographyMerge(typography.body2, {
      lineHeight: 1.5,
    }),
  }),
  sectionEyebrow: (theme) => ({
    variant: 'overline',
    component: 'span',
    sx: {
      display: 'block',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: theme.palette ? theme.palette.primary.main : undefined,
      fontSize: {
        xs: '1rem',
        md: '1.125rem',
      },
      mb: theme.spacing ? theme.spacing(1.5) : themeSpacing(1.5),
    },
  }),
  sectionTitle: (theme) => ({
    variant: 'h3',
    component: 'h3',
    sx: typographyMerge(typography.h3, {
      mb: theme.spacing ? theme.spacing(2) : themeSpacing(2),
      fontSize: {
        xs: '2.25rem',
        sm: '2.5rem',
        md: '2.75rem',
      },
    }),
  }),
  sectionSubtitle: (theme) => ({
    variant: 'subtitle1',
    component: 'p',
    sx: {
      ...typography.subtitle1,
      color: theme.palette ? theme.palette.text.secondary : undefined,
      maxWidth: theme.spacing ? theme.spacing(90) : '720px',
      mx: 'auto',
      lineHeight: 1.6,
    },
  }),
  overlayTitle: () => ({
    variant: 'h2',
    component: 'h1',
    sx: typographyMerge(typography.h2, {
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: {
        xs: '2rem',
        sm: '2.5rem',
        md: '3rem',
      },
    }),
  }),
  overlaySubtitle: () => ({
    variant: 'subtitle1',
    component: 'p',
    sx: typographyMerge(typography.subtitle1, {
      fontWeight: 400,
      fontSize: {
        xs: '1rem',
        sm: '1.1rem',
        md: '1.25rem',
      },
    }),
  }),
  eyebrow: () => ({
    variant: 'overline',
    component: 'span',
    sx: {
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  }),
  button: () => ({
    variant: 'button',
    component: 'span',
    sx: typography.button,
  }),
  buttonSmall: () => ({
    variant: 'button',
    component: 'span',
    sx: typographyMerge(typography.button, {
      fontSize: '0.8125rem',
    }),
  }),
  buttonCompact: () => ({
    variant: 'button',
    component: 'span',
    sx: typographyMerge(typography.button, {
      fontSize: '0.75rem',
      letterSpacing: '0.02em',
    }),
  }),
};

const SPACING_PRESETS = {
  pageHorizontal: () => ({
    px: convertSpacingMap(themeSpacing.pagePadding),
  }),
  sectionVertical: () => ({
    pt: themeSpacing(themeSpacing.section.paddingTop),
    pb: themeSpacing(themeSpacing.section.paddingBottom),
  }),
  sectionMargin: () => ({
    mt: themeSpacing(themeSpacing.section.marginTop),
    mb: themeSpacing(themeSpacing.section.marginBottom),
  }),
  cardContent: () => ({
    px: convertSpacingMap(themeSpacing.card.paddingX),
    py: convertSpacingMap(themeSpacing.card.paddingY),
    rowGap: themeSpacing(themeSpacing.card.gap),
  }),
  metaBar: () => ({
    px: convertSpacingMap(themeSpacing.pagePadding),
    py: convertSpacingMap({ xs: 1.5, md: 2 }),
    rowGap: themeSpacing(themeSpacing.card.gap),
    columnGap: themeSpacing(themeSpacing.card.gap),
  }),
  chipGroup: () => ({
    columnGap: themeSpacing(themeSpacing.card.gap),
    rowGap: themeSpacing(themeSpacing.content?.itemSpacing ?? 1.5),
  }),
  stackMedium: () => ({
    '& > * + *': {
      marginTop: themeSpacing(themeSpacing.content?.itemSpacing ?? 2),
    },
  }),
  stackLoose: () => ({
    '& > * + *': {
      marginTop: themeSpacing(themeSpacing.content?.sectionSpacing ?? 3),
    },
  }),
};

export const getTypographyPreset = (theme, key) => {
  const preset = TYPOGRAPHY_PRESETS[key];
  if (!preset) {
    throw new Error(`Unknown typography preset: ${key}`);
  }
  return preset(theme);
};

export const getSpacingPreset = (key) => {
  const preset = SPACING_PRESETS[key];
  if (!preset) {
    throw new Error(`Unknown spacing preset: ${key}`);
  }
  return preset();
};

export const typographyPresets = TYPOGRAPHY_PRESETS;
export const spacingPresets = SPACING_PRESETS;

export default {
  typographyPresets: TYPOGRAPHY_PRESETS,
  spacingPresets: SPACING_PRESETS,
};
