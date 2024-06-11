<template>
  <button :class="['button-style', buttonType]" draggable="false">
    <slot></slot>
  </button>
  <!-- use as <CustomButtons buttonType="ghost">txt</CustomButtons>  -->
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  buttonType: {
    type: String,
    default: 'default',
    validator: value => ['primary', 'default', 'ghost'].includes(value)
  }
});
</script>

<style lang="scss">
.button-style {
  border-radius: 0.5em;
  border: transparent;
  padding: 15px;
  cursor: pointer;
  user-select: none;
  
  
  &.primary {
    background-color: $btn1-bg;
    color: $btn1-clr;

    &:hover {
      opacity: 0.7;
    }
  }

  &.default {
    background-color: $btn2-bg;
    color: $btn2-clr;

    &:hover {
      opacity: 0.7;
    }
  }

  &.ghost {
    background-color: $btn3-bg;
    color: $btn3-clr;
    border: 1px solid $btn3-clr;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
