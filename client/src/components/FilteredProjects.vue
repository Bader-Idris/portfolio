<template>
  <div class="filtered-projects">
    <div v-for="project in filteredProjects" :key="project.title" class="project-card">
      <h3 class="card-title">// {{ project.title }}</h3>
      <a :href="project.url" target="_blank">
        <img :src="project.img" :alt="project.title" />
      </a>
      <p>{{ project.desc }}</p>
      <!-- <p>{{ project.desc.substring(0, 50) + "..." }}</p> -->
      <!-- <div class="view-project">view project</div> -->
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
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    left: 0;
    top: 0;
    // padding: 0 20px;
    position: relative;
  }

  .project-card {
    .card-title {
      font-size: $body-text-size;
    }
    padding: 20px;
    border-radius: 8px;
    width: calc(33% - 40px);
    @media (max-width: 768px) {
      width: 100%;
      p {
        padding-top: 20px;
        text-align: center;
      }
    }

    img {
      // put a better broken images message
      max-width: 100%;
      height: auto;
      display: block;
      margin-bottom: 10px;
      border-radius: 10px;

      min-width: 200px;
      min-height: 200px;
      background: $primary3;
    }
  }
}
</style>

<script setup>
import { defineProps, computed } from "vue";
import projects from "@/projects_info.json";

const props = defineProps({
  activeItems: {
    type: Array,
    required: true
  }
});

const filteredProjects = computed(() => {
  const activeItemsLower = props.activeItems.map((item) => item.toLowerCase());
  return projects.filter((project) =>
    project.tags.some((tag) => activeItemsLower.includes(tag.toLowerCase()))
  );
});
</script>
