// word_test.js
// universe 演出テスト用（最小構成）

const INTRO_TEXT = "遠くのことを少しだけ";

const CHAPTERS = [
  {
    title: "第一章　はじまりの音",
    words: ["ビッグバン", "はじまり", "光のひとしずく", "宇宙の夜明け"],
  },
];

// --- util ---
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function setWord(el, text) {
  el.textContent = text;
}

function playWords({ el, words, interval = 1100 }) {
  let i = 0;
  let timerId = null;

  const tick = () => {
    el.textContent = words[i % words.length];
    i += 1;
    timerId = window.setTimeout(tick, interval);
  };

  tick();

  return () => {
    if (timerId) window.clearTimeout(timerId);
  };
}

async function runUniverseTest() {
  const wordEl = document.querySelector(".universe__word");
  if (!wordEl) return;

  // 0) 着地時：intro
  setWord(wordEl, INTRO_TEXT);
  await sleep(1800);

  // 1) 第一章
  const chapter = CHAPTERS[0];

  setWord(wordEl, chapter.title);
  await sleep(1600);

  const stop = playWords({
    el: wordEl,
    words: chapter.words,
    interval: 1200,
  });

  // ワード再生時間
  await sleep(6000);
  stop();

  // 2) ラスト：intro に戻す
  setWord(wordEl, INTRO_TEXT);
}

document.addEventListener("DOMContentLoaded", () => {
  runUniverseTest();
});
