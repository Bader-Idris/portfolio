<template>
  <div class="game-container">
    <div class="screws">
      <span v-for="i in 4" :key="i">x</span>
    </div>
    <!-- <SnakeGame :foodLeft="foodLeft" @foodEaten="updateFoodLeft" /> -->
    <SnakeGame :updateFoodLeft="updateFoodLeft" />
    <div class="game-controller">
      <span>// use keyboard</span>
      <span>// arrows to play</span>
      <div class="board-arrows">
        <span><i class="fas fa-triangle"></i></span>
        <span><i class="fas fa-triangle left"></i></span>
        <span><i class="fas fa-triangle down"></i></span>
        <span><i class="fas fa-triangle right"></i></span>
      </div>
      <span>// food left</span>
      <Food :foodLeft="foodLeft" />
      <AppLink to="/about" class="internal-link">
        <!-- Give some smooth movements, 🔴 and force the game to stop -->
        <button class="skip">Skip</button>
      </AppLink>
    </div>
  </div>
</template>

<style lang="scss">
    .game-container {
      .screws {
        width: 100%;
        height: 100%;
        position: absolute;
        span {
          font-size: 8px;
          line-height: 13px;
          text-align: center;
          position: absolute;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          box-shadow: inset 1px -1px 6px 2px $primary2, 0 3px 3px 0px $primary2;
          color: $primary1;
          background-color: $secondary2;
          z-index: 0;
          &:first-of-type {
            top: 10px;
            left: 10px;
          }
          &:nth-of-type(2) {
            top: 10px;
            right: 10px;
          }
          &:nth-of-type(3) {
            bottom: 10px;
            left: 10px;
          }
          &:last-of-type {
            bottom: 10px;
            right: 10px;
          }
        }
      }
      width: 510px;
      height: 475px;
      background: linear-gradient(-28deg, #175553 0%, rgba(67, 217, 173, 0.13) 100%);
      border-radius: 10px;
      position: relative;
      display: flex;
  
      &::before {
        content: "";
        position: absolute;
        // background-color: $gradients2;
        box-shadow: 0 0 240px 200px rgba(67, 217, 173, 0.4);
        top: 0%;
        left: 20%;
        width: 0;
        height: 200px;
        transform: rotate(135deg);
        z-index: 1;
      }
  
      &::after {
        content: "";
        width: 0;
        height: 200px;
        position: absolute;
        // background-color: $gradients1;
        top: 70%;
        left: 70%;
        box-shadow: 0 0 240px 200px rgba(77, 91, 206, 0.4); //40% of $gradients1
        transform: rotate(45deg);
        z-index: 1;
      }
  
      &>*:not(.screws) {
        width: 50%;
        height: calc(100% - 60px);
        border-radius: 10px;
      }
      .game-controller {
        margin: 30px 33px 30px 15px;
        position: relative;
  
        &>span {
          display: block;
          margin: 10px 0;
        }
  
        .board-arrows {
          position: relative;
          z-index: 1;
          height: 110px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: space-around;
          transform: rotate(180deg);
  
          >span {
            border-radius: 5px;
            width: 50px;
            height: 30px;
          }
  
          & span {
            &:first-of-type {
              order: 2;
            }
  
            &:nth-of-type(2) {
              order: 1;
            }
  
            &:nth-of-type(3) {
              order: 4;
            }
  
            &:last-of-type {
              order: 3;
            }
  
            text-align: center;
            line-height: 25px;
            cursor: pointer;
            display: inline-block;
            width: 50px;
            height: 30px;
            background: black;
            z-index: 3;
  
            &>i {
              font-size: 10px;
              color: $secondary4;
  
              &.left {
                transform: rotate(-90deg);
              }
  
              &.right {
                transform: rotate(-270deg);
              }
  
              &.down {
                transform: rotate(180deg);
              }
            }
          }
        }
        .skip {
          position: absolute;
          padding: 10px 20px;
          border-color: $secondary4;
          color: $secondary4;
          bottom: 0;
          right: 0;
          background-color: transparent;
          cursor: pointer;
          user-select: none;
          border-radius: 5px;
          &:hover {
            opacity: 0.7;
          }
        }
      
      }
    }
</style>

<script setup>
import { ref, onMounted } from 'vue';
import SnakeGame from '@/components/SnakeGame.vue';
import Food from './Food.vue';

// Define reactive data for foodLeft array
const foodLeft = ref([]);

// Initialize foodLeft array on component mount
onMounted(() => {
  foodLeft.value = Array.from({ length: 10 }, () => ({ eaten: false }));
});

// Initialize currentIndex to track the index of the last uneaten food
// let currentIndex = ref(0);

function updateFoodLeft() {
  // Find the index of the last uneaten food
  let lastIndex = foodLeft.value.length - 1;
  while (lastIndex >= 0 && foodLeft.value[lastIndex].eaten) {
    lastIndex--;
  }

  // If there's an uneaten food, mark it as eaten
  if (lastIndex >= 0) {
    foodLeft.value[lastIndex].eaten = true;
  }
}
</script>