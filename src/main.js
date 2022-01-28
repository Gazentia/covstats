import { createApp } from "vue";

import App from "./App.vue";
import store from "@/store/index.js";
import BaseButton from "@/common/components/buttons/BaseButton.vue";
import BaseModal from "@/common/components/modal/BaseModal.vue";

import router from "@/router";
import AppLayout from "@/layouts/AppLayout.vue";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .component("AppLayout", AppLayout)
  .component("base-modal", BaseModal)
  .component("base-button", BaseButton)
  .mount("#app");
