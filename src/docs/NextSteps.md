# Project Analysis and Next Steps

_Last updated: 6 August 2025_

## Recent Implementations

1. Interactive Sound System
   - Implemented Tone.js for synthesized audio
   - Added interactive click sounds
   - Created ambient sound generation
   - Integrated with 3D scenes

2. Privacy & Security Updates
   - Added Content Security Policy
   - Implemented cookie consent
   - Self-hosted fonts
   - Secure contact form
   - Privacy policy

## Next Steps

1. Sound System Enhancements
   - Fine-tune sound parameters
   - Add more interactive sound patterns
   - Implement volume controls
   - Add mute toggle

2. Performance Optimization
   - Optimize 3D scene rendering
   - Implement lazy loading for projects
   - Enhance image loading strategy

3. User Experience
   - Add loading animations
   - Improve mobile touch interactions
   - Enhanced accessibility features

4. Content Updates
   - Add new projects
   - Update project descriptions
   - Add case studies

The primary goal is to review the current state of the portfolio project, identify unused, redundant, or underutilized code and components, and create a structured plan to refactor, clean up, and reintegrate valuable features, particularly within the "Work" section, to restore full functionality and improve maintainability and performance.

## 2. File Usage Analysis & Potential Issues

- **Automated Check:**
  - Run `npx depcheck` to identify unused dependencies listed in `package.json`. (See Section 6 for results).
  - Configure and run ESLint (if not already set up) with plugins like `eslint-plugin-import` and `eslint-plugin-react` to find unused variables, functions, imports, and components.
- **Manual Review - Core & Structure:**
  - `src/App.js`: Seems to be the main layout orchestrator. Verify routing logic (currently minimal, mostly SPA).
  - `src/index.js`: Entry point, theme initialization. Check if `web-vitals` import/usage can be removed.
- **Manual Review - Components:**
  - **Common Components (`src/components/common/`):** Review usage of `ContentAwareImage`, `LazyImage` (consider removing `react-lazy-load-image-component` dependency), `VideoPlayer`. Ensure `ErrorBoundary` wraps critical sections. `DocumentButton.js` is empty and its functionality seems merged into `ActionButton.js`. `ThemedCard.js` might be an example/unused. `ContentBox`, `ContentContainer`, `ContentWrapper` seem similar; evaluate if consolidation is possible. Check if Font Awesome icons (`@fortawesome/*`) are used or can be replaced by MUI icons.
  - **Hero (`src/components/hero/`):** Check if all 3D background scenes (`scenes/`) are used and performant. `ObjectPool.js` usage? `@types/three` and `three-stdlib` might be removable if `@react-three/fiber` handles types sufficiently.
  - **About (`src/components/about/`):** `AboutContent.js` appears legacy, replaced by `AboutCard` and `AboutTabContent`. Verify `AboutTabNavigator` logic and scrolling behavior.
  - **Work (`src/components/work/`):** This is the key area.
    - **Potentially Unused/Underutilized:** `ProjectRelatedWork.js`, `ProjectPrototypeEmbed.js` (functionality might be in `PrototypeShowcase.js` or `IframeModal`), `ProjectCardPreview.js`. `HeroVideo.js` usage?
    - **Data Loading:** `data/index.js` imports project data directly. `useProjectData.js` hook seems unused.
    - **Modal Content:** `ProjectFullContent.js` uses `projectContentParser.js`. Verify it renders all intended sections (Header, Links, Tech, Sections, Gallery, Prototypes, Related).
    - **Navigation:** Check `ProjectSectionNav.js` and `ProjectNavigation.js` functionality within the modal.
  - **Dev (`src/components/dev/`):** Ensure these are conditionally imported/rendered only in development builds. `webpack-bundle-analyzer` might be useful here but is listed as unused.
- **Manual Review - Context (`src/context/`):**
  - `ModalContext.js`: Central to modals (PDF, Iframe, Project). Verify all `open...` functions are used correctly.
  - `ThemeContext.js`: Used for theme toggling.
  - `ProjectContext.js`: Appears unused; project data seems passed via props or imported directly. **Candidate for removal.**
- **Manual Review - Hooks (`src/hooks/`):**
  - `useProjectData.js`: Likely unused (see Work section). **Candidate for removal.**
  - `useSmoothScroll.js`: Usage unclear; `react-scroll` is used in `Header.js`. **Candidate for removal?**
  - `useSlider.js`, `useMediaProcessor.js`, `useAnimatedComponent.js`, `useAboutSectionHooks.js`, `useAboutNavigation.js`: Verify usage and necessity.
- **Manual Review - Utils (`src/utils/`):**
  - **Redundancy Check:** Compare `imageUtils.js`, `imageAnalyzer.js`, `mediaHelper.js`, `mediaUtils.js`, `unifiedMediaUtils.js`. Consolidate image/media handling logic. `MediaPathResolver.js` usage?
  - **Parsing:** `projectContentParser.js` vs `contentParser.js`. Are both needed?
  - **Other Utils:** Verify usage of `animationVariants.js` (vs `gsap` - likely remove `gsap`), `themeUtils.js`, `scrollUtils.js`, `projectUtils.js`, `pdfUtils.js`, `dataHelpers.js`, `cssVariables.js`, `buttonStyles.js`.
- **Manual Review - Config & Data:**
  - `src/config/mediaConfig.js`: Centralized media paths. Ensure it's consistently used.
  - `src/design/tokens.js`: Used by theme.
  - `src/components/work/data/`: Verify structure and usage. `uiConfig.js` used for categories? `skillTags.js` vs `hero/skillsData.js`?
- **Manual Review - Styling:**
  - Check for usage of Bootstrap (`bootstrap`, `react-bootstrap`) components/styles. Likely removable in favor of MUI.
  - Check for usage of Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`). Likely removable if MUI is the primary styling system.
  - Check for usage of `@material/web`. Likely removable.
- **Manual Review - Other:**
  - Check if `react-toastify` is used for notifications. If not, remove.
  - `cra-template` is likely removable.

## 3. Work Section Refactoring Plan (`src/components/work/`)

Goal: Restore full, dynamic project display functionality within the modal.

1.  **Data Flow:** Confirm `Work.js` correctly passes the selected project's data (`project`) to `ProjectModal`.
2.  **Modal Content (`ProjectFullContent.js`):**
    - **Dynamic Rendering:** Modify this component to dynamically render sections based on the data present in the `project` object. Use conditional rendering (`project.heroVideo && <HeroVideo ... />`, `project.galleryImages && <ProjectGallery ... />`, etc.).
    - **Integrate Sub-Components:** Ensure the following components are correctly imported and rendered when corresponding data exists:
      - `ProjectHeader` (Title, Description, Categories)
      - `HeroVideo` (If `project.heroVideo` exists)
      - `ProjectLinks` (Using `ActionButton` for `project.links`)
      - `TechBar` (Using `SkillTag` for `project.technologies`)
      - `ProjectSection` (Loop through parsed sections from `projectContentParser.js`, rendering text, media using `ContentAwareImage`/`VideoPlayer`, takeaways, outcomes via `ProjectContentRenderer.js`)
      - `ProjectGallery` (If `project.galleryImages` or similar exists)
      - `PrototypeShowcase` (If `project.prototypes` or `project.figmaLink` exists, using `IframeModal`)
      - `ProjectRelatedWork` (If `project.relatedProjects` exists) - _Needs review/reintegration._
    - **Parser:** Ensure `projectContentParser.js` correctly handles all expected data fields from individual project files (e.g., `adhdeer.js`).
3.  **Navigation (`ProjectModal.js`):**
    - Verify `ProjectNavigation` (Previous/Next Project buttons) correctly cycles through `projectsData`.
    - Verify `ProjectSectionNav` correctly links to different sections within the `ProjectFullContent`. Ensure target IDs match section IDs.
4.  **Main Work Page (`Work.js`):**
    - **Grid:** Currently uses `ProjectGrid` and `ProjectCard`. This seems functional. `ProjectCardPreview` might be unused.
    - **Filtering:** Consider re-adding filtering capabilities if desired. This would involve:
      - Reintroducing a `ProjectFilters` component (needs creation or recovery).
      - Adding state to `Work.js` to manage active filters.
      - Filtering `projectsData` before passing it to `ProjectGrid`.
5.  **Component Cleanup:** Remove confirmed unused components from the `work/` directory after reintegration.

## 4. Utility Consolidation Plan (`src/utils/`)

1.  **Media/Image Handling:**
    - Analyze functions in `imageUtils.js`, `imageAnalyzer.js`, `mediaHelper.js`, `mediaUtils.js`, `unifiedMediaUtils.js`.
    - Create a single, comprehensive `mediaUtils.js` (or similar name).
    - Move `analyzeImage`, `getOptimalObjectFit` into the new util.
    - Move `isVideo`, `createVideoThumbnail` into the new util.
    - Move image retry logic (`shouldRetryImage`, etc.) into the new util.
    - Refactor components (`ContentAwareImage`, `LazyImage`, `ProjectGallery`, `VideoPlayer`) to use the consolidated util.
    - Remove the old, redundant util files.
2.  **Content Parsing:** Review `projectContentParser.js` and `contentParser.js`. If `contentParser.js` is generic and `projectContentParser.js` is specific to the project data structure, keep both but ensure clear naming and purpose.
3.  **Other Utils:** Review `scrollUtils.js` (vs `react-scroll`), `buttonStyles.js` (vs theme overrides), `cssVariables.js` (how are these used?).

## 5. Context Cleanup

1.  **`ProjectContext.js`:** Confirm it's unused throughout the project. If so, remove the context provider (`src/App.js` or elsewhere) and delete the file.
2.  **`useProjectData.js`:** Confirm it's unused. If so, delete the file.

## 6. Dependency Cleanup

1.  **Analyze `depcheck` Results:**
    - **Unused Dependencies:** `@fortawesome/free-brands-svg-icons`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`, `@material/web`, `@types/three`, `bootstrap`, `cra-template`, `gsap`, `react-bootstrap`, `react-hook-form`, `react-lazy-load-image-component`, `react-toastify`, `three-stdlib`, `web-vitals`.
    - **Unused devDependencies:** `@babel/plugin-proposal-private-property-in-object`, `autoprefixer`, `postcss`, `tailwindcss`, `webpack-bundle-analyzer`.
    - **Missing Dependencies:** `eslint-config-react-app` (needed by `package.json`), `prop-types` (needed by `src/components/work/HeroVideo.js`), `@emotion/is-prop-valid` (needed by build output, likely transitive dependency issue).
2.  **Install Missing Dependencies:**
    - Run `npm install prop-types --save-dev` (or `--save` if used in production code, check `HeroVideo.js`).
    - Run `npm install eslint-config-react-app --save-dev`.
    - Run `npm install @emotion/is-prop-valid`. (This might resolve itself after other installs/updates, but install explicitly if build errors persist).
3.  **Verify Usage and Uninstall Unused Dependencies:**
    - **Carefully** review the project for any actual usage of the "unused" dependencies listed above. Search the codebase.
    - For confirmed unused dependencies, uninstall them:
      ```bash
      npm uninstall @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @material/web @types/three bootstrap cra-template gsap react-bootstrap react-hook-form react-lazy-load-image-component react-toastify three-stdlib web-vitals
      ```
    - For confirmed unused devDependencies, uninstall them:
      ```bash
      npm uninstall @babel/plugin-proposal-private-property-in-object autoprefixer postcss tailwindcss webpack-bundle-analyzer --save-dev
      ```
4.  **Cleanup:** Run `npm prune` (optional, cleans up `node_modules`).
5.  **Verify:** Verify the application still builds (`npm run build`) and runs (`npm start`) correctly without errors. Test functionality related to potentially removed libraries (icons, animations, forms, styling).

## 7. Documentation Update

- Update `README.md` to reflect the final project structure, data flow, and key components after refactoring.
- Update `DesignSystem.md` if theme structure or component styles change significantly.
- Ensure `docs/CodeCitations.md` is correctly named and referenced if needed.

## 8. Testing

- Manually test all sections, especially the "Work" section and project modals, after changes.
- Test different project types to ensure all content sections render correctly (videos, galleries, prototypes, text, links).
- Test responsiveness across different screen sizes.
- Test theme toggling.
- Consider adding basic smoke tests or component rendering tests using React Testing Library if time permits.

# Next Steps (as of 16 April 2025)

- All previously marked unused files (utilities, hooks, context) have been deleted.
- Media/image utilities are consolidated in `mediaUtils.js` and used by all relevant components.
- Layout and spacing are handled with MUI's Box and sx prop; no redundant layout components remain.
- Dependency cleanup is complete and the app builds successfully.
- The codebase is clean, modular, and ready for further development or optimization.
