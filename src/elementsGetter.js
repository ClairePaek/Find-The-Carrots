'use strict';

function getElements() {
  const field = document.querySelector('.game__field');
  const gameBtn = document.querySelector('.game__button');
  const gameScore = document.querySelector('.game__score');
  const gameTimer = document.querySelector('.game__timer');
  const popup = document.querySelector('.pop-up');
  const popupBtn = document.querySelector('.pop-up__refresh');
  const popupMessage = document.querySelector('.pop-up__message');

  return {
    field,
    gameBtn,
    gameScore,
    gameTimer,
    popup,
    popupBtn,
    popupMessage,
  };
}

export { getElements };
