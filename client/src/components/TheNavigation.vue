<template>
  <header>
    <div class="container">
      <div class="name ">
        Bader-Idris
      </div>
      <nav class="nav">
        <router-link to="/" class="internal-link sub-navs" :class="{ active: $route.path === '/' }">_hello</router-link>
        <router-link to="/about" class="internal-link sub-navs"
          :class="{ active: $route.path === '/about' }">_about-me</router-link>
        <router-link to="/projects" class="internal-link sub-navs"
          :class="{ active: $route.path === '/projects' }">_projects</router-link>
      </nav>
      <router-link to="/contact" class="internal-link contact sub-navs"
        :class="{ active: $route.path === '/contact' }">_contact-me</router-link>
    </div>
    <div class="burger-nav" v-if="showBurgerNav" @click="togglePhoneMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="phone-menu" v-show="showPhoneMenu">
      <div class="remove-phone-menu" @click="togglePhoneMenu">
        <span></span>
        <span></span>
      </div>
      <div class="phone-body">
        <p>howdy</p>
        <p>howdy</p>
        <p>howdy</p>
        <p>howdy</p>
      </div>
      <FooterView style="display: block; bottom: 0;"/>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import FooterView from '@/views/FooterView.vue';
const showBurgerNav = ref(window.outerWidth <= 768);
const showPhoneMenu = ref(false);

const togglePhoneMenu = () => {
  showPhoneMenu.value = !showPhoneMenu.value;
};

const handleResize = () => {
  showBurgerNav.value = window.outerWidth <= 768;
};
handleResize();

window.onresize = handleResize;
</script>

<style lang="scss" scoped>
.sub-navs {
  padding: 21px 30px;
  cursor: pointer;
  color: $secondary1;
  text-decoration: none;
  position: relative;

  &.active::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: -3px;
    left: 0;
    border-bottom: 3px solid $accent1;
    // color: $secondary4;
  }
  &:hover {
    background-color: $primary1-hovered;

  }
  &.active {
    color: $secondary4;
  }

  &::after {
    content: "";
    border-color: $lines;
    border-width: 1px;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:not(.contact)::after {
    border-style: hidden solid hidden solid;
  }
  &.contact::after {
    border-style: hidden hidden hidden solid;
  }
}
header {
  position: relative;
  height: 60px;
  font-family: 'Fira Code';
  background-color: $primary2;
  color: $secondary1;
  width: 100%;
  border: 1px solid $lines;
  border-width: 1px 1px 0 1px;
  border-radius: 5px 5px 0 0;
  .container {
    margin-right: -1px;
    color: inherit;
    background-color: inherit;
    // width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    padding: 0 20px;
  
    & > .name {
      flex-basis: 280px;
      position: relative;
      padding: 15px 0;
      // line-height: 65px;
    }
    nav {
      display: flex;
      // justify-content: space-evenly;
      flex-basis: 420px;
      // align-self: flex-start;
      
    }
    .contact {
      // align-self: flex-end;
      cursor: pointer;
      z-index: 1;
    }
    
    @media (max-width: 768px) {
      nav,
      .contact {
        display: none;
      }
    }
  }
  @media (max-width: 768px) {
    .burger-nav {
      z-index: 2;
      width: 20px;
      height: 20px;
      top: 25px;
      right: 20px;
      position: absolute;
      span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: $secondary1;
        border-radius: 1px;
        margin-bottom: 4px;
      }
    }
    .phone-menu {
      width: calc(100vw - 30px);
      height: calc(100vh - 30px);
      background-color: $primary2;
      z-index: 999;
      position: relative;
      top: -50px;
      border-radius: 5px;
      .remove-phone-menu {
        z-index: 2;
        width: 20px;
        height: 20px;
        top: 30px;
        right: 22px;
        position: absolute;
        
        span {
          display: block;
          width: 100%;
          height: 2px;
          background-color: $secondary1;
          border-radius: 1px;
          margin-bottom: 4px;
          &:first-of-type {
            transform: rotate(45deg) translateX(20%);
          }
          &:last-of-type {
            transform: rotate(-45deg) translateX(20%);
          }
        }
      }
    }
  }
}
</style>