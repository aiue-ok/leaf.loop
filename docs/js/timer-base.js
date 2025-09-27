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

// === 状態 ===
let isRunning = false; // 単一の真偽値に寄せる（timerId連動でもOK）
const toggleBtn = document.getElementById("toggleTimer");
// ===== ボタン（状態表示）=====
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

// ===== 通知系 =====
// === タイマー完了時・外部停止時にもUIを同期 ===
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

  // 節目アナウンス（毎秒は避ける） 隠し live 領域を用意し、節目だけ文で告げる
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
  const msg = "お茶の準備ができました";
  playDing();
  vibratePattern();
  showToast(msg);
  announceSR(msg);
  stopTimerUnified(); // 状態とUIを確実に止める
}

// ===== ボタン動作 =====
// startBtn?.addEventListener("click", async () => {
//   await window.ensureAudioUnlocked();
//   if (!timerId) {
//     setTransportState("start");
//     tickOnce();
//   }
// });
// stopBtn?.addEventListener("click", () => {
//   if (timerId) {
//     clearTimeout(timerId);
//     timerId = null;
//   }
//   setTransportState("stop");
// });

function updateToggleUI(running) {
  isRunning = !!running;
  toggleBtn.setAttribute("aria-pressed", String(isRunning));
  toggleBtn.setAttribute("aria-label", isRunning ? "Stop" : "Start");
}

// === 開始・停止を一本化 ===
function startTimerUnified() {
  if (timerId) return; // 二重開始を防止
  setTransportState("start");
  tickOnce();
  updateToggleUI(true);
}

function stopTimerUnified() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  setTransportState("stop");
  updateToggleUI(false);
}

// === トグル（ユーザー操作内で解錠も実施） ===
toggleBtn.addEventListener("click", async () => {
  await window.ensureAudioUnlocked(); // ← ユーザー操作内で解錠

  const willRun = !isRunning;
  if (willRun) startTimerUnified();
  else stopTimerUnified();
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
    // === 開始・停止を一本化 ===
    function startTimerUnified() {
      if (timerId) return;
      clearTimeout(timerId);
      timerId = null;
    }
    updateDisplay();
    say(`${minutes}分に設定`);
    setTransportState(); // idle
    updateToggleUI(false);
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
  showToast("お茶の準備ができました（テスト）");
  announceSR("お茶の準備ができました（テスト）");
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
/* ================================
   Audio Unlock Unified Unit (iOS/Safari対応)
   ================================ */
(function () {
  const d = document,
    w = window;

  // すでに解錠済みなら何もしない（複数ファイルから読み込まれても安全）
  if (w.__audioUnlocked) return;

  let unlocked = false;
  let ctx = null;

  // 任意のaudio要素。なければnullでもOK（Web Audioだけで解錠できる場合もある）
  const audio = d.getElementById("alarmSound");

  async function unlockOnce() {
    if (unlocked || w.__audioUnlocked) return true;

    // 1) Web Audio を解錠（ユーザー操作内で）
    try {
      if (!ctx) ctx = new (w.AudioContext || w.webkitAudioContext)();
      if (ctx.state !== "running") await ctx.resume();

      // 無音の超短い発音（“手続き上の再生”）
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.value = 0; // 無音
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Safari以外ではここでコケることもあるが問題なし
    }

    // 2) <audio> も解錠（できる環境なら）
    if (audio) {
      try {
        audio.muted = false; // 念のため
        audio.currentTime = 0;
        const p = audio.play(); // ← ここがユーザー操作内であることが重要
        if (p && typeof p.then === "function") await p;
        audio.pause(); // “再生できる権利”を得るだけでOK
      } catch (e) {
        // NotAllowedError 等は無視してOK（Web Audio解錠だけで足りることも多い）
      }
    }

    unlocked = true;
    w.__audioUnlocked = true;
    d.dispatchEvent(new CustomEvent("audio:unlocked")); // 任意でUIに通知
    return true;
  }

  // 公開API：任意のイベントハンドラ内で await して使える
  w.ensureAudioUnlocked = unlockOnce;

  // 保険：最初のジェスチャで自動解錠（どこを押してもOK）
  const handler = () => {
    unlockOnce();
    d.removeEventListener("pointerdown", handler, true);
    d.removeEventListener("click", handler, true);
    d.removeEventListener("touchstart", handler, true);
  };
  d.addEventListener("pointerdown", handler, true);
  d.addEventListener("click", handler, true); // 旧環境の保険
  d.addEventListener("touchstart", handler, true); // iOS古参端末の保険
})();

//<audio> の状態をイベントで拾う
// 動作が安定している間は、ログはそのまま
const a = document.getElementById("alarmSound");
["loadstart", "loadeddata", "canplaythrough", "error", "play", "pause"].forEach(
  (ev) => {
    a.addEventListener(ev, () => console.log("[alarm]", ev, a.currentTime));
  }
);
// 仕上げの“安心テスト”ミニボタンをデバッグ中だけ
document.getElementById("pingAudio")?.addEventListener("click", async () => {
  await window.ensureAudioUnlocked();
  const a = document.getElementById("alarmSound");
  a.currentTime = 0;
  await a.play();
  setTimeout(() => a.pause(), 300); // ピッと短く
});
