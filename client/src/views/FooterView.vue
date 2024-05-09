<template>
  <footer>
    <div class="container">
      <p>find me in:</p>
      <div class="social">
        <div class="telegram">
          <Telegram width="30px" class="svg" />
        </div>
        <div class="facebook">
          <Fb />
        </div>
      </div>
      <div class="github">
        <AppLink to="https://github.com/bader-idris" class="external-link"> </AppLink>
        <div class="git-icon"></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Fb from "@/components/svg/socials/fb.vue";
import Telegram from "@/components/svg/socials/Telegram.vue";
</script>

<style lang="scss" scoped>
.svg {
  fill: $secondary1;
}
footer {
  position: relative;
  font-family: $main-font;
  height: 60px;
  background-color: $primary2;
    border: 1px solid $lines;
      margin-right: -1px;
  &::before {
    // content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;;
    border: 1px solid $lines;
    z-index: -1;
  }
  & .container {
    display: flex;
    padding: 6px;
    background-color: inherit;
    .social {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
}
</style>