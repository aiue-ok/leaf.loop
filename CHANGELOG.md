# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.10](https://github.com/aiue-ok/leaf.loop/compare/v0.1.9...v0.1.10) (2026-05-29)


### Features

* **performance:** improve mobile Lighthouse score ([91afe39](https://github.com/aiue-ok/leaf.loop/commit/91afe39640bfe66aeafd4ba0d4d8c02b5cb46d8c))


### Bug Fixes

* **docs:** sync updated files to docs/ ([13e1316](https://github.com/aiue-ok/leaf.loop/commit/13e1316c3f2854d87c083c352d3de60ef6863a39))
* **recipe:** remove unnecessary flex and use width clamp for mobile layout ([a40cdcb](https://github.com/aiue-ok/leaf.loop/commit/a40cdcb165f510cae8034d14d31f8b7d10e61f2c))
* resolve 404 errors for svg, favicon, and assets_credit ([65af692](https://github.com/aiue-ok/leaf.loop/commit/65af692c439bc5b39229ba681508079ccd6979a8))
* ナビゲーションリンクの修正 ([cc25143](https://github.com/aiue-ok/leaf.loop/commit/cc25143103f745f3cc5d454164941d3e6e022f5b))

### [0.1.9](https://github.com/aiue-ok/leaf.loop/compare/v0.1.8...v0.1.9) (2026-02-17)

### Features

- add creative log data structure for portfolio content ([aae205d](https://github.com/aiue-ok/leaf.loop/commit/aae205d1b11993aaf0d781df17f520681f29487e))
- display recipe pages with minimal structure ([34b2759](https://github.com/aiue-ok/leaf.loop/commit/34b27592ebcdbb570c2d010538fdbf84c22abd55))
- **hero:** add recipe link to info navigation ([1b3cc1c](https://github.com/aiue-ok/leaf.loop/commit/1b3cc1cd3e001a9311f082da5fe7bfb8f0c36e47))
- **nav:** add recipe link to drawer menu across all pages ([916f1be](https://github.com/aiue-ok/leaf.loop/commit/916f1be04e2efb63c58e3cf4d5f497ecbbdc31bc))
- **recipe-detail:** implement recipe detail page rendering ([7a931c9](https://github.com/aiue-ok/leaf.loop/commit/7a931c94828e4f31200de4f12e00091fa37a913b))
- **recipe:** enhance detail page and related content ([4458d0c](https://github.com/aiue-ok/leaf.loop/commit/4458d0c69f9b912de364bdaf4d8c70ecc48d1b0e))
- **recipes:** implement card-style recipe list with detail links ([cae922f](https://github.com/aiue-ok/leaf.loop/commit/cae922f501688689065bc7fa99375b6791da5753))

### Bug Fixes

- **hero:** fix hero video visibility and reduced-motion behavior ([6973641](https://github.com/aiue-ok/leaf.loop/commit/69736419857b192eb458b0135e12cd885fa9c842))

---

### v0.1.8 (Universe & About Launch) 2026 JAN

_released this Jan 15, 2026_

## ✨ New

### 🌌 Universe

- Launched the **Universe** page with a timed word sequence and layered background animations
- Visual effects are structured using pseudo-elements for smoother transitions
- Backgrounds and motion are intentionally subtle to preserve a calm, contemplative atmosphere

### 👤 About

- Introduced the **About** page with a refined layout and dedicated color tokens
- Typography and spacing were adjusted to support longer-form reading
- Visual tone is aligned with the overall “quiet space” concept of the site

## 🛠 Improvements

- Unified background handling across pages (base color + gradient layers)
- Adjusted z-index and layout rules to prevent UI overlap (menu, mini timer)
- Refined navigation links and page-specific body classes
- Cleaned up styles and resolved lint-related issues

## 🚀 Deployment

- Synced all updates to the `docs/` directory for GitHub Pages deployment
- Ensured required scripts are included for Universe animations

> This release marks the first public integration of **Universe** and **About**,
> establishing the core structure and atmosphere of _leaf.loop_.

#### Universe

<img width="600" height="auto" alt="universe" src="https://github.com/user-attachments/assets/6f1cdd43-3a64-41d3-89ed-5f150851845a" />

#### About

<img width="600" height="auto" alt="about" src="https://github.com/user-attachments/assets/079f9bfd-0513-4fe7-8bc6-886431068161" />

### v0.1.7 – Gallery launch

_released this Dec 13, 2025_

### Highlights

**Gallery & lightbox**

- Added a new responsive gallery page with a grid layout and optimized thumbnails.
- Clicking a photo opens a lightbox with captions and a contain/cover toggle.
- Basic keyboard navigation is supported (← → Esc Enter) for browsing and closing.

**Shared UI components**

- Introduced a compact mini timer as a cross-page UI component, with layouts tuned for mobile, tablet, and desktop.
- Added toast notifications for timer events with accessible contrast.
- Implemented a slide-in menu drawer for page transitions with themed scrim and smooth animations.
- Added a contextual help card for timer usage that appears as a subtle, non-intrusive overlay and coexists cleanly with gallery and lightbox layers.

**Polish & stability**

- Adjusted color and glass effects (OKLCH/SRGB mix) so hero and gallery share consistent, stable visuals.
- Improved loading behavior with lazy loading and optimized thumbnails for the gallery.
- Updated docs/ for GitHub Pages deployment.

#### Hero page now links directly to the new gallery page.

<img width="600" height="427" alt="v0 1 7 – Gallery launch_hero-link" src="https://github.com/user-attachments/assets/ff77679f-624a-4bea-8642-d479f0656980" />

#### Gallery

<img width="600" height="427" alt="v0 1 7 – Gallery launch_gallery" src="https://github.com/user-attachments/assets/f2e318f5-54f0-46d2-a0c7-46d1752fcf68" />

#### Lightbox

<img width="600" height="427" alt="v0 1 7 – Gallery launch_Lightbox" src="https://github.com/user-attachments/assets/519d5855-6e55-4ed0-ac9c-769191c0221c" />

#### Menu drawer

<img width="600" height="427" alt="v0 1 7 – Gallery launch_menu-drawer" src="https://github.com/user-attachments/assets/831a9c66-0a71-4463-8abd-99869dc89ba4" />

### v0.1.6

_tagged this Oct 22, 2025_

Hero/Timer BEM + Lighthouse improvements

### v0.1.5 Hero Polish 5

_on Sep 27, 2025_

- Switch timer control to a single play/pause toggle
- Enable tabular numbers (tnum) for timer digits
- Adjust font sizes for consistency
- Prevent horizontal scrolling on mobile
- Tweak title and text positioning
- Polish mobile button sizes/visuals
- Patch background image gaps/bleed

#### iPhone SE (Safari), 375×667, orientation:landscape

![IMG_4955](https://github.com/user-attachments/assets/d73a82d5-e886-4d89-b60c-95448503226d)

Tested on: iPhone SE (Safari), Desktop Safari responsive
GitHub Pages: release /docs

### v0.1.4 – Hero polish

_released this Sep 21, 2025_

#### Highlights

- Accessible help card: dialog role, Esc to close, focus return
- .is-open class state & reduced-motion 対応
- Moss-glass theme tokens for help UI
- H1 responsive clamp & base text size 18px
- Hover BG images / gradients polish
- Text background bands unified for readability
- Favicon added
- assets_credit.md（使用メディア/フォント/アイコン）追加

### Added

- feat(hero): help.js（タイマーの使い方）
- feat(hero/help): アクセシブルなヘルプカード（dialog/Esc/フォーカス返却）
- feat(hero): moss-glass テーマトークン
- feat(hero): favicon

### Changed

- style(help): .is-open 状態に統一、reduced-motion 対応
- feat(hero): h1 responsive clamp、ベース文字 18px
- style(hero): hover 背景・グラデ調整、帯の統一で可読性改善
- docs: assets_credit.md 追加

### Known

- iOS audio unlock: workaround deferred（docsにメモ）

### v0.1.3 – Hero polish

_released this Sep 12, 2025_

- portrait: natural flow; prevent veil cutoff
- landscape: full-height with dvh
- build: styles/style.css

### v0.1.2

_tagged this Sep 12, 2025_

- hide notify-controls（debug tool） by default
- 調整: 文字サイズを全体的に見直し
- 整理: 使われていないクラスを削除

### v0.1.0 - Hero public preview

_tagged this Sep 9, 2025_
