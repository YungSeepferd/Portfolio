# Portfolio Project - AI Coding Assistant Guidelines

## Architecture Overview

This is a React-based UX/VG portfolio site built with the following key technologies:
- React v18+ with MUI v5 (Material UI) for component-based UI
- Framer Motion for animations and transitions
- React Three Fiber for 3D components in the Hero section
- Emotion and styled-components for enhanced styling

### Key Architecture Patterns

1. **Component Organization**: Components are organized by section (`/about`, `/work`, `/hero`, etc.), with common components in `/common`.
   - Each section is wrapped in `ErrorBoundary` components for fault isolation
   - Each feature module typically has both UI components and data files (e.g., `AboutSection.js` + `AboutData.js`)

2. **Context Providers**: The app uses two primary context providers:
   - `ThemeContext.js` - Manages theme mode (light/dark) with localStorage persistence
   - `ModalContext.js` - Handles different modal types (PDF, iframe, external, project)

3. **Theme System**: Uses an extended MUI theme system with modularized configuration:
   - `src/theme/index.js` - Combines all theme modules and creates theme objects
   - `src/theme/palette/light.js` and `src/theme/palette/dark.js` - Color palette definitions
   - `src/theme/typography.js` - Typography system and font configuration
   - `src/theme/spacing.js` - Spacing scale based on 8px grid system
   - Custom theme extensions in other theme files like `animations.js`, `shadows.js`, etc.

4. **Media Handling**: Media utilities in `src/utils/mediaUtils.js` handle consistent paths and processing.
   - `createAboutImage()` - Creates image objects with positioning data 
   - `analyzeImage()` - Determines optimal display settings for images
   - `getOptimalObjectFit()` - Determines CSS object-fit values based on image analysis
   - `isVideo()` - Detects video files based on extension or URL
   - `getAssetPath()` - Creates paths for information assets like PDFs

## State and Data Management

### Theme Management

The theme system uses React context (`ThemeContext.js`) that provides:
- Light/dark mode toggle with localStorage persistence
- System preference detection with MediaQuery event listener
- Theme object creation with appropriate palette and customizations

```jsx
// Example: Using the theme context in a component
import { useThemeMode } from '../context/ThemeContext';

function MyComponent() {
  const { mode, toggleTheme, isDarkMode } = useThemeMode();
  
  return (
    <Button onClick={toggleTheme}>
      {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
    </Button>
  );
}
```

### Modal System

The app uses a centralized modal system (`ModalContext.js`) that manages:
- PDF viewers for project documentation
- Iframe modals for external content
- Project details modal with navigation

```jsx
// Example: Opening a modal from a component
import { useModalContext } from '../context/ModalContext';

function MyComponent() {
  const { openPdf, openIframe } = useModalContext();
  
  return (
    <>
      <Button onClick={() => openPdf(pdfUrl, 'Document Title')}>
        View PDF
      </Button>
      <Button onClick={() => openIframe(iframeUrl, 'External Content')}>
        View Demo
      </Button>
    </>
  );
}
```

### Data Loading Pattern

Components use a custom `useDataLoader` hook that provides:
- Loading states and error handling
- Data validation
- Cache control and reloading functionality

```jsx
// Example: Using the data loader pattern
const { 
  data: projects, 
  isLoading, 
  error,
  reload 
} = useDataLoader(
  getProjects, 
  {
    defaultData: [],
    validateData: (data) => Array.isArray(data) && data.length > 0,
    onSuccess: (data) => console.log("Data loaded successfully"),
    onError: (err) => console.error("Error loading data:", err)
  }
);
```

## Development Workflows

### Setup and Running

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages (requires push access)
npm run deploy
```

### Project Structure Conventions

- **Section Components**: Major page sections follow the pattern seen in `src/components/about/AboutSection.js` with consistent layouts and animations
- **Data Sources**: Component data is typically stored in adjacent files (e.g., `AboutData.js`)
- **Error Handling**: All components should be wrapped in `ErrorBoundary` components
- **Animations**: Use `framer-motion` with consistent animation variants
- **Media Resolution**: Always use utilities like `getAssetPath()` and `createAboutImage()` instead of hardcoding paths
- **Theme Usage**: Access theme values via `useTheme()` hook from MUI, never use hardcoded values

## Project-Specific Patterns

### Work/Project Section

The work section manages projects with a well-defined structure:

1. **Project Data Files**: Each project has its own file in `src/components/work/data/projects/` (e.g., `greenWallet.js`, `masterThesis.js`)

2. **Project Data Schema**: Projects follow a consistent schema:
   ```jsx
   const projectObject = {
     id: 'uniqueId',
     title: 'Project Title',
     description: 'Short project description',
     categories: ['Category1', 'Category2'],
     technologies: ['Tech1', 'Tech2'],
     cardVariant: 'primary', // Determines card color theme
     media: { type: 'image', src: imageSource }, // Preview media
     links: [
       {
         label: 'Link Label',
         url: 'linkUrl',
         icon: <IconComponent />,
         contentType: 'pdf|iframe|external', // Determines modal handling
         openInPopup: true
       }
     ],
     sections: [ // Project details for modal display
       {
         id: 'section-id',
         type: 'default|gallery|outcomes|video|custom',
         title: 'Section Title',
         content: <ReactNode>, // Content JSX
         media: { type: 'image|video', src: mediaSource },
         layout: 'textLeft|textRight|textOnly',
         anchor: 'section-anchor', // For navigation
         navigable: true // Whether shown in navigation
       }
     ]
   };
   ```

3. **Fixed Height Card System**: Project cards use a fixed height system as seen in `src/components/work/Work.js`

4. **Project Modal Navigation**: Project modals include next/previous navigation to browse projects

### Media Handling

1. **Asset Organization**: Media assets are organized by project:
   - Project images in `src/assets/images/[ProjectName]/`
   - Project PDFs in `src/assets/information/[ProjectName]/`
   - 3D models in `public/models/`

2. **Media Path Resolution**: Always use helper functions from `src/utils/mediaUtils.js` rather than hardcoding paths:
   ```jsx
   // Example
   import { createAboutImage, getAssetPath } from '../../utils/mediaUtils';
   
   // For images with custom positioning
   const imageWithPosition = createAboutImage(ImportedImage, "Alt Text", "center bottom");
   
   // For PDFs or other documents
   const pdfPath = getAssetPath('ProjectName', 'document.pdf');
   ```

### Hero Section with 3D Background

The Hero section (`src/components/hero/Hero.js`) supports two background implementations:
- `CanvasBackground.js` - Simple 2D canvas with animated particles (better performance)
- `background3d/Background3D.js` - Complex Three.js 3D scene (default, higher visual impact)

To switch between implementations, modify imports in `Hero.js`.

### Responsive Design Approach 

Use MUI's responsive props pattern consistently:
```jsx
<Box sx={{ 
  padding: { xs: 2, sm: 3, md: 4 },
  fontSize: { xs: '1rem', md: '1.2rem' },
  flexDirection: { xs: 'column', md: 'row' }
}}>
```

### Component Documentation

Follow the JSDoc comment style seen in `src/components/about/AboutSection.js`:
```jsx
/**
 * AboutSection Component
 * 
 * Displays personal information in a tabbed layout with images.
 * Data is sourced from AboutData.js.
 * 
 * @component
 */
```

## Common Tasks

1. **Adding a new project**:
   - Create new project file in `src/components/work/data/projects/[projectName].js` following existing schema
   - Import and add to project array in `src/components/work/data/projects/index.js`
   - Add project images to `src/assets/images/[ProjectName]/`
   - Add project documents to `src/assets/information/[ProjectName]/`

2. **Modifying the theme**:
   - Light/dark palette changes go in `src/theme/palette/light.js` or `src/theme/palette/dark.js`
   - Typography changes go in `src/theme/typography.js`
   - Animation changes go in `src/theme/animations.js`
   - Component overrides go in `src/theme/components.js`

3. **Using the Theme Debugger**:
   - Access in development mode via floating button at bottom-right
   - Shows live theme values, colors, typography, and spacing
   - Test color contrast and accessibility

4. **Working with modals**:
   - Use the `useModalContext()` hook to access modal functions
   - Content types: 'pdf', 'iframe', 'external', 'project'
   - Modal styling consistent through `ModalContext.js`
