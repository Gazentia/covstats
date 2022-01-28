<template>
  <base-modal v-on:close-modal="resetError" v-if="getErrorData.errorMessage">
    <template v-slot:header>
      <div class="modal__header" v-if="getErrorData.errorMessage">
        {{ getErrorData.errorTitle }}
      </div>
    </template>
    <template v-slot:body v-if="getErrorData.errorMessage">
      <div class="modal__body">{{ getErrorData.errorMessage }}</div>
    </template>
  </base-modal>
  <div class="container">
    <component v-bind:is="layout">
      <slot />
    </component>
  </div>
</template>

<script>
import { markRaw } from "vue";
import AppLayoutDefault from "@/layouts/AppLayoutDefault .vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppLayout",
  data() {
    return { layout: markRaw(AppLayoutDefault) };
  },
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`);
          this.layout = component?.default || AppLayoutDefault;
        } catch (err) {
          this.layout = AppLayoutDefault;
        }
      },
    },
  },
  computed: {
    ...mapGetters("errors", ["getErrorData"]),
  },
  methods: {
    ...mapActions("errors", ["resetError"]),
  },
};
</script>