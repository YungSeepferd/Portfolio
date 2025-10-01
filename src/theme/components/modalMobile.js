/**
 * Mobile Modal Design Tokens
 * 
 * Mobile-specific tokens for optimizing project modal UX on small screens
 * Addresses information density, touch targets, and content readability
 */

export const modalMobileTokens = {
  hero: {
    maxHeight: { xs: 350, sm: 450, md: 520 },
    padding: { xs: 3, sm: 4 },
    titleSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
    descriptionSize: { xs: '0.875rem', sm: '1rem' },
  },
  techChips: {
    // Horizontal scroll on mobile, wrap on tablet+
    layout: { xs: 'horizontal-scroll', sm: 'wrap' },
    containerPadding: { xs: 0, sm: 0 },
    gap: { xs: 0.75, sm: 1, md: 1.5 },
    chip: {
      size: { xs: 26, sm: 30, md: 32 },
      fontSize: { xs: '0.6875rem', sm: '0.8125rem', md: '0.875rem' },
      padding: { xs: '4px 10px', sm: '6px 14px', md: '8px 16px' },
      iconSize: { xs: 14, sm: 16, md: 18 },
      flexShrink: { xs: 0, sm: 1 }, // Prevent shrinking on mobile scroll
      maxWidth: { xs: 140, sm: 180, md: 'none' }, // Prevent overly long chips
    },
  },
  actionButtons: {
    maxVisible: { xs: 2, sm: 3, md: 6 }, // Limit visible buttons on mobile
    height: { xs: 40, sm: 44, md: 48 },
    minHeight: { xs: 40, sm: 44, md: 48 }, // Ensure consistent touch targets
    fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' },
    padding: { xs: '8px 14px', sm: '10px 18px', md: '12px 24px' },
    layout: { xs: 'column', sm: 'row', md: 'row' },
    gap: { xs: 1, sm: 1.25, md: 1.5 },
    iconSize: { xs: 18, sm: 20, md: 22 },
    // Split button pattern
    primaryVariant: 'contained',
    secondaryVariant: 'outlined',
    // Dropdown menu
    menuElevation: 8,
    menuMinWidth: 200,
    moreButton: {
      variant: 'text',
      size: 'small',
    },
  },
  content: {
    padding: { xs: 3, sm: 4, md: 5 }, // Increased from default 2/3/4
    lineHeight: { xs: 1.7, sm: 1.6 },
    sectionGap: { xs: 4, sm: 5, md: 6 },
    maxWidth: { xs: '100%', sm: '100%', md: 900 }, // Limit line length
    typography: {
      h3: {
        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
        marginBottom: { xs: 2, sm: 2.5 },
        marginTop: { xs: 4, sm: 5 },
      },
      body1: {
        fontSize: { xs: '0.9375rem', sm: '1rem' },
        lineHeight: { xs: 1.7, sm: 1.6 },
        marginBottom: { xs: 2, sm: 2 },
      },
    },
  },
  gallery: {
    controlSize: { xs: 44, sm: 48 }, // Minimum touch target
    controlPosition: { xs: 'bottom', sm: 'overlay' }, // Bottom on mobile, overlay on desktop
    swipeEnabled: { xs: true, sm: false },
    indicatorSize: { xs: 8, sm: 10 },
    spacing: { xs: 2, sm: 3 },
  },
  footer: {
    autoHide: { xs: true, sm: false }, // Auto-hide on mobile scroll
    toggleSize: { xs: 40, sm: 36 }, // Larger on mobile for better touch
    minHeight: { xs: 72, sm: 80 },
  },
  divider: {
    spacing: { xs: 3, sm: 4, md: 5 },
    thickness: { xs: 1, sm: 1 },
  },
};

export default modalMobileTokens;
