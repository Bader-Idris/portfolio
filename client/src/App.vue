<template>
  <!-- <TheUtils /> -->
  <TheNavigation />
  <router-view />
  <!-- <div class="container">
  </div> -->
  <FooterView />
</template>

<script setup>
// import TheUtils from '@/components/TheUtils.vue'
import TheNavigation from '@/components/TheNavigation.vue'
import FooterView from '@/views/FooterView.vue'
</script>

<style lang="scss">
body {
  background-color: $primary1;
  color: $secondary1;
}
#app {
  margin: 30px;
  // width: 100%;
  // height: 100%;
}
.title {
  font-family: $main-font;
}
.container {
background-color: $primary1;
  // font-size: $headline-size;
  // text-transform: uppercase;
  color: white;
}
</style>
