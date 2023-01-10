const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');

function playCarrotSound() {
  playSound(carrotSound);
}

function playAlertSound() {
  playSound(alertSound);
}

function playbgSound() {
  playSound(bgSound);
}

function playbugSound() {
  playSound(bugSound);
}

function playgameWinSound() {
  playSound(gameWinSound);
}

function playSound(sound) {
  sound.play();
}

export {
  playCarrotSound,
  playAlertSound,
  playbgSound,
  playbugSound,
  playgameWinSound,
};
