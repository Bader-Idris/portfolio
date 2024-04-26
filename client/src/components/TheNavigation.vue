<template>
  <div class="nav">
    <div class="container">
      <AppLink id="logo" to="/">Logo</AppLink>
      <ul>
        <AppLink v-for="destination in destinations" :key="destination.id"
          :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }">
          {{ destination.name }}
        </AppLink>
        <!-- <AppLink v-for="destination in destinations" :key="destination.id"
          :to="{ name: 'destination.show' }">
          {{ destination.name }}
        </AppLink> -->
      </ul>
      <!-- <AppLink :to="{ name: 'protected' }">Dashboard</AppLink> -->
      <div class="cart" @click="goToCart">
        <i class="far fa-shopping-cart"></i>
      </div>
      <!-- <AppLink to="https://vueschool.io">Vue School</AppLink> -->
    </div>
  </div>
</template>

<script>
import sourceData from '@/destinations.json'
export default {
  data() {
    return {
      destinations: sourceData.destinations
    }
  }, 
  methods: {
    goToCart() {
      this.$router.push({ name: 'cart' })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  .container {
    @media (min-width: 787px) {//! do more media
      width: 70%;
    }
    position: relative;

    display: flex;
    justify-content: space-evenly;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
    ul > a {
      margin: 10px;
      color: #333;
      padding: 20px 10px;
      // &:hover::before {
      //   content: "";
      //   width: 100%;
      //   height: 100%;
      //   opacity: 0.7;
      //   background-color: yellow;
      // }
      &:hover a::before {
        content: "";
        width: 100%;
        height: 100%;
        opacity: 0.7;
        background-color: yellow;
      }
    }
    .cart {
      margin: 10px;
      padding: 20px;
      position: relative;
      width: 60px;
      height: 100%;
      cursor: pointer;
      transition: opacity 0.3s ease;
      &:hover::before {
        content: "";
        position: absolute;
        background-color: hsl(214 30% 32% / .2);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        top: -4px;
        left: 11px;
      }
      &::after {
        content: "0";
        background: #007acc;
        width: 25px;
        height: 18px;
        position: absolute;
        top: 0;
        left: 60%;
        border-radius: 10px;
        text-align: center;
        color: white;
      }
      i {
        position: absolute;
        font-size: 25px;
        color: #007acc;
        line-height: 0;
        &.purple {
        color: #9c27b0;
        }
      }
    }
  }
  width: 100%;
  height: 70px;
  background: #f0f6ff;
  
}
#logo {
  background-color: #007acc;
  color: white;
  padding: 20px;
  margin: 5px;
  border-radius: 4px;
  border-color: none;
}
</style>