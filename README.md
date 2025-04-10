# UX Portfolio Website

A responsive portfolio website showcasing UX/UI design and research projects built with React and Material UI.

## Project Structure

### Core Files
- `src/index.js` - Main entry point for the React application
- `src/App.js` - Main application component with routing
- `public/index.html` - HTML template for the application
- `src/index.html` - Development HTML template

### Components
- `src/components/common/` - Reusable components
  - `TagList.js` - Displays clickable tag chips
  - `ProjectGallery.js` - Image gallery with thumbnails and fullscreen functionality
  - `ContentAwareImage.js` - Image component that adapts to container
  - `VideoPlayer.js` - Custom video player component
  - `PDFViewer.js` - Component for viewing PDF documents
  - `ActionButton.js` - Enhanced button component with content-type awareness
  - `ErrorBoundary.js` - Error handling component
  - `SkillTag.js` - Component for displaying skill/technology tags

- `src/components/work/` - Project-related components
  - `ProjectSection.js` - Displays project sections with text and media
  - `ProjectLinks.js` - Shows project links as styled buttons
  - `ProjectModal.js` - Modal for displaying project details
  - `ProjectImageGallery.js` - Grid-based image gallery with lightbox
  - `TechBar.js` - Displays project technologies and tools
  - `ProjectHeader.js` - Header component for project displays
  - `ProjectCard.js` - Card component for project previews
  - `ProjectFullContent.js` - Component for displaying full project details
  - `PrototypeShowcase.js` - Showcases project prototypes
  - `ProjectFrame.js` - Displays projects with alternating layouts
  - `ProjectCardPreview.js` - Shows preview of project details on hover
  - `ProjectNavigation.js` - Handles navigation between projects in the modal view
  - `ProjectOutcomes.js` - Displays project outcomes and takeaways
  - `ProjectSectionNav.js` - Provides tab-based navigation for project sections
  - `KeyTakeaways.js` - Displays key learnings from projects
  - `ProjectGallerySection.js` - Wrapper for the project gallery
  - `HeroVideo.js` - Shows hero video for projects
  - `ProjectSections.js` - Container for all project sections
  - `Work.js` - Main work section component

- `src/components/hero/` - Hero section components
  - `Hero.js` - Main hero section component
  - `HeroContent.js` - Content display for hero section
  - `ScrollIndicator.js` - Scroll indicator component
  - `background3d/` - 3D background components using Three.js

- `src/components/about/` - About section components
  - `AboutSection.js` - Main about section component
  - `AboutData.js` - Data for the about section
  - `AboutTabNavigator.js` - Tab navigation for about section

- `src/components/header/` - Header components
  - `Header.js` - Main header/navigation component

- `src/components/contact/` - Contact section components
  - `FooterContact.js` - Contact form and footer component

- `src/components/dev/` - Development tools
  - `ThemeDebugger.js` - Theme debugging component

### Project Data
- `src/components/work/data/` - Work section data files
  - `index.js` - Data entry point for work section
  - `skillTags.js` - Standardized skill tags for projects
  - `uiConfig.js` - UI configuration for work section components
  - `projects/` - Individual project data files
    - `index.js` - Combines and processes all project data
    - `masterThesis.js` - Data for Master's thesis project
    - `bachelorThesis.js` - Data for Bachelor's thesis project
    - `greenWallet.js` - Data for GreenWallet project
    - `amiai.js` - Data for AMIAI project
    - `adhdeer.js` - Data for ADHDeer project
    - `resonantRelaxation.js` - Data for Resonant Relaxation project

### Utilities
- `src/utils/` - Utility functions
  - `MediaPathResolver.js` - Resolves paths to media assets
  - `projectContentParser.js` - Parses project content structures
  - `dataHelpers.js` - Helper functions for data manipulation
  - `contentParser.js` - Parses content into structured sections
  - `projectUtils.js` - Project-specific utility functions
  - `imageAnalyzer.js` - Analyzes image properties
  - `mediaHelper.js` - Helpers for working with media files
  - `animationVariants.js` - Framer Motion animation variants
  - `buttonStyles.js` - Button styling utilities
  - `cssVariables.js` - CSS variable handling
  - `mediaUtils.js` - Media utilities
  - `pdfUtils.js` - PDF handling utilities
  - `scrollUtils.js` - Scroll behavior utilities
  - `themeUtils.js` - Theme utility functions
  - `unifiedMediaUtils.js` - Unified media handling

### Context Providers
- `src/context/` - React context providers
  - `ModalContext.js` - Context for modal state management
  - `ProjectContext.js` - Context for project data
  - `ThemeContext.js` - Context for theme management

### Custom Hooks
- `src/hooks/` - Custom React hooks
  - `useAboutNavigation.js` - Hook for about section navigation
  - `useAboutSectionHooks.js` - Hooks for about section functionality
  - `useAnimatedComponent.js` - Animation hook
  - `useDebounce.js` - Debounce functionality
  - `useIntersectionObserver.js` - Intersection observer hook
  - `useMediaProcessor.js` - Media processing hook
  - `useMediaQueries.js` - Media query hook
  - `useProjectData.js` - Project data hook
  - `useSlider.js` - Slider functionality hook
  - `useSmoothScroll.js` - Smooth scrolling hook

### Pages
- `src/pages/` - Page components
  - `ThemePreviewPage.js` - Theme preview page

### Configuration
- `src/config/mediaConfig.js` - Centralized media asset configuration
- `src/theme/index.js` - Theme configuration for Material UI
- `src/design/tokens.js` - Design tokens for consistent styling

### Theme Configuration
- `src/theme/` - Material UI theme customization
  - `animations.js` - Animation configurations
  - `breakpoints.js` - Responsive breakpoints
  - `colors.js` - Color palette definitions
  - `components.js` - Component style overrides
  - `spacing.js` - Spacing scale
  - `typography.js` - Typography settings

### Documentation
- `src/docs/DesignSystem.md` - Documentation for the portfolio design system
- `src/docs/DesignSystemRoadmap.md` - Design system roadmap and future plans

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
