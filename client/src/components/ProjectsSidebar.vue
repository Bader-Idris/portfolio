<template>
  <div class="projects-sidebar" :class="{ hidden: isSidebarHidden }">
    <div v-for="item in list" :key="item.title">
      <!-- <label @click.prevent="toggleActive(item)"> -->
      <label @click.prevent="toggleActiveItem(item)">
        <!-- <input type="checkbox" :checked="item.isActive" @click.stop> -->
        <input type="checkbox" v-model="item.isActive" @click.stop />
        <!-- !weird MF <img :src="componentMap[item.title]" :alt="item.imgAlt" />  -->
        <component
          :is="componentMap[item.title]"
          :alt="item.imgAlt"
          :class="item.title"
          class="project-svg"
          @click.stop
        />
        <p class="project-item" :class="{ active: item.isActive }" @click.stop>
          {{ item.title }}
        </p>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
.projects-sidebar {
  width: 301px;
  // border-right: 1px solid $lines;
  transition: transform 0.3s ease;
  &.hidden {
    display: none;
  }
  > div {
    label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      -webkit-user-drag: none;
      cursor: pointer;
      margin: 20px;
      > * {
        margin: 0 10px;
      }
      .project-item {
        user-select: none;
        font-size: $labels-size;
        &.active {
          color: $secondary4;
        }
      }
      input[type="checkbox"] {
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid $secondary1;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
        position: relative;

        &:checked {
          background-color: $secondary1;

          &::before {
            content: "\2713";
            /* Unicode for check mark */
            color: white;
            font-size: 16px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      &:hover {
        opacity: 0.7;
      }
      &:last-of-type {
        margin-bottom: 0;
        padding-bottom: 20px;
      }
    }
  }
}

.project-item {
  margin-right: 20px;
  margin-bottom: 20px;
}

.project-svg {
  width: 25px;
  height: 25px;
  margin-top: 10px;
}
</style>

<script setup>
import { defineProps, defineEmits, ref, watchEffect } from "vue";
import SvgHtml from "./svg/SvgHtml.vue";
import SvgCss from "./svg/SvgCss.vue";
import SvgVuejs from "./svg/SvgVuejs.vue";
// import SvgDocker from './svg/SvgDocker.vue';
// import SvgTS from './svg/SvgTS.vue';
import Typescript from "./svg/Typescript.vue";
// import Expressjs from './svg/Expressjs.vue';
// import SvgShell from './svg/SvgShell.vue';

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  isSidebarHidden: Boolean
});
const emit = defineEmits(["toggle-active"]);
const toggleActiveItem = (item) => {
  emit("toggle-active", item);
};
const componentMap = {
  HTML: SvgHtml,
  CSS: SvgCss,
  Vue: SvgVuejs,
  // Docker: SvgDocker
  Typescript: Typescript
  // Express: Expressjs,
  // shell scripting: SvgShell
};
// const isSidebarHidden = ref(false);
</script>
