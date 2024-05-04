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
          <p><span>const</span> <span>githubLink</span> = <AppLink to="https://github.com/bader-idris"
              class="external-link">https://github.com/bader-idris</AppLink>
          </p>
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
  font-family: $main-font;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid $lines;
    z-index: -1;
  }
  .container {
    display: flex;
    height: 70vh;
    justify-content: center;
    align-items: center;
    padding: 50px;
    border-left: 1px solid $lines;
    border-top: 1px solid $lines;
    background-color: $primary2;
    margin-right: -1px;
    h1 {
      color: $secondary4;
      font-size: $headline-size;
      line-height: 0;
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
          }
      }
      .task {
        &>p {
          font-size: $body-text-size;
        }
        &>p:not(:last-of-type) {
          color: $secondary1;
          // margin-bottom: 100px;
        }
        &>p:last-of-type {
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
      }
    }
    
  }
  

}
</style>