# Project File Structure

## Root Directory Structure

```
Portfolio/
├── .github/                     # GitHub configuration
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── .codacy/                     # Code quality configuration
├── build/                       # Production build output
├── docs/                        # Project documentation (this directory)
├── public/                      # Static assets and HTML template
│   ├── index.html              # Main HTML entry point
│   ├── CNAME                   # Custom domain configuration
│   ├── favicon.ico             # Site favicon
│   ├── manifest.json           # PWA manifest
│   └── models/                 # 3D model assets
├── src/                         # Source code (detailed below)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── package-lock.json           # Dependency lock file
└── README.md                   # Main project README
```

## Source Code Structure (`src/`)

```
src/
├── index.js                    # React entry point, theme initialization
├── App.js                      # Main app layout, context providers
├── index.css                   # Global styles
├── theme.js                    # Theme creation and export
├── reportWebVitals.js          # Performance monitoring
├── assets/                     # Static content and media
│   ├── images/                 # Project and component images
│   │   ├── About/             # About section images
│   │   ├── [ProjectName]/     # Project-specific images
│   │   └── ...
│   └── information/            # Documents and PDFs
│       ├── [ProjectName]/     # Project documentation
│       └── ...
├── components/                 # All UI components
│   ├── about/                 # About section components
│   │   ├── AboutSection.js    # Main about component
│   │   ├── AboutData.js       # About section data
│   │   └── ...
│   ├── common/                # Reusable UI elements
│   │   ├── ErrorBoundary.js   # Error handling
│   │   ├── ActionButton.js    # Standardized buttons
│   │   ├── ContentAwareImage.js # Smart image component
│   │   └── ...
│   ├── contact/               # Footer and contact components
│   ├── dev/                   # Development-only tools
│   │   ├── ThemeDebugger.js   # Theme inspection tool
│   │   └── DesignSystemViewer.js
│   ├── header/                # Navigation components
│   ├── hero/                  # Hero section with 3D background
│   │   ├── Hero.js            # Main hero component
│   │   ├── background3d/      # Three.js 3D background
│   │   │   ├── Background3D.js
│   │   │   ├── components/    # 3D scene components
│   │   │   └── ...
│   │   ├── CanvasBackground.js # 2D canvas fallback
│   │   └── README.md          # Hero component documentation
│   └── work/                  # Portfolio/work section
│       ├── Work.js            # Main work component
│       ├── ProjectModal.js    # Project detail modal
│       ├── data/              # Project data
│       │   ├── projects/      # Individual project files
│       │   │   ├── index.js   # Project aggregation
│       │   │   ├── [project].js # Project data files
│       │   │   └── ...
│       │   ├── skillTags.js   # Technology tags
│       │   └── uiConfig.js    # UI configuration
│       └── ...
├── config/                     # Application configuration
│   ├── mediaConfig.js         # Media asset mapping
│   └── uiConfig.js            # UI and grid configuration
├── context/                    # React context providers
│   ├── ThemeContext.js        # Theme mode management
│   └── ModalContext.js        # Modal state management
├── hooks/                      # Custom React hooks
│   ├── useDataLoader.js       # Data loading hook
│   ├── useThemeUtils.js       # Theme utility hooks
│   └── ...
├── pages/                      # Top-level page components
│   ├── HomePage.js            # Main landing page
│   ├── NotFoundPage.js        # 404 fallback
│   └── ThemePreviewPage.js    # Theme preview sandbox
├── theme/                      # Modular theme system
│   ├── index.js               # Theme creation and export
│   ├── palette/               # Color palettes
│   │   ├── light.js           # Light mode colors
│   │   └── dark.js            # Dark mode colors
│   ├── typography.js          # Font and text styles
│   ├── spacing.js             # Spacing scale
│   ├── breakpoints.js         # Responsive breakpoints
│   ├── animations.js          # Animation tokens
│   ├── shadows.js             # Shadow definitions
│   ├── shape.js               # Border radius tokens
│   ├── components.js          # Component overrides
│   └── design/
│       └── tokens.js          # Design token aggregation
└── utils/                      # Utility functions
    ├── mediaUtils.js          # Media handling utilities
    ├── projectContentParser.js # Project data parsing
    ├── projectUtils.js        # Project helpers
    ├── themeUtils.js          # Theme utilities
    ├── scrollUtils.js         # Smooth scrolling
    └── MediaPathResolver.js   # Asset path resolution
```

## Key Architecture Patterns

### Component Organization
- **Section-based**: Components organized by app sections (`about/`, `work/`, `hero/`)
- **Common components**: Reusable elements in `common/`
- **Development tools**: Debug components in `dev/`

### Data Flow
- **Project data**: Individual files in `work/data/projects/`
- **Configuration**: Centralized in `config/`
- **Context providers**: Theme and modal state management

### Theme System
- **Modular**: Separate files for different theme aspects
- **Token-based**: Design tokens in `theme/design/tokens.js`
- **Mode support**: Light and dark palette files

### Asset Management
- **Organized by feature**: Images grouped by component/project
- **Path resolution**: Centralized asset path utilities
- **Media optimization**: Smart image loading and processing
