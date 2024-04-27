<template>
  <div class="home">
    <div class="container">
      <section>
        <span>Hi all. I am</span>
        <h1>Bader Idris</h1>
        <p>&gt; Full-stack developer</p>
      </section>
      <section>
        <p>// complete the game to continue</p>
        <p>// you can also see it on my Github page</p>
        <p><span>const</span> <span>githubLink</span> = <AppLink to="https://github.com/bader-idris"
            class="external-link">https://github.com/bader-idris</AppLink></p>
      </section>
      <aside>
        <div class="game-container"></div>
      </aside>
    </div>
  </div>
</template>

<script>
  // export default {
  //   setup() {
  //     return {
        
  //     }
  //   },
  //   data() {
  //     return {
        
  //     }
  //   },
  // }
</script>

<style lang="scss" scoped>
.home {
  font-family: 'Fira Code', monospace;
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
    h1 {
      color: $secondary4;
      font-size: $primary1;
    }
    section>p {
      color: $secondary1;
    }
    section:nth-of-type(1) {
      & > p {
        color: $secondary3;
        font-size: $sub-headline-size;
      }
    }
    section:nth-of-type(2) {
      & > p:last-of-type {
        & > a {
          position: relative;
          color: $accent1;
        }
        & > a::before {
          content: "“";
          position: absolute;
          top: 0;
          left: -10px;
          width: 100%;
          height: 100%;
        }
        & > a::after {
          content: "”";
          position: absolute;
          top: 0;
          left: calc(100% + 10px);
          width: 100%;
          height: 100%;
        }
      }
    }
    section:nth-of-type(2)> p:last-of-type span:first-of-type {
      color: $secondary3;
    }
    section:nth-of-type(2)> p:last-of-type span:nth-of-type(2) {
      color: $accent2;
    }
    
  }
  .game-container {
    width: 600px;
    height: 400px;
    background-color: yellow;
  }

}
</style>