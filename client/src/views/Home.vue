<template>
  <div class="home">
    <div class="container">
      <section>
        <div class="info">
          <span>Hi all. I am</span>
          <h1>Bader Idris</h1>
          <p>&gt; Full-stack developer</p>
        </div>
        <div class="task">
          <p>// complete the game to continue</p>
          <p>// you can also see it on my Github page</p>
        </div>
        <div class="github-repo">
          <p>// Find my profile on github</p>
          <span>const</span> <span>githubLink</span> =
          <AppLink to="https://github.com/bader-idris"
          class="external-link">https://github.com/bader-idris</AppLink>
        </div>
      </section>
      <aside>
        <GameContainer />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GameContainer from '@/components/GameContainer.vue'
import Food from '@/components/Food.vue';
</script>

<style lang="scss" scoped>
.home {
  @include mainMiddleSettings;
    padding: 50px;

  // border: 1px solid $lines;
  @media (max-width: 768px) {
    border-radius: 0 0 5px 5px;
  }
  &::before {
    // content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid $lines;
    @media (max-width: 768px) {
      border-radius: 0 0 5px 5px;
    }
    
    z-index: -1;
  }
  .container {
    
    display: flex;
    height: 70vh;
    // justify-content: center;
    align-items: center;
    background-color: inherit;
    margin-right: -1px;
    h1 {
      color: $secondary4;
      font-size: $headline-size;
      line-height: calc($headline-size / 2);
      padding: 10px 0;
    }
    section>p {
      color: $secondary1;
    }
    section {
      margin-right: 10%;
      .info {
        &>p {
            color: $secondary3;
            font-size: $sub-headline-size;
            margin-bottom: 100px;
            @media (max-width: 768px) {
              margin-bottom: 20px;
              font-size: $body-text-size;
              font-weight: bold;
              letter-spacing: -1px;
            }
          }
      }
      .task {
        &>p {
          font-size: $body-text-size;
        }
        &>p {
          color: $secondary1;
          // margin-bottom: 100px;
        }
        @media (max-width: 768px) {
          display: none;
        }
      }
      .github-repo {
        p {
          color: $secondary1;
          @media (min-width: 768px) {
            display: none;
          }
        }
        &>a {
          left: 10px;
          position: relative;
          color: $accent1;
        }
    
        &>a::before {
          content: "“";
          position: absolute;
          top: 0;
          left: -10px;
          width: 100%;
          height: 100%;
        }
    
        &>a::after {
          content: "”";
          position: fixed;
        }
        & span:first-of-type {
          color: $secondary3;
        }
        // here
        & span:nth-of-type(2) {
          color: $accent2;
        }
      }
      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        height: 80vh;
        align-items: center;
        justify-content: space-around;
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;
      >aside {
        display: none;
      }
      & h1 {
        line-height: 1.2;
        font-weight: normal;
        &::before {
          content: "";
          position: absolute;
          // background-color: $gradients2;
          box-shadow: 0 0 120px 100px rgba(67, 217, 173, 0.4);
          top: 10%;
          left: 30%;
          width: 0;
          height: 100px;
          transform: rotate(135deg);
          z-index: 1;
        }
        &::after {
          content: "";
          width: 0;
          height: 100px;
          position: absolute;
          // background-color: $gradients1;
          top: 50%;
          left: 75%;
          box-shadow: 0 0 220px 120px rgba(77, 91, 206, 0.4); //40% of $gradients1
          transform: rotate(45deg);
          z-index: 1;
        }
      }
    }

    @media (min-width: 1200px) {
      & {
        // min-width: 1170px;
      }
    }
  }
  @media (max-width: 768px){
    height: calc(100vh - 90px);
  }

}
</style>