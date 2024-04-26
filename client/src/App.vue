<template>
  <TheUtils />
  <TheNavigation />
  <div class="container">
    <div>howdy, for color branding, use <AppLink to="https://brandcolors.net/" class="external-link">this</AppLink>
    </div>
    <!-- <button class="register-btn"><AppLink to="/register" class="internal-link">register</AppLink></button> -->
    <!-- <button class="login-btn"><AppLink to="/login" class="internal-link">login</AppLink></button> -->
    <!-- Main -->
    <router-view v-slot="{ Component }" class="main-view">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import TheUtils from '@/components/TheUtils.vue'
import TheNavigation from '@/components/TheNavigation.vue'
</script>

<style lang="scss">
.register-btn,
.login-btn {
  width: 100px;
  padding: 15px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  background-color: #2c3e50;
  border: none;
  border-radius: 5px;
  & > a {
    color: white;
    font-size: 19px;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>