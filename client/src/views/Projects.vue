<template>
  <div class="projects">
    <NavbarProjects class="" />
    <aside>
      <ProjectsSidebar :list="list" @toggle-active="toggleActive" />
      <SelectedTabs :activeItems="activeItems" @removeItem="removeItem" />
    </aside>
    <FilteredProjects :activeItems="activeItems" />
  </div>
</template>

<style lang="scss" scoped>
.projects {
  @include mainMiddleSettings;
  height: 80vh;
  // overflow-y: scroll;
  overflow-x: hidden;
}
</style>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import NavbarProjects from '@/components/NavbarProjects.vue';
import ProjectsSidebar from '@/components/ProjectsSidebar.vue';
import SelectedTabs from '@/components/SelectedTabs.vue';
import FilteredProjects from '@/components/FilteredProjects.vue';

const list = ref([
  { title: "HTML", imgAlt: "html icon", isActive: false },
  { title: "CSS", imgAlt: "css icon", isActive: false },
  { title: "Vue", imgAlt: "vue icon", isActive: false },
  // { title: "Docker", imgAlt: "docker icon", isActive: false },
  { title: "Typescript", imgAlt: "Typescript icon", isActive: false },
  // { title: "Express", imgAlt: "Express icon", isActive: false },
  // { title: "Shell", imgAlt: "shell icon", isActive: false },
]);

const toggleActive = (item) => {
  item.isActive = !item.isActive;
  saveActiveItems();
};

const activeItems = computed(() => {
  return list.value.filter(item => item.isActive).map(item => item.title);
});

const saveActiveItems = () => {
  const activeItems = list.value.filter(item => item.isActive).map(item => item.title);
  localStorage.setItem('activeItems', JSON.stringify(activeItems));
};

const loadActiveItems = () => {
  const storedActiveItems = JSON.parse(localStorage.getItem('activeItems'));
  if (storedActiveItems) {
    list.value.forEach(item => {
      item.isActive = storedActiveItems.includes(item.title);
    });
  }
};

const removeItem = (itemTitle) => {
  const item = list.value.find(item => item.title === itemTitle);
  if (item) {
    item.isActive = false;
    saveActiveItems();
  }
};

onMounted(() => {
  loadActiveItems();
});

watch(list, saveActiveItems, { deep: true });
</script>
