const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChangingColor);

function changeColor() {
  if (stopBtn.disabled) {
    stopBtn.disabled = false;
  }

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true;
}

function stopChangingColor() {
  startBtn.disabled = false;
  clearInterval(timerId);
  stopBtn.disabled = true;
}
