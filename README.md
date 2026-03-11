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

For more details on the project structure and development flow,
see [ARCHITECTURE.md](./ARCHITECTURE.md).

- docs/ Files for GitHub Pages deployment
- scss/ Stylesheet source files
- js/ UI logic and data
- assets/ Static assets such as images

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

## 3. Performance

On the Gallery page (“A Little Bit of Tea from Around the World”), optimized image formats (AVIF and WebP) and multiple thumbnail variations are used to reduce loading costs. The primary visual applies `fetchpriority="high"` to improve perceived loading speed.
The lightbox and global UI scripts remain lightweight. Defined aspect ratios and consistent sizing minimize layout shifts.
Improvements to z-index logic, removal of unused styles, and refined image loading priorities have contributed to higher Lighthouse scores.

---

## 4. Accessibility

- The lightbox is implemented as an accessible dialog using `role="dialog"` and `aria-modal`, with full keyboard support.
- Focus management ensures uninterrupted navigation during interaction.
- All animations respect the `prefers-reduced-motion` setting.
- Toast notifications, the Mini Timer, and the Menu Drawer maintain sufficient contrast and predictable layering behavior across devices.

---

## 5. Responsive Design

- The layout adapts smoothly across mobile, tablet, and desktop viewports.
- The mini timer is specifically tuned for both portrait and landscape orientations, with particular attention to tablet behavior.
- The menu drawer, lightbox, decorative clock, and toast notifications scale consistently across defined breakpoints.
- Surface Duo layouts were also reviewed to ensure stability at dual-screen widths.

---

## 6. Assets & Credits

All images, icons, fonts, and external media sources are documented in
[`assets_credit.md`](./assets_credit.md).

- Includes source links, photographers, and license information.
- SVG icons converted from Material Symbols are also credited there.
- All recipe images were generated using ChatGPT.

---

## 7. Changelog

See [CHANGELOG.md](./CHANGELOG.md) for full release history.

### v0.1.9 (Recipe)

#### February 2026 _(Updated: 2026-02-17)_

- Introduced a new Recipe page with structured content rendering.
- Implemented navigation from the hero section to the Recipe page.
- Applied incremental UI adjustments for consistency and accessibility.
- Refactored markup to comply with HTML standards and improved semantic structure.

Enhanced navigational flow and semantic structure to support scalable content expansion.

## 8. Future Plans

- [ ] Expand timer functionality
- [ ] Further refine the Universe experience
- [ ] Redesign the hero page
- [ ] Refactor and optimize overall HTML / CSS structure
- [ ] Fix known issues

This project will continue to evolve through incremental improvements and ongoing implementation.

---

## 9. 📄 License

- All external assets follow their respective licenses.
- The source code is released under the MIT License.
- If the project expands into commercial use, licenses will be re-evaluated accordingly.

---
