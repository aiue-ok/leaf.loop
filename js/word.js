const wordEl = document.querySelector(".word");

const chapters = [
  // 第1章：はじまりの音
  {
    id: "chapter-1",
    title: "はじまりの音",
    background: "bg-ch1",
    words: [
      "ビッグバン",
      /* "始まり",
      "光のひとしずく",
      "宇宙の夜明け",
      "透明",
      "解放",
      "時間",
      "空間",
      "物質", */
      "呼吸",
    ],
  },

  // 2章｜ゆらぎと法則（物理と観測）
  {
    id: "chapter-2",
    title: "ゆらぎと法則",
    background: "bg-ch2",
    words: [
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
  },
  // 第3章：星と時間
  {
    id: "chapter-3",
    title: "星と時間",
    background: "bg-ch3",
    words: [
      //     // Chapter 3: 星と時間（cinematic）
      //     { text: "星屑", bgClass: "bg-star" }, // 小粒から始めて目を馴らす
      //     { text: "恒星", bgClass: "bg-star" }, // 明るさの核
      //     { text: "連星", bgClass: "bg-star" }, // 反復＝リズム
      //     { text: "星雲", bgClass: "bg-nebula" }, // ふわっと面で広がる
      //     { text: "銀河", bgClass: "bg-galaxy" }, // スケール最大の“像”
      //     { text: "引力", bgClass: "bg-gravity" }, // 力学へブリッジ①
      //     { text: "光年", bgClass: "bg-ly" }, // 時間・距離の意識
      //     { text: "過去", bgClass: "bg-past2" }, // 彩度を落として“後ろへ”
      //     { text: "風", bgClass: "bg-wind" }, // 宇宙風＝場の流れ（重力系演出でOK）
      //     { text: "ダークエネルギー", bgClass: "bg-gravity" }, // 見えない加速
      //     { text: "暗黒", bgClass: "bg-darkness" }, // 終曲へ（短め表示→fade-out）
    ],
  },

  // 第4章：ゆるやかな問い
  {
    id: "chapter-4",
    title: "ゆるやかな問い",
    background: "bg-ch4",
    words: [
      //     "無",
      //     "兆し",
      //     "残響",
      //     "思念",
      //     "まなざし",
      //     "ゆらぎ",
      //     "不確定",
      //     "予感",
      //     "間（ま）",
      //     "静寂",
    ],
  },

  // 第5章：還りゆく光
  {
    id: "chapter-5",
    title: "還りゆく光",
    background: "bg-ch5",
    words: [
      //     "遠さ",
      //     "すべて",
      //     "宙",
      //     "輪郭",
      //     "幻",
      //     "ふるえ",
      //     "未来",
      //     "光速",
      //     "帰還",
      //     "余白",
      //     "白",
    ],
  },
];

const interludes = [
  {
    h: "遠くのことを少しだけ",
    title: "第1章：はじまりの音",
    text: "（生成と誕生）",
    titleFrom: "chapter-1",
  },
  {
    title: "第2章：ゆらぎと法則",
    text: "（物理と観測）",
    titleFrom: "chapter-2",
  },
  {
    title: "第3章：星と時間",
    text: "（音も届かぬ空白）",
    titleFrom: "chapter-3",
  },
  {
    title: "第4章：ゆるやかな問い",
    text: "（見えない温度）",
    titleFrom: "chapter-4",
  },
  {
    title: "第5章：還りゆく光",
    text: "（帰還と余白）",
    titleFrom: "chapter-5",
  },
];

const playlist = [
  // 🌟 最初のインタールード（第1章のタイトルだけを先に見せたい）
  {
    interlude: true,
    text: interludes[0].h, // "はじまりの音"
    background: "bg-intro",
  },
  {
    interlude: true,
    text: interludes[0].title,
    background: "bg-interlude-0",
    titleFrom: "chapter-1",
  },
  // ここから第1章の言葉たち
  chapters[0],
  {
    interlude: true,
    text: interludes[1].title,
    background: "bg-interlude-1",
    titleFrom: "chapter-2",
  },
  chapters[1],
  {
    interlude: true,
    text: interludes[2].title,
    background: "bg-interlude-2",
    titleFrom: "chapter-3",
  },
  chapters[2],
  {
    interlude: true,
    text: interludes[3].title,
    background: "bg-interlude-3",
    titleFrom: "chapter-4",
  },
  chapters[3],
  {
    interlude: true,
    text: interludes[4].title,
    background: "bg-interlude-4",
    titleFrom: "chapter-5",
  },
  chapters[4],
];

// フラット化：章＋間奏を順番に整列
const flattenedWords = [];

playlist.forEach((item, index) => {
  if (item.interlude) {
    // 🌟章タイトル（間奏）
    flattenedWords.push({
      text: item.text,
      background: item.background,
      interlude: true,
    });
  } else {
    // 🌟章本文（言葉たち）
    item.words.forEach((word) => {
      if (typeof word === "string") {
        // 旧形式
        flattenedWords.push({
          text: word,
          background: item.background,
          interlude: false,
        });
      } else {
        // 新形式（オブジェクト形式）
        flattenedWords.push({
          text: word.text,
          background: item.background,
          bgClass: word.bgClass,
          interlude: false,
        });
      }
    });
  }
});

// playlist.forEach((item) => {
//   if (item.words) {
//     // 章
//     item.words.forEach((word) => {
//       flattenedWords.push({
//         text: word,
//         background: item.background,
//         isInterlude: false,
//       });
//     });
//   } else if (item.interlude) {
//     // 間奏
//     flattenedWords.push({
//       text: item.text,
//       background: item.background,
//       isInterlude: true, // ← 間奏には true を付ける！
//     });
//   }
// });
// flatten しなおす（間奏は入れない！）
// const flattenedWords = chapters.flatMap(
// (chapter) =>
// map与えられた関数を配列のすべての要素に対して呼び出し、その結果からなる新しい配列を生成
// chapter.words.map((word) => ({
// text 配列のオブジェクトにつけたキーの名前（自由）
// text: word,
// background: chapter.background,
// })) //オブジェクトリテラル（定義）
// );

let currentIndex = 0;
// 次の処理までの待機時間 使ってないっぽい⚠️
const intervalTime = 4000;
const body = document.body;

function showNextWord() {
  // 👷→ URL末尾に ?dev を付けたときだけ有効。
  // ⚒️ 例: http:localhost:5500/universe.html?dev
  if (
    location.search.includes("dev") &&
    document.body.classList.contains("bg-ch1")
  ) {
    console.log("🚦 .bg-ch1 なので停止（devモード）");
    return; //条件を満たしたら return; でその場で関数終了 → 次の単語に進まなくなる。
  }

  if (currentIndex >= flattenedWords.length) {
    clearInterval(interval);
    return;
  }
  // 「flattenedWords の中の現在の currentIndex 番目の要素（＝単語オブジェクト）
  const current = flattenedWords[currentIndex];
  // ⏱ 次の表示までの時間
  const isInterlude = current.isInterlude;

  // 🔁 表示済みの単語をいったん fade-out させる
  wordEl.classList.remove("fade-in");
  wordEl.classList.add("fade-out");

  // 次を表示するまで少し待ってから切り替え
  const fadeDuration = 1500; // 1.5秒のアニメーションと揃える

  setTimeout(() => {
    // 1) 先に背景クラス（色含む）を切り替える
    document.body.className = `universe ${current.background}`;
    if (current.bgClass) {
      body.classList.remove(
        ...Array.from(body.classList).filter((cls) => cls.startsWith("bg-"))
      );
      body.classList.add(current.bgClass);
    }
    // 2) そのあとでテキストを差し替える
    // 切り替え処理 画面の単語表示部分に、を表示
    //  current.text は現在のcurrent番目の単語テキスト "始まり" を取り出すということ
    // .textContent は HTML 要素にテキストを入れる標準プロパティ
    wordEl.textContent = current.text;

    // 3) 最後にアニメ付与
    // アニメーション演出（fade-in）
    wordEl.classList.remove("fade-out");
    // void 演算子は与えられた式 (expression) を評価し、undefined を返します
    // offsetWidth プロパティは読み取り専用.要素のレイアウト幅を整数として返します
    void wordEl.offsetWidth;
    wordEl.classList.add("fade-in");

    // h1 を最初の1回だけ非表示に ⚠️つかってない
    /*     if (currentIndex === 1 && !hasHiddenTitle) {
      console.log("🫥 h1を消す処理 実行！");
      title.classList.add("hidden");
      hasHiddenTitle = true;
    }
 */
    currentIndex++;

    // 内容によって秒数を変える
    if (currentIndex < flattenedWords.length) {
      const delay = isInterlude ? 2000 : 2000;
      setTimeout(showNextWord, delay); // ⏱️ 次を呼ぶ（再帰）
    } else {
      console.log("🌟 最後まで表示しましたしぇ〜！");

      wordEl.classList.remove("fade-in");
      wordEl.classList.add("fade-out");

      // fade-outが終わるまで待ってから非表示
      setTimeout(() => {
        wordEl.style.display = "none"; // 完全に消す
      }, fadeDuration);

      return; // ここでループを終了
    }
  }, fadeDuration);
}

// showNextWord(); // 最初の1語

//  ⚠️つかってない
// 1語目の表示と同時にh1を消す
// const title = document.getElementById("page-title");

// // 一度だけ非表示にするフラグ
// let hasHiddenTitle = false;

// function changeWord() {
//   currentIndex++;
//   if (currentIndex >= words.length) {
//     currentIndex = 0;
//     console.log("🌀 currentIndex:", currentIndex);
//   }

//   // 1回目だけ h1 を非表示にする
//   if (currentIndex === 0 && !hasHiddenTitle) {
//     console.log("🚨 h1非表示処理 実行！");
//     setTimeout(() => {}, 500); // 3秒くらいで消すと美しいかも
//     hasHiddenTitle = true;
//   }
// }

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
      // PAUSE,
      // "透明",
      // PAUSE,
      // "解放",
      // PAUSE,
      // "時間",
      // PAUSE,
      // "空間",
      // PAUSE,
      // "物質",
      // PAUSE,
      "呼吸",
    ],
    interval: 1200, //「 次の言葉までの基本待ち時間（ms）」
    pauseMs: 900,
    jitter: 0, // その待ち時間に足すランダムなゆらぎ（ms） まずは0で淡々（後で80-120くらい）
    durationMs: 9000, // words内[(言葉数 × interval) + (PAUSE数 × pauseMs)]の秒数、その章を回す
  },

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
    durationMs: 3000,
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
      PAUSE,
      "星屑",
      PAUSE,
      "暗黒",
      //     // Chapter 3: 星と時間（cinematic）
      //     { text: "星屑", bgClass: "bg-star" }, // 小粒から始めて目を馴らす
      //     { text: "恒星", bgClass: "bg-star" }, // 明るさの核
      //     { text: "連星", bgClass: "bg-star" }, // 反復＝リズム
      //     { text: "星雲", bgClass: "bg-nebula" }, // ふわっと面で広がる
      //     { text: "銀河", bgClass: "bg-galaxy" }, // スケール最大の“像”
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
    durationMs: 3000,
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
      PAUSE,
      "無",
      PAUSE,
      PAUSE,
      PAUSE,
      "兆し",
      PAUSE,
      PAUSE,
      "残響",
      //     "思念",
      //     "まなざし",
      //     "ゆらぎ",
      //     "不確定",
      //     "予感",
      //     "間（ま）",
      //     "静寂",
    ],
    interval: 1200, //「 次の言葉までの基本待ち時間（ms）」
    pauseMs: 1400,
    jitter: 0, // その待ち時間に足すランダムなゆらぎ（ms） まずは0で淡々（後で80-120くらい）
    durationMs: 9000,
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
      // PAUSE,
      // "幻",
      // PAUSE,
      // "ふるえ",
      // PAUSE,
      // "未来",
      // PAUSE,
      // "光速",
      // PAUSE,
      // "帰還",
      // PAUSE,
      // "余白",
      // PAUSE,
      // PAUSE,
      // "白",
    ],
    interval: 1200, //「 次の言葉までの基本待ち時間（ms）」
    pauseMs: 1200,
    jitter: 0, // その待ち時間に足すランダムなゆらぎ（ms） まずは0で淡々（後で80-120くらい）
    durationMs: 9000, // words内[(言葉数 × interval) + (PAUSE数 × pauseMs)]の秒数、その章を回す
  },
];

// --- util ---
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function setWord(el, text) {
  el.textContent = text;
}

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

  const body = document.body;

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
function fadeOutWord(el, ms = 1300) {
  if (!el) return;
  el.classList.add("is-fade");
}

// .is-fade外す opacity: 1;
function fadeInWord(el, ms = 900) {
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
    const item = words[i % words.length];

    if (item === PAUSE) {
      // 見せない休符：レイアウト維持
      el.textContent = "\u00A0";
    } else {
      el.textContent = item;
    }

    i += 1;

    const nextMs = item === PAUSE ? pauseMs ?? interval : interval;

    const wobble = (Math.random() * 2 - 1) * jitter;
    // 【時間をおいて自分を呼び直す仕組み】
    timerId = window.setTimeout(tick, Math.max(80, interval + wobble));
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
  const wordEl = document.querySelector(".word");
  if (!wordEl) return;

  // 0) 着地：intro（見たい状態）
  // const INTRO_TEXT = "遠くのことを少しだけ";
  // ===== entrance: INTRO -> fadeout -> whiteout -> CH1 title =====
  setTheme("theme-intro");
  setWord(wordEl, INTRO_TEXT);
  fadeInWord(wordEl); // 念のため（is-fade を外す）
  await sleep(1000); // intro を見せる（好みで 600-1400）

  // intro を消す
  fadeOutWord(wordEl);
  await sleep(420); // intro の消え切り待ち（CSSのword transitionに合わせて調整）

  // 白幕
  whiteoutOnce({ fadeMs, holdMs });
  await sleep(fadeMs + holdMs + fadeMs);

  // 白の裏で chapter-1 を準備（まだ見せない）
  const first = CHAPTERS[0];
  setTheme(first.theme);
  setWord(wordEl, first.title);
  fadeOutWord(wordEl); // 白明けでフェードインさせるため隠す

  // 白が明けたら章タイトルを出す
  fadeInWord(wordEl);
  await sleep(1600); // 章タイトルを見せる

  // ===== ◆◆ くりかえし ◆◆ =====
  for (const ch of CHAPTERS) {
    console.log("▶ chapter", ch.id, {
      whiteoutIn: ch.whiteoutIn,
      whiteoutOut: ch.whiteoutOut,
      interval: ch.interval,
      pauseMs: ch.pauseMs,
      durationMs: ch.durationMs,
    });

    // 章タイトル表示　章タイトル〜一拍
    // if (ch.whiteoutIn) {　← 取り消した
    // 第1章は入口ですでに出してる、二度出し回避
    if (ch !== CHAPTERS[0]) {
      whiteoutOnce({ fadeMs, holdMs });
      await sleep(fadeMs + holdMs + fadeMs); // 1200 + 1200 + 1200 = 3600ms
    }

    setTheme(ch.theme);
    // 文字表示
    fadeInWord(wordEl);
    setWord(wordEl, ch.title);

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
    //   fadeInWord(wordEl);
    //   console.log(`🚦 dev 続ける at ${ch.id}`);
    //   continue;
    // }
    // ---👷---

    await sleep(2400); // タイトルを読ませる
    // 消える　タイトルにis-fade をつける
    fadeOutWord(wordEl);
    await sleep(1800);
    // ことば表示のために透明解除
    fadeInWord(wordEl); // 次のwordsを出す準備（is-fade解除）

    // 1. words を回す
    const stop = playWords({
      el: wordEl,
      words: ch.words,
      interval: ch.interval,
      pauseMs: ch.pauseMs,
      jitter: ch.jitter,
    });
    console.log("theme now:", ch.id, ch.theme, document.body.className);
    await sleep(ch.durationMs);

    // 最後のことばだけ消える　is-fade をつける
    fadeOutWord(wordEl);

    // 章終わり：まず止めて、最後の言葉を固定（←ここが肝）
    stop();

    // ここで一拍（“切断”回避のための余白）
    await sleep(3000);

    // コンソールログ：fadeOutWord(wordEl);
    console.log("after fadeOutWord", getComputedStyle(wordEl).opacity);

    // 章と章の間のwhiteoutOut（必要な章だけ）
    if (ch.whiteoutOut) {
      // 白の裏で帰還先をセット（観客には白で隠れる）

      // const INTRO_TEXT = "遠くのことを少しだけ";
      setTheme("theme-intro");
      setWord(wordEl, INTRO_TEXT);

      whiteoutOnce({ fadeMs, holdMs });
      await sleep(fadeMs * 2 + holdMs);
      // 白が明けたら、じわっと出す
      await sleep(1000);
      fadeInWord(wordEl);
      // } else {
      //   setTheme("theme-intro");
      //   setWord(wordEl, INTRO_TEXT);
    }
  }
  // ===== ◆◆ くりかえし終わり ◆◆ =====

  // 2) 帰還：introに戻して停止
  // setTheme("theme-intro");
  // setWord(wordEl, INTRO_TEXT);
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
