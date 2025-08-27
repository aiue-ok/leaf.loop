let totalMilliseconds = 0;
let endTime = null;
let running = false;
let intervalId = null;

const timerEl = document.getElementById("timer");
const alarmSound = document.getElementById("alarmSound");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");

function formatTime(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function update() {
  if (!running) return;

  const remaining = endTime - Date.now();

  if (remaining <= 0) {
    clearInterval(intervalId);
    running = false;
    timerEl.textContent = "00:00";
    alarmSound.play().catch(() => {
      console.warn("音が自動再生できませんでした。");
    });
  } else {
    timerEl.textContent = formatTime(remaining);
  }
}

// 通知をリクエストする関数
function requestNotificationPermission() {
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("通知の許可を得ました！");
      } else {
        console.warn("通知が許可されていません");
      }
    });
  }
}

// 通知を表示する関数
function notifyUser() {
  if (Notification.permission === "granted") {
    new Notification("⏰ タイマー終了！");
  } else {
    console.log("通知が許可されていません");
  }
}

// ページ読み込み時に通知の許可をリクエスト
document.addEventListener("DOMContentLoaded", () => {
  requestNotificationPermission();
});

// タイマー終了時に通知を表示
function update() {
  if (!running) return;

  const remaining = endTime - Date.now();

  if (remaining <= 0) {
    clearInterval(intervalId);
    running = false;
    timerEl.textContent = "00:00";
    alarmSound.play().catch(() => {
      console.warn("音が自動再生できませんでした。");
    });
    notifyUser(); // 通知表示
  } else {
    timerEl.textContent = formatTime(remaining);
  }
}

document.getElementById("startBtn").addEventListener("click", () => {
  console.log(startBtn);
  if (!running) {
    const min = parseInt(minutesInput.value, 10) || 0;
    const sec = parseInt(secondsInput.value, 10) || 0;
    totalMilliseconds = (min * 60 + sec) * 1000;
    endTime = Date.now() + totalMilliseconds;
    running = true;
    intervalId = setInterval(update, 200);
    update();
  }
});

document.getElementById("stopBtn").addEventListener("click", () => {
  if (running) {
    clearInterval(intervalId);
    running = false;
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(intervalId);
  running = false;
  timerEl.textContent = formatTime(
    (parseInt(minutesInput.value) || 0) * 60000 +
      (parseInt(secondsInput.value) || 0) * 1000
  );
});

// ダークモード切り替え
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

// 初期表示
document.addEventListener("DOMContentLoaded", () => {
  timerEl.textContent = formatTime(
    (parseInt(minutesInput.value) || 0) * 60000 +
      (parseInt(secondsInput.value) || 0) * 1000
  );
});

const volumeSlider = document.getElementById("volumeControl");

// 初期値セット（最大音量）
alarmSound.volume = parseFloat(volumeSlider.value);

// スライダー操作時に音量変更
volumeSlider.addEventListener("input", () => {
  alarmSound.volume = parseFloat(volumeSlider.value);
});
