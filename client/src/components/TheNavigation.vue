<template>
  <header>
    <div class="container">
      <div class="name">
        {{ name }}
      </div>
      <nav class="nav">
        <router-link to="/" class="internal-link sub-navs" :class="{ active: $route.path === '/' }"
          >_hello</router-link
        >
        <router-link
          to="/about"
          class="internal-link sub-navs"
          :class="{ active: $route.path === '/about' }"
          >_about-me</router-link
        >
        <router-link
          to="/projects"
          class="internal-link sub-navs"
          :class="{ active: $route.path === '/projects' }"
          >_projects</router-link
        >
      </nav>
      <router-link
        to="/contact"
        class="internal-link contact sub-navs"
        :class="{ active: $route.path === '/contact' }"
        >_contact-me</router-link
      >
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
      <div class="phone-body container">
        <div class="name">{{ name }}</div>
        <ul>
          <router-link
            to="/"
            class="internal-link phone-sub-navs"
            :class="{ active: $route.path === '/' }"
            >_hello</router-link
          >
          <router-link
            to="/about"
            class="internal-link phone-sub-navs"
            :class="{ active: $route.path === '/about' }"
            >_about-me</router-link
          >
          <router-link
            to="/projects"
            class="internal-link phone-sub-navs"
            :class="{ active: $route.path === '/projects' }"
            >_projects</router-link
          >
          <router-link
            to="/contact"
            class="internal-link contact-phone phone-sub-navs"
            :class="{ active: $route.path === '/contact' }"
            >_contact-me</router-link
          >
        </ul>
      </div>
      <FooterView style="display: block; bottom: 0" />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import FooterView from "@/views/FooterView.vue";
const showBurgerNav = ref(window.outerWidth <= 768);
const showPhoneMenu = ref(false);
const name = ref("Bader-Idris");
const togglePhoneMenu = () => {
  showPhoneMenu.value = !showPhoneMenu.value;
};
// const props = defineProps({
//   togglePhoneMenu
// })
const handleResize = () => {
  showBurgerNav.value = window.outerWidth <= 768;
};
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// window.onresize = handleResize;
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
  font-family: $main-font;
  background-color: $primary2;
  color: $secondary1;
  width: 100%;
  border: 1px solid $lines;
  border-width: 1px 1px 0 1px;
  border-radius: 5px 5px 0 0;
  .container {
    // margin-right: -1px;
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
      line-height: 1.7;
      @media (max-width: 768px) {
        &::after {
          content: "";
          position: absolute;
          width: calc(100vw - 32px);
          height: 100%;
          left: -20px;
          top: 2px;
          border-bottom: 1px solid $lines;

          box-shadow: 0 2px 20px 0 #0000008a;
          z-index: 1;
        }
      }
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
      position: absolute;
      right: 0;
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
      width: 40px;
      height: 40px;
      position: absolute;
      top: 12px;
      right: 10px;
      padding: 10px;
      span {
        position: relative;
        display: block;
        width: 100%;
        height: 2px;
        background-color: $secondary1;
        border-radius: 1px;
        margin-bottom: 4px;
      }
    }
    .phone-menu {
      font-family: $main-font;
      width: calc(100vw - 30px);
      height: calc(100vh - 30px);
      background-color: $primary2;
      z-index: 999;
      position: relative;
      top: -58px;
      border-radius: 5px;
      &::before {
        content: "";
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: $primary1;
        left: -15px;
        top: -15px;
        z-index: -1;
      }
      .remove-phone-menu {
        z-index: 2;
        top: 15px;
        right: 15px;
        position: absolute;
        width: 40px;
        height: 40px;
        padding: 10px;

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
      @media (max-width: 768px) {
        .phone-body {
          @include mainMiddleSettings;
          border-radius: 5px 5px 0 0;
          height: calc(100vh - 88px);
          align-content: flex-start;
          .phone-sub-navs {
            padding: 15px 20px;
            cursor: pointer;
            color: $secondary1;
            text-decoration: none;
            display: block;
            text-align: center;

            &.active {
              color: $secondary4;
            }

            @media (min-width: 768px) {
              &:hover {
                background-color: $primary1-hovered;
              }
            }
            .contact {
              left: 0;
              position: relative;
            }
          }
          > ul {
            left: -20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: relative;
            & > a {
              &::before {
                content: "";
                position: absolute;
                border-bottom: 1px solid $lines;
                width: calc(100vw - 33px);
                left: 0;
                height: 0px;
                padding: 17px 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
