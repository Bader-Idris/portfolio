<template>
  <div class="food-left"></div>
</template>

<style lang="scss">
.food-left {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 50%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: space-around;
  align-items: stretch;
  justify-content: space-around;

  &>span {
    width: 8px;
    height: 8px;
    background-color: $accent2;
    border-radius: 50%;
    box-shadow: 0 0 0px 5px rgba(67, 217, 173, 0.4),
      0 0 0px 10px rgba(67, 217, 173, 0.2);
    margin: 15px;
  }
}
</style>