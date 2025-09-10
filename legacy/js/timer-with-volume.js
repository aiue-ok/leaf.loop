// legacy/js/timer-with-volume.js
const ding = new Audio("../assets/audio/piano-c.mp3");
ding.preload = "auto";

// スライダー
const inputRange = document.getElementById("volumeControl");
const activeColor = "rgba(205, 209, 212, 0.8)";
const inactiveColor = "rgba(238, 244, 240, 0.8)";

if (inputRange) {
  const paint = () => {
    const ratio =
      ((inputRange.value - inputRange.min) /
        (inputRange.max - inputRange.min)) *
      100;
    inputRange.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
    ding.volume = Number(inputRange.value); // 0–1 を想定
  };
  inputRange.addEventListener("input", paint);
  paint();
}

// CSS変数での充填バーを使っていた場合（任意）
const vc = document.querySelector(".volume-control");
if (vc) {
  const update = () =>
    vc.style.setProperty("--volume-fill", vc.value * 100 + "%");
  vc.addEventListener("input", update);
  update();
}

// iOS解錠は必要に応じて
startBtn?.addEventListener("click", () => {
  try {
    ding.currentTime = 0;
    ding.play().then(() => ding.pause());
  } catch {}
  if (window.AudioContext) new AudioContext().resume().catch(() => {});
});
