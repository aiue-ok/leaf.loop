function updateClock() {
  const now = new Date();
  const milliseconds = now.getMilliseconds();
  const seconds = now.getSeconds() + milliseconds / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secondDeg = seconds * 6; // 360° / 60秒
  const minuteDeg = minutes * 6; // 360° / 60分
  const hourDeg = hours * 30; // 360° / 12時間

  const cx = 50;
  const cy = 50;

  document
    .getElementById("second")
    .setAttribute("transform", `rotate(${secondDeg}, ${cx}, ${cy})`);
  document
    .getElementById("minute")
    .setAttribute("transform", `rotate(${minuteDeg}, ${cx}, ${cy})`);
  document
    .getElementById("hour")
    .setAttribute("transform", `rotate(${hourDeg}, ${cx}, ${cy})`);

  requestAnimationFrame(updateClock);
}

document.addEventListener("DOMContentLoaded", () => {
  updateClock();
});
