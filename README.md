[日本語](README_ja.md)

# leaf.loop – A quiet web space for gentle reset

leaf.loop is a small web project designed to offer calmness through quiet visuals,
simple interactions, and soft temporal experiences.
Its purpose is to create a moment of stillness — a brief pause, like the warmth
of tea settling the mind.

## 🌱 About

A space that quietly opens in the middle of a busy afternoon.
It asks for almost nothing. Just look. Let the sound of boiling water and the presence of plants settle your thoughts. A gentle pause that might make you think, “Perhaps it is time for tea.”
leaf.loop follows a simple principle:
to offer calm through restrained visuals, minimal interaction, and a softened sense of time.

> Continuously evolving.

---

## 🔗 Live Site

https://aiue-ok.github.io/leaf.loop/

---

## 🚀 Current Release

#### 🍴 Recipe

- `recipe.html`
- `recipes.html`

JavaScript-based client-side rendering.
Dynamic DOM generation and rendering.

---

## 1. Overview

leaf.loop currently consists of several interconnected pages built around a shared UI foundation.
Designed as a “non-interactive viewing space” with mobile-first architecture.
Each section serves a distinct purpose, while maintaining a consistent visual language and interaction model across the site.

### Overall Structure

- `index.html` (Site Entrance)
  The main entry point centers around the timer as its primary feature, using a grid layout with hover-based links embedded within the background image. Although there is no hamburger menu on this page, navigation paths to all sections are accessible within the visible screen.
- `gallery.html` (“A Little Bit of Tea from Around the World”)
  A responsive grid-based image display space featuring a clickable lightbox for enlarged viewing. Images are optimized for both WebP and AVIF formats.
- `universe.html`("A Little Bit of Distant Things")
  A web space inspired by the format of a picture-story show, where words and layered backgrounds shift over time. Visual changes respond to themes and selected text.
- `about.html`("About This Site")
  A descriptive section explaining the concept of leaf.loop. Text length is adjusted between mobile and desktop versions to improve scrolling rhythm and readability.
- `recipes.html` (“A Little Bit of Delicious Food”)
  A client-side rendered recipe application built with vanilla JavaScript. Uses `js/data/recipesData.js` as a data source.
  Implements client-side rendering based on URL query parameters.

---

#### Global UI Components

The following global UI components have been introduced and refined over time:

- A Menu Drawer for page navigation
  A shared Mini Timer available across pages
- Help Cards that support their usage
  These elements form the structural foundation for consistent usability throughout the site.

These UI systems were developed in parallel during the creation of the Gallery page, ensuring shared interaction logic and cohesive behavior across sections.

---

## 2. Features

### Core Features

- 3, 4, and 5 minute focus timers
- Image gallery with grid view and lightbox enlargement
- A time-based word sequence page presenting space-related text as a contemplative viewing experience
- Recipe collection with detailed step-by-step pages
- Shared, reusable global UI components:
  - Header
  - Menu Drawer
  - Mini Timer
  - Help Cards
  - Decorative Clock

### Recipe System

- Dynamic routing using URL query parameters
- Print-optimized layout using @media print
- Clean, semantic HTML structure
- AI-generated recipe images (with proper credit attribution)

### Gallery & Lightbox

- Responsive grid layout
- Click-to-open lightbox with caption support
- Keyboard navigation (← → ESC Enter)
- Lazy loading and optimized thumbnails

### Mini Timer (Shared Component)

- Compact cross-page timer component
  (Countdown state is not yet persisted across page navigation)
- Responsive tuning for mobile, tablet, and desktop
- High-contrast toast notifications for accessibility
- Alarm sound with mute option

### Menu Drawer (Shared Component)

- Slide-in navigation drawer for page transitions
- Themed styling per section, with scrim overlay and smooth animation
- Decorative clock displaying the current time

### Help Cards (Timer Support)

- Usage guidance for timer controls
- Subtle, non-intrusive overlay design
- Clean coexistence with gallery and lightbox layering

---

## 3. Tech Stack & Architecture

leaf.loop is built with vanilla JavaScript and modular SCSS, organized around clear separation of concerns across structure, styling, rendering, and feature logic.

---

- HTML / SCSS / JavaScript
- Figma for layout prototypes
- Git & GitHub for version control and deployment
- GitHub Pages for hosting

---

### SCSS Structure

The styling system is organized into layered directories for clarity and scalability.

#### /scss/components

Reusable UI components:

- `menu-drawer.scss` — Navigation drawer component
- `timer-mini.scss` — Shared mini timer component
- `decor-clock.scss` — Decorative clock
- `info.scss` — Help cards and auxiliary UI
- `scrim.scss` — Overlay layer for drawer interactions
- `page-header.scss` — Page header component
- `_timer.scss` — Hero timer styling

#### /scss/core

Global foundations and shared tokens:

- `variables.scss` — Shared SCSS variables
- `base.scss` — CSS custom properties (`--tokens`)
- `timer.vars.scss` — Mini timer–specific variables
- `a11y.scss` — Accessibility rules and `prefers-reduced-motion` settings

#### /scss/pages

Page-specific layouts:

- `_hero.scss` — Hero layout
- `_gallery.scss` — Gallery layout
- `_universe.scss` — Universe page entry point (`@use` only)
  - `universe/_index.scss` — SCSS module forwarding (`@forward`)
  - `universe/_tokens.scss` — Universe-specific design tokens
  - `universe/_animations.scss` — Centralized `@keyframes` definitions
  - `universe/_base.scss` — Page layout structure
  - `universe/_interludes.scss` — Chapter title styling
  - `universe/_chapters.scss` — Word sequence styling
- `_about.scss` — About page layout
- `_recipe.scss` — Recipe detail layout
- `_recipes.scss` — Recipe list layout

---

### JavaScript Modules

The JavaScript architecture follows modular separation by responsibility.

#### Core

- `main.js` — Application entry point. Handles initial setup and orchestration of shared UI logic. Designed for extensibility through additional module imports.
- `site-menu.js` — Controls global menu drawer behavior.
- `help.js` — Manages help card interactions and guidance logic.

#### Data

- `data/creativeLogData.js` — Data source for creative log entries.
- `data/recipesData.js` — Data source for recipe content.

#### Pages

- `pages/creativeLogPage.js` — Layout and logic for the creative log page.
- `pages/recipesPage.js` — Structure and interactions for the recipe page.

#### Rendering

- `render/renderRecipes.js` — Rendering logic for recipe components.

#### Features / Effects

- `word_old.js` — Controls timed word transitions and theme switching on the Universe page.
- `gallery.js` — Implements lightbox interactions.
- `timer-base.js` — Core logic for timer and mini timer functionality.
- `clock.js` — Decorative animated clock component.
- `hero.js` — Handles hero video playback behavior.

---

### Deployment

The project is deployed via GitHub Pages.

The public `docs/` directory is kept up to date, and direct pushes to the release branch are avoided. Changes are developed in working branches and merged via pull requests to maintain version control clarity.

---

## 4. Performance

On the Gallery page (“A Little Bit of Tea from Around the World”), optimized image formats (AVIF and WebP) and multiple thumbnail variations are used to reduce loading costs. The primary visual applies `fetchpriority="high"` to improve perceived loading speed.
The lightbox and global UI scripts remain lightweight. Defined aspect ratios and consistent sizing minimize layout shifts.
Improvements to z-index logic, removal of unused styles, and refined image loading priorities have contributed to higher Lighthouse scores.

---

## 5. Accessibility

- The lightbox is implemented as an accessible dialog using `role="dialog"` and `aria-modal`, with full keyboard support.
- Focus management ensures uninterrupted navigation during interaction.
- All animations respect the `prefers-reduced-motion` setting.
- Toast notifications, the Mini Timer, and the Menu Drawer maintain sufficient contrast and predictable layering behavior across devices.

---

## 6. Responsive Design

- The layout adapts smoothly across mobile, tablet, and desktop viewports.
- The mini timer is specifically tuned for both portrait and landscape orientations, with particular attention to tablet behavior.
- The menu drawer, lightbox, decorative clock, and toast notifications scale consistently across defined breakpoints.
- Surface Duo layouts were also reviewed to ensure stability at dual-screen widths.

---

## 7. Assets & Credits

All images, icons, fonts, and external media sources are documented in
[`assets_credit.md`](./assets_credit.md).

- Includes source links, photographers, and license information.
- SVG icons converted from Material Symbols are also credited there.
- All recipe images were generated using ChatGPT.

---

## 8. Changelog

See [CHANGELOG.md](./CHANGELOG.md) for full release history.

### v0.1.9 (Recipe)

#### February 2026 _(Updated: 2026-02-17)_

- Introduced a new Recipe page with structured content rendering.
- Implemented navigation from the hero section to the Recipe page.
- Applied incremental UI adjustments for consistency and accessibility.
- Refactored markup to comply with HTML standards and improved semantic structure.

Enhanced navigational flow and semantic structure to support scalable content expansion.

## 9. Future Plans

- [ ] Expand timer functionality
- [ ] Further refine the Universe experience
- [ ] Redesign the hero page
- [ ] Refactor and optimize overall HTML / CSS structure
- [ ] Fix known issues

This project will continue to evolve through incremental improvements and ongoing implementation.

---

## 10. 📄 License

- All external assets follow their respective licenses.
- The source code is released under the MIT License.
- If the project expands into commercial use, licenses will be re-evaluated accordingly.

---
