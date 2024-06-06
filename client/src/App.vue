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
  // margin: 30px;
  margin: 30px;
  @media (max-width: 768px) {
    margin: 15px;
  }
}
.title {
  font-family: $main-font;
}
.container {
  background-color: $primary1;
  color: white;
}


/* 
  we might need to use this for the status-bar on phones

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

body {
  background-color: #000;
}

*/
</style>
