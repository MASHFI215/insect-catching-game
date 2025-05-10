const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const insectBtns = document.querySelectorAll('.choose-insect-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selectedInsect = {};

startBtn.addEventListener('click', () => {
  screens[0].classList.remove('active');
  screens[1].classList.add('active');
});

insectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    selectedInsect = { src, alt };
    screens[1].classList.remove('active');
    screens[2].classList.add('active');
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  seconds++;
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  timeEl.innerHTML = `Time: ${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

  insect.addEventListener('click', catchInsect);

  gameContainer.appendChild(insect);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 100);
  const y = Math.random() * (height - 100);
  return { x, y };
}

function catchInsect() {
  increaseScore();
  this.classList.add('caught');
  this.remove();
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.style.display = 'block';
  }
  scoreEl.innerHTML = `Score: ${score}`;
}

const restartBtn = document.getElementById('restart-btn');

restartBtn.addEventListener('click', () => {
  // Reset all game state
  score = 0;
  seconds = 0;
  timeEl.innerHTML = 'Time: 00:00';
  scoreEl.innerHTML = 'Score: 0';
  message.style.display = 'none';
  selectedInsect = {};

  // Remove all insects from screen
  document.querySelectorAll('.insect').forEach(i => i.remove());

  // Reset screens
  screens[2].classList.remove('active');
  screens[0].classList.add('active');
});
