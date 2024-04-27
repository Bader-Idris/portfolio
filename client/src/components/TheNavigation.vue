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
  </header>
</template>

<script>
</script>

<style lang="scss" scoped>
header {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;;
    border: 1px solid #1E2D3D;
  }
  .container {
    font-family: 'Fira Code';
      background-color: $primary2;
      color: $secondary1;
      // width: 100%;
      height: 65px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      flex-wrap: wrap;
      padding: 0 20px;
    
      &>.name {
        flex-basis: 280px;
        position: relative;
        padding: 15px 0;
        // line-height: 65px;
        &::before {
          content: "";
          border-right: 1px solid #1E2D3D;
          // border-bottom: 1px solid #1E2D3D;
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    
      &>* {}
    
      nav {
        display: flex;
        // justify-content: space-evenly;
        flex-basis: 420px;
        // align-self: flex-start;
        a {
          padding: 23px 30px;
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
            left: 0;;
            border-bottom: 3px solid $accent1;
            color: $secondary4;
          }
        }
      }
    
      .contact {
        align-self: flex-end;
      }
  }
}
</style>