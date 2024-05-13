<template>
  <footer>
    <div class="container">
      <p>find me in:</p>
      <div class="social">
        <div class="telegram">
          <AppLink class="external-link" to="https://t.me/BaderIdrees">
            <Telegram class="svg" width="30px" />
          </AppLink>
        </div>
        <div class="facebook">
          <AppLink class="external-link" to="https://www.facebook.com/Bader.idr">
            <Fb class="svg" />
          </AppLink>
        </div>
      </div>
      <div class="github" @click="goToGithub" tabindex="0">
        <p>@bader-idris</p>
        <AppLink to="https://github.com/bader-idris" class="external-link">
          <Github class="svg" />
        </AppLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Fb from "@/components/svg/socials/Fb.vue";
import Telegram from "@/components/svg/socials/Telegram.vue";
import Github from "@/components/svg/socials/Github.vue";

const goToGithub = () => {
  const gitHubLink = document.querySelector('.github a');
  gitHubLink.click();
}

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
    height: 100%;
    line-height: 1.6;
    > p:first-of-type {
      margin-left: 20px;
      margin-right: 20px;
      color: $secondary1;
    }
    .social {
      display: flex;
      // margin-left: 20px;
      align-items: center;
      & > * {
        width: 60px;
        height: 60px;
        position: relative;
        text-align: center;
        border: 1px solid $lines;
        &:hover {
          background-color: $primary1-hovered;
        }
      }
      .telegram {
        text-align: center;
        padding-top: 15px;
      }
      .facebook {
        padding-top: 7px;
      }
    }
    .github {
      cursor: pointer;
      position: absolute;
      right: 00px;
      width: 170px;
      display: flex;
      justify-content: flex-end;
      border-left: solid 1px $lines;
      color: $secondary1;
      padding-right: 15px;
      &:hover {
        background-color: $primary1-hovered;
      }
      p {
        user-select: none;
      }
      a {
        padding-top: 20px;
        padding-left: 10px;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
}
</style>