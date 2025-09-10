// ===== 要素参照 =====
const ding = document.getElementById("alarmSound"); // 音
const toast = document.getElementById("toast"); // トースト
const liveDone = document.getElementById("finalLive"); // 最終告知 (aria-live)
const live = document.getElementById("timerLive"); // tick用 (aria-live)
const disp = document.getElementById("timer"); // h1を表示先に固定

// ===== デバッグUIの表示（?debug=1 で表示）=====
if (new URLSearchParams(location.search).get("debug") === "1") {
  document
    .querySelector(".notify-controls")
    ?.style.setProperty("display", "flex");
}

// ===== タイマー状態 =====
let totalSeconds = 180;
let timerId = null;

// ===== 表示更新 =====
function updateDisplay() {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (disp)
    disp.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(
      2,
      "0"
    )}`;
}

// SR 補助（同文抑止対策）
function say(msg, node = live) {
  if (!node) return;
  node.textContent = "";
  setTimeout(() => (node.textContent = msg), 20);
}

// ===== 交通機関ボタン（状態表示）=====
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

function setTransportState(state) {
  [startBtn, stopBtn, resetBtn].forEach((b) =>
    b?.classList.remove("is-active")
  );
  if (state === "start") startBtn?.classList.add("is-active");
  if (state === "stop") stopBtn?.classList.add("is-active");
}

// ===== オプション（なければ既定でON扱い）=====
const optSound = document.getElementById("optSound");
const optVibrate = document.getElementById("optVibrate");
const optToast = document.getElementById("optToast");
const isChecked = (el, def = true) => (el ? !!el.checked : def);

// ===== iOS系：初回タップで音を“解錠” =====
let audioUnlocked = false;
function unlockAudioOnce() {
  if (audioUnlocked || !ding) return;
  const v = ding.volume;
  ding.volume = 0;
  ding
    .play()
    .then(() => {
      ding.pause();
      ding.currentTime = 0;
      ding.volume = v;
      audioUnlocked = true;
      document.removeEventListener("pointerdown", unlockAudioOnce);
    })
    .catch(() => {
      /* ユーザーのテストで解錠可 */
    });
}
document.addEventListener("pointerdown", unlockAudioOnce);

// ===== 通知系 =====
function playDing() {
  if (!ding) return;
  if (!isChecked(optSound, true)) return;
  ding.currentTime = 0;
  ding.play().catch(() => {
    /* ブラウザが拒否した場合は無視 */
  });
}
function vibratePattern() {
  if (!isChecked(optVibrate, true)) return;
  if ("vibrate" in navigator) navigator.vibrate([120, 80, 120]);
}
function showToast(msg) {
  if (!isChecked(optToast, true) || !toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
  setTimeout(() => (toast.hidden = true), 4500);
}
function announceSR(msg) {
  say(msg, liveDone);
}

// ===== タイマー本体 =====
function tickOnce() {
  updateDisplay();

  // 節目アナウンス（毎秒は避ける）
  if (totalSeconds === 180) say("3分に設定");
  if (totalSeconds === 60) say("残り1分");
  if (totalSeconds <= 10 && totalSeconds > 0) say(`残り ${totalSeconds} 秒`);

  if (totalSeconds <= 0) {
    onTimerDone();
    timerId = null;
    setTransportState("stop");
    return;
  }
  totalSeconds--;
  timerId = setTimeout(tickOnce, 1000);
}

function onTimerDone() {
  const msg = "お湯の準備ができました";
  playDing();
  vibratePattern();
  showToast(msg);
  announceSR(msg);
}

// ===== ボタン動作 =====
startBtn?.addEventListener("click", () => {
  if (!timerId) {
    setTransportState("start");
    tickOnce();
  }
});
stopBtn?.addEventListener("click", () => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  setTransportState("stop");
});
resetBtn?.addEventListener("click", () => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  totalSeconds = 180; // 初期値
  updateDisplay();
  setTransportState(); // idle
});

// ===== プリセット（分） =====
const presetBtns = Array.from(document.querySelectorAll(".setTimeBtn"));
presetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    presetBtns.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const minutes = parseInt(btn.getAttribute("data-minutes") || "3", 10);
    totalSeconds = minutes * 60;
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    updateDisplay();
    say(`${minutes}分に設定`);
    setTransportState(); // idle
  });
});

// ===== Mute ボタン =====
const muteBtn = document.getElementById("muteBtn");
function syncMuteUI() {
  if (!muteBtn || !ding) return;
  const isMuted = !!ding.muted;
  muteBtn.classList.toggle("is-muted", isMuted);
  muteBtn.classList.toggle("is-active", isMuted);
  muteBtn.querySelector(".material-symbols-outlined").textContent = isMuted
    ? "volume_off"
    : "volume_up";
}
muteBtn?.addEventListener("click", () => {
  if (!ding) return;
  ding.muted = !ding.muted;
  syncMuteUI();
});

// ===== テストボタン（任意）=====
function testNotify() {
  playDing();
  vibratePattern();
  showToast("お湯の準備ができました（テスト）");
  announceSR("お湯の準備ができました（テスト）");
}
document.getElementById("testNotify")?.addEventListener("click", testNotify);

// 初期化
if (ding) ding.volume = 1; // スライダー撤去につき固定
updateDisplay();
syncMuteUI();

// ===== デバッグ露出（開発時の窓口）=====
window.notify = {
  ding,
  toast,
  liveDone,
  playDing,
  vibratePattern,
  showToast,
  announceSR,
  onTimerDone,
  test: testNotify,
};
