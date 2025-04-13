# UX Portfolio Website

This repository contains the source code for Vincent Göke's UX Portfolio website, built with React, Material UI, Framer Motion, and Three.js.

## Project Structure

### Core Files

-   `src/index.js` - Main entry point for the React application. Initializes the theme using `createAppTheme` from `src/theme.js` and renders the `App` component.
-   `src/App.js` - Main application component with routing and layout structure. Wraps content with `ThemeProvider` and `ModalProvider`. Renders `Header`, `Hero`, `AboutSection`, `Work`, and `FooterContact`.
-   `public/index.html` - HTML template used for the production build.
-   `src/index.html` - Development HTML template. Contains a basic password protection script (Note: This is **not secure** for production use and should be replaced with a proper authentication method if protection is needed).
-   `src/theme.js` - Exports the `createAppTheme` function which likely imports and uses configurations from the `src/theme/` directory to generate the MUI theme object used in `src/index.js`.

### Components

-   `src/components/common/` - Reusable components used throughout the application.
    -   `ActionButton.js` - Consistent button for actions (links, modals), integrates with `ModalContext`.
    -   `ContentAwareImage.js` - Image component adapting object-fit based on content/container analysis using `imageAnalyzer.js`. Includes lazy loading and retry logic.
    -   `ContentBox.js` - Container applying standard padding without width restrictions.
    -   `ContentContainer.js` - Full-width container applying standard padding.
    -   `ContentWrapper.js` - Basic full-width wrapper component.
    -   `DocumentButton.js` - **(Empty File)** Intended for document links, functionality integrated into `ActionButton.js`.
    -   `ErrorBoundary.js` - Catches and displays errors in child components, providing retry options and logging.
    -   `IframeModal.js` - Displays external content (like Figma prototypes) within an iframe modal, managed by `ModalContext`.
    -   `LazyImage.js` - Image component that loads when in viewport using `useIntersectionObserver`, includes retry logic.
    -   `PDFViewer.js` - Component for viewing PDF documents inline using an iframe, managed by `ModalContext`. Handles path resolution.
    -   `ProjectGallery.js` - Image/video gallery with thumbnails and fullscreen lightbox view. Uses `ContentAwareImage` and `VideoPlayer`.
    -   `SkillTag.js` - Standardized tag for skills/technologies.
    -   `TagList.js` - Displays a list of tags using `Chip` components.
    -   `ThemeToggle.js` - IconButton to switch between light and dark themes using `ThemeContext`.
    -   `ThemedCard.js` - Example of a reusable card demonstrating theme usage (may not be directly used in main layout).
    -   `VideoPlayer.js` - Custom video player component with basic controls.

-   `src/components/hero/` - Hero section components.
    -   `Hero.js` - Main hero section component, includes `HeroContent` and `Background3D`.
    -   `HeroContent.js` - Content display for hero section (text, buttons, skills). Uses `SkillTag`.
    -   `ScrollIndicator.js` - Animated scroll indicator component.
    -   `skillsData.js` - Data for skills displayed in the hero section.
    -   `index.js` - Exports Hero section components.
    -   `background3d/` - 3D background components using Three.js and react-three-fiber.
        -   `Background3D.js` - Main 3D canvas wrapper, handles interaction and errors.
        -   `ThreeScene.js` - Sets up the R3F `Canvas` and basic scene elements (lights, context).
        -   `ActiveScene.js` - Manages the currently displayed 3D scene using `SceneContext`.
        -   `ParticleComponent.js` - Renders particle effects.
        -   `SceneContext.js` - Context for managing 3D scene state.
        -   `constants.js` - Constants for 3D background configuration.
        -   `index.js` - Exports 3D background components.
        -   `particles.js` - Particle configuration/logic.
        -   `components/` - Helper components for the 3D background.
            -   `AutoRotatingCamera.js` - Camera controls that respond to user interaction.
            -   `LoadingFallback.js` - Loading indicator for 3D scenes.
            -   `PerformanceMonitor.js` - FPS counter (dev only).
        -   `scenes/` - Individual 3D scene definitions (e.g., Box, Cube, Sphere, Torus).
        -   `utils/` - Utility functions for the 3D background.
            -   `ObjectPool.js` - Utility for object pooling in Three.js.
            -   `sceneThemeUtils.js` - Theme utilities specific to 3D scenes.

-   `src/components/about/` - About section components.
    -   `AboutSection.js` - Main about section component, uses `AboutTabNavigator`.
    -   `AboutData.js` - Data structure and content (JSX, images, skills) for the about section tabs. Exports `renderSkillChip`.
    -   `AboutTabNavigator.js` - Manages tabs and content display using MUI `Tabs` and `AboutCard`. Handles scrolling and state synchronization.
    -   `AboutTabNavigation.js` - Renders the tab navigation UI using MUI `Tabs`.
    -   `AboutTabContent.js` - Renders the content (text, `AboutSlideshow`) for a single tab.
    -   `AboutCard.js` - Versatile card component used within the about section tabs, displaying content and optional image. Uses `ContentAwareImage`.
    -   `AboutContent.js` - **(Legacy/Refactored)** Previous component for displaying tab content, likely replaced by `AboutCard` and `AboutTabContent`.
    -   `AboutSlideshow.js` - Image slideshow component for about tabs with transitions and loading state.
    -   `index.js` - Exports About section components.

-   `src/components/header/` - Header components.
    -   `Header.js` - Main header/navigation component. Uses `ScrollLink` for smooth scrolling and `ThemeToggle`.

-   `src/components/contact/` - Contact section components.
    -   `FooterContact.js` - Contact information, social links, and message form in the footer.

-   `src/components/work/` - Work/Portfolio section components.
    -   `Work.js` - Main work section component. Fetches project data from `data/index.js` and renders `ProjectGrid`. Manages `ProjectModal` state.
    -   `ProjectGrid.js` - Displays a grid of `ProjectCard` components.
    -   `ProjectCard.js` - Card representation of a single project. Uses `ContentAwareImage` and `SkillTag`. Triggers `ProjectModal`.
    -   `ProjectModal.js` - Modal dialog to display detailed project information using `ProjectFullContent`. Uses `ModalContext` and includes `ProjectNavigation`.
    -   `ProjectFullContent.js` - Renders the detailed content of a project within the modal. Uses various sub-components like `ProjectHeader`, `ProjectSection`, `ProjectGallery`, etc. Parses content using `projectContentParser.js`.
    -   `ProjectHeader.js` - Displays the title, description, and categories in the modal header.
    -   `ProjectLinks.js` - Renders action buttons (`ActionButton`) for project links (PDF, demo, external, GitHub).
    -   `TechBar.js` - Displays project technologies using `SkillTag`.
    -   `ProjectSection.js` - Renders a single content section within the project modal (text, media, takeaways, outcomes). Uses `ContentAwareImage`, `VideoPlayer`, `ProjectContentRenderer`.
    -   `ProjectGallery.js` - Reusable gallery component (also used here).
    -   `PrototypeShowcase.js` - Displays embedded prototypes (Figma, etc.) using `IframeModal`.
    -   `ProjectRelatedWork.js` - Shows links to related projects.
    -   `HeroVideo.js` - Displays a hero video for the project using `VideoPlayer`.
    -   `ProjectSectionNav.js` - In-page navigation for project sections within the modal.
    -   `ProjectContentRenderer.js` - Renders JSX or string content safely.
    -   `ProjectNavigation.js` - Previous/Next buttons for navigating between projects in the modal.
    -   `data/` - Contains project-specific data and configuration.
        -   `index.js` - Imports all individual project data files and exports them as `projectsData`.
        -   `projects/` - Folder containing individual JavaScript files for each project (e.g., `adhdeer.js`, `masterThesis.js`). Each file defines the project's structure, content (using JSX and MUI components), media, links, etc.
        -   `uiConfig.js` - Defines categories used for filtering or display.

-   `src/components/dev/` - Development and debugging tools (should not be in production builds).
    -   `DesignSystemViewer.js` - Component to visualize design system elements (Typography, Colors, Components).
    -   `ThemeDebugger.js` - Tool to inspect the current theme values (Palette, Typography, Spacing, etc.).
    -   `ThemePreview.js` - Sandbox to preview components with theme settings, includes mode toggle.

### Context Providers

-   `src/context/` - React context providers for global state management.
    -   `ModalContext.js` - Manages state and content for various modal types (PDF, iframe, project details, external links). Provides functions like `openPdf`, `openIframe`, `openProject`, `closeModal`.
    -   `ThemeContext.js` - Manages the current theme mode (light/dark) and provides a toggle function.

### Custom Hooks

-   `src/hooks/` - Custom React hooks for reusable logic.
    -   `useDebounce.js` - Debounce functionality hook.
    -   `useIntersectionObserver.js` - Intersection observer hook for detecting element visibility (used by `LazyImage`, `ContentAwareImage`).
    -   `useMediaQueries.js` - Media query hook for responsive logic.
    -   `useProjectData.js` - **(Likely Legacy)** Hook for accessing project data, seems replaced by direct imports in `Work.js`.
    -   `useSmoothScroll.js` - Smooth scrolling hook (usage unclear, `react-scroll` is used elsewhere).

### Utilities

-   `src/utils/` - Utility functions.
    -   `animationVariants.js` - Framer Motion animation variants.
    -   `imageAnalyzer.js` - Analyzes image properties (dimensions, orientation) and determines optimal `object-fit`.
    -   `imageUtils.js` - Global image retry logic utilities (`shouldRetryImage`, `resetImageRetry`, `getRetryUrl`, `getProgressiveDelay`).
    -   `mediaHelper.js` - Helpers for working with media files (video detection, thumbnail creation).
    -   `projectContentParser.js` - Parses project-specific data structures into a standardized section format for `ProjectFullContent`.
    -   `themeUtils.js` - Theme utility functions (e.g., getting elevation, transitions, color manipulation).

### Pages

-   `src/pages/` - Page components (currently minimal, mostly SPA in App.js).
    -   `ThemePreviewPage.js` - Page for previewing the theme (dev only).

### Configuration

-   `src/config/mediaConfig.js` - Centralized media asset configuration. Maps project IDs to their associated image, video, and document paths (imports assets directly).
-   `src/design/tokens.js` - Defines design tokens (primarily colors) used by the theme.

### Theme Configuration

-   `src/theme/` - Material UI theme customization.
    -   `index.js` - Main theme creation logic. Imports tokens and specific configurations (`colors.js`, `typography.js`, etc.) to build the light and dark theme objects using MUI's `createTheme`.
    -   `animations.js` - Animation configurations (durations, easings).
    -   `breakpoints.js` - Responsive breakpoints definition.
    -   `colors.js` - Color palette definitions derived from `tokens.js`.
    -   `components.js` - Global component style overrides.
    -   `spacing.js` - Spacing scale definition.
    -   `typography.js` - Typography settings (font families, sizes, weights).

## Dependencies

### Core Dependencies

-   **React (^18.2.0)**: The foundation of the application, providing component-based architecture.
-   **React DOM (^18.2.0)**: Handles DOM-specific methods for React.
-   **React Scripts (^5.0.1)**: Configuration and scripts for the Create React App environment.

### Key Libraries

-   **@mui/material (^5.17.1)**: Material UI component library for UI elements and styling.
-   **@emotion/react, @emotion/styled**: Styling libraries used by Material UI.
-   **framer-motion (^11.0.8)**: For animations and transitions.
-   **three (^0.161.2)**: Core library for 3D graphics.
-   **@react-three/fiber (^8.18.0)**: React renderer for Three.js.
-   **@react-three/drei (^9.122.0)**: Helper components and utilities for react-three-fiber.
-   **react-scroll**: For smooth scrolling navigation.
-   **gh-pages**: For deploying the application to GitHub Pages.

## Installation

To install all the required dependencies for this portfolio project, follow these steps:

1.  Make sure you have [Node.js](https://nodejs.org/) (v14 or higher) and npm installed.

2.  Clone the repository:
    ```bash
    git clone https://github.com/YourUsername/portfolio.git
    cd portfolio
    ```

3.  Install all dependencies:
    ```bash
    npm install
    ```

    This will install all dependencies listed in the `package.json` file.

4.  Start the development server:
    ```bash
    npm start
    ```

### Potential Issues and Solutions

-   If you encounter issues with the Three.js components, ensure you have a WebGL-compatible browser and graphics support.
-   For performance issues, consider using the production build with `npm run build`.
-   If deployment to GitHub Pages fails, verify the `"homepage"` field in `package.json` matches your GitHub Pages URL.
-   The password protection script in `src/index.html` and `build/index.html` is **insecure**. Remove or replace it with a proper server-side or service-based authentication method if protection is required.

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

### `npm run predeploy`

Runs `npm run build` automatically before deployment.

### `npm run deploy`

Deploys the application to GitHub Pages using the `gh-pages` package. Builds the app using `npm run build` first (via `predeploy`) and pushes the `build` directory contents to the `gh-pages` branch of your repository.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
