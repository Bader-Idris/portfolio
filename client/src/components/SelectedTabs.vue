<!-- <template>
  <div class="selected-tabs">
    <ul>
      <li v-for="item in activeItems" :key="item">{{ item }}</li>
    </ul>
  </div>
</template> -->

<template>
  <div class="selected-projects">
    <p>Selected Projects</p>
    <ul>
      <li v-for="item in activeItems" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

import projects from '@/projects_info.json';
// const nigga = async () =>  {
//   await projects.forEach((project, index) => {
//     console.log(project)
//   })
// }

const props = defineProps({
  activeItems: {
    type: Array,
    required: true
  }
});

</script>
