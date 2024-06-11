<template>
  <div class="game-screen" ref="board" id="game-screen">
    <div class="scores">
      <p ref="score" id="score">000</p>
      <p ref="highScoreText" id="highScore">000</p>
      <p ref="instructionText" id="instruction-text">Press spacebar to start the
        game</p>
      <img ref="logo" id="logo" src="@/assets/imgs/snake-game-ai-gen.png"
        alt="snake-logo" />
    </div>
    <div class="outcome-display" v-if="!gameStarted || gameOver">
      <button v-if="!gameStarted" @click="startGame">Start Game</button>
      <button v-if="gameOver" @click="startGame">Game Over</button>
      <div v-if="congratsMessage" class="congrats">{{ congratsMessage }}</div>
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

      &.hide {
        display: none;
      }
    }

    .congrats {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      color: $accent2;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

.snake {
  &.head {
    border-radius: 10px;
  }
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';
import Food from './Food.vue';

const props = defineProps({
  foodLeft: Array,
  updateFoodLeft: Function
});

const emits = defineEmits(['foodEaten', 'gameOver']);
const emit = emits.emit;

const gridSize = ref(20);
const snake = ref(Array.from({ length: 10 }, (_, index) => ({ x: 10, y: 20 + index })));
const food = ref(generateFood());
const highScore = ref(0);
const direction = ref('up');
let gameInterval;
const gameSpeedDelay = ref(200);
const gameStarted = ref(false);
const gameOver = ref(false);
const congratsMessage = ref('');

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
  updateElementsVisibility();
  draw();
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress);
});

function updateElementsVisibility() {
  const displayStyle = gameStarted.value ? 'none' : 'block';
  instructionText.value.style.display = displayStyle;
  logo.value.style.display = displayStyle;
}

function draw() {
  board.value.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
}

function drawSnake() {
  snake.value.forEach((segment, index) => {
    const snakeElement = createGameElement('div', 'snake');
    if (index === 0) {
      snakeElement.classList.add('head');
      updateHeadStyle(snakeElement);
    }
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

function updateHeadStyle(element) {
  switch (direction.value) {
    case 'up':
      element.style.borderRadius = '10px 10px 0 0';
      break;
    case 'down':
      element.style.borderRadius = '0 0 10px 10px';
      break;
    case 'left':
      element.style.borderRadius = '10px 0 0 10px';
      break;
    case 'right':
      element.style.borderRadius = '0 10px 10px 0';
      break;
  }
}

function drawFood() {
  const foodElement = createGameElement('div', 'food');
  setPosition(foodElement, food.value);
  board.value.appendChild(foodElement);
}

function generateFood() {
  const x = Math.floor(Math.random() * gridSize.value) + 1;
  const y = Math.floor(Math.random() * (gridSize.value + 14)) + 1;
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
    emits('foodEaten');
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
  gameOver.value = false;
  congratsMessage.value = '';
  emit('foodEaten'); // Use emit instead of props.updateFoodLeft
  updateElementsVisibility();
  drawSnake();
  drawFood();
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay.value);
}

function handleKeyPress(event) {
  if (!gameStarted.value && (event.code === 'Space' || event.key === ' ')) {
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
  if (head.x < 1 || head.x > gridSize.value || head.y < 1 || head.y > gridSize.value + 14) {
    resetGame();
    return;
  }
  for (let i = 1; i < snake.value.length; i++) {
    if (head.x === snake.value[i].x && head.y === snake.value[i].y) {
      resetGame();
      return;
    }
  }
  if (props.foodLeft.every(food => food.eaten)) {
    congratsMessage.value = 'Well done';
    stopGame();
  }
}

function resetGame() {
  updateHighScore();
  stopGame();
  snake.value = Array.from({ length: 10 }, (_, index) => ({ x: 10, y: 20 + index }));
  food.value = generateFood();
  direction.value = 'up';
  gameSpeedDelay.value = 200;
  updateScore();
  gameOver.value = true;
  emit('gameOver'); // Use emit instead of props.updateFoodLeft
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
