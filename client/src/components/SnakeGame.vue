<template>
  <div class="game-screen" ref="board" id="game-screen">
    <!-- <div class="snake"></div> -->
    <div class="scores">
      <p ref="score" id="score">000</p>
      <p ref="highScoreText" id="highScore">000</p>
      <p ref="instructionText" id="instruction-text">Press spacebar to start the game</p>
      <img ref="logo" id="logo" src="@/assets/imgs/snake-game-ai-gen.png" alt="snake-logo" />
    </div>
    <div class="outcome-display">
      <!-- I want to hide/remove this button when the game starts -->
      <button @click="!startGame">start-game</button>
    </div>
  </div>
</template>

<style lang="scss">
.game-screen {
  margin: 30px 5px 30px 33px;
  box-shadow: inset 1px 5px 11px 0 #02121B;
  background-color: rgb(1, 8, 14, 50%);
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(20, 12px);
  // grid-template-rows: repeat(20, 12px);
  grid-template-rows: repeat(34, 12px);
  position: relative;

  .outcome-display {
    button {
      // width: 40px;
      background-color: $accent1;
      color: $primary1;
      border: none;
      border-radius: 8px;
      padding: 15px;
      font-family: $main-font;
      position: absolute;
      bottom: 20%;
      box-shadow: 0px 5px 5px 3px #00000052;
      user-select: none;
      left: 50%;
      cursor: pointer;
      transform: translateX(-50%);

      &:hover {
        opacity: 0.7;
      }
      // check me
      &.hide {
        display: none;
      }
    }
  }
}


</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';//defineProps no longer needed to be imported
import Food from './Food.vue';

// DOM Elements
// Define game variables, automatically in setup for reactivity with composition apis
const gridSize = ref(20);
const snake = ref(Array.from({ length: 10 }, (_, index) => ({ x: 10, y: 20 + index })));
const food = ref(generateFood());
const highScore = ref(0);
const direction = ref('up');
let gameInterval;
const gameSpeedDelay = ref(200);
const gameStarted = ref(false);

// Reactive references to DOM elements
const board = ref(null);
const instructionText = ref(null);
const logo = ref(null);
const score = ref(null);
const highScoreText = ref(null);

const props = defineProps({
  foodLeft: Array,
  updateFoodLeft: Function

});
// const emits = defineEmits(['foodEaten']);

onMounted(() => {
  // Assign DOM elements
  board.value = document.getElementById('game-screen');
  instructionText.value = document.getElementById('instruction-text');
  logo.value = document.getElementById('logo');
  score.value = document.getElementById('score');
  highScoreText.value = document.getElementById('highScore');
  document.addEventListener('keydown', handleKeyPress);
  updateElementsVisibility();

  // Draw initial game state
  draw();
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress);
});

function updateElementsVisibility() {
  // Update visibility of elements based on gameStarted status
  const displayStyle = gameStarted.value ? 'none' : 'block';
  instructionText.value.style.display = displayStyle;
  logo.value.style.display = displayStyle;
}

function draw() {
  board.value.innerHTML = ''; // it throws an error
  drawSnake();
  drawFood();
  updateScore();
}

function drawSnake() {
  snake.value.forEach(segment => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.value.appendChild(snakeElement);
  });
}

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}
function drawFood() {
  const foodElement = createGameElement('div', 'food');
  // console.log(food.value)
  setPosition(foodElement, food.value);//after checking, i added the 1
  board.value.appendChild(foodElement);
}

function generateFood() {//! i need to collision food with the snake
  const x = Math.floor(Math.random() * gridSize.value) + 1;
  const y = Math.floor(Math.random() * gridSize.value + 14) + 1;
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

  if (head.x === food.value.x && head.y === food.value.y) {
    food.value = generateFood();
    props.updateFoodLeft();
    // emits.foodEaten();//learn more about emits
    increaseSpeed();
    clearInterval(gameInterval);
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
  gameStarted.value = true;
  updateElementsVisibility();
  drawSnake(); // Draw the snake when the game starts
  drawFood(); // Draw food when the game starts
  gameInterval = setInterval(() => {
    move();
    checkCollision(); // Check for collisions during each move
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
// document.addEventListener('keydown', handleKeyPress);
function increaseSpeed() {
  if (gameSpeedDelay.value > 150) {
    gameSpeedDelay.value -= 5;
  } else if (gameSpeedDelay.value > 100) {
    gameSpeedDelay.value -= 3;
  } else if (gameSpeedDelay.value > 50) {
    gameSpeedDelay.value -= 2;
  } else if (gameSpeedDelay.value > 25) {
    gameSpeedDelay.value -= 1;
  }
}

function checkCollision() {
  const head = snake.value[0];

  // Check for collision with boundaries
  if (head.x < 1 || head.x > gridSize.value || head.y < 1 || head.y > (gridSize.value + 14)) {
    resetGame();
    return;
  }

  // Check for collision with the snake's body
  for (let i = 1; i < snake.value.length; i++) {
    if (head.x === snake.value[i].x && head.y === snake.value[i].y) {
      resetGame();
      return;
    }
  }
}

function resetGame() {
  // const foodLeft = props.foodLeft;
  // foodLeft.value = Array.from({ length: 10 }, () => ({ eaten: false }));
  // foodLeft.value.forEach(food => {
  //   food.eaten = false;
  // });
  // props.updateFoodLeft();
  updateHighScore();
  stopGame();
  snake.value = Array.from({ length: 10 }, (_, index) => ({ x: 10, y: 20 + index }))
  food.value = generateFood();
  direction.value = 'up';
  gameSpeedDelay.value = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.value.length - 1;
  score.value.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted.value = false;
  instructionText.value.style.display = 'block';
  logo.value.style.display = 'block';
}

function updateHighScore() {
  const currentScore = snake.value.length - 1;
  if (currentScore > highScore.value) {
    highScore.value = currentScore;
    highScoreText.value.textContent = highScore.value.toString().padStart(3, '0');
  }
  highScoreText.value.style.display = 'block';
}

</script>