# Portfolio Project

## Project Status (as of 16 April 2025)

- All unused utility files, hooks, and context files have been reviewed and deleted.
- Media/image utilities are fully consolidated in `mediaUtils.js` and used by all relevant components.
- Layout and spacing are handled directly with MUI's `Box` and `sx` prop; no redundant layout components remain.
- The "Work" section is fully dynamic, modular, and maintainable.
- Dependency cleanup is complete; the app builds and runs successfully.
- Documentation and design system are up-to-date.

## Project Structure

### Core Files

-   `src/index.js` - Main entry point for the React application. Initializes the theme using `createAppTheme` from `src/theme.js` and renders the `App` component.
-   `src/App.js` - Main application component with routing and layout structure. Wraps content with `ThemeProvider` and `ModalProvider`. Renders `Header`, `Hero`, `AboutSection`, `Work`, and `FooterContact`.
-   `public/index.html` - HTML template used for the production build.
-   `src/theme.js` - Exports the `createAppTheme` function which creates theme objects for light and dark modes with proper palette configuration.
-   `src/context/ThemeContext.js` - Provides theme context with toggle functionality between light and dark modes.

### Components

-   `src/components/common/` - Reusable components used throughout the application.
    -   `ActionButton.js` - Consistent button for actions (links, modals), integrates with `ModalContext`.
    -   `ContentAwareImage.js` - Image component adapting object-fit based on content/container analysis using `imageAnalyzer.js`. Includes lazy loading and retry logic.
    -   `ContentBox.js` - Container applying standard padding without width restrictions.
    -   `ContentContainer.js` - Full-width container applying standard padding.
    -   `ContentWrapper.js` - Basic full-width wrapper component.
    -   `ErrorBoundary.js` - Catches and displays errors in child components, providing retry options and logging.
    -   `IframeModal.js` - Displays external content (like Figma prototypes) within an iframe modal, managed by `ModalContext`.
    -   `LazyImage.js` - Image component that loads when in viewport using `useIntersectionObserver`, includes retry logic.
    -   `PDFViewer.js` - Component for viewing PDF documents inline using an iframe, managed by `ModalContext`. Handles path resolution.
    -   `ProjectGallery.js` - Image/video gallery with thumbnails and fullscreen lightbox view. Uses `ContentAwareImage` and `VideoPlayer`.
    -   `SkillTag.js` - Standardized tag for skills/technologies.
    -   `TagList.js` - Displays a list of tags using `Chip` components.
    -   `ThemeToggle.js` - IconButton to switch between light and dark themes using `ThemeContext`.
    -   `ThemedCard.js` - Example of a reusable card demonstrating theme usage.
    -   `VideoPlayer.js` - Custom video player component with basic controls.

-   `src/components/hero/` - Hero section components.
    -   `Hero.js` - Main hero section component, includes `HeroContent` and `Background3D`.
    -   `HeroContent.js` - Content display for hero section (text, buttons, skills). Uses `SkillTag`.
    -   `ScrollIndicator.js` - Animated scroll indicator component.
    -   `skillsData.js` - Data for skills displayed in the hero section.
    -   `Background3D.js` - A canvas-based animated particle background that responds to theme changes.

-   `src/components/header/` - Header components.
    -   `Header.js` - Main header/navigation component. Uses `ScrollLink` for smooth scrolling and `ThemeToggle`.

-   `src/components/contact/` - Contact section components.
    -   `FooterContact.js` - Contact information, social links, and message form in the footer.

-   `src/components/work/` - Work/Portfolio section components.
    -   `Work.js` - Main work section component. Fetches project data and manages project display.
    -   `ProjectGrid.js`, `ProjectCard.js`, `ProjectSection.js`, etc. - Various components for displaying project information.
    -   `TitleOverlay.js`, `ActionsBar.js` - UI components for project details.

-   `src/components/dev/` - Development and debugging tools (not for production).
    -   `DesignSystemViewer.js` - Component to visualize design system elements.
    -   `ThemeDebugger.js` - Tool to inspect the current theme values.
    -   `ThemePreview.js` - Sandbox to preview components with theme settings, includes mode toggle.

### Context Providers

-   `src/context/` - React context providers for global state management.
    -   `ModalContext.js` - Manages state and content for various modal types.
    -   `ThemeContext.js` - Manages the current theme mode (light/dark) and provides a toggle function.

### Configuration

-   `src/config/mediaConfig.js` - Centralized media asset configuration. Maps project IDs to their associated image, video, and document paths.
-   `src/design/tokens.js` - Defines design tokens (primarily colors) used by the theme.

### Theme Configuration

-   `src/theme/` - Material UI theme customization.
    -   `index.js` - Main theme creation logic. Imports tokens and specific configurations to build the light and dark theme objects.
    -   `breakpoints.js` - Responsive breakpoints definition.
    -   `colors.js` - Color palette definitions.
    -   `components.js` - Global component style overrides.
    -   `custom.js` - Custom theme extensions for additional functionality.
    -   `shadows.js` - Shadow definitions for elevation levels.
    -   `shape.js` - Shape configurations like border radius.
    -   `spacing.js` - Spacing scale definition.
    -   `typography.js` - Typography settings (font families, sizes, weights).

## Dependencies

### Core Dependencies

-   **React (^18.2.0)**: The foundation of the application.
-   **React DOM (^18.2.0)**: Handles DOM-specific methods for React.
-   **React Scripts (^5.0.1)**: Configuration and scripts for the Create React App environment.

### Key Libraries

-   **@mui/material (^5.17.1)**: Material UI component library for UI elements and styling.
-   **@emotion/react, @emotion/styled**: Styling libraries used by Material UI.
-   **framer-motion (^11.0.8)**: For animations and transitions.
-   **react-scroll**: For smooth scrolling navigation.

## Theme System

The portfolio uses a custom theme system built on top of Material UI's theming capabilities:

1. **ThemeContext.js** - Provides global theme state management:
   - Stores current theme mode ('light' or 'dark')
   - Provides mode toggling functionality
   - Persists user theme preference in localStorage
   - Respects system color scheme preferences
   - Provides theme object to components

2. **theme.js** - Creates theme objects with:
   - Proper palette configuration for light and dark modes
   - Custom typography settings
   - Responsive breakpoints
   - Consistent spacing, shadows, and border radius

3. The Background3D component now:
   - Adapts to theme changes (light/dark)
   - Uses proper theme fallback values
   - Works with canvas instead of ThreeJS for better performance

## Summary of Discussion

1. 

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

4.  Start the development server:
    ```bash
    npm start
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run deploy`

Deploys the application to GitHub Pages using the `gh-pages` package.
