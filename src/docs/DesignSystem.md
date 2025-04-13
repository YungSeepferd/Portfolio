# Portfolio Design System

This document outlines the design system used for Vincent Göke's portfolio website. It aims to ensure consistency, maintainability, and a cohesive user experience across the site.

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Animation](#animation)

---

## 1. Color Palette

The color system defines the visual tone of the portfolio and ensures accessibility. Colors are defined in `src/theme/colors.js` and are available via the MUI theme object (`theme.palette`).

**Modes:** The theme supports both `light` and `dark` modes.

**Core Palette (Dark Mode Example):**

* **Primary:**
  * `main`: `#6366F1` (Indigo) - Used for primary actions, links, and highlights.
  * `light`: `#818CF8`
  * `dark`: `#4F46E5`
  * `contrastText`: `#FFFFFF`
* **Secondary:**
  * `main`: `#EC4899` (Pink) - Used for secondary actions and accents.
  * `light`: `#F472B6`
  * `dark`: `#DB2777`
  * `contrastText`: `#FFFFFF`
* **Background:**
  * `default`: `#0F172A` (Slate 900) - Main background color.
  * `paper`: `#1E293B` (Slate 800) - Background for elevated surfaces like cards, modals.
* **Text:**
  * `primary`: `#E2E8F0` (Slate 200) - Default text color.
  * `secondary`: `#94A3B8` (Slate 400) - Secondary text, subtitles, captions.
  * `disabled`: `#475569` (Slate 600) - Disabled text and icons.
* **Error:**
  * `main`: `#F43F5E` (Rose 500)
* **Warning:**
  * `main`: `#F59E0B` (Amber 500)
* **Info:**
  * `main`: `#3B82F6` (Blue 500)
* **Success:**
  * `main`: `#10B981` (Emerald 500)
* **Common:**
  * `black`: `#000000`
  * `white`: `#FFFFFF`
* **Divider:** `rgba(255, 255, 255, 0.12)` (Standard MUI divider for dark mode)

**Accent Colors (Project Specific):**

Projects can define their own `accentColor` within their data structure (`project.theme.accentColor`). If not provided, the theme's `primary.main` color is used as the default accent.

*(Usage guidelines and light mode examples can be added here)*

---

## 2. Typography

The typography system provides a consistent hierarchy and readability across the application.

**Font Family:**

* **Primary:** 'Inter', sans-serif (Imported via Google Fonts in `public/index.html`)

**Type Scale:**

The following variants are defined in `src/theme/typography.js` and configured in the MUI theme:

* **h1:**
  * Font Weight: 700
  * Font Size: 3.5rem (Responsive adjustments may apply)
  * Line Height: 1.2
  * Letter Spacing: -0.5px
* **h2:**
  * Font Weight: 700
  * Font Size: 2.5rem
  * Line Height: 1.25
* **h3:**
  * Font Weight: 600
  * Font Size: 2rem
  * Line Height: 1.3
* **h4:**
  * Font Weight: 600
  * Font Size: 1.5rem
  * Line Height: 1.35
* **h5:**
  * Font Weight: 600
  * Font Size: 1.25rem
  * Line Height: 1.4
* **h6:**
  * Font Weight: 600
  * Font Size: 1.1rem
  * Line Height: 1.4
* **subtitle1:**
  * Font Weight: 400
  * Font Size: 1rem
  * Line Height: 1.5
  * Color: `theme.palette.text.secondary`
* **subtitle2:**
  * Font Weight: 500
  * Font Size: 0.875rem
  * Line Height: 1.5
  * Color: `theme.palette.text.secondary`
* **body1:** (Default body text)
  * Font Weight: 400
  * Font Size: 1rem (16px)
  * Line Height: 1.6
* **body2:**
  * Font Weight: 400
  * Font Size: 0.875rem (14px)
  * Line Height: 1.5
* **button:**
  * Font Weight: 600
  * Font Size: 0.875rem
  * Line Height: 1.75
  * Text Transform: none (Overridden from MUI default)
* **caption:**
  * Font Weight: 400
  * Font Size: 0.75rem
  * Line Height: 1.6
  * Color: `theme.palette.text.secondary`
* **overline:**
  * Font Weight: 600
  * Font Size: 0.75rem
  * Line Height: 1.8
  * Text Transform: uppercase
  * Letter Spacing: 1px

*(Usage guidelines and examples can be added here)*

---

## 3. Spacing & Layout

*(Details about spacing units, breakpoints, and container usage will be added here based on `src/theme/spacing.js`, `breakpoints.js`, and `ContentContainer.js`)*

---

## 4. Components

*(Documentation for common components like Buttons, Cards, Modals, etc., will be added here)*

---

## 5. Animation

*(Details about standard animation timings, easing functions, and common variants will be added here based on `src/theme/animations.js` and `src/utils/animationVariants.js`)*
