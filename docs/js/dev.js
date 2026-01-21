// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// === デバッグユーティリティ ===
// 👷→ URL末尾に ?dev を付けたときだけ有効。
// ⚒️ 例: http:localhost:5500/universe.html?dev
if (
  location.search.includes("dev") &&
  document.body.classList.contains("bg-interlude-3")
) {
  console.log("🚦 .bg-wind なので停止（devモード）");
  return;
}
// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

// **すぐ止めたいとき（開発用スイッチ）**
// ```scss
// /* コンソールで document.body.classList.toggle('debug-no-anim') */
// body.universe.debug-no-anim * {
//   animation: none !important;
//   transition: none !important;
// }
// ```

// 🟡　一時的
// Console にADD fade-out がいつ走ったか
// REMOVE fade-out がどのコード行から呼ばれたかが出ます。🟡

// const _add = DOMTokenList.prototype.add;
// const _remove = DOMTokenList.prototype.remove;

// DOMTokenList.prototype.add = function (...tokens) {
//   if (tokens.includes("fade-out")) {
//     console.trace("ADD fade-out", this.value);
//   }
//   return _add.apply(this, tokens);
// };

// DOMTokenList.prototype.remove = function (...tokens) {
//   if (tokens.includes("fade-out")) {
//     console.trace("REMOVE fade-out", this.value);
//   }
//   return _remove.apply(this, tokens);
// };

// 🟡　一時的ここまで 🟡
