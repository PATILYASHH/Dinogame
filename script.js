const dino = document.getElementById('dino');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score');
const jumpButton = document.getElementById('jumpButton');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const modalRestartButton = document.getElementById('modalRestartButton');
const modal = document.getElementById('gameOverModal');
const modalScore = document.getElementById('modalScore');
const closeModal = document.getElementById('closeModal');

let isJumping = false;
let isGameRunning = false;
let score = 0;

document.addEventListener('keydown', jump);
jumpButton.addEventListener('click', jump);
restartButton.addEventListener('click', restartGame);
startButton.addEventListener('click', startGame);
modalRestartButton.addEventListener('click', () => {
  modal.style.display = 'none';
  restartGame();
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function jump(event) {
  if ((event.type === 'keydown' && event.code === 'Space') || (event.type === 'click' && isGameRunning)) {
    if (!isJumping) {
      isJumping = true;
      dino.classList.add('jump');
      setTimeout(() => {
        dino.classList.remove('jump');
        isJumping = false;
      }, 500);
    }
  }
}

function createObstacle() {
  if (isGameRunning) {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    gameContainer.appendChild(obstacle);

    let obstaclePosition = 1000;
    obstacle.style.left = obstaclePosition + 'px';

    const moveObstacle = setInterval(() => {
      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + 'px';

      if (obstaclePosition < -60) {
        clearInterval(moveObstacle);
        gameContainer.removeChild(obstacle);
        increaseScore();
      }

      if (obstaclePosition > 0 && obstaclePosition < 60 && !isJumping) {
        gameOver();
        clearInterval(moveObstacle);
      }
    }, 20);
  }
}

function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}

function gameOver() {
  modalScore.innerText = score;
  modal.style.display = 'flex';
  score = 0;
  scoreDisplay.innerText = score;
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  isGameRunning = false;
}

function restartGame() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  score = 0;
  scoreDisplay.innerText = score;
  isGameRunning = false;
}

function startGame() {
  if (!isGameRunning) {
    isGameRunning = true;
    createObstacle();
  }
}

setInterval(createObstacle, 2000);