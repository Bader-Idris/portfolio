<template>
  <div class="not-found">
    <!-- <div class="container"> -->
    <p class="text">404</p>
    <router-link to="/">
      <span> back to main page </span>
    </router-link>
    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  @include mainMiddleSettings;
  @media (max-width: 768px) {
    @include phone-borders;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  .text {
    font-size: calc($headline-size * 2);
    text-align: center;
    margin: 20px 0;
  }
  a {
    color: $primary1;
    text-decoration: none;
    text-align: center;
    span {
      color: $secondary3;
      font-size: $body-text-size;
    }
  }
}
</style>
