<template>
  <div class="cart-view">
    <p>{{ cart }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cart: "Your Cart Is Empty"
      }
    },
  }
</script>

<style lang="scss" scoped>
.cart-view {
  p {
    font-size: 50px;
  }
}
</style>