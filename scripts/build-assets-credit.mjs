// scripts/build-assets-credit.mjs
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const INPUT_MD = "assets_credit.md";
const OUTPUT_HTML = path.join("docs", "assets-credit.html");

// Marked 設定（表 + md内のHTML <img> をそのまま活かす）
marked.setOptions({
  gfm: true,
  breaks: false,
});

const md = fs.readFileSync(INPUT_MD, "utf8");
const body = marked.parse(md);

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Assets credit | leaf.loop</title>
  <meta name="robots" content="noindex" />
  <style>
    :root { color-scheme: light; }
    body { margin: 0; font-family: system-ui, -apple-system, "Hiragino Sans", "Noto Sans JP", sans-serif; line-height: 1.7; }
    main { max-width: 980px; margin: 0 auto; padding: 24px 16px 56px; }
    h1,h2,h3 { line-height: 1.25; }
    h1 { font-size: 1.6rem; margin: 0 0 1rem; }
    h2 { font-size: 1.2rem; margin-top: 2.2rem; }
    h3 { font-size: 1.05rem; margin-top: 1.6rem; }
    a { word-break: break-word; }
    hr { border: 0; border-top: 1px solid #ddd; margin: 1.5rem 0; }
    table { border-collapse: collapse; width: 100%; display: block; overflow-x: auto; }
    th, td { border: 1px solid #ddd; padding: 10px; vertical-align: top; }
    th { background: #f7f7f7; text-align: left; }
    code { background: #f3f3f3; padding: 0.1em 0.35em; border-radius: 6px; }
    pre code { display: block; padding: 12px; overflow-x: auto; }
    img { max-width: 100%; height: auto; }
    blockquote { margin: 1rem 0; padding: 0.75rem 1rem; border-left: 4px solid #ddd; background: #fafafa; }
  </style>
</head>
<body>
  <main>
    ${body}
  </main>
</body>
</html>
`;

fs.mkdirSync(path.dirname(OUTPUT_HTML), { recursive: true });
fs.writeFileSync(OUTPUT_HTML, html, "utf8");

console.log(`✅ Generated: ${OUTPUT_HTML}`);
