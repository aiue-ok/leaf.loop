import { whiteoutOnce } from "./whiteout-once.js";

// どの要素を操作するか取得
const wordEl = document.querySelector(".word");

// .word ことばの配列
// | `id`         | HTML操作・デバッグ時に識別しやすい
// | `title`      | 章タイトルを表示（上部・左下などに使える）
// | `background` | JSで `body.className = chapter.background` として切替可能 |
// | `words`      | 各章の表示単語リスト。順に切り替え演出へ✨

const chapters = [
  // 第1章：はじまりの音
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
      "時間",
      "空間",
      "物質",
      "透明",
      "解放",
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
      { text: "重力波", bgClass: "bg-wave" },
      { text: "電磁波", bgClass: "bg-wave" },
      // { text: "素粒子", bgClass: "bg-quantum" },//polish送り
      // { text: "量子", bgClass: "bg-quantum" },//polish送り
      //   秩序やパターン系
      { text: "対称性", bgClass: "bg-symmetry" },
      // { text: "軌道", bgClass: "bg-orbit" }, //polish送り
      //   空間や形の変化系
      // { text: "ゆがみ", bgClass: "bg-distortion" },//polish送り
      // { text: "ひずみ", bgClass: "bg-distortion" },//polish送り
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
      { text: "星雲", bgClass: "bg-nebula" }, // ふわっと面で広がる
      { text: "銀河", bgClass: "bg-galaxy" }, // スケール最大の“像”
      { text: "光年", bgClass: "bg-ly" }, // 時間・距離の意識
      { text: "過去", bgClass: "bg-past2" }, // 彩度を落として“後ろへ”
      { text: "引力", bgClass: "bg-gravity" }, // 力学へブリッジ①
      { text: "ダークエネルギー", bgClass: "bg-gravity" }, // 見えない加速
      { text: "風", bgClass: "bg-wind" }, // 宇宙風＝場の流れ（重力系演出でOK）
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
      "間",
      "静寂",
      "まなざし",
      "残響",
      // "思念", //polish送り
      // "ゆらぎ",//polish送り
      // "不確定",//polish送り
      // "予感",//polish送り
      "兆し",
    ],
  },

  // 第5章：還りゆく光
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
      // { text: "？？", bgClass: "bg-light" },
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
];

// 全体の再生リスト
const playlist = [
  {
    interlude: true,
    text: interludes[0].h, // h: "遠くのことを少しだけ",
    background: "bg-intro",
  },
  // {
  //   interlude: true, // 🌟 最初のインタールード（第1章のタイトルだけを先に見せたい）
  //   text: interludes[0].title, // "はじまりの音"
  //   background: "bg-interlude-0",
  //   titleFrom: "chapter-1",
  // },
  // ここから第1章の言葉たち
  // chapters[0],
  // {
  //   interlude: true,
  //   text: interludes[1].title,
  //   background: "bg-interlude-1",
  //   titleFrom: "chapter-2",
  // },
  // chapters[1],
  // {
  //   interlude: true,
  //   text: interludes[2].title,
  //   background: "bg-interlude-2",
  //   titleFrom: "chapter-3",
  // },
  // chapters[2],
  // {
  //   interlude: true,
  //   text: interludes[3].title,
  //   background: "bg-interlude-3",
  //   titleFrom: "chapter-4",
  // },
  chapters[3],
  {
    interlude: true,
    text: interludes[4].title,
    background: "bg-interlude-4",
    titleFrom: "chapter-5",
  },
  chapters[4],
];

// 全単語を展開するリスト…全表示内容＋背景class
// フラット化：章＋間奏を順番に整列
const flattenedWords = [];

// playlist.forEach((item, index) => {
playlist.forEach((item) => {
  if (item.interlude) {
    // 🌟章タイトル（間奏）の場合
    flattenedWords.push({
      text: item.text,
      // \n は改行を意味する（HTMLでは <br> として扱いたい時もある）
      background: item.background,
      interlude: true,
      isInterlude: true,
    });
  } else {
    // 🌟章本文（言葉たち）
    // chapter内の単語を1つずつpush（章の背景を添える）
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
// 次を表示するまで少し待ってから切り替え
const fadeDuration = 2000; // 目安1800〜2200　アニメーションと揃える

function playEpilogue() {
  // 🏁 ラスト 🔚
  const overlay = document.getElementById("whiteout");
  // 白フェード開始（要素が存在する場合にのみクラスを追加する）オプショナルチェーン演算子 (?)
  // opacityが 0→1 になるのに 1200ms かかる。
  overlay?.classList.add("show");

  // console.log("🌌 全単語の旅が終わりました");

  // 🔁 表示済みの単語をいったん fade-out させる 単語が1.8秒で消える
  wordEl.classList.remove("fade-in");
  // console.log("after remove fade-in", wordEl.className);
  void wordEl.offsetWidth;
  wordEl.classList.add("fade-shiro"); //消える
  // console.log("after add fade-out", wordEl.className);
  // 3) 白幕が“完全に”出る頃に背景を切り替える
  setTimeout(() => {
    document.body.classList.remove("bg-ch5");
    // 残り（5.0 - 1.2 - 1.8 = 2.0秒くらい）は “白い間”
    // document.body.className = "page--universe bg-intro";
    // ✅ bg-ch5はそのまま、宇宙膜を出す（滑らか）
    document.body.classList.add("is-returning");
  }, 1200); // whiteout の transition 時間に合わせる（例: 600ms）

  // 4) その後に白幕を外して、エピローグ表示
  // 5秒になったら白幕が1.2秒かけて消える + エピローグ10秒が始まる
  setTimeout(() => {
    // opacityが 1→0 に 1200ms かかる
    overlay?.classList.remove("show");

    // ここで初めてエピローグ文をセット（チラ見えゼロ）
    wordEl.textContent = "遠くのことを少しだけ\nおしまい";

    // 競合を消して fade-last だけ
    wordEl.classList.remove("fade-in", "fade-shiro");
    void wordEl.offsetWidth;
    wordEl.classList.add("fade-last");
    // console.log("body classes:", document.body.className);
    const timer = document.querySelector(".timer"); // 実際のセレクタに合わせて

    // 背景クラス/変数を変えた直後 （再描画）
    requestAnimationFrame(() => {
      timer?.classList.add("force-repaint");
      // 次のフレームで戻す（見た目は変えない）
      requestAnimationFrame(() => timer?.classList.remove("force-repaint"));
    });
  }, 5000); //「5秒後に次の段へ」**という“待ち時間”

  document.body.classList.add("is-ended");
  // console.log("body classes:", document.body.className);
}

// 表示を切り替える関数
function showNextWord() {
  // console.log("🔁 showNextWord 呼ばれた", currentIndex);

  // if (location.search.includes("dev")) {
  //   console.count("showNextWord called");
  //   console.log("index:", currentIndex);
  // }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // === デバッグユーティリティ ===
  // 👷→ URL末尾に ?dev を付けたときだけ有効。
  // ⚒️ 例: http:localhost:5500/universe.html?dev
  // if (location.search.includes("dev") && body.classList.contains("bg-star")) {
  //   console.log("🚦 .bg-star なので停止（devモード）");
  //   return;
  // }
  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // // すべて終了したら止める
  if (currentIndex >= flattenedWords.length) return;
  // 「flattenedWords の中の現在の currentIndex 番目の要素（＝単語オブジェクト）
  const current = flattenedWords[currentIndex];
  // console.log("▶️ 表示中:", current);

  // 🔁 表示済みの単語をいったん fade-out させる
  wordEl.classList.remove("fade-in");
  void wordEl.offsetWidth;
  wordEl.classList.add("fade-out"); //消える
  // console.log("after add fade-out", wordEl.className);
  // debugger; // ←ここで止まる

  // 次の表示時間を個別に設定
  setTimeout(() => {
    // 表示テキストの変更
    // 切り替え処理 画面の単語表示部分に、を表示
    //  current.text は現在のcurrent番目の単語テキスト "始まり" を取り出すということ
    // .textContent は HTML 要素にテキストを入れる標準プロパティ
    wordEl.textContent = current.text;

    // if (location.search.includes("dev")) {
    //   console.group("🌌 bg switch");
    //   console.log(
    //     "before:",
    //     body.className,
    //     "currentIndex:",
    //     currentIndex,
    //     "text:",
    //     current.text
    //   );
    // }

    // 1語ごとに背景クラス（先に背景クラス（色含む））を切り替える処理
    // console.log("computed bg:", cs.backgroundColor, cs.backgroundImage);

    // if (location.search.includes("dev")) {
    //   console.log("after remove:", body.className);
    // }

    if (current.bgClass) {
      // アニメーションをリセットして付け直す
      body.classList.remove(
        ...Array.from(body.classList).filter((cls) => cls.startsWith("bg-"))
      );
      // 背景クラスをbodyに反映（他クラスを削除してから）
      body.classList.add(current.bgClass);
    // console.log("computed bg:", cs2.backgroundColor, cs2.backgroundImage);

    //   if (location.search.includes("dev")) {
    //     console.log("after add:", document.body.className);
    //     console.groupEnd();
    //   }
    // }

    // if (location.search.includes("dev")) {
    //   console.log("final:", document.body.className);
    //   console.groupEnd();
    // }

    // アニメーションをリセットして付け直す
    // アニメーション演出（fade-in）
    wordEl.classList.remove("fade-out"); //消える
    // void 演算子は与えられた式 (expression) を評価し、undefined を返します
    // offsetWidth プロパティは読み取り専用.要素のレイアウト幅を整数として返します
    void wordEl.offsetWidth; // リセットのための再描画トリック
    wordEl.classList.add("fade-in"); // opacity: 0 → 1：静かに現れる

    currentIndex++;

    // 内容によって秒数を変える
    // `flattenedWords[currentIndex]` を見て、 `interlude` かどうか判定
    if (currentIndex < flattenedWords.length) {
      // **"ふわっ→しずむ→間" の美しい流れ**が作れるよ〜
      // ⏱ 次の表示までの時間
      // const isInterlude = current.text.includes("（"); // 間奏っぽいかどうかで判定
      const isInterlude = current.isInterlude;

      // ### ① `delay`：単語ごとの**表示間隔** 7000 4000初期値
      const delay = isInterlude ? 3500 : 3000;
      // const delay = current.bgClass === "interlude" ? 7000 : 3000;
      // 単語を表示してから **何秒後に次を呼ぶか**
      setTimeout(showNextWord, delay); // ⏱️ 次を呼ぶ（再帰）

      // console.log(delay);
      // console.log("⏲️ 次の表示までの時間:", isInterlude);
      return;
    }
    // ① fade-in が完全に終わるのを待つ
    setTimeout(() => {
      // ② ここから「余韻」
      const lingerMs = 3500; // ←2200〜3500

      setTimeout(() => {
        playEpilogue();
      }, lingerMs);
    }, fadeDuration);
    return;
  }, fadeDuration);
}

showNextWord(); // 最初の1語
// if (window.__leafLoopShowNextWordStarted) {
//   console.warn("showNextWord already started; skip");
// } else {
//   window.__leafLoopShowNextWordStarted = true;
//   showNextWord();
// }
