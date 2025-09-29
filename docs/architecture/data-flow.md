# Data Flow Architecture

## Overview

The portfolio application follows a unidirectional data flow pattern with React Context for global state management and props for component communication.

## State Management Architecture

### Context Providers

**ThemeContext** (`src/context/ThemeContext.js`)
- Manages light/dark theme mode with `useThemeMode()` custom hook
- Provides theme switching functionality with `toggleTheme()`
- Persists theme preference in localStorage
- Detects system theme preference with MediaQuery listeners
- Integrates with MUI ThemeProvider for seamless theme application
- Includes computed properties: `isDarkMode`, `isLightMode`

**ModalContext** (`src/context/ModalContext.js`)
- Manages multiple modal types: PDF, iframe, external content, and project modals
- Provides modal opening functions: `openPdf()`, `openIframe()`, `openExternalContent()`, `openProjectModal()`
- Handles modal closing with `closeModal()`
- Maintains consistent 95vh/95vw modal sizing
- Includes backdrop styling with 85% opacity
- Renders modal components directly in provider

### Data Loading Pattern

**useDataLoader Hook** (`src/hooks/useDataLoader.js`)
- Standardized data loading with loading states
- Error handling and retry logic
- Data validation
- Cache control and reloading functionality

```javascript
const { 
  data: projects, 
  isLoading, 
  error,
  reload 
} = useDataLoader(getProjects, {
  defaultData: [],
  validateData: (data) => Array.isArray(data) && data.length > 0
});
```

## Work Section Data Flow

### Project Data Pipeline

1. **Data Definition** (`src/components/work/data/projects/`)
   - Individual project files (e.g., `greenWallet.js`, `masterThesis.js`)
   - Standardized project schema
   - Rich content sections and media

2. **Data Aggregation** (`src/components/work/data/projects/index.js`)
   - Imports all project files
   - Exports unified projects array
   - Maintains project order

3. **Data Processing** (`src/components/work/data/index.js`)
   - Standardizes project data format
   - Applies data transformations
   - Exports processed data

4. **Component Loading** (`src/components/work/Work.js`)
   - Uses `useDataLoader` hook
   - Handles loading and error states
   - Passes data to child components

5. **Modal Rendering** (`src/components/work/ProjectModal.js`)
   - Receives selected project data
   - Passes to `ProjectFullContent` component
   - Manages modal navigation (prev/next)

6. **Content Parsing** (`src/utils/projectContentParser.js`)
   - Parses project sections dynamically
   - Handles different section types
   - Generates navigation structure

### Project Data Schema

```javascript
{
  id: 'unique-project-id',
  title: 'Project Title',
  description: 'Brief description',
  categories: ['Category1', 'Category2'],
  technologies: ['React', 'Three.js'],
  cardVariant: 'primary',
  media: { type: 'image', src: imageSource },
  links: [
    {
      label: 'View Live',
      url: 'https://example.com',
      icon: <LaunchIcon />,
      contentType: 'external',
      openInPopup: true
    }
  ],
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Overview',
   - Color palettes in `palette/light.js` and `palette/dark.js`
   - Typography in `typography.js`
   - Spacing in `spacing.js`
   - Breakpoints in `breakpoints.js`

2. **Token Aggregation** (`src/theme/design/tokens.js`)
   - Combines all design tokens
   - Creates palette functions
   - Exports unified token system

3. **Theme Creation** (`src/theme/index.js`)
   - Creates MUI theme objects
   - Applies custom extensions
   - Handles mode switching

4. **Theme Provision** (`src/context/ThemeContext.js`)
   - Wraps app with ThemeProvider
   - Manages theme mode state
   - Provides theme switching functions

5. **Component Usage**
   - Components access theme via `useTheme()` hook
   - Use `sx` prop for theme-aware styling
   - Access custom theme extensions

## Media Asset Flow

### Asset Path Resolution

1. **Asset Organization**
   - Images in `src/assets/images/[ProjectName]/`
   - Documents in `src/assets/information/[ProjectName]/`
   - 3D models in `public/models/`

2. **Path Utilities** (`src/utils/mediaUtils.js`)
   - `createAboutImage()` - Creates image objects with positioning
   - `getAssetPath()` - Resolves asset paths
   - `analyzeImage()` - Determines optimal display settings

3. **Media Configuration** (`src/config/mediaConfig.js`)
   - Centralized media asset mapping
   - Consistent path resolution
   - Asset optimization settings

4. **Component Integration**
   - `ContentAwareImage` for smart image loading
   - `VideoPlayer` for video content
   - Media utilities for consistent handling

## Error Handling Flow

### Error Boundary Strategy

1. **Component-Level Boundaries**
   - Each major section wrapped in ErrorBoundary
   - Graceful degradation for failed components
   - Fallback UI components

2. **3D-Specific Handling**
   - Three.js error boundaries
   - Fallback to 2D canvas background
   - WebGL capability detection

3. **Data Loading Errors**
   - useDataLoader handles fetch errors
   - Retry mechanisms
   - User-friendly error messages

## Performance Optimizations

### Lazy Loading
- Component-level code splitting
- Image lazy loading
- 3D asset streaming

### Memoization
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers

### Caching
- Theme preference persistence
- Asset caching strategies
- Component state preservation
