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

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

function setTransportState(state) {
  // 'start' | 'stop' | 'idle'
  [startBtn, stopBtn, resetBtn].forEach((b) => b.classList.remove("is-active"));
  if (state === "start") startBtn.classList.add("is-active");
  if (state === "stop") stopBtn.classList.add("is-active");
  // reset は視覚的に“点灯なし”でも良い
}

startBtn.addEventListener("click", () => {
  if (!timerId) {
    countdown();
  }
});

stopBtn.addEventListener("click", () => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
});

resetBtn.addEventListener("click", () => {
  // タイマーを止める
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }

  // 初期時間（例：3分）に戻す
  totalSeconds = 180; // ←ここを変更すれば初期値を変えられます
  updateDisplay();
});

const presetBtns = Array.from(document.querySelectorAll(".setTimeBtn"));
presetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    presetBtns.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

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
    // 既存のロジック：ここで開始時間などを設定
    // setPresetMinutes(+btn.dataset.minutes);
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

// ミュートのUI表示（押済み状態）
const muteBtn = document.getElementById("muteBtn");

function syncMuteUI() {
  const isMuted = !!alarmSound.muted;
  muteBtn.classList.toggle("is-muted", isMuted); // 見た目用
  muteBtn.classList.toggle("is-active", isMuted); // 汎用の“選択中”クラス
  muteBtn.setAttribute("aria-pressed", isMuted ? "true" : "false");
  muteBtn.querySelector(".material-symbols-outlined").textContent = isMuted
    ? "volume_off"
    : "volume_up";
}
muteBtn.addEventListener("click", () => {
  alarmSound.muted = !alarmSound.muted;
  syncMuteUI();
});
syncMuteUI();

const live = document.getElementById("timerLive");
const disp = document.getElementById("timerDisplay");

function say(msg) {
  // 一部のSRは同一文だと読まないので微更新
  live.textContent = "";
  setTimeout(() => (live.textContent = msg), 20);
}

// 例：節目のみ告知（毎秒はNG）
function onTick(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  disp.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(
    2,
    "0"
  )}`;

  if (totalSec === 180) say("3分に設定");
  if (totalSec === 60) say("残り1分");
  if (totalSec <= 10 && totalSec > 0) say(`残り ${totalSec} 秒`);
  if (totalSec === 0) say("お湯の準備ができました");
}

const vol = document.getElementById("vol");
vol.addEventListener("input", (e) => {
  const v = Number(e.target.value);
  vol.setAttribute("aria-valuetext", v === 0 ? "ミュート" : `${v}パーセント`);
});
