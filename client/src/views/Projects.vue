<template>
  <div class="projects">
    <NavbarProjects class="" />
    <aside>
      <ProjectsSidebar :list="list" @toggle-active="toggleActive" />
      <SelectedTabs :activeItems="activeItems" />
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.projects {
  @include mainMiddleSettings;
  // display: flex;
}
</style>

<script setup>
import { ref, computed } from 'vue';
import NavbarProjects from '@/components/NavbarProjects.vue';
import ProjectsSidebar from '@/components/ProjectsSidebar.vue';
import SelectedTabs from '@/components/SelectedTabs.vue'; // Updated import

const list = ref([
  { title: "HTML", imgAlt: "html icon", isActive: false },
  { title: "CSS", imgAlt: "css icon", isActive: false },
  { title: "Vue", imgAlt: "vue icon", isActive: false }
]);

const toggleActive = (item) => {
  item.isActive = !item.isActive;
};

const activeItems = computed(() => {
  return list.value.filter(item => item.isActive).map(item => item.title);
});
</script>
