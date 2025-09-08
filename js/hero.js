const v = document.querySelector(".hero-video");
const p = document.querySelector(".hero-poster");
const conn =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const slow = conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType));
if (slow) {
  v.style.display = "none";
  p.style.display = "block";
}
