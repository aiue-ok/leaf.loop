// whiteout-once.js
export function whiteoutOnce({
  delay = 200,
  duration = 3000,
  onComplete = null,
} = {}) {
  const overlay = document.getElementById("whiteout");
  if (!overlay) {
    console.warn("⚠️ #whiteout が見つからない");
    return;
  }

  // 連打ガード
  if (overlay.dataset.running === "1") return;
  overlay.dataset.running = "1";

  setTimeout(() => {
    overlay.classList.add("active");
    requestAnimationFrame(() => {
      document.body.classList.remove("booting");
    });
    setTimeout(() => {
      overlay.classList.remove("active");
      delete overlay.dataset.running;

      if (typeof onComplete === "function") {
        onComplete();
      }
    }, duration);
  }, delay);
}
