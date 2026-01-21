import { whiteoutOnce } from "./whiteout-once.js";

const wordEl = document.querySelector(".word");

const chapters = [
  {
    id: "chapter-1",
    title: "はじまりの音", //h2.innerText = chapter.title で章タイトル表示
    background: "bg-ch1", //body.className = chapter.background で背景切り替え🪄
    words: [
      //chapter.words で単語を順に表示できる
      "ビッグバン",
      "始まり",
      "光のひとしずく",
      "宇宙の夜明け",
      "透明",
      "解放",
      "時間",
      "空間",
      "物質",
      "呼吸",
    ],
  },

  // 2章｜ゆらぎと法則（物理と観測）
  {
    id: "chapter-2",
    title: "ゆらぎと法則",
    background: "bg-ch2",
    words: [
      //   観測の始まり系
      { text: "重力波", bgClass: "bg-wave", delay: 8000 },
      { text: "電磁波", bgClass: "bg-wave" },
      { text: "素粒子", bgClass: "bg-quantum" },
      { text: "量子", bgClass: "bg-quantum" },
      //   秩序やパターン系
      { text: "対称性", bgClass: "bg-symmetry" },
      { text: "軌道", bgClass: "bg-orbit" },
      //   空間や形の変化系
      { text: "ゆがみ", bgClass: "bg-distortion" },
      { text: "ひずみ", bgClass: "bg-distortion" },
      { text: "膨張", bgClass: "bg-distortion" },
      //   境界系で終わり
      { text: "事象の地平線", bgClass: "bg-horizon" },
    ],
  },
  // 第3章：星と時間
  {
    id: "chapter-3",
    title: "星と時間",
    background: "bg-ch3",
    words: [
      // Chapter 3: 星と時間（cinematic）
      { text: "星屑", bgClass: "bg-star" }, // 小粒から始めて目を馴らす
      { text: "恒星", bgClass: "bg-star" }, // 明るさの核
      { text: "連星", bgClass: "bg-star" }, // 反復＝リズム
      { text: "銀河", bgClass: "bg-galaxy" }, // スケール最大の“像”
      { text: "星雲", bgClass: "bg-nebula" }, // ふわっと面で広がる
      { text: "光年", bgClass: "bg-ly" }, // 時間・距離の意識
      { text: "過去", bgClass: "bg-past2" }, // 彩度を落として“後ろへ”
      { text: "引力", bgClass: "bg-gravity" }, // 力学へブリッジ①
      { text: "風", bgClass: "bg-wind" }, // 宇宙風＝場の流れ（重力系演出でOK）
      { text: "ダークエネルギー", bgClass: "bg-gravity" }, // 見えない加速
      { text: "暗黒", bgClass: "bg-darkness" }, // 終曲へ（短め表示→fade-out）
      { text: "光は、やがて戻る。", bgClass: "bg-darkness" },
    ],
  },

  // 第4章：ゆるやかな問い
  {
    id: "chapter-4",
    title: "ゆるやかな問い",
    background: "bg-ch4",
    words: [
      "無",
      "兆し",
      "残響",
      "思念",
      "まなざし",
      "ゆらぎ",
      "不確定",
      "予感",
      "間（ま）",
      "静寂",
    ],
  },

  // 第5章：還りゆく光
  {
    id: "chapter-5",
    title: "還りゆく光",
    background: "bg-ch5",
    words: [
      "遠さ",
      "すべて",
      "宙",
      "輪郭",
      "幻",
      "ふるえ",
      "未来",
      "光速",
      "帰還",
      "余白",
      "白",
    ],
  },
];

// 章と章の間の配列
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
  {
    title: "遠くのことを少しだけ",
    text: "おしまい",
    titleFrom: "chapter-6",
  },
];

// 全体の再生リスト
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
  // {
  //   interlude: true,
  //   isEpilogue: true,
  //   // text: interludes[5].title,
  //   text: `${interludes[5].title}\n${interludes[5].text}`,
  //   background: "bg-epilogue",
  //   titleFrom: "chapter-6",
  // },
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
        // 旧形式
        flattenedWords.push({
          text: word,
          background: item.background,
          interlude: false,
          isInterlude: false,
        });
      } else {
        // 新形式（オブジェクト形式）
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

// 現在のインデックスを記録
let currentIndex = 0;
const body = document.body;

// 表示を切り替える関数
function showNextWord() {
  if (currentIndex >= flattenedWords.length) {
    return;
  }

  const current = flattenedWords[currentIndex];

  wordEl.classList.remove("fade-in"); // opacity: 0 → 1：静かに現れる
  void wordEl.offsetWidth;
  wordEl.classList.add("fade-out"); //消える

  const fadeDuration = 2000;

  setTimeout(() => {
    wordEl.textContent = current.text;

    document.body.className = `page--universe ${current.background}`;
    if (current.bgClass) {
      body.classList.remove(
        ...Array.from(body.classList).filter((cls) => cls.startsWith("bg-"))
      );
      body.classList.add(current.bgClass);
    }

    wordEl.classList.remove("fade-out"); //消える
    void wordEl.offsetWidth; // リセットのための再描画トリック
    wordEl.classList.add("fade-in"); // opacity: 0 → 1：静かに現れる

    currentIndex++;

    if (currentIndex < flattenedWords.length) {
      const isInterlude = current.isInterlude;
      const delay = isInterlude ? 3500 : 3000;

      setTimeout(showNextWord, delay); // ⏱️ 次を呼ぶ（再帰）
    } else {
      const overlay = document.getElementById("whiteout");

      overlay.classList.add("show");

      setTimeout(() => {
        overlay.classList.remove("show");
      }, 1200); // 1.2秒で消える

      wordEl.classList.add("fade-out"); //消える

      setTimeout(() => {
        wordEl.classList.remove("fade-in"); // opacity: 0 → 1：静かに現れる
        wordEl.classList.remove("fade-out"); //fadeout外す
        wordEl.classList.add("fade-last"); //ふわっと
      }, 3000);

      return; // ここでループを終了
    }
  }, fadeDuration);
}

showNextWord(); // 最初の1語
