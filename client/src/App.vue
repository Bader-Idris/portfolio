<template>
  <!-- <TheUtils /> -->
  <TheNavigation />
  <router-view />
  <div class="container">
    <!-- <div>howdy, for color branding, use <AppLink to="https://brandcolors.net/" class="external-link">this</AppLink>
    </div> -->
    <p class="title">App view</p>
    <span>
      <htmlIcon color="#0CE31A" />
    </span>
    <!-- <AppLink to="about" class="internal-link">Howdy</AppLink> -->
  </div>
</template>

<script setup>
// import TheUtils from '@/components/TheUtils.vue'
import TheNavigation from '@/components/TheNavigation.vue'
import htmlIcon from '@/components/svg/SvgHtml.vue'
// import cssIcon from '@/components/svg/SvgCss.vue'
// import jsIcon from '@/components/svg/SvgJs.vue'
</script>

<style lang="scss">
body {
  background-color: $primary1;
  color: $secondary1;
}
#app {
  margin: 30px;
}
.title {
  font-family: 'Fira Code', monospace;
}
.container {
background-color: $primary1;
  // font-size: $headline-size;
  // text-transform: uppercase;
  color: white;
}
</style>
