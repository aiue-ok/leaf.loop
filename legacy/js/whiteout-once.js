// whiteout-once.js
export function whiteoutOnce({
  delay = 200,
  duration = 3000,
  before = null, // 白くなる直前にやる
  after = null, // 白が引いた後にやる
} = {}) {
  const overlay = document.getElementById("whiteout");
  if (!overlay) return console.warn("⚠️ #whiteout が見つからない");

  if (overlay.dataset.running === "1") return; // 同時多発ガード
  overlay.dataset.running = "1";

  setTimeout(() => {
    if (typeof before === "function") before();

    overlay.classList.add("active");
    requestAnimationFrame(() => {
      document.body.classList.remove("booting");
    });

    setTimeout(() => {
      overlay.classList.remove("active");
      delete overlay.dataset.running;

      if (typeof after === "function") after();
    }, duration);
  }, delay);
}

// // whiteout-once.js
// export function whiteoutOnce({
//   delay = 200,
//   duration = 3000,
//   onComplete = null,
// } = {}) {
//   const overlay = document.getElementById("whiteout");
//   if (!overlay) {
//     console.warn("⚠️ #whiteout が見つからない");
//     return;
//   }

//   // 連打ガード
//   if (overlay.dataset.running === "1") return;
//   overlay.dataset.running = "1";

//   setTimeout(() => {
//     overlay.classList.add("active");
//     requestAnimationFrame(() => {
//       document.body.classList.remove("booting");
//     });
//     setTimeout(() => {
//       overlay.classList.remove("active");
//       delete overlay.dataset.running;

//       if (typeof onComplete === "function") {
//         onComplete();
//       }
//     }, duration);
//   }, delay);
// }
