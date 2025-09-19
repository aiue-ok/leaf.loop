# 📁 使用素材一覧（assets_credit.md）

本プロジェクトで使用している画像・動画・アイコン等の出典情報を記録しています。

---

## 🖼 画像 / Images

| ファイル名  | 出典サイト                                                                            | 作者名・ID    | ライセンス | メモ（使用箇所）                                                                                             |
| ----------- | ------------------------------------------------------------------------------------- | ------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| hero-bg.jpg | 　[Pexels での Taryn Elliott による動画](https://www.pexels.com/ja-jp/video/5835661/) | Taryn Elliott | Free       | 動画の先頭をスクリーンショットしてモバイルや遅い回線のための hero セクションの背景静止画（poster）として使用 |

## 🎞 動画 / Videos

| ファイル名                     | 出典サイト                                                                          | 作者名・ID    | ライセンス | メモ（使用箇所        |
| ------------------------------ | ----------------------------------------------------------------------------------- | ------------- | ---------- | --------------------- |
| 5835661-sd_960_540_25fps.mp4   | [Pexels での Taryn Elliott による動画](https://www.pexels.com/ja-jp/video/5835661/) | Taryn Elliott | Free       | hero セクションの背景 |
| 5835661-hd_1920_1080_25fps.mp4 | [Pexels での Taryn Elliott による動画](https://www.pexels.com/ja-jp/video/5835661/) | Taryn Elliott | Free       | hero セクションの背景 |

---

## 🎞 音 / Sounds

| ファイル名 | 出典サイト | 作者名・ID          | ライセンス | メモ（使用箇所） |
| ---------- | ---------- | ------------------- | ---------- | ---------------- |
| alarm.mp3  | 自作       | 自分（GarageBand ） | -          | タイマー完了通知 |

## 🎨 フォント・アイコン / Fonts 　 Icons

本プロジェクトで使用しているフォントとアイコンの出典・ライセンスを記録します。
（各素材はライセンス条項に従って使用しています。取得日は記録目的です。）

## Fonts（Google Fonts / Web 配信）

- **Zen Maru Gothic**

  - Variants: `Regular`
  - Source: https://fonts.google.com/specimen/Zen+Maru+Gothic
  - License: **SIL Open Font License 1.1** — https://scripts.sil.org/OFL
  - Obtained: 2025-09-19

- **Zen Kaku Gothic New**

  - Variants: `Regular`, `Bold`
  - Source: https://fonts.google.com/specimen/Zen+Kaku+Gothic+New
  - License: **SIL Open Font License 1.1** — https://scripts.sil.org/OFL
  - Obtained: 2025-09-19

- **Kiwi Maru**

  - Variants: `Regular`
  - Source: https://fonts.google.com/specimen/Kiwi+Maru
  - License: **SIL Open Font License 1.1** — https://scripts.sil.org/OFL
  - Obtained: 2025-09-19

- **M PLUS 1p**
  - Variants: `Regular`
  - Source: https://fonts.google.com/specimen/M+PLUS+1p
  - License: **SIL Open Font License 1.1** — https://scripts.sil.org/OFL
  - Obtained: 2025-09-19

> Notes: Google Fonts 経由で配信。ローカル同梱・サブセット化なし（現状）。

---

## Icons（Material Symbols / Static Icon Font）

- **Material Symbols**（Google）
  - Mode: **Static icon font**（可変版ではなく静的フォントを読み込み）
  - Used icon names:
    - `play_circle`, `stop_circle`, `refresh`, `volume_off`,
      `help`, `close`, `sound_sampler`, `mobile_vibrate`, `toast`
  - Source: https://fonts.google.com/icons
  - License: **Apache License 2.0** — https://www.apache.org/licenses/LICENSE-2.0
  - Obtained: 2025-09-19
  - Notes: **SVG/PNG は同梱せず**、アイコン名でフォント参照して使用。

---

## 読み込み方法メモ（再現用）

- Fonts: `<link href="https://fonts.googleapis.com/...">` で読み込み（Google Fonts）。
- Icons: Material Symbols を **static icon font** として読み込み、`<span class="material-symbols-outlined">icon_name</span>` などで呼び出し。

---

## Change Log

- 2025-09-19: 初版作成（動画、音、Google Fonts 4 ファミリー、Material Symbols 記載）

---

## 📝 備考 / Notes

- ライセンスが CC0 / Free でも、公開物（GitHub 等）には出典元を記載する方針。
- `.assets_credit.md` は開発中でも随時追記・更新。
- 実装ファイルには素材と一致するファイル名（例：`pexels_leaf.jpg`）を使用する。
