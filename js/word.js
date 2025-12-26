const wordEl = document.querySelector(".word");
const body = document.body;

// 上の行は "legacy/js/11月までのword.js" に保存済み

/* =========================================================
   universe: minimal sequence (behind a flag)
   - intro -> (optional whiteout) -> chapter title -> words -> intro
   - querySelector is only ".word"
   ========================================================= */

const USE_NEW_UNIVERSE_SEQUENCE = true; // ← 統合テスト中は true

const INTRO_TEXT = "遠くのことを少しだけ";
const PAUSE = Symbol("pause");

// まずは1章だけ（増やすのは後）
const CHAPTERS = [
  {
    id: "chapter-1",
    theme: "theme-ch1", // ← CSS側が無ければ無視される（安全）
    whiteoutIn: true, // 章手前のwhiteout
    whiteoutOut: false, // 最終でintroに戻る時にwhiteoutしたければtrue
    title: "第一章　はじまりの音",
    words: [
      PAUSE,
      "ビッグバン",
      PAUSE,
      "始まり",
      PAUSE,
      "光のひとしずく",
      PAUSE,
      "宇宙の夜明け",
      PAUSE,
      "透明",
      PAUSE,
      "解放",
      PAUSE,
      "時間",
      PAUSE,
      "空間",
      PAUSE,
      "物質",
      PAUSE,
      "呼吸",
    ],
    interval: 1200, //「 次の言葉までの基本待ち時間（ms）」
    pauseMs: 900,
    jitter: 0, // その待ち時間に足すランダムなゆらぎ（ms） まずは0で淡々（後で80-120くらい）
    durationMs: 7000, // words内[(言葉数 × interval) + (PAUSE数 × pauseMs)]の秒数、その章を回す
  },

  // 例（仮）：
  // interval: 1200
  // pauseMs: 900
  // durationMs: 7000〜9000（章の語数による）
  // ここは完璧を目指さず、**“観測して気持ちいい”**を優先。

  // 2章｜ゆらぎと法則（物理と観測）
  {
    id: "chapter-2",
    theme: "theme-ch2", // ← CSS側が無ければ無視される（安全）
    whiteoutIn: false, // 章手前のwhiteout
    whiteoutOut: false, // 最終でintroに戻る時にwhiteoutしたければtrue
    title: "ゆらぎと法則",
    background: "bg-ch2",
    words: [
      PAUSE,
      "重力波",
      PAUSE,
      "事象の地平線",
      PAUSE,
      "重力波",
      PAUSE,
      "事象の地平線",
      PAUSE,
      "重力波",
      PAUSE,
      "事象の地平線",
      PAUSE,
      "重力波",
      PAUSE,
      "事象の地平線",
      // 観測の始まり系
      // { text: "重力波", bgClass: "bg-wave" },
      // { text: "電磁波", bgClass: "bg-wave" },
      // { text: "素粒子", bgClass: "bg-quantum" },
      // { text: "量子", bgClass: "bg-quantum" },
      // 空間や形の変化系
      // { text: "ゆがみ", bgClass: "bg-distortion" },
      // { text: "ひずみ", bgClass: "bg-distortion" },
      // { text: "膨張", bgClass: "bg-distortion" },
      // 秩序やパターン系
      // { text: "軌道", bgClass: "bg-orbit" },
      // { text: "対称性", bgClass: "bg-symmetry" },
      // 境界系で終わり
      // { text: "事象の地平線", bgClass: "bg-horizon" },
    ],
    interval: 1200, //「 次の言葉までの基本待ち時間（ms）」
    pauseMs: 900,
    jitter: 0, // その待ち時間に足すランダムなゆらぎ（ms） まずは0で淡々（後で80-120くらい）
    durationMs: 7000,
  },

  // 第3章：星と時間
  {
    id: "chapter-3",
    theme: "theme-ch3", // ← CSS側が無ければ無視される（安全）
    whiteoutIn: false, // 章手前のwhiteout
    whiteoutOut: false, // 最終でintroに戻る時にwhiteoutしたければtrue
    title: "星と時間",
    background: "bg-ch3",
    words: [
      "星屑",
      PAUSE,
      "暗黒",
      PAUSE,
      "星屑",
      PAUSE,
      "暗黒",
      PAUSE,
      "星屑",
      PAUSE,
      "暗黒",
      PAUSE,
      "星屑",
      PAUSE,
      "暗黒",
      PAUSE,
      "暗黒",
      PAUSE,
      "星屑",
      PAUSE,
      "暗黒",
      //     // Chapter 3: 星と時間（cinematic）
      // { text: "星屑", bgClass: "bg-star" }, // 小粒から始めて目を馴らす
      // { text: "恒星", bgClass: "bg-star" }, // 明るさの核
      // { text: "連星", bgClass: "bg-star" }, // 反復＝リズム
      // { text: "星雲", bgClass: "bg-nebula" }, // ふわっと面で広がる
      // //     { text: "銀河", bgClass: "bg-galaxy" }, // スケール最大の“像”
      //     { text: "引力", bgClass: "bg-gravity" }, // 力学へブリッジ①
      //     { text: "光年", bgClass: "bg-ly" }, // 時間・距離の意識
      //     { text: "過去", bgClass: "bg-past2" }, // 彩度を落として“後ろへ”
      //     { text: "風", bgClass: "bg-wind" }, // 宇宙風＝場の流れ（重力系演出でOK）
      //     { text: "ダークエネルギー", bgClass: "bg-gravity" }, // 見えない加速
      //     { text: "暗黒", bgClass: "bg-darkness" }, // 終曲へ（短め表示→fade-out）
    ],
    interval: 1200, //「 次の言葉までの基本待ち時間（ms）」
    pauseMs: 900,
    jitter: 0, // その待ち時間に足すランダムなゆらぎ（ms） まずは0で淡々（後で80-120くらい）
    durationMs: 7000,
  },

  // 第4章：ゆるやかな問い
  {
    id: "chapter-4",
    theme: "theme-ch4", // ← CSS側が無ければ無視される（安全）
    whiteoutIn: false, // 章手前のwhiteout
    whiteoutOut: false, // 最終でintroに戻る時にwhiteoutしたければtrue
    title: "ゆるやかな問い",
    background: "bg-ch4",
    words: [
      "無",
      PAUSE,
      "兆し",
      PAUSE,
      "残響",
      PAUSE,
      "思念",
      PAUSE,
      "まなざし",
      PAUSE,
      "ゆらぎ",
      PAUSE,
      "不確定",
      PAUSE,
      "予感",
      PAUSE,
      "間（ま）",
      PAUSE,
      "静寂",
    ],
    interval: 1200, //「 次の言葉までの基本待ち時間（ms）」
    pauseMs: 900,
    jitter: 0, // その待ち時間に足すランダムなゆらぎ（ms） まずは0で淡々（後で80-120くらい）
    durationMs: 7000,
  },

  // 第5章：還りゆく光
  {
    id: "chapter-5",
    theme: "theme-ch5", // ← CSS側が無ければ無視される（安全）
    whiteoutIn: false, // 章手前のwhiteout
    whiteoutOut: true, // 最終でintroに戻る時にwhiteoutしたければtrue
    title: "還りゆく光",
    background: "bg-ch5",
    words: [
      PAUSE,
      "遠さ",
      PAUSE,
      "すべて",
      PAUSE,
      "宙",
      PAUSE,
      "輪郭",
      PAUSE,
      "幻",
      PAUSE,
      "ふるえ",
      PAUSE,
      "未来",
      PAUSE,
      "光速",
      PAUSE,
      "帰還",
      PAUSE,
      "余白",
      PAUSE,
      "白",
    ],
    interval: 1200, //「 次の言葉までの基本待ち時間（ms）」
    pauseMs: 900,
    jitter: 0, // その待ち時間に足すランダムなゆらぎ（ms） まずは0で淡々（後で80-120くらい）
    durationMs: 7000, // words内[(言葉数 × interval) + (PAUSE数 × pauseMs)]の秒数、その章を回す
  },
];

// --- util ---
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ことば
function setWord(el, text) {
  el.textContent = text;
}

// テーマ
function setTheme(themeClass) {
  if (!themeClass) return;

  document.body.classList.remove(
    "theme-intro",
    "theme-ch1",
    "theme-ch2",
    "theme-ch3",
    "theme-ch4",
    "theme-ch5"
  );

  // theme-* をいったん全部集めてから消す
  const toRemove = [];
  body.classList.forEach((c) => {
    if (c.startsWith("theme-")) toRemove.push(c);
  });
  toRemove.forEach((c) => body.classList.remove(c));

  // 新しいテーマを追加
  if (themeClass) body.classList.add(themeClass);
}

// ===== fade helpers =====
// ms 300を変更
// .is-fade opacity: 0;
function fadeOutWord(el, ms = 500) {
  if (!el) return;
  el.classList.add("is-fade");
}

// .is-fade外す opacity: 1;
function fadeInWord(el, ms = 2000) {
  if (!el) return;
  el.classList.remove("is-fade");
}

/**
 * NOTE:
 * whiteoutOnce が既にあるならここで呼べます。
 * 無ければ何もしないので、まずは動作確認優先でもOK。
 */

/* 白の長さを変えたいなら holdMs を触る。
fadeMsは基本固定、holdMsで演出。
fadeMs = 視覚的なフェード速度
holdMs = 白画面の滞在（間） */
function whiteoutOnce({ fadeMs = 1000, holdMs = 0 } = {}) {
  const overlay = document.getElementById("whiteout");
  if (!overlay) return;

  // 連打ガード
  if (overlay.dataset.running === "1") return;
  overlay.dataset.running = "1";

  overlay.classList.add("active");

  // フェードINが終わってから hold → フェードOUT
  window.setTimeout(() => {
    window.setTimeout(() => {
      overlay.classList.remove("active");

      // フェードOUTが終わったら解除
      window.setTimeout(() => {
        delete overlay.dataset.running;
      }, fadeMs);
    }, holdMs);
  }, fadeMs);
}

function playWords({ el, words, interval = 1100, pauseMs = null, jitter = 0 }) {
  let i = 0;
  let timerId = null;
  let stopped = false;

  // tick() が1回実行される
  // 中で 自分自身（tick）を予約する
  // すると interval 後にまた tick() が動く
  // そしてまた予約する…
  const tick = () => {
    if (stopped) return;

    // 配列の最後まで行くと、また最初に戻る【配列を回す仕組み①】
    // el.textContent = words[i % words.length];
    // const item = words[i % words.length];

    // if (item === PAUSE) {
    //   // 見せない休符：レイアウト維持
    //   el.textContent = "\u00A0";
    // } else {
    //   el.textContent = item;
    // }

    const item = words[i % words.length];

    if (item === PAUSE) {
      // 何もしない　2025/12/25
      // 時間だけ消費する
    } else {
      fadeInWord(el); // ← 念のため毎回呼ぶ
      el.textContent = item;
    }
    // ポイント
    // PAUSEは「時間トークン」に専念
    // 表示状態は 直前の単語を保つ
    // opacity が 0 のまま固定される事故が起きない
    // 完全な無音（無表示）にしたい時は？」
    // その場合は opacityじゃなく visibility を使うのが安全

    i += 1;

    const nextMs = item === PAUSE ? pauseMs ?? interval : interval;

    const wobble = (Math.random() * 2 - 1) * jitter;
    // 【時間をおいて自分を呼び直す仕組み】
    timerId = window.setTimeout(tick, nextMs, Math.max(80, interval + wobble));
  };

  tick();

  return () => {
    stopped = true;
    // すでに予約済みの次回 tick を キャンセル
    if (timerId) window.clearTimeout(timerId);
    return;
  };
}

async function runUniverseSequence() {
  // 白幕そのものの時間
  const fadeMs = 1400;
  const holdMs = 900;
  // const inMs = 2000; みやすいように置いておく
  // const outMs = 500;
  const wordEl = document.querySelector(".word");
  const seqStart = performance.now();
  console.log("🚀 universe start");

  if (!wordEl) return;

  // 0) 着地：intro（見たい状態）　⚠️ 1回だけ
  // const INTRO_TEXT = "遠くのことを少しだけ";
  // ===== entrance: INTRO -> fadeout -> whiteout -> CH1 title =====
  setTheme("theme-intro");
  setWord(wordEl, INTRO_TEXT);
  // .is-fade外す opacity: 1;　2秒
  fadeInWord(wordEl);
  // intro を見せる（好みで 600-1400）
  await sleep(1000);
  // intro を消す ms=500
  fadeOutWord(wordEl);
  // intro の消え切り待ち（CSSのword transitionに合わせて調整）
  // await sleep(500);
  // 白幕
  whiteoutOnce({ fadeMs, holdMs });
  await sleep(fadeMs + holdMs + fadeMs);

  // 白の裏で chapter-1 を準備（まだ見せない）
  // const first = CHAPTERS[0];
  // setTheme(first.theme);
  // setWord(wordEl, first.title);

  // 白が明けたら章タイトルを出す
  // fadeInWord(wordEl);
  // await sleep(2000); // 章タイトルを見せる
  // 消しておく
  // fadeOutWord(wordEl);

  // スタート ▶️
  // ===== ◆◆ くりかえし ◆◆ =====
  for (const ch of CHAPTERS) {
    const chStart = performance.now();
    console.log(`🪐 start ${ch.id || ch.title}`);

    // ▼ コンソール
    // console.log("▶ chapter", ch.id, {
    //   whiteoutIn: ch.whiteoutIn,
    //   whiteoutOut: ch.whiteoutOut,
    //   interval: ch.interval,
    //   pauseMs: ch.pauseMs,
    //   durationMs: ch.durationMs,
    // });

    // 章タイトル表示　章タイトル〜一拍
    // if (ch.whiteoutIn) {　← 取り消した
    // 第1章は入口ですでに出してる、二度出し回避
    // if (ch !== CHAPTERS[0]) {
    //   whiteoutOnce({ fadeMs, holdMs });
    //   await sleep(fadeMs + holdMs + fadeMs); // 1200 + 1200 + 1200 = 3600ms
    // }
    function resetWordState(el) {
      el.classList.remove("is-enter", "is-leave", "is-fade");
      el.style.opacity = "";
    }

    // 一拍
    await sleep(300);
    // 色テーマセット
    setTheme(ch.theme);

    // --- 章タイトル ---
    resetWordState(wordEl);
    // 章タイトル
    setWord(wordEl, ch.title);
    // 文字表示ON
    fadeInWord(wordEl);
    await sleep(2400); // タイトルを読ませる
    // 消す　表示OFF
    fadeOutWord(wordEl);
    await sleep(2000); // 章タイトルを見せる

    // --- 単語 ---
    // ことば表示のために表示ON
    fadeInWord(wordEl); // 次のwordsを出す準備（is-fade解除）

    // ここからことばまわす
    // ---👷---
    // 🚧 devモード：指定章で停止
    // 👷→ URL末尾に ?dev を付けたときだけ有効。
    // ⚒️ 例: http:localhost:5500/universe.html?dev
    // const IS_DEV = location.search.includes("dev");
    // const DEV_STOP_CHAPTER_ID = "chapter-1"; //「特定の章で止めたい」
    // const DEV_ONLY_CHAPTER_ID = "chapter-1"; //「特定の章“だけ”再生したい」

    // // ▼ たとえば「3 章で止めたい」なら：
    // if (IS_DEV && ch.id === DEV_STOP_CHAPTER_ID) {
    //   console.log(`🚦 dev stop 停止🛑 at ${ch.id}`);
    //   break; // ← return じゃなく break
    // }
    // ---
    // ▼「特定の章“だけ”再生したい」場合
    // if (IS_DEV && DEV_ONLY_CHAPTER_ID && ch.id !== DEV_ONLY_CHAPTER_ID) {
    //   // fadeInWord(wordEl);
    //   console.log(`🚦 dev 続ける at ${ch.id}`);
    //   continue;
    // }
    // ---👷---
    console.log("words start", ch.title);
    // 1. words を回す
    const stop = playWords({
      el: wordEl,
      words: ch.words,
      interval: ch.interval,
      pauseMs: ch.pauseMs,
      jitter: ch.jitter,
    });

    // ▼ コンソール
    // console.log("theme now:", ch.id, ch.theme, document.body.className);
    // 章の時間
    await sleep(ch.durationMs);
    // 最後のことばだけ消す
    // fadeOutWord(wordEl);

    // 章終わり：まず止めて、最後の言葉を固定（←ここが肝）
    stop();
    console.log("words stop", ch.title);
    // 最後のことばだけ消す
    fadeOutWord(wordEl);
    // ここで一拍（“切断”回避のための余白）
    await sleep(3000);

    const chEnd = performance.now();
    console.log(
      `🪐 end ${ch.id || ch.title} : ${Math.round(chEnd - chStart)} ms`
    );

    // コンソールログ：fadeOutWord(wordEl);
    console.log("after fadeOutWord", getComputedStyle(wordEl).opacity);
    console.log("CH start", ch.title, "t=", Math.round(performance.now()));

    // 章と章の間のwhiteoutOut（必要な章だけ）
    // if (ch.whiteoutOut) {
    //   // 白幕
    //   whiteoutOnce({ fadeMs, holdMs });
    //   await sleep(fadeMs * 2 + holdMs);
    //   // 白が明けたら、じわっと出す
    //   await sleep(1000);
    //   // 表示ON
    //   fadeInWord(wordEl);
    // } else {
    //   //  2) 帰還：introに戻して停止
    //   setTheme("theme-intro");
    //   setWord(wordEl, INTRO_TEXT);
    // }
  }
  // ===== ◆◆ くりかえし終わり ◆◆ =====
  const seqEnd = performance.now();
  console.log(`🏁 universe end : ${Math.round(seqEnd - seqStart)} ms`);

  // ループが全部終わったら、最後にだけ戻す（必要なら）
  setTheme("theme-intro");
  setWord(wordEl, INTRO_TEXT);
  fadeInWord(wordEl);
}

/* =========================================================
   bootstrap (keep existing logic, but ensure only one runs)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  if (USE_NEW_UNIVERSE_SEQUENCE) {
    runUniverseSequence();
    return;
  }

  // ▼ ここに「既存の初期化」を残す（呼び出す）▼
  if (!USE_NEW_UNIVERSE_SEQUENCE) {
    showNextWord(); // 既存の初期化（旧ルート）
  }
  // initWord(); などあなたの既存エントリポイント
});
