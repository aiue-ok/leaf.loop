# leaf.loop – A quiet web space for gentle reset

> **Update (v0.1.8):**
> The _Universe_ and _About_ pages are now live, completing the first public
> release cycle of leaf.loop as a quiet, multi-page web experience.

leaf.loop is a small web project designed to offer calmness through quiet visuals,
simple interactions, and soft temporal experiences.
Its purpose is to create a moment of stillness — a brief pause, like the warmth
of tea settling the mind.

---

## 🌱 About

leaf.loop focuses on minimal, restful digital interactions.
It offers short timers and a lightweight gallery experience, keeping the interface
clear, quiet, and easy to breathe in.

### Newly Released Pages

- **Universe**
  A poetic, time-based page built around a word sequence and layered background
  visuals. The experience unfolds gradually, encouraging stillness rather than
  interaction.

- **About**
  A long-form page describing the intent, tone, and structure of leaf.loop.
  Designed for quiet reading, with dedicated color tokens and spacing tuned for
  calm focus.

### Core Features

- 3 / 4 / 5-minute timers
- A responsive image gallery with lightbox
- Global UI components shared across pages
  (menu drawer, mini timer, help card, decorative clock)
- A time-based “Universe” experience with subtle motion and background layers

---

## 💡 Technology

- HTML / SCSS / JavaScript
- Figma for layout prototypes
- Git & GitHub for version control and deployment
- GitHub Pages for hosting

---

## 🖼 Assets

All images, icons, and external media credits are listed in
[`assets_credit.md`](./assets_credit.md).
Most photographs are provided under the Unsplash License.
Converted SVG icons based on Material Symbols are also documented there.

---

## 📄 License

- All assets follow their respective licenses.
- Source code is released under the MIT License.
- If the project expands into commercial use, licenses will be re-evaluated.

---

## 🔗 Live Site

https://aiue-ok.github.io/leaf.loop/

---

# 🗓️ Gallery Update Documentation

_(Updated: 2025-12-11)_
_Last major revision date may be placed here at the start of the section._

---

## 1. Overview

The gallery page was newly added as a quiet, view-focused space within leaf.loop.
Alongside this addition, several global UI components were introduced or updated:
a menu drawer for page navigation, a mini timer shared across pages, and a
contextual help card that supports their usage.

These elements form the foundation of a consistent browsing experience across the
entire site. The gallery was built in parallel with these new UI systems,
aiming for calm interactions, readability, and reliable responsive behavior
across devices.

---

## 2. Features

### Gallery & Lightbox

- Responsive grid layout
- Click-to-open lightbox with caption display
- Contain / cover toggle
- Keyboard navigation (← → ESC Enter)
- Lazy loading and optimized thumbnails

### Mini Timer (Global UI Component)

- Compact cross-page timer
- Responsive tuning for mobile, tablet, and desktop
- Toast notifications with accessible contrast

### Menu Drawer (Global Navigation)

- Slide-in drawer for page transitions
- Themed styling with scrim and smooth animations

### Help Card (Contextual UI)

- Guidance for timer usage
- Subtle, non-intrusive overlay
- Coexists cleanly with gallery and lightbox layers

---

## 3. Tech Stack & Architecture

leaf.loop is built with **HTML**, **SCSS**, and **JavaScript**, using a modular
structure that separates global styling, shared UI components, and page-specific logic.

### SCSS Structure

#### /scss/components

- `menu-drawer.scss` — navigation drawer
- `timer-mini.scss` — global mini timer
- `decor-clock.scss` — decorative clock
- `info.scss` — help card
- `scrim.scss` — drawer background scrim
- `page-header.scss` — page title styling

#### /scss/core

- `variables.scss` — global `$` variables
- `base.scss` — CSS custom properties (`--tokens`)
- `timer.vars.scss` — mini timer variables
- `a11y.scss` — accessibility rules and reduced-motion handling

### JavaScript Modules

- `gallery.js` — lightbox interactions
- `timer-base.js` — mini timer logic
- `site-menu.js` — menu drawer behavior
- `clock.js` — decorative clock animation
- `help.js` — help card toggle and guidance

The project uses GitHub Pages for deployment, keeping `docs/` updated and
avoiding direct commits to `release`.

---

## 4. Performance

The gallery uses optimized image formats (AVIF / WebP) and multiple thumbnail
variants to reduce loading cost. Key images apply `fetchpriority="high"` to
improve perceived speed.

Lightbox and global UI scripts remain lightweight, minimizing layout shifts
through defined aspect ratios and consistent sizing.
Lighthouse scores improved after refining z-index logic, removing unused styles,
and tuning image loading priorities.

---

## 5. Accessibility

The lightbox is implemented as an accessible dialog using `role="dialog"` and
`aria-modal`, with full keyboard support.
Focus handling ensures uninterrupted navigation.

All animations respect `prefers-reduced-motion`.
Toast notifications, the mini timer, and the menu drawer preserve contrast and
predictable layering across devices.

---

## 6. Responsive Design

The layout adapts smoothly across mobile, tablet, and desktop.
The mini timer receives dedicated tuning for portrait and landscape orientations,
especially on tablets.

The menu drawer, lightbox, decorative clock, and toast notifications are
designed to scale gracefully across breakpoints. Surface Duo behavior was also
reviewed to maintain stability at dual-screen widths.

---

## 7. Image Credits

All gallery images are listed in `assets_credit.md`, including source links,
photographer information, and license notes.
Converted SVG icons based on Material Symbols are also credited there.

---

## 8. Changelog (2026 JAN)

### v0.1.8 (Universe & About Launch)

- Launched the **Universe** page with timed word sequences and layered SVG backgrounds
- Added the **About** page with long-form layout and dedicated design tokens
- Unified background handling across pages (base color + gradient layers)
- Refined navigation and page-specific body classes
- Synced all deployment assets to `docs/` for GitHub Pages

- Added the gallery page with responsive grid and AVIF/WebP optimization
- Implemented a new lightbox with captions, keyboard input, and contain/cover toggle
- Introduced global UI components: mini timer, menu drawer, help card, decorative clock
- Refined SCSS structure (variables, tokens, accessibility, component separation)
- Improved performance via lazy loading, fetchpriority, and reduced unused styles
- Strengthened accessibility: dialog roles, keyboard navigation, reduced-motion handling
- Adjusted z-index and layout behavior for consistent responsive design

---

## 9. Future Plans

Future enhancements may include further refinement of the Universe experience,
additional quiet pages, and continued tuning of shared UI components as leaf.loop
evolves.

---
