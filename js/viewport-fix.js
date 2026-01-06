// konchi.js
(() => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  setVh();
  window.addEventListener("resize", setVh, { passive: true });
  window.addEventListener("orientationchange", () => setTimeout(setVh, 50), {
    passive: true,
  });
})();
