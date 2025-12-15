const wordEl = document.querySelector(".word");

const chapters = [
  // 第1章：はじまりの音
  {
    id: "chapter-1",
    title: "はじまりの音",
    background: "bg-ch1",
    words: [
      /*       "ビッグバン",
      "始まり",
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
      { text: "対称性", bgClass: "bg-symmetry" },
      // 境界系で終わり
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
      { text: "星雲", bgClass: "bg-nebula" }, // ふわっと面で広がる
      { text: "銀河", bgClass: "bg-galaxy" }, // スケール最大の“像”
      { text: "引力", bgClass: "bg-gravity" }, // 力学へブリッジ①
      { text: "光年", bgClass: "bg-ly" }, // 時間・距離の意識
      { text: "過去", bgClass: "bg-past2" }, // 彩度を落として“後ろへ”
      { text: "風", bgClass: "bg-wind" }, // 宇宙風＝場の流れ（重力系演出でOK）
      { text: "ダークエネルギー", bgClass: "bg-gravity" }, // 見えない加速
      { text: "暗黒", bgClass: "bg-darkness" }, // 終曲へ（短め表示→fade-out）
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
  //⚒️localhost:5500/universe.html?dev
  // 例: http:
  if (
    location.search.includes("dev") &&
    document.body.classList.contains("bg-symmetry")
  ) {
    console.log("🚦 bg-symmetry なので停止（devモード）");
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

showNextWord(); // 最初の1語

//  ⚠️つかってない
// 1語目の表示と同時にh1を消す
const title = document.getElementById("page-title");

// 一度だけ非表示にするフラグ
let hasHiddenTitle = false;

function changeWord() {
  currentIndex++;
  if (currentIndex >= words.length) {
    currentIndex = 0;
    console.log("🌀 currentIndex:", currentIndex);
  }

  // 1回目だけ h1 を非表示にする
  if (currentIndex === 0 && !hasHiddenTitle) {
    console.log("🚨 h1非表示処理 実行！");
    setTimeout(() => {}, 500); // 3秒くらいで消すと美しいかも
    hasHiddenTitle = true;
  }
}
