<template>
  <FoldableTab @click="toggleSidebar">
    <p>projects</p>
  </FoldableTab>
</template>

<script setup>
import { defineEmits } from "vue";
import FoldableTab from "./FoldableTab.vue";

const emit = defineEmits(["toggle-sidebar"]);

const toggleSidebar = () => {
  emit("toggle-sidebar");
};
</script>

<style lang="scss" scoped></style>
