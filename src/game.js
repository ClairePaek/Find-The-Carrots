'use strict';

import { getElements } from './elementsGetter.js';
import Field from './field.js';
import {
  changeGameButtonIcon,
  hideGameButton,
  showGameButton,
} from './gameButtonService.js';
import {
  showTimerAndScore,
  startGameTimer,
  stopTimer,
} from './scoreboardService.js';
import Popup from './popup.js';

const MAX_COUNT = 20;
const MIN_COUNT = 5;

export default class Game {
  constructor(gameDuration) {
    const { gameBtn } = getElements();

    this.gameDuration = gameDuration;
    this.field = new Field();
    this.gameFinishBanner = new Popup(() => this.start());
    this.started = false;
    this.gameBtn = gameBtn;
  }

  init() {
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.finish(false);
      } else {
        this.start();
      }
    });
  }

  start() {
    this.started = true;
    showGameButton();
    changeGameButtonIcon('stop');

    this.field.addItemClickAction((win) => this.finish(win));
    this.field.init(this.getRandomCount(), this.getRandomCount());
    this.gameFinishBanner.hide();

    showTimerAndScore();
    startGameTimer(this.gameDuration, (win) => this.finish(win), this.started);
  }

  finish(win) {
    this.started = false;
    hideGameButton();
    stopTimer();
    this.field.removeItemClickAction();
    this.gameFinishBanner.showWithText(
      win ? 'YOU WON! REPLAY?' : 'YOU LOST, REPLAY?'
    );
  }

  getRandomCount() {
    return Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT) + MIN_COUNT);
  }
}
