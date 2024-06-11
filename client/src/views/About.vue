<template>
  <div class="about-me">
    <FoldableTab>
      <p>personal_info</p>
    </FoldableTab>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.about-me {
  @include mainMiddleSettings;
  @media (max-width: 768px) {
    @include phone-borders;
  }
}
</style>

<script setup>
import FoldableTab from '@/components/FoldableTab.vue';

</script>

<style lang="scss" scoped></style>