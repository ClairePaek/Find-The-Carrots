'use strict';

import { getElements } from './elementsGetter.js';
import {
  changeGameButtonIcon,
  hideGameButton,
  showGameButton,
} from './gameButtonService.js';
import Field from './field.js';
import Popup from './popup.js';
import {
  showTimerAndScore,
  startGameTimer,
  stopTimer,
} from './scoreboardService.js';

const { gameBtn } = getElements();
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const gameFinishBanner = new Popup(startGame);
let started = false;
const field = new Field(CARROT_COUNT, BUG_COUNT);

gameBtn.addEventListener('click', () => {
  if (started) {
    finishGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  showGameButton();
  changeGameButtonIcon('stop');

  field.addItemClickAction(finishGame);
  field.init();

  gameFinishBanner.hide();

  showTimerAndScore();
  startGameTimer(finishGame, started);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  stopTimer();
  field.removeItemClickAction();
  gameFinishBanner.showWithText(win ? 'YOU WON! REPLAY?' : 'YOU LOST, REPLAY?');
}
