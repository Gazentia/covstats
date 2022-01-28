<template>
  <AppLayoutLinks />
  <slot />
</template>
<script>
import AppLayoutLinks from "@/layouts/AppLayoutLinks";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutLinks,
  },
};
</script>
