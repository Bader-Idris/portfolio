<template>
  <div class="game-screen" ref="board">
    <div class="scores">
      <p v-if="gameStarted || !gameOver">{{ formattedScore }}</p>
      <!-- <p>{{ formattedHighScore }}</p> -->
    </div>
    <div class="outcome-display" v-if="!gameStarted || gameOver">
      <CustomButtons v-if="!gameStarted && !gameOver" @click="startGame" buttonType="ghost">
        Start Game
      </CustomButtons>

      <p class="outcome" v-if="gameOver && congratsMessage">{{ isWon }}</p>
      <!-- @keydown.space="startGame" does not work -->
      <div @click="startGame" @keydown.space="startGame" v-if="congratsMessage" class="congrats">
        {{ congratsMessage }}
      </div>
    </div>
    <div
      class="snake"
      v-for="segment in snake"
      :key="segment.id"
      :style="{ gridColumn: segment.x, gridRow: segment.y }"
    ></div>
    <div class="food" :style="{ gridColumn: food.x, gridRow: food.y }"></div>
  </div>
</template>

<style lang="scss">
.game-screen {
  margin: 30px 5px 30px 33px;
  box-shadow: inset 1px 5px 11px 0 #02121b;
  background-color: rgb(1, 8, 14, 50%);
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(20, 12px);
  // grid-template-rows: repeat(20, 12px);
  grid-template-rows: repeat(34, 12px);
  position: relative;

  .scores {
    position: absolute;
    bottom: -40px;
    width: 100%;
    text-align: center;
    color: $accent1;
    font-weight: bold;
    text-transform: uppercase;
  }
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
    .outcome {
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      width: 100%;
      text-align: center;
      box-shadow: inset 0px 2px 15px 9px #0000007d;
      background-color: #0000007d;
      color: $gradients2;
      font-size: 20px;
      text-transform: uppercase;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: $btn1-clr;
        left: 0;
        top: 0;
        z-index: -1;
      }
    }
    .congrats {
      position: absolute;
      bottom: 15%;
      left: 50%;
      transform: translateX(-50%);
      color: $secondary1;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}

.snake {
  &.head {
    border-radius: 10px;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import CustomButtons from "@/components/CustomButtons.vue";

// Import sound files
import eatingSound from "@/assets/sounds/swallow.wav";
import victorySound from "@/assets/sounds/victory.wav";
import wallHitSound from "@/assets/sounds/wall-hit.wav";

// Create audio objects
const eatingAudio = new Audio(eatingSound);
const victoryAudio = new Audio(victorySound);
const wallHitAudio = new Audio(wallHitSound);

// Define props with proper types
const props = defineProps<{
  foodLeft: { eaten: boolean }[];
  updateFoodLeft: () => void;
}>();

// Emit types
const emit = defineEmits<{
  (e: "foodEaten", score: number): void;
  (e: "gameOver"): void;
}>();

// Reactive variables with types
const gridSize = ref<number>(20);
const snake = ref<{ x: number; y: number }[]>(
  Array.from({ length: 10 }, (_, index) => ({ x: 10, y: 20 + index }))
);
const food = ref<{ x: number; y: number }>(generateFood());
const direction = ref<string>("up");
const lastDirection = ref<string>("up"); // Store last valid direction to avoid opposite direction issue
let gameInterval: number;
const gameSpeedDelay = ref<number>(150);
const gameStarted = ref<boolean>(false);
const gameOver = ref<boolean>(false);
const congratsMessage = ref<string>("");
const score = ref<number>(0);
let winningScore = ref<number>(10);

// Formatted score for singular/plural
const formattedScore = computed(() =>
  score.value === 1 ? `Score: ${score.value}` : `Scores: ${score.value}`
);

// Key event listener lifecycle hooks
onMounted(() => {
  document.addEventListener("keydown", handleKeyPress);
  const snakeHead = document.querySelector("div.game-screen > div:nth-child(3)");
  if (snakeHead) {
    snakeHead.style.borderRadius = "10px 10px 0 0";
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
});

function updateHeadStyle(element: HTMLElement): void {
  switch (direction.value) {
    case "up":
      element.style.borderRadius = "10px 10px 0 0";
      break;
    case "down":
      element.style.borderRadius = "0 0 10px 10px";
      break;
    case "left":
      element.style.borderRadius = "10px 0 0 10px";
      break;
    case "right":
      element.style.borderRadius = "0 10px 10px 0";
      break;
  }
}

function generateFood(): { x: number; y: number } {
  const x = Math.floor(Math.random() * gridSize.value) + 1;
  const y = Math.floor(Math.random() * (gridSize.value + 14)) + 1;
  return { x, y };
}

function move(): void {
  const head = { ...snake.value[0] };

  if (
    (lastDirection.value === "up" && direction.value === "down") ||
    (lastDirection.value === "down" && direction.value === "up") ||
    (lastDirection.value === "left" && direction.value === "right") ||
    (lastDirection.value === "right" && direction.value === "left")
  ) {
    direction.value = lastDirection.value;
  } else {
    lastDirection.value = direction.value;
  }

  // Update snake head position
  switch (direction.value) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Reactively update the snake's head style
  const headElement = document.querySelector<HTMLElement>("div.game-screen .snake")!;
  headElement.classList.add("head");
  updateHeadStyle(headElement);

  snake.value.unshift(head);

  // Check if the snake ate the food
  if (head.x === food.value.x && head.y === food.value.y) {
    food.value = generateFood();
    emit("foodEaten", score.value + 1);
    increaseSpeed();
    score.value++;
    eatingAudio.play();
    clearInterval(gameInterval);
    gameInterval = window.setInterval(() => {
      move();
      checkCollision();
    }, gameSpeedDelay.value);
  } else {
    snake.value.pop();
  }

  // Check if the player has won
  if (score.value >= winningScore.value) {
    victoryAudio.play(); // Play victory sound
    stopGame("Play-again");
  }
}

function startGame(): void {
  resetGame();
  gameInterval = window.setInterval(() => {
    move();
    checkCollision();
  }, gameSpeedDelay.value);
}

function resetGame(): void {
  gameStarted.value = true;
  gameOver.value = false;
  congratsMessage.value = "";
  score.value = 0;
  snake.value = Array.from({ length: 10 }, (_, index) => ({ x: 10, y: 20 + index }));
  food.value = generateFood();
  clearInterval(gameInterval);
  emit("gameOver");
}

const isWon = computed(() => (score.value >= winningScore.value ? "Well Done!" : "Game over!"));

function handleKeyPress(event: KeyboardEvent): void {
  // Allow starting/restarting the game with the space bar whether game is over or not
  if ((gameOver.value || !gameStarted.value) && (event.code === "Space" || event.key === " ")) {
    startGame(); // Restart game on space bar
  } else if (gameStarted.value) {
    switch (event.key) {
      case "ArrowUp":
        if (lastDirection.value !== "down") direction.value = "up";
        break;
      case "ArrowDown":
        if (lastDirection.value !== "up") direction.value = "down";
        break;
      case "ArrowLeft":
        if (lastDirection.value !== "right") direction.value = "left";
        break;
      case "ArrowRight":
        if (lastDirection.value !== "left") direction.value = "right";
        break;
    }
  }
}

// function increaseSpeed() {
//   if (gameSpeedDelay.value > 150) {
//     gameSpeedDelay.value -= 5;
//   } else if (gameSpeedDelay.value > 100) {
//     gameSpeedDelay.value -= 3;
//   } else if (gameSpeedDelay.value > 50) {
//     gameSpeedDelay.value -= 2;
//   } else if (gameSpeedDelay.value > 25) {
//     gameSpeedDelay.value -= 1;
//   }
// }

function increaseSpeed(): void {
  if (gameSpeedDelay.value > 50) {
    gameSpeedDelay.value -= 10;
  }
}

function checkCollision(): void {
  const head = snake.value[0];
  if (head.x < 1 || head.x > gridSize.value || head.y < 1 || head.y > gridSize.value + 14) {
    wallHitAudio.play();
    stopGame("Start-again");
    return;
  }
  for (let i = 1; i < snake.value.length; i++) {
    if (head.x === snake.value[i].x && head.y === snake.value[i].y) {
      wallHitAudio.play();
      stopGame("Start-again");
      return;
    }
  }
}

function stopGame(message: string): void {
  gameOver.value = true;
  gameStarted.value = false;
  gameSpeedDelay.value = 150;
  direction.value = "up";
  lastDirection.value = "up";
  congratsMessage.value = message;
  clearInterval(gameInterval);
}
</script>
