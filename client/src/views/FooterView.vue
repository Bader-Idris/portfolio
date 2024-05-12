<template>
  <footer>
    <div class="container">
      <p>find me in:</p>
      <div class="social">
        <div class="telegram">
          <AppLink class="external-link" to="https://t.me/BaderIdrees">
            <Telegram width="30px" class="svg" />
          </AppLink>
        </div>
        <div class="facebook">
          <AppLink class="external-link" to="https://www.facebook.com/Bader.idr">
            <Fb />
          </AppLink>
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
  border-radius: 0 0 5px 5px;
  & .container {
    display: flex;
    background-color: inherit;
    > * {
      // padding: 6px;
    }
    .social {
      display: flex;
      justify-content: center;
      align-items: center;
      .telegram {
        padding: 10px 20px;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
}
</style>