window.addEventListener("DOMContentLoaded", () => {
  // console.log("📦 DOMContentLoaded 発火");
  const overlay = document.getElementById("whiteout");
  if (!overlay) return console.warn("⚠️ #whiteout が見つからない");
  // ホワイトアウトの表示と同時にh1を消す
  const title = document.getElementById("page-title");
  // 少し待ってから白フェードIN
  setTimeout(() => {
    overlay.classList.add("active");
    title.classList.add("active");
    console.log("🎬 白フェード IN");

    // IN完了後、背景切替するならここで
    // document.body.classList.add('bg-ch1'); など

    // 1.0秒後に白フェードOUT
    setTimeout(() => {
      // h1 を非表示に
      title.classList.add("hidden");
      console.log("😌 once h1を隠す処理 実行！");
      overlay.classList.remove("active");
      console.log("🏁 白フェード OUT");
      // 完全に不要なら消してもOK → overlay.remove();
    }, 3000);
  }, 1000);
  console.log("✅ whiteout.js 読み込み完了");
});
