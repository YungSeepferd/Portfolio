# Portfolio UX VG

This is a personal portfolio website built with **React** and **Material UI**, showcasing UX design and research projects. It integrates a design system, a flexible component architecture, and interactive elements (potentially including Three.js visuals) to demonstrate advanced frontend skills.

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Project Structure](#project-structure)  
4. [Installation & Scripts](#installation--scripts)  
5. [Future Improvements & Roadmap](#future-improvements--roadmap)  
6. [Contributing](#contributing)  

---

## Overview

This portfolio highlights various UX and software projects. The application leverages:
- **Material UI** for design consistency and theming.  
- **React Context** to manage global states (e.g., modals, project data).  
- **Custom Hooks** for shared logic.  
- **Centralized data files** for each project’s content, enabling dynamic loading and standardized layouts.

By consolidating theming and component patterns, we reduce duplication, ensure a consistent user interface, and simplify maintenance as the project scales.

---

## Features

- **Responsive UI**: Adapts to multiple screen sizes using Material UI’s Grid system.  
- **Design System Integration**: A theme-based approach for consistent colors, typography, and spacing.  
- **Project Display & Modals**: Each project can be explored in detail through modals or full-page routes.  
- **Context-Managed State**: Simplifies the handling of modals, error boundaries, and project content.  
- **Expandable Architecture**: Additional 3D scenes, sorting/filtering, or multi-theme toggles can be easily integrated.

---

## Project Structure

```plaintext
PortfolioUXVG/
├─ public/
│   ├─ index.html
│   └─ (other static assets)
├─ src/
│   ├─ index.js            # App entry, renders <App />
│   ├─ App.js              # Root component (layout, routes, contexts)
│   ├─ config/
│   │   ├─ theme.js        # Material UI theme config
│   │   └─ mediaConfig.js  # Central config for media assets
│   ├─ context/
│   │   ├─ ModalContext.js    # Manages global modal state
│   │   └─ ProjectContext.js  # (If used) Manages project data globally
│   ├─ utils/
│   │   └─ helpers.js      # Consolidated utility functions
│   ├─ hooks/
│   │   └─ customHooks.js  # All custom React hooks (useDebounce, etc.)
│   ├─ components/
│   │   ├─ common/         # Shared UI components (Buttons, Cards, etc.)
│   │   ├─ dev/            # Dev/debugging components (ThemeDebugger, etc.)
│   │   ├─ header/         # Main site navigation (Header.js)
│   │   ├─ hero/           # Landing page hero (Hero.js, background3d/Background3D.js)
│   │   ├─ about/          # About section (AboutSection.js, AboutData.js)
│   │   └─ work/
│   │       ├─ Work.js
│   │       ├─ ProjectCard.js
│   │       ├─ ProjectFullContent.js
│   │       └─ data/
│   │           ├─ index.js          # Exports aggregated project data
│   │           └─ [projectSlug].js  # Individual project data files
│   └─ assets/       # Images, videos, PDFs, etc.
├─ .gitignore
├─ package.json
└─ README.md          # This file