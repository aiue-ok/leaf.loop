// infoアイテムの流動化
// ▼幅の閾値を設定し、resizeイベントを監視、ウィンドウの幅でクラスを付け替える
const element = document.getElementById("myElement");
const breakpoint = 768; // 閾値となるウィンドウ幅（ピクセル）

function checkWidth() {
  // window.innerWidthで現在のウィンドウの幅を取得
  if (window.innerWidth >= breakpoint) {
    element.classList.remove("item5"); // 幅が閾値以上の場合に追加するclass
  } else {
    element.classList.add("item5"); // 幅が閾値未満の場合に削除するclass
  }
}
console.log("画面幅をチェック");
// 初期読み込み時にも一度実行する
checkWidth();

// resizeイベントリスナーをwindowに追加し、ウィンドウサイズが変更されたときにcheckWidthを実行する
window.addEventListener("resize", checkWidth);

// ▼画面の向きを取得しクラスを付け替える
// 画面の向きが変わったときに実行される関数
function handleOrientationChange(e) {
  const orientation = e.matches ? "landscape" : "portrait"; // trueならlandscape、falseならportrait
  if (orientation === "portrait") {
    element.classList.toggle("item5");
  }
}
console.log("画面の向きをチェック");
// 画面の向きを判定するメディアクエリを定義　'(orientation: portrait)'
// window.matchMedia() メソッド：特定のメディアクエリに合致するかどうかを判断し、MediaQueryList オブジェクトを返す
const portraitMediaQuery = window.matchMedia("(orientation: landscape)");

// 初期状態の向きでクラスを適用
// handleOrientationChange(e) 関数:画面の向きが変わったときに実行
// ページが読み込まれたときに、matchMedia オブジェクトの状態から初期の画面の向きを判定し、対応するクラスを要素に適用
handleOrientationChange(portraitMediaQuery);

// 画面の向きが変わったイベントを監視
portraitMediaQuery.addEventListener("change", handleOrientationChange);
