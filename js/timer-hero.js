let totalSeconds = 180;
let timerId = null;
const timerEl = document.getElementById("timer");
const alarmSound = document.getElementById("alarmSound");

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function countdown() {
  updateDisplay();

  if (totalSeconds <= 0) {
    alarmSound.play();
    return;
  }

  totalSeconds--;
  timerId = setTimeout(countdown, 1000);
}

document.getElementById("startBtn").addEventListener("click", () => {
  if (!timerId) {
    countdown();
  }
});

document.getElementById("stopBtn").addEventListener("click", () => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  // タイマーを止める
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }

  // 初期時間（例：3分）に戻す
  totalSeconds = 180; // ←ここを変更すれば初期値を変えられます
  updateDisplay();
});

// 初期時間設定ボタン処理
document.querySelectorAll(".setTimeBtn").forEach((button) => {
  button.addEventListener("click", () => {
    const minutes = parseInt(button.getAttribute("data-minutes"));
    totalSeconds = minutes * 60;
    updateDisplay();

    // タイマーが動いていたら止める
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  });
});

// 初期表示更新
updateDisplay();

// ボリュームのツマミの前後で色を塗り分ける
const inputRange = document.getElementById("volumeControl");
const activeColor = "#6f707075";
const inactiveColor = "#dddddd75";

inputRange.addEventListener("input", function () {
  const ratio = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
});

const vc = document.querySelector(".volume-control");
const update = () =>
  vc.style.setProperty("--volume-fill", vc.value * 100 + "%");
vc.addEventListener("input", update);
update();

const alarm = document.getElementById("alarmSound"); // 既存の <audio>
const muteBtn = document.getElementById("muteBtn");

function syncMuteUI() {
  muteBtn.classList.toggle("is-muted", alarmSound.muted);
  muteBtn.setAttribute("aria-pressed", alarmSound.muted ? "true" : "false");
  // アイコンを切り替えたいなら：
  muteBtn.querySelector(".material-symbols-outlined").textContent =
    alarmSound.muted ? "volume_off" : "volume_up";
}

muteBtn.addEventListener("click", () => {
  alarmSound.muted = !alarmSound.muted;
  syncMuteUI();
});

syncMuteUI();
