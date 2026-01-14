const wordEl = document.querySelector(".word");

const chapters = [
  {
    id: "chapter-1",
    title: "はじまりの音",
    background: "bg-ch1",
    words: [
      "ビッグバン",
      "始まり",
      "光のひとしずく",
      "宇宙の夜明け",
      "時間",
      "空間",
      "物質",
      "透明",
      "解放",
      "呼吸",
    ],
  },
  {
    id: "chapter-2",
    title: "ゆらぎと法則",
    background: "bg-ch2",
    words: [
      { text: "重力波", bgClass: "bg-wave" },
      { text: "電磁波", bgClass: "bg-wave" },
      { text: "対称性", bgClass: "bg-symmetry" },
      { text: "膨張", bgClass: "bg-distortion" },
      { text: "事象の地平線", bgClass: "bg-horizon" },
    ],
  },
  {
    id: "chapter-3",
    title: "星と時間",
    background: "bg-ch3",
    words: [
      { text: "星屑", bgClass: "bg-star" }, // 小粒から始めて目を馴らす
      { text: "恒星", bgClass: "bg-star" }, // 明るさの核
      { text: "連星", bgClass: "bg-star" }, // 反復＝リズム
      { text: "星雲", bgClass: "bg-nebula" }, // ふわっと面で広がる
      { text: "銀河", bgClass: "bg-galaxy" }, // スケール最大の“像”
      { text: "光年", bgClass: "bg-ly" }, // 時間・距離の意識
      { text: "過去", bgClass: "bg-past2" }, // 彩度を落として“後ろへ”
      { text: "引力", bgClass: "bg-gravity" }, // 力学へブリッジ①
      { text: "ダークエネルギー", bgClass: "bg-darkenergy" }, // 見えない加速
      { text: "風", bgClass: "bg-wind" }, // 宇宙風＝場の流れ（重力系演出でOK）
      { text: "暗黒", bgClass: "bg-darkness" }, // 終曲へ（短め表示→fade-out）
      { text: "光は、やがて戻る。", bgClass: "bg-final-message" },
    ],
  },
  {
    id: "chapter-4",
    title: "ゆるやかな問い",
    background: "bg-ch4",
    words: ["無", "間", "静寂", "まなざし", "残響", "兆し"],
  },
  {
    id: "chapter-5",
    title: "還りゆく光",
    background: "bg-ch5",
    words: [
      "宙",
      "遠さ",
      "すべて",
      "輪郭",
      "ふるえ",
      "幻",
      "光速",
      "帰還",
      "未来",
      "余白",
      "白",
      "",
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
  {
    interlude: true,
    text: interludes[0].h, // h: "遠くのことを少しだけ",
    background: "bg-intro",
  },
  {
    interlude: true, // 🌟 最初のインタールード（第1章のタイトルだけを先に見せたい）
    text: interludes[0].title, // "はじまりの音"
    background: "bg-interlude-0",
    titleFrom: "chapter-1",
  },
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
const flattenedWords = [];
playlist.forEach((item) => {
  if (item.interlude) {
    flattenedWords.push({
      text: item.text,
      background: item.background,
      interlude: true,
      isInterlude: true,
    });
  } else {
    item.words.forEach((word) => {
      if (typeof word === "string") {
        flattenedWords.push({
          text: word,
          background: item.background,
          interlude: false,
          isInterlude: false,
        });
      } else {
        flattenedWords.push({
          text: word.text,
          background: item.background,
          bgClass: word.bgClass,
          interlude: false,
          isInterlude: false,
        });
      }
    });
  }
});
let currentIndex = 0;
const body = document.body;
const fadeDuration = 2000; // 目安1800〜2200　アニメーションと揃える

function playEpilogue() {
  const overlay = document.getElementById("whiteout");
  overlay?.classList.add("show");
  wordEl.classList.remove("fade-in");
  void wordEl.offsetWidth;
  wordEl.classList.add("fade-shiro"); //消える
  setTimeout(() => {
    document.body.classList.remove("bg-ch5");
  }, 1200); // whiteout の transition 時間に合わせる（例: 600ms）
  setTimeout(() => {
    overlay?.classList.remove("show");
    wordEl.textContent = "遠くのことを少しだけ\nおしまい";
    wordEl.classList.remove("fade-in", "fade-shiro");
    void wordEl.offsetWidth;
    wordEl.classList.add("fade-last");
    const timer = document.querySelector(".timer"); // 実際のセレクタに合わせて
    requestAnimationFrame(() => {
      timer?.classList.add("force-repaint");
      requestAnimationFrame(() => timer?.classList.remove("force-repaint"));
    });
  }, 5000); //「5秒後に次の段へ」**という“待ち時間”

  document.body.classList.add("is-ended");
}
function showNextWord() {
  if (currentIndex >= flattenedWords.length) return;
  const current = flattenedWords[currentIndex];
  wordEl.classList.remove("fade-in");
  void wordEl.offsetWidth;
  wordEl.classList.add("fade-out"); //消える
  setTimeout(() => {
    wordEl.textContent = current.text;
    const oldBgs = Array.from(body.classList).filter((cls) =>
      cls.startsWith("bg-")
    );
    if (oldBgs.length) body.classList.remove(...oldBgs);

    const cs = getComputedStyle(document.body);
    if (current.bgClass) {
      body.classList.add(current.bgClass);
    } else if (current.background) {
      body.classList.add(current.background);
    }

    const cs2 = getComputedStyle(document.body);
    wordEl.classList.remove("fade-out"); //消える
    void wordEl.offsetWidth; // リセットのための再描画トリック
    wordEl.classList.add("fade-in"); // opacity: 0 → 1：静かに現れる

    currentIndex++;
    if (currentIndex < flattenedWords.length) {
      const isInterlude = current.isInterlude;
      const delay = isInterlude ? 5500 : 3000;
      setTimeout(showNextWord, delay); // ⏱️ 次を呼ぶ（再帰）
      return;
    }
    setTimeout(() => {
      const lingerMs = 3500; // ←2200〜3500

      setTimeout(() => {
        playEpilogue();
      }, lingerMs);
    }, fadeDuration);
    return;
  }, fadeDuration);
}

showNextWord(); // 最初の1語
