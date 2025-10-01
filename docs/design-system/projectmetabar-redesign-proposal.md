# ProjectMetaBar Redesign Proposal

**Date**: September 30, 2025  
**Component**: `ProjectMetaBar.js`, `TechnologyTags.js`, `ProjectActionButtons.js`  
**Goal**: Modernize presentation of technology tags and action buttons using MUI best practices

---

## Current State Analysis

### Component Structure
```
ProjectMetaBar
├── TechnologyTags (via TechBar wrapper)
│   └── SkillTag chips with icons
└── ProjectActionButtons
    └── Glassmorphic buttons in Stack
```

### Current Issues

#### 1. **Technology Tags Layout**
- **Problem**: Wrapping grid layout creates uneven rows on mobile
- **Impact**: Horizontal scroll on mobile, poor space utilization
- **Current**: 2x2 grid with icons, 100px × 32px chips
- **Mobile tokens**: Already defined but not fully leveraged

#### 2. **Action Buttons Density**
- **Problem**: All buttons displayed vertically on mobile (column layout)
- **Impact**: 280px+ vertical space for 5+ buttons
- **Current**: Full-width glassmorphic buttons, 40-48px height each
- **Accessibility**: Good touch targets (44px+) but excessive space usage

#### 3. **Visual Hierarchy**
- **Problem**: Equal visual weight for all technologies and actions
- **Impact**: No clear primary/secondary distinction
- **Current**: All chips same size, all buttons same prominence

#### 4. **Responsive Behavior**
- **Problem**: Layout changes abruptly at breakpoints
- **Impact**: Inconsistent experience across devices
- **Current**: Column on mobile, row on desktop (hard switch)

---

## MUI Best Practices Research

### From MUI Documentation

#### **Chip Component Patterns**
1. **Horizontal Scroll Container** (recommended for mobile)
   ```jsx
   <Box sx={{ 
     display: 'flex', 
     overflowX: 'auto',
     gap: 1,
     '&::-webkit-scrollbar': { display: 'none' }
   }}>
     {items.map(item => <Chip key={item} label={item} />)}
   </Box>
   ```

2. **Chip Array with Deletable/Clickable**
   - Use `onClick` for interactive chips
   - Use `variant="outlined"` for secondary emphasis
   - Use `size="small"` for compact displays

3. **Color Semantic Meaning**
   - `color="primary"` for main technologies
   - `color="secondary"` for supporting tools
   - `color="default"` for generic tags

#### **Button Group Patterns**
1. **Contained Button Group** (for related actions)
   ```jsx
   <ButtonGroup variant="contained" size="small">
     <Button>Primary</Button>
     <Button>Secondary</Button>
   </ButtonGroup>
   ```

2. **Split Button** (primary + dropdown)
   - Main action + menu for additional options
   - Reduces visible button count

3. **Toggle Button Group** (for mutually exclusive options)
   - Not applicable here but good pattern to know

#### **Stack Component Best Practices**
1. **Responsive Direction**
   ```jsx
   <Stack 
     direction={{ xs: 'column', sm: 'row' }}
     spacing={{ xs: 1, sm: 2 }}
     useFlexGap
   >
   ```

2. **Flex Gap** (modern approach)
   - Use `useFlexGap` prop for better wrapping behavior
   - Avoids margin collapse issues

3. **Divider Integration**
   ```jsx
   <Stack divider={<Divider orientation="vertical" flexItem />}>
   ```

---

## Redesign Proposal

### Option A: Chip Carousel + Button Group (Recommended)

#### **Visual Concept**
```
┌─────────────────────────────────────────────┐
│ [Figma] [Miro] [Arduino] [Unity] → scroll  │  ← Horizontal scroll chips
├─────────────────────────────────────────────┤
│ [View Demo ▼] [GitHub]                     │  ← Primary + dropdown
└─────────────────────────────────────────────┘
```

#### **Implementation**

**Technology Tags** (Horizontal Scroll)
```jsx
<Box
  sx={{
    display: 'flex',
    overflowX: 'auto',
    gap: { xs: 0.75, sm: 1, md: 1.5 },
    pb: 1,
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  }}
>
  {technologies.map((tech, index) => (
    <Chip
      key={tech}
      label={tech}
      icon={getTechIcon(tech)}
      size="small"
      color={index === 0 ? 'primary' : 'default'}
      variant={index === 0 ? 'filled' : 'outlined'}
      sx={{
        flexShrink: 0,
        height: { xs: 26, sm: 30, md: 32 },
        fontSize: { xs: '0.6875rem', sm: '0.8125rem', md: '0.875rem' },
        maxWidth: { xs: 140, sm: 180, md: 'none' },
        '& .MuiChip-icon': {
          fontSize: { xs: 14, sm: 16, md: 18 },
        },
      }}
    />
  ))}
</Box>
```

**Action Buttons** (Split Button Pattern)
```jsx
<Stack 
  direction={{ xs: 'column', sm: 'row' }} 
  spacing={1}
  useFlexGap
>
  {/* Primary Action */}
  <ButtonGroup variant="contained" size="small">
    <Button
      onClick={handlePrimaryAction}
      startIcon={<LaunchIcon />}
    >
      {primaryAction.label}
    </Button>
    {secondaryActions.length > 0 && (
      <Button
        size="small"
        onClick={handleMenuOpen}
        sx={{ px: 1 }}
      >
        <ArrowDropDownIcon />
      </Button>
    )}
  </ButtonGroup>

  {/* Secondary Visible Actions */}
  {visibleSecondaryActions.map(action => (
    <Button
      key={action.label}
      variant="outlined"
      size="small"
      startIcon={action.icon}
      onClick={action.onClick}
    >
      {action.label}
    </Button>
  ))}
</Stack>

{/* Dropdown Menu for Additional Actions */}
<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>
  {secondaryActions.map(action => (
    <MenuItem key={action.label} onClick={action.onClick}>
      <ListItemIcon>{action.icon}</ListItemIcon>
      <ListItemText>{action.label}</ListItemText>
    </MenuItem>
  ))}
</Menu>
```

#### **Advantages**
- ✅ Reduces vertical space by 40-50%
- ✅ Maintains all functionality (no hidden features)
- ✅ Better mobile experience (horizontal scroll is natural)
- ✅ Clear visual hierarchy (primary vs secondary actions)
- ✅ Follows MUI design patterns
- ✅ Leverages existing `modalMobileTokens`

#### **Disadvantages**
- ⚠️ Requires menu state management
- ⚠️ Slightly more complex implementation
- ⚠️ Users must discover dropdown for additional actions

---

### Option B: Compact Chip Grid + Icon Buttons

#### **Visual Concept**
```
┌─────────────────────────────────────────────┐
│ Figma · Miro · Arduino · Unity · C# · ...  │  ← Inline text chips
├─────────────────────────────────────────────┤
│ [🚀] [📄] [💻] [🔗]                         │  ← Icon-only buttons
└─────────────────────────────────────────────┘
```

#### **Implementation**

**Technology Tags** (Inline Text)
```jsx
<Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
    alignItems: 'center',
  }}
>
  {technologies.map((tech, index) => (
    <React.Fragment key={tech}>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '0.75rem', sm: '0.8125rem' },
          fontWeight: index === 0 ? 600 : 400,
        }}
      >
        {tech}
      </Typography>
      {index < technologies.length - 1 && (
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          ·
        </Typography>
      )}
    </React.Fragment>
  ))}
</Box>
```

**Action Buttons** (Icon Buttons)
```jsx
<Stack direction="row" spacing={1}>
  {actions.slice(0, 4).map(action => (
    <Tooltip key={action.label} title={action.label}>
      <IconButton
        size="small"
        onClick={action.onClick}
        sx={{
          bgcolor: 'action.hover',
          '&:hover': { bgcolor: 'action.selected' },
        }}
      >
        {action.icon}
      </IconButton>
    </Tooltip>
  ))}
  {actions.length > 4 && (
    <Tooltip title="More actions">
      <IconButton size="small" onClick={handleMoreClick}>
        <MoreHorizIcon />
      </IconButton>
    </Tooltip>
  )}
</Stack>
```

#### **Advantages**
- ✅ Extremely compact (minimal vertical space)
- ✅ Clean, modern aesthetic
- ✅ Fast to scan
- ✅ Simple implementation

#### **Disadvantages**
- ⚠️ Reduced discoverability (icon-only buttons)
- ⚠️ Requires tooltips for accessibility
- ⚠️ Less visual prominence for technologies
- ⚠️ May not meet 44px touch target requirement

---

### Option C: Segmented Control + Expandable Panel

#### **Visual Concept**
```
┌─────────────────────────────────────────────┐
│ [Technologies ▼] [Actions ▼]               │  ← Segmented control
├─────────────────────────────────────────────┤
│ Expanded Technologies:                      │
│ [Figma] [Miro] [Arduino] [Unity]           │
├─────────────────────────────────────────────┤
│ Expanded Actions:                           │
│ [View Demo] [GitHub] [Presentation]        │
└─────────────────────────────────────────────┘
```

#### **Implementation**

**Segmented Control**
```jsx
<Accordion 
  disableGutters 
  elevation={0}
  sx={{ 
    bgcolor: 'transparent',
    '&:before': { display: 'none' }
  }}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Stack direction="row" spacing={1} alignItems="center">
      <CodeIcon fontSize="small" />
      <Typography variant="body2">
        Technologies ({technologies.length})
      </Typography>
    </Stack>
  </AccordionSummary>
  <AccordionDetails>
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {technologies.map(tech => (
        <Chip key={tech} label={tech} size="small" />
      ))}
    </Stack>
  </AccordionDetails>
</Accordion>

<Accordion disableGutters elevation={0}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Stack direction="row" spacing={1} alignItems="center">
      <LaunchIcon fontSize="small" />
      <Typography variant="body2">
        Actions ({actions.length})
      </Typography>
    </Stack>
  </AccordionSummary>
  <AccordionDetails>
    <Stack spacing={1}>
      {actions.map(action => (
        <Button key={action.label} {...action} fullWidth />
      ))}
    </Stack>
  </AccordionDetails>
</Accordion>
```

#### **Advantages**
- ✅ Progressive disclosure (collapsed by default)
- ✅ Maximum space efficiency
- ✅ Clear categorization
- ✅ Accessible (keyboard navigable)

#### **Disadvantages**
- ⚠️ Requires user interaction to see content
- ⚠️ May hide important information
- ⚠️ More clicks to access actions
- ⚠️ Unconventional pattern for this use case

---

## Recommendation: Option A (Chip Carousel + Button Group)

### Why Option A?

1. **Balances Visibility and Efficiency**
   - Technologies remain visible (horizontal scroll)
   - Primary actions immediately accessible
   - Secondary actions discoverable via dropdown

2. **Follows MUI Patterns**
   - Chip horizontal scroll (documented pattern)
   - ButtonGroup with dropdown (common pattern)
   - Stack with responsive direction (best practice)

3. **Mobile-First Design**
   - Leverages existing `modalMobileTokens`
   - Natural horizontal scroll gesture
   - Reduces vertical space by 40-50%

4. **Accessibility**
   - Maintains 44px touch targets
   - Keyboard navigable
   - Screen reader friendly

5. **Implementation Feasibility**
   - Builds on existing components
   - Minimal breaking changes
   - Can be implemented incrementally

---

## Implementation Plan

### Phase 1: Technology Tags Refactor (Week 1)

**Files to Modify**:
- `src/components/work/TechnologyTags.js`
- `src/components/work/ProjectMetaBar.js`

**Changes**:
1. Update `TechnologyTags` to use horizontal scroll on mobile
2. Add primary/secondary color distinction (first chip primary)
3. Implement responsive chip sizing from `modalMobileTokens`
4. Add scroll shadow indicators (optional)

**Code Changes**:
```jsx
// TechnologyTags.js - Enhanced horizontal scroll
const TechnologyTags = ({ technologies = [], variant = 'default', size = 'small', sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Determine if horizontal scroll or wrap
  const shouldScroll = isMobile && technologies.length > 3;
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: modalMobileTokens.techChips.gap,
        overflowX: shouldScroll ? 'auto' : 'visible',
        flexWrap: shouldScroll ? 'nowrap' : 'wrap',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        pb: shouldScroll ? 1 : 0,
        ...sx,
      }}
    >
      {technologies.map((tech, index) => (
        <Chip
          key={tech}
          label={tech}
          icon={getTechIcon(tech)}
          size="small"
          color={index === 0 ? 'primary' : 'default'}
          variant={index === 0 ? 'filled' : 'outlined'}
          sx={{
            flexShrink: shouldScroll ? 0 : 1,
            height: modalMobileTokens.techChips.chip.size,
            fontSize: modalMobileTokens.techChips.chip.fontSize,
            maxWidth: modalMobileTokens.techChips.chip.maxWidth,
            '& .MuiChip-icon': {
              fontSize: modalMobileTokens.techChips.chip.iconSize,
            },
          }}
        />
      ))}
    </Box>
  );
};
```

### Phase 2: Action Buttons Refactor (Week 2)

**Files to Modify**:
- `src/components/work/ProjectActionButtons.js`
- `src/components/work/ProjectMetaBar.js`

**New Component**: `ActionButtonGroup.js`
```jsx
import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ActionButtonGroup = ({ actions = [], maxVisible = 2 }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  if (!actions.length) return null;
  
  const primaryAction = actions[0];
  const visibleActions = actions.slice(1, maxVisible);
  const menuActions = actions.slice(maxVisible);
  
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} useFlexGap>
      {/* Primary Action with Dropdown */}
      <ButtonGroup variant="contained" size="small">
        <Button
          startIcon={primaryAction.icon}
          onClick={primaryAction.onClick}
          href={primaryAction.href}
        >
          {primaryAction.label}
        </Button>
        {menuActions.length > 0 && (
          <Button
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ px: 1 }}
          >
            <ArrowDropDownIcon />
          </Button>
        )}
      </ButtonGroup>
      
      {/* Visible Secondary Actions */}
      {visibleActions.map(action => (
        <Button
          key={action.label}
          variant="outlined"
          size="small"
          startIcon={action.icon}
          onClick={action.onClick}
          href={action.href}
        >
          {action.label}
        </Button>
      ))}
      
      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {menuActions.map(action => (
          <MenuItem
            key={action.label}
            onClick={() => {
              action.onClick?.();
              setAnchorEl(null);
            }}
            component={action.href ? 'a' : 'li'}
            href={action.href}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default ActionButtonGroup;
```

**Changes**:
1. Create `ActionButtonGroup` component with split button pattern
2. Update `ProjectActionButtons` to use new component
3. Add responsive `maxVisible` logic based on screen size
4. Maintain glassmorphic styling for primary button

### Phase 3: Integration and Polish (Week 3)

**Files to Modify**:
- `src/components/work/ProjectFullContent.js`
- `src/theme/components/modalMobile.js`

**Changes**:
1. Update `ProjectFullContent` to use refactored `ProjectMetaBar`
2. Add scroll shadow indicators for chip carousel
3. Add animation for dropdown menu
4. Test across all 6 projects
5. Update documentation

**Testing Checklist**:
- [ ] Mobile (375px): Chips scroll horizontally, max 2 buttons visible
- [ ] Tablet (768px): Chips wrap, max 3 buttons visible
- [ ] Desktop (1200px+): All chips visible, all buttons visible
- [ ] Accessibility: Keyboard navigation, screen reader labels
- [ ] Dark mode: Proper contrast and visibility
- [ ] Touch targets: All interactive elements 44px minimum

---

## Design Token Updates

### New Tokens to Add

```javascript
// src/theme/components/modalMobile.js
export const modalMobileTokens = {
  // ... existing tokens ...
  
  techChips: {
    layout: { xs: 'horizontal-scroll', sm: 'wrap' },
    containerPadding: { xs: 0, sm: 0 },
    gap: { xs: 0.75, sm: 1, md: 1.5 },
    chip: {
      size: { xs: 26, sm: 30, md: 32 },
      fontSize: { xs: '0.6875rem', sm: '0.8125rem', md: '0.875rem' },
      padding: { xs: '4px 10px', sm: '6px 14px', md: '8px 16px' },
      iconSize: { xs: 14, sm: 16, md: 18 },
      flexShrink: { xs: 0, sm: 1 },
      maxWidth: { xs: 140, sm: 180, md: 'none' },
      // NEW: Color hierarchy
      primaryColor: 'primary',
      secondaryColor: 'default',
      primaryVariant: 'filled',
      secondaryVariant: 'outlined',
    },
    // NEW: Scroll indicators
    scrollShadow: {
      enabled: true,
      color: 'rgba(0, 0, 0, 0.1)',
      size: 20,
    },
  },
  
  actionButtons: {
    maxVisible: { xs: 2, sm: 3, md: 6 },
    height: { xs: 40, sm: 44, md: 48 },
    minHeight: { xs: 40, sm: 44, md: 48 },
    fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' },
    padding: { xs: '8px 14px', sm: '10px 18px', md: '12px 24px' },
    layout: { xs: 'column', sm: 'row', md: 'row' },
    gap: { xs: 1, sm: 1.25, md: 1.5 },
    iconSize: { xs: 18, sm: 20, md: 22 },
    // NEW: Button hierarchy
    primaryVariant: 'contained',
    secondaryVariant: 'outlined',
    // NEW: Dropdown menu
    dropdownIcon: 'ArrowDropDown',
    menuElevation: 8,
    menuMinWidth: 200,
  },
};
```

---

## Visual Hierarchy Improvements

### Before (Current)
```
┌─────────────────────────────────────────────┐
│ [Figma] [Miro] [Arduino] [Unity]           │  All equal weight
│ [C#] [Hapticlabs DevKit]                   │
├─────────────────────────────────────────────┤
│ [View Presentation]                         │  All equal prominence
│ [View Thesis]                               │
│ [Miro Template]                             │
│ [GitHub Repository]                         │
│ [Try Demo]                                  │
└─────────────────────────────────────────────┘
Height: ~280px
```

### After (Proposed)
```
┌─────────────────────────────────────────────┐
│ [Figma] [Miro] [Arduino] [Unity] → scroll  │  Primary chip filled
├─────────────────────────────────────────────┤
│ [View Demo ▼] [GitHub]                     │  Primary contained, secondary outlined
└─────────────────────────────────────────────┘
Height: ~120px (-57%)
```

---

## Accessibility Considerations

### WCAG 2.1 AA Compliance

1. **Touch Targets**
   - Minimum 44×44px for all interactive elements
   - Adequate spacing between targets (8px minimum)

2. **Color Contrast**
   - Primary chip: 4.5:1 contrast ratio
   - Outlined chips: 3:1 contrast ratio (non-text)
   - Button text: 4.5:1 contrast ratio

3. **Keyboard Navigation**
   - Tab order: chips → primary button → secondary buttons → dropdown
   - Enter/Space: Activate buttons
   - Arrow keys: Navigate dropdown menu
   - Escape: Close dropdown

4. **Screen Reader Support**
   - Chips: "Technology: Figma"
   - Primary button: "View Demo, button, has popup menu"
   - Dropdown: "More actions, 3 items"
   - Menu items: "View Presentation, link"

5. **Focus Indicators**
   - Visible focus ring (2px solid primary color)
   - 2px offset from element
   - Maintains visibility in dark mode

---

## Performance Considerations

### Optimization Strategies

1. **Lazy Rendering**
   - Only render visible chips in scroll container
   - Use `IntersectionObserver` for off-screen chips

2. **Memoization**
   - Memoize chip components to prevent re-renders
   - Use `React.memo` for `ActionButtonGroup`

3. **Event Delegation**
   - Single scroll listener for chip container
   - Debounce scroll shadow calculations

4. **Bundle Size**
   - No new dependencies required
   - Leverages existing MUI components
   - Estimated size increase: <2KB gzipped

---

## Migration Path

### Backward Compatibility

**Option 1: Feature Flag**
```jsx
// ProjectMetaBar.js
const ProjectMetaBar = ({ 
  useNewLayout = false, // Feature flag
  ...props 
}) => {
  if (useNewLayout) {
    return <ProjectMetaBarV2 {...props} />;
  }
  return <ProjectMetaBarV1 {...props} />;
};
```

**Option 2: Gradual Rollout**
1. Week 1: Deploy to staging, test with 2 projects
2. Week 2: Enable for 50% of projects (A/B test)
3. Week 3: Full rollout if metrics positive

**Option 3: Direct Migration**
1. Update all components in single PR
2. Comprehensive testing across all projects
3. Deploy with rollback plan

**Recommended**: Option 2 (Gradual Rollout)

---

## Success Metrics

### Quantitative Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Hero height (mobile) | 520px | 350px | DOM measurement |
| Time to content | 3-4 swipes | 1-2 swipes | User testing |
| Button count visible | 5 | 2 + dropdown | Visual inspection |
| Chip overflow | Wraps | Scrolls | Behavior test |
| Load time | Baseline | <5% increase | Performance profiling |

### Qualitative Metrics

- ✅ Users can identify primary action within 2 seconds
- ✅ Technology stack is scannable without scrolling
- ✅ Dropdown menu is discoverable (>80% find it)
- ✅ Mobile experience feels "native" and smooth
- ✅ No accessibility regressions

---

## Risks and Mitigation

### Risk 1: Dropdown Discoverability
**Risk**: Users may not discover additional actions in dropdown  
**Likelihood**: Medium  
**Impact**: Medium  
**Mitigation**:
- Add subtle animation on first modal open
- Use "More" label instead of just icon
- Show badge with count (e.g., "+3 more")

### Risk 2: Horizontal Scroll Confusion
**Risk**: Users may not realize chips are scrollable  
**Likelihood**: Low  
**Impact**: Low  
**Mitigation**:
- Add scroll shadow indicators (fade on edges)
- Show partial chip on right edge
- Add scroll hint animation on first view

### Risk 3: Performance Regression
**Risk**: Scroll listeners may impact performance  
**Likelihood**: Low  
**Impact**: Medium  
**Mitigation**:
- Use `IntersectionObserver` instead of scroll listeners
- Debounce/throttle scroll calculations
- Profile performance before and after

### Risk 4: Accessibility Issues
**Risk**: New patterns may not be keyboard accessible  
**Likelihood**: Low  
**Impact**: High  
**Mitigation**:
- Comprehensive keyboard testing
- Screen reader testing with NVDA/JAWS
- Follow ARIA best practices for menus

---

## Alternative Considerations

### Why Not Tabs?
```jsx
<Tabs value={activeTab}>
  <Tab label="Technologies" />
  <Tab label="Actions" />
</Tabs>
```
- ❌ Requires extra click to see content
- ❌ Hides information by default
- ❌ Not appropriate for this use case (not mutually exclusive content)

### Why Not Floating Action Button (FAB)?
```jsx
<Fab color="primary">
  <LaunchIcon />
</Fab>
```
- ❌ Only shows one action
- ❌ Requires menu for multiple actions
- ❌ Unconventional for project metadata

### Why Not Breadcrumbs?
```jsx
<Breadcrumbs>
  <Link>Figma</Link>
  <Link>Miro</Link>
</Breadcrumbs>
```
- ❌ Implies navigation hierarchy (not applicable)
- ❌ Not appropriate for technology tags
- ❌ Confusing semantic meaning

---

## Next Steps

### Immediate Actions
1. **Stakeholder Review**: Present this proposal to team
2. **Design Mockups**: Create high-fidelity mockups in Figma
3. **Prototype**: Build interactive prototype for user testing
4. **User Testing**: Test with 5-10 users on mobile devices

### Implementation Timeline

**Week 1: Foundation**
- [ ] Create `ActionButtonGroup` component
- [ ] Refactor `TechnologyTags` for horizontal scroll
- [ ] Update `modalMobileTokens` with new values
- [ ] Write unit tests

**Week 2: Integration**
- [ ] Update `ProjectMetaBar` to use new components
- [ ] Test across all 6 projects
- [ ] Fix any layout issues
- [ ] Accessibility audit

**Week 3: Polish & Deploy**
- [ ] Add scroll shadow indicators
- [ ] Animation polish
- [ ] Performance profiling
- [ ] Deploy to staging
- [ ] User acceptance testing
- [ ] Deploy to production

---

## Related Documentation

- `docs/design-system/components.md` - Component patterns
- `docs/design-system/button-patterns.md` - Button guidelines
- `docs/development/mobile-modal-ux-analysis.md` - Mobile UX analysis
- `src/theme/components/modalMobile.js` - Mobile design tokens
- `AGENTS.md` - Development guidelines

---

## Appendix: Code Examples

### Complete ProjectMetaBar V2 Implementation

```jsx
// src/components/work/ProjectMetaBarV2.js
import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import TechnologyTagsV2 from './TechnologyTagsV2';
import ActionButtonGroup from './ActionButtonGroup';
import { getSpacingPreset } from '../../theme/presets';
import modalMobileTokens from '../../theme/components/modalMobile';

const ProjectMetaBarV2 = ({
  technologies = [],
  actions = [],
  variant = 'full',
  sx = {},
  ...rest
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const metaSpacing = variant === 'full' ? getSpacingPreset('metaBar') : null;

  // Responsive max visible buttons
  const maxVisibleButtons = isMobile 
    ? modalMobileTokens.actionButtons.maxVisible.xs 
    : modalMobileTokens.actionButtons.maxVisible.md;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 2.5, md: 3 },
        ...(variant === 'full' && {
          px: metaSpacing?.px,
          py: metaSpacing?.py,
          backgroundColor: 'background.paper',
          borderRadius: theme.shape.borderRadius,
        }),
        ...sx,
      }}
    >
      {/* Technology Tags - Horizontal Scroll */}
      {technologies.length > 0 && (
        <TechnologyTagsV2 
          technologies={technologies} 
          variant={variant}
        />
      )}

      {/* Action Buttons - Split Button Pattern */}
      {actions.length > 0 && (
        <ActionButtonGroup 
          actions={actions}
          maxVisible={maxVisibleButtons}
        />
      )}
    </Box>
  );
};

export default ProjectMetaBarV2;
```

---

**Document Status**: Ready for Review  
**Next Review**: After stakeholder feedback  
**Owner**: UX/UI Design Team  
**Last Updated**: September 30, 2025
