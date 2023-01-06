'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const popup = document.querySelector('.pop-up');
const popupBtn = document.querySelector('.pop-up__refresh');
const popupMessage = document.querySelector('.pop-up__message');
const fieldRect = field.getBoundingClientRect();

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function stopGame() {
  started = !started;

  showPlayButton();
  timer = null;

  popup.classList.remove('pop-up--hide');
  popupBtn.addEventListener('click', startGame);
  popupMessage.innerText = 'REPLAY?';
}

function startGame() {
  started = !started;

  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();

  field.addEventListener('click', (event) => {
    console.log(event);
    if (event.target.nodeName == 'IMG') {
      field.removeChild(event.target);
    }
  });
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
  popup.classList.add('pop-up--hide');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function showPlayButton() {
  gameBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
}

function showStopButton() {
  gameBtn.innerHTML = "<i class='fa-solid fa-stop'></i>";
}

function showTimerAndScore() {
  gameScore.style.visibility = 'visible';
  gameTimer.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0 || !started) {
      clearInterval(timer);
      return;
    }

    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  gameTimer.innerText = `${minutes}:${seconds}`;
}
