(() => {
  if (window.__offcanvasInitialized) return;
  window.__offcanvasInitialized = true;

  const body = document.body;
  const panel = document.getElementById("site-menu");
  const btnOpen = document.querySelector(".hamburger");
  const btnClose = panel?.querySelector(".offcanvas__close");
  const backdrop = document.querySelector(".offcanvas-backdrop");
  if (!panel || !btnOpen || !backdrop) return;

  // フォーカス可能要素の取得
  const focusables = () =>
    panel.querySelectorAll(
      [
        "a[href]",
        "button:not([disabled])",
        "input",
        "select",
        "textarea",
        '[tabindex]:not([tabindex="-1"])',
      ].join(",")
    );

  const open = () => {
    body.dataset.menuOpen = "true";
    // 指定された名前の属性を要素から削除
    panel.removeAttribute("hidden");
    backdrop.removeAttribute("hidden");
    // setAttribute-指定された要素の属性の値を設定します。
    // 属性が既に存在する場合は値が更新され、
    // そうでない場合は指定された名前と値で新しい属性が追加
    btnOpen.setAttribute("aria-expanded", "true");

    // スクロールロック（簡易）
    // overflow-切り取られたコンテンツは非表示
    body.style.overflow = "hidden";

    // 最初のフォーカス
    //focus()-指定された要素にフォーカスを設定できる場合、フォーカスを設定します。
    // フォーカスされた要素は、既定でキーボードや同様のイベントを受け取る要素
    const first = focusables()[0];
    (first || btnClose || panel).focus();
  };

  const close = () => {
    delete body.dataset.menuOpen;
    btnOpen.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
    // 戻しフォーカス
    btnOpen.focus();
  };

  // ESC で閉じる
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.dataset.menuOpen === "true") close();
  });

  // 外側クリックで閉じる
  backdrop.addEventListener("click", close);

  // トグル
  btnOpen.addEventListener("click", () => {
    body.dataset.menuOpen === "true" ? close() : open();
  });
  btnClose?.addEventListener("click", close);
  // フォーカストラップ（簡易ループ）
  panel.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const list = Array.from(focusables());
    if (list.length === 0) return;
    const first = list[0],
      last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
    //preventDefault() -ユーザーエージェントに、このイベントが明示的に処理されない場合に、
    // その既定のアクションを通常どおりに行うべきではないことを伝えます。
  });
  // タイマーの z-index との衝突を回避（必要なら）
  // 例：body に [data-menu-open] がある間は .timer-shell を is-idle にして控えめに
  const timerShell = document.querySelector(".timer-shell");
  const syncTimer = () => timerShell?.classList.add("is-idle");
  const unsyncTimer = () => timerShell?.classList.remove("is-idle");
  btnOpen.addEventListener("click", syncTimer);
  btnClose?.addEventListener("click", unsyncTimer);
  backdrop.addEventListener("click", unsyncTimer);
})();
