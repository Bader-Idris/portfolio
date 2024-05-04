<template>
  <!-- <TheUtils /> -->
  <TheNavigation />
    <router-view />
  <FooterView />
</template>

<script setup>
// import TheUtils from '@/components/TheUtils.vue'
import TheNavigation from '@/components/TheNavigation.vue'
import FooterView from '@/views/FooterView.vue'
</script>

<style lang="scss">
:root {
  height: 100vh;
  width: 100vw;
}
body {
  background-color: $primary1;
  color: $secondary1;
}
#app {
  margin: 30px;
}
.title {
  font-family: $main-font;
}
.container {
  background-color: $primary1;
  color: white;
}
</style>
