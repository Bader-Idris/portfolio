<template>
  <!-- External link on mobile devices (uses Capacitor in-app browser) -->
  <a
    v-if="isExternal && isMobile"
    @click.prevent="openInAppBrowser"
    class="external-link"
    :href="to"
  >
    <slot />
  </a>
  <!-- External link for non-mobile devices (opens in a new tab) -->
  <a v-else-if="isExternal" target="_blank" rel="noopener" class="external-link" :href="to">
    <slot />
  </a>
  <!-- Internal link using router-link -->
  <router-link v-else v-bind="$props" class="internal-link">
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";

// Define props from RouterLink
const props = defineProps({
  ...RouterLink.props,
  to: {
    type: [String, Object],
    required: true
  }
});

// Check if the link is an external URL
const isExternal = computed(() => {
  return typeof props.to === "string" && (props.to as string).startsWith("http");
});

// Check if the app is running on a mobile device using Capacitor
const isMobile = computed(() => Capacitor.isNativePlatform());

// Open the link in the in-app browser for mobile devices
const openInAppBrowser = async () => {
  if (typeof props.to === "string") {
    await Browser.open({ url: props.to });
  }
};
</script>
