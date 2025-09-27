# Component Patterns and Guidelines

## Component Architecture

### Component Categories

**Common Components** (`src/components/common/`)
- Reusable UI elements used across multiple sections
- Standardized props and behavior
- Error boundary implementations

**Work Section Components**

### Work Component (`src/components/work/Work.js`)
- Main work section container with lazy loading support
- Uses `useDataLoader` hook for data management with validation
- Uses `useProjectModal` hook for modal state management
- Integrates ProjectGrid and ProjectModal components
- Handles loading, error, and empty states with dedicated components
- Provides project navigation (next/previous) in modal
- Implements theme-aware styling with responsive design
- Wrapped in ErrorBoundary for fault isolation

**Section Components** (`src/components/[section]/`)
- Feature-specific components
- Data-driven implementations
- Section-specific styling

**Development Components** (`src/components/dev/`)
- Development-only tools and debuggers
## Standard Component Patterns

### Card Components

**ProjectCard** - Portfolio project display
```javascript
<ProjectCard
  project={projectData}
  onClick={handleProjectClick}
  variant="primary" // primary, secondary, featured
/>

**ThemedCard** - General purpose card
```javascript
<ThemedCard
  elevation={2}
  variant="outlined"
  sx={{ p: 3 }}
<ActionButton
  label="View Project"
  icon={<LaunchIcon />}
  onClick={handleClick}
  variant="primary" // primary, secondary, text
  size="medium" // small, medium, large
/>
```

#### Glassmorphic Variant (Design System)

Use the glassmorphic style for contact CTAs and social icon buttons. This variant mirrors the Hero scene label style (the on‑screen "Sphere/Cube/Torus" label):

- Dark mode: frosted white overlay (`rgba(255,255,255,0.10)`) with backdrop blur.
- Light mode: smoky black overlay (`rgba(0,0,0,0.70)`) with backdrop blur.
- Border: `1px solid` using `theme.palette.divider`.
- Focus: visible outline using `theme.palette.primary.main`.

Usage:

```jsx
// Contact CTA
<Button variant="glassmorphic" size="large" href="mailto:goeke.vincent@gmail.com">
  Contact Me
</Button>

// Social icon buttons
<IconButton variant="glassmorphic" href="https://www.linkedin.com/in/vincent-g-193124194/" target="_blank">
  <LinkedInIcon />
</IconButton>
```

Notes:

- This variant is implemented via theme overrides in `src/theme/components.js` for both `MuiButton` and `MuiIconButton`.
- Prefer this style for contact‑oriented actions; use standard `contained/outlined/text` for regular navigation and in‑page actions.
- Ensure contrast remains acceptable over varied backgrounds; the theme adapts per mode but always verify legibility in dark and light.

### Media Components

**ContentAwareImage** - Smart image loading
```javascript
<ContentAwareImage
  src={imageSrc}
  alt="Description"
  objectFit="cover" // cover, contain, fill
  aspectRatio="16/9"
  loading="lazy"
/>
```

**VideoPlayer** - Video content display
```javascript
<VideoPlayer
  src={videoSrc}
  poster={posterImage}
  controls={true}
  autoplay={false}
/>
```

## Section-Specific Patterns

### Hero Section

**Background Components**
- `Background3D` - Three.js 3D background (default)
- `CanvasBackground` - 2D canvas fallback
- Error boundary with automatic fallback

**Content Structure**
```javascript
<Hero>
  <HeroContent>
    <Typography variant="h1">Title</Typography>
    <Typography variant="h5">Subtitle</Typography>
    <SkillsDisplay skills={skillsData} />
  </HeroContent>
  <ScrollIndicator />
</Hero>
```

### Work Section

**Project Grid Layout**
```javascript
<ProjectGrid>
  {projects.map(project => (
    <ProjectCard
      key={project.id}
      project={project}
      onClick={() => openProjectModal(project)}
    />
  ))}
</ProjectGrid>
```

**Project Modal Structure**
```javascript
<ProjectModal open={isOpen} onClose={handleClose}>
  <ProjectNavigation /> {/* Prev/Next buttons */}
  <ProjectFullContent project={selectedProject} />
</ProjectModal>
```

### About Section

**Tabbed Interface**
```javascript
<AboutSection>
  <AboutTabNavigator
    tabs={aboutTabs}
    activeTab={activeTab}
    onTabChange={handleTabChange}
  />
  <AboutTabContent
    data={aboutData[activeTab]}
    images={aboutImages}
  />
</AboutSection>
```

## Modal Patterns

### Modal Types

**PDF Modal** - Document viewing
```javascript
const { openPdf } = useModalContext();
openPdf(pdfUrl, 'Document Title');
```

**Iframe Modal** - External content
```javascript
const { openIframe } = useModalContext();
openIframe(iframeUrl, 'External Content');
```

**Project Modal** - Project details
```javascript
const { openProject } = useModalContext();
openProject(projectData);
```

### Modal Styling
- Consistent 95vh/95vw sizing
- Theme-aware backgrounds
- Proper focus management
- Escape key handling

## Error Boundary Patterns

### Component-Level Boundaries
```javascript
<ErrorBoundary
  fallback={<ErrorFallback />}
  onError={handleError}
>
  <ComponentThatMightFail />
</ErrorBoundary>
```

### 3D-Specific Boundaries
```javascript
<ThreeJSErrorBoundary
  fallback={<CanvasBackground />}
>
  <Background3D />
</ThreeJSErrorBoundary>
```

## Animation Patterns

### Framer Motion Integration
```javascript
import { motion } from 'framer-motion';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  variants={fadeInVariants}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Theme-Based Animations
```javascript
const theme = useTheme();

<Box sx={{
  transition: theme.transitions.create(['transform', 'opacity'], {
    duration: theme.transitions.duration.standard
  })
}}>
  Animated content
</Box>
```

## Responsive Patterns

### Breakpoint Usage
```javascript
<Grid container spacing={{ xs: 2, md: 3 }}>
  <Grid item xs={12} md={6} lg={4}>
    <ProjectCard />
  </Grid>
</Grid>
```

### Conditional Rendering
```javascript
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

return (
  <>
    {isMobile ? <MobileComponent /> : <DesktopComponent />}
  </>
);
```

## Data Loading Patterns

### useDataLoader Hook
```javascript
const {
  data: projects,
  isLoading,
  error,
  reload
} = useDataLoader(getProjects, {
  defaultData: [],
  validateData: (data) => Array.isArray(data)
});

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} onRetry={reload} />;
```

## Best Practices

### Component Design
1. **Single Responsibility** - Each component has one clear purpose
2. **Prop Validation** - Use PropTypes or TypeScript for type safety
3. **Default Props** - Provide sensible defaults for optional props
4. **Error Handling** - Wrap components in appropriate error boundaries
5. **Performance** - Use React.memo, useMemo, and useCallback when needed

### Styling Guidelines
1. **Theme Usage** - Always use theme values over hardcoded styles
2. **sx Prop** - Prefer sx prop over styled components for simple styling
3. **Responsive Design** - Use breakpoint objects for responsive values
4. **Semantic Colors** - Use semantic color names (primary, secondary)
5. **Consistent Spacing** - Use theme spacing function for all spacing values

### Accessibility
1. **Semantic HTML** - Use appropriate HTML elements and ARIA roles
2. **Keyboard Navigation** - Ensure all interactive elements are keyboard accessible
3. **Focus Management** - Proper focus handling in modals and navigation
4. **Alt Text** - Descriptive alt text for all images
5. **Color Contrast** - Ensure sufficient contrast ratios in both themes

## External Component Libraries

### React Bits (Marketing Sections)
- Reference guide: `docs/design-system/react-bits.md`
- Use for structured hero/testimonial/FAQ layouts when MUI primitives are too low-level.
- Wrap third-party components in adapters that translate our design tokens (colors, spacing, typography) into the library's expected props or CSS variables.
