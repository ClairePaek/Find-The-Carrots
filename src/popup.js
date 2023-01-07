'use strict';
import { getElements } from './elementsGetter.js';

export default class Popup {
  constructor(onClick) {
    const { popup, popupBtn, popupMessage } = getElements();
    this.popup = popup;
    this.popupBtn = popupBtn;
    this.popupMessage = popupMessage;

    this.popupBtn.addEventListener('click', () => {
      onClick && onClick();
    });
  }

  hide() {
    this.popup.classList.add('pop-up--hide');
  }

  showWithText(text) {
    this.popupMessage.innerText = text;
    this.popup.classList.remove('pop-up--hide');
  }
}
