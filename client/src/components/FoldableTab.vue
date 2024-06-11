<template>
  <div class="nav-titled">
    <div class="foldable-tab" @click="toggleFolding"
      :class="{ 'is-folded': isToggled }">
      <span class="fas fa-triangle">
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-titled {
  width: 301px;
  border-right: 1px solid $lines;
  color: $secondary4;
  position: relative;

  p {
    position: relative;
    user-select: none;
    font-family: $main-font;
    font-weight: bold;
    /* font-size: 20px; */
    letter-spacing: 0.7px;
  }
}

.foldable-tab {
  display: flex;
  align-items: baseline;
  padding-left: 10px;
  @media (max-width: 768px) {
    background-color: $lines;
    height: 30px;
    align-items: center;
    width: 100vw;
  }
  >span {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
    font-size: 10px;
    padding: 15px 10px;
  }
}

.foldable-tab.is-folded>span {
  transform: rotate(90deg);
}
</style>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['toggle']);

const isToggled = ref(false);
const toggleFolding = () => {
  isToggled.value = !isToggled.value;
  emit('toggle');
}
</script>
