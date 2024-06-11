<template>
  <div class="selected-projects">
    <ul>
      <li v-for="item in activeItems" :key="item">
        {{ item }}
        <span @click="removeItem(item)">X</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.selected-projects {
  display: inline-block;
  left: 300px;
  top: 0;
  position: absolute;
  user-select: none;
  @media (max-width: 768px) {
    display: none;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: hidden; // Enable vertical scrolling

    >li {
      display: flex;
      align-items: center;
      // margin-right: 10px;
      padding: 10px 15px;
      position: relative;
      border: solid 1px $lines;
      border-top-style: none;
      &::after {
        // content: ';';
        // margin-right: 5px;
      }

      >span {
        font-family: $main-font;
        text-align: center;
        line-height: 1.35;
        width: 20px;
        height: 20px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  activeItems: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['removeItem']);

const removeItem = (item) => {
  emit('removeItem', item);
};
</script>
