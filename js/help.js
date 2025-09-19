(() => {
  const trigger = document.getElementById("helpBtn");
  const card = document.getElementById("helpCard");
  const close = document.getElementById("helpCloseBtn");
  if (!trigger || !card || !close) return;

  let lastFocus = null;

  const open = () => {
    if (!card.hidden) return;
    lastFocus = document.activeElement;
    card.hidden = false;
    card.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    (card.querySelector("#helpTitle") || card).focus({ preventScroll: true });
    document.addEventListener("keydown", onKey);
  };

  const shutdown = () => {
    if (card.hidden) return;
    card.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    const finalize = () => {
      card.hidden = true;
      card.removeEventListener("transitionend", finalize);
    };
    matchMedia("(prefers-reduced-motion: reduce)").matches
      ? finalize()
      : card.addEventListener("transitionend", finalize);
    document.removeEventListener("keydown", onKey);
    (lastFocus || trigger).focus({ preventScroll: true });
  };

  const toggle = () => (card.hidden ? open() : shutdown());

  const onKey = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      shutdown();
    }
  };
  console.log("🍪");
  trigger.addEventListener("click", toggle);
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
  close.addEventListener("click", (e) => {
    console.log("close");
    shutdown();
  });
})();
