'use strict';
import { getElements } from './elementsGetter.js';

const { gameScore, gameTimer } = getElements();
const GAME_DURATION_SEC = 5;
let timer = undefined;
let score = 0;

function showTimerAndScore() {
  gameScore.style.visibility = 'visible';
  gameTimer.style.visibility = 'visible';
}

function startGameTimer(stopAction, started) {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0 || !started) {
      stopAction(false);
      return;
    }

    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function updateScoreBoard() {
  gameScore.innerText = ++score;
  return score;
}

function initScoreBoard() {
  score = 0;
  gameScore.innerText = score;
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  gameTimer.innerText = `${minutes}:${seconds}`;
}

export {
  showTimerAndScore,
  startGameTimer,
  stopTimer,
  updateScoreBoard,
  initScoreBoard,
};
