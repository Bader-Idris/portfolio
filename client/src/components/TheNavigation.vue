<template>
  <header>
    <div class="container">
      <div class="name">
        Bader-Idris
      </div>
      <nav class="nav">
        <router-link to="/" class="internal-link" :class="{ active: $route.path === '/' }">_hello</router-link>
        <router-link to="/about" class="internal-link"
          :class="{ active: $route.path === '/about' }">_about-me</router-link>
        <router-link to="/projects" class="internal-link"
          :class="{ active: $route.path === '/projects' }">_projects</router-link>
      </nav>
      <div class="contact">
        _contact-me
      </div>
    </div>
    <div class="burger-nav">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>
</template>

<script>
</script>

<style lang="scss" scoped>
header {
  position: relative;
  height: 60px;
  font-family: 'Fira Code';
  background-color: $primary2;
  color: $secondary1;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;;
    border: 1px solid $lines;
    border-radius: 5px 5px 0 0;
  }
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
      &::before {
        // content: "";
        border-right: 1px solid $lines;
        border-radius: 0 0 0 5px;
        // border-bottom: 1px solid $lines;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    nav {
      display: flex;
      // justify-content: space-evenly;
      flex-basis: 420px;
      // align-self: flex-start;
      a {
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
          color: $secondary4;
        }
        &.active {
          color: $secondary4;
        }
        &::after {
          content: "";
          border-color: $lines;
          border-style: hidden solid hidden solid;
          border-width: 1px;
          // border-right: 1px solid $lines;
          // border-radius: 0 0 0 5px;
          // border-bottom: 1px solid $lines;
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
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
      border-radius: 1px;
    }
  }
}
</style>