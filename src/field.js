'use strict';
import { getElements } from './elementsGetter.js';
import { initScoreBoard, updateScoreBoard } from './scoreboardService.js';
import { playbugSound, playCarrotSound, playgameWinSound } from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
  constructor() {
    const { field } = getElements();
    this.field = field;
    this.fieldRect = field.getBoundingClientRect();
    this.field.addEventListener('click', (event) => this.#onClick(event));
  }

  init(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field.innerHTML = '';
    initScoreBoard();
    this.#addItem('carrot', this.carrotCount, 'img/carrot.png');
    this.#addItem('bug', this.bugCount, 'img/bug.png');
  }

  addItemClickAction(onItemClick) {
    this.onItemClick = onItemClick;
  }

  removeItemClickAction() {
    this.field.removeEventListener('click', (event) => this.#onClick(event));
  }

  #addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';

      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      this.field.appendChild(item);
    }
  }

  #onClick(event) {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      playCarrotSound();
      if (updateScoreBoard() === this.carrotCount) {
        playgameWinSound();
        this.onItemClick && this.onItemClick(true);
      }
    } else if (target.matches('.bug')) {
      playbugSound();
      this.onItemClick && this.onItemClick(false);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
