<template>
  <a
    v-if="isExternal && isMobile"
    @click.prevent="openInAppBrowser"
    class="external-link"
    :href="to"
  >
    <slot />
  </a>
  <a v-else-if="isExternal" target="_blank" rel="noopener" class="external-link" :href="to">
    <slot />
  </a>
  <router-link v-else v-bind="$props" class="internal-link">
    <slot />
  </router-link>
</template>

<script lang="ts" >
import { RouterLink } from "vue-router";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";

export default {
  props: {
    ...RouterLink.props
  },
  computed: {
    isExternal() {
      return typeof this.to === "string" && this.to.startsWith("http");
    },
    isMobile() {
      return Capacitor.isNativePlatform();
    }
  },
  methods: {
    openInAppBrowser() {
      Browser.open({ url: this.to });
    }
  }
};
</script>
