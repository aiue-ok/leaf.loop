// z-index
const help = document.querySelector(".a-help");
const helpCard = document.querySelector(".info-help-card");
console.log(help);
help.addEventListener("click", function () {
  // 現在のカードの位置が画面外かどうかをチェック
  if (helpCard.style.zIndex === -10) {
    // 画面内に表示されている場合、画面外に戻す
    helpCard.style.zIndex = -10;
  } else {
    // 画面外にある場合、画面内に表示する
    helpCard.style.zIndex = 10;
  }
  console.log("🍪");
});

// 「閉じる」ボタンのクリックイベント（カードを画面外に移動）
document.getElementById("closeBtn").addEventListener("click", function (event) {
  helpCard.style.zIndex = -10; // 画面外に移動
  event.stopPropagation(); // 親のクリックイベントが発動しないように
});
