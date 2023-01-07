'use strict';
import { getElements } from './elementsGetter.js';
const { gameBtn } = getElements();

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function changeGameButtonIcon(icon) {
  gameBtn.innerHTML = `<i class='fa-solid fa-${icon}'></i>`;
}

function showGameButton() {
  gameBtn.style.visibility = 'visible';
}

export { hideGameButton, changeGameButtonIcon, showGameButton };
