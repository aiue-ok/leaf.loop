const hero = document.querySelector(".hero");
// 回線状況で静止画にフォールバック
const v = document.querySelector(".hero__media-video");
const p = document.querySelector(".hero__media-poster");
const conn =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const slow = conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType));
if (slow) {
  hero.classList.add("is-slow");
  // v.style.display = "none";
  // p.style.display = "block";
}

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
if (mediaQuery.matches) {
  hero.classList.add("is-reduced-motion");
  // const v = document.querySelector(".hero__media-video");
  // if (v) {
  //   v.pause();
  //   v.currentTime = 0;
  // }
}
