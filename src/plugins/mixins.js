import { $api } from "@/services/api";

export default {
  computed: {
    $api: {
      get() {
        return $api;
      },
    },
  },
};
