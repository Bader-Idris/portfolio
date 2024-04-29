<template>
  <!-- <div class="snake"></div> -->

  <!-- <div class="game-border-1"> -->
  <!-- <div class="game-border-2"> -->
  <!-- <div class="game-border-3"> -->
  <div ref="board" id="game-screen"></div> <!-- use ref for comp apis-->
  <!-- </div> -->
  <!-- </div> -->
  <!-- </div> -->
  <div class="scores">
    <p ref="score" id="score">000</p>
    <p ref="highScoreText" id="highScore">000</p>
    <p ref="instructionText" id="instruction-text">Press spacebar to start the game</p>
    <img ref="logo" id="logo" src="@/assets/imgs/snake-game-ai-gen.png" alt="snake-logo" />
  </div>
</template>

<style lang="scss">
.snake {
  width: 100%;
  height: 100%;
  // background: $accent2;
  background: yellow;
  //! DOES NOT APPEAR !!
}
.food {
  @extend .food-left !optional;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// DOM Elements
const board = ref(null);
const instructionText = ref(null);
const logo = ref(null);
const score = ref(null);
const highScoreText = ref(null);

onMounted(() => {
  board.value = document.getElementById('game-screen');
  instructionText.value = document.getElementById('instruction-text');
  logo.value = document.getElementById('logo');
  score.value = document.getElementById('score');
  highScoreText.value = document.getElementById('highScore');
  document.addEventListener('keydown', handleKeyPress);
});
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress);
});
// Define game variables, automatically in setup for reactivity with composition apis
const gridSize = ref(20);
const snake = ref([{ x: 10, y: 10 }]);
const food = ref(generateFood());
const highScore = ref(0);
const direction = ref('up');
let gameInterval;
const gameSpeedDelay = ref(200);
const gameStarted = ref(false);

function draw() {
  // board.value.innerHTML = '';
  board.value = ref(null);
  drawSnake();
  drawFood();
  updateScore();
}
// In Vue 3 Composition API, when you are working with DOM elements accessed using `ref`, use DOM.value instead of DOM directly
function drawSnake() {
  snake.value.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.value.appendChild(snakeElement);
  });
}

function createGameElement(tag, className) {
  const element = document.value.createElement(tag);
  element.value.className = className;
  return element;
}

function setPosition(element, position) {
  element.value.style.gridColumn = position.value.x;
  element.value.style.gridRow = position.value.y;
}
// test it
// draw();

function drawFood() {
  if (gameStarted) {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.value.appendChild(foodElement);
  }
}

// Function to generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize.value) + 1;// added  gridSize["value"]
  const y = Math.floor(Math.random() * gridSize.value) + 1;// to work well with comp apis
  return { x, y };
}

function move() {
  const head = { ...snake.value[0] };
  switch (direction.value) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }
  snake.value.unshift(head);

  // snake.pop();
  if (head.x === food.value.x && head.y === food.value.y) {
    food.value = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay.value);
  } else {
    snake.value.pop();
  }
}
function startGame() {
  gameStarted.value = true; // Keep track of a running game
  instructionText.value.style.display = 'none';
  logo.value.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay.value);
}
function handleKeyPress(event) {
  if (
    (!gameStarted.value && event.code === 'Space') ||
    (!gameStarted.value && event.key === ' ')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction.value = 'up';
        break;
      case 'ArrowDown':
        direction.value = 'down';
        break;
      case 'ArrowLeft':
        direction.value = 'left';
        break;
      case 'ArrowRight':
        direction.value = 'right';
        break;
    }
  }
}
document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() { };
function checkCollision() { };
function resetGame() { };
function updateScore() { };

function stopGame() {
  clearInterval(gameInterval);
  gameStarted.value = false;
  instructionText.value.style.display = 'block';
  logo.value.style.display = 'block';
}
function updateHighScore() { };

/* were as this in pure js:
// Define HTML elements
const board = document.getElementById('game-screen');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw game map, snake, food
function draw() {
  board.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
}

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// Testing draw function
// draw();

// Draw food function
function drawFood() {
  if (gameStarted) {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
  }
}

// Generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  snake.unshift(head);

  //   snake.pop();

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// Test moving
// setInterval(() => {
//   move(); // Move first
//   draw(); // Then draw again new position
// }, 200);

// Start game function
function startGame() {
  gameStarted = true; // Keep track of a running game
  instructionText.style.display = 'none';
  logo.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Keypress event listener
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === ' ')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
  //   console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = 'block';
  logo.style.display = 'block';
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, '0');
  }
  highScoreText.style.display = 'block';
}

*/
</script>