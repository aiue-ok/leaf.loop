let idleTimer;
const shell = document.querySelector(".timer-shell");
const setIdle = () => shell.classList.add("is-idle");
const clearIdle = () => shell.classList.remove("is-idle");

["mousemove", "touchstart", "keydown", "focusin"].forEach((e) =>
  window.addEventListener(e, () => {
    clearIdle();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(setIdle, 2500); // 2.5秒で控えめモード
  })
);
setIdle();
