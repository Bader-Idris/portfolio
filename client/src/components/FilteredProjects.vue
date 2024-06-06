<template>
  <div class="filtered-projects">
    <div v-for="project in filteredProjects" :key="project.title"
      class="project-card">
      <h3>{{ project.title }}</h3>
      <a :href="project.url" target="_blank">
        <img :src="project.img" :alt="project.title" />
      </a>
      <p>{{ project.desc }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.filtered-projects {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  left: 350px;
  position: absolute;
  top: 100px;
  // overflow-y: scroll;
  // overflow-x: hidden;
  overflow: hidden;
  width: calc(100% - 290px);
  padding-bottom: 100px;

  .project-card {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    width: calc(33% - 40px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin-bottom: 10px;
      border-radius: 10px
    }
  }
}
</style>

<script setup>
import { defineProps, computed } from 'vue';
import projects from '@/projects_info.json';

const props = defineProps({
  activeItems: {
    type: Array,
    required: true
  }
});

const filteredProjects = computed(() => {
  const activeItemsLower = props.activeItems.map(item => item.toLowerCase());
  return projects.filter(project =>
    project.tags.some(tag => activeItemsLower.includes(tag.toLowerCase()))
  );
});
</script>
