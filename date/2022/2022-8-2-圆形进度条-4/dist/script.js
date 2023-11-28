const range = document.querySelector("#range");
const circle = document.querySelectorAll("circle")[1];
if (range && circle) {
  const percent = 30 / 100;
  const perimeter = Math.PI * 2 * 40;
  circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1 - percent));
}