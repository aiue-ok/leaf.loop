function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  document
    .getElementById("second")
    .setAttribute("transform", `rotate(${secondDeg}, 50, 50)`);
  document
    .getElementById("minute")
    .setAttribute("transform", `rotate(${minuteDeg}, 50, 50)`);
  document
    .getElementById("hour")
    .setAttribute("transform", `rotate(${hourDeg}, 50, 50)`);

  requestAnimationFrame(updateClock);
}
requestAnimationFrame(updateClock);
