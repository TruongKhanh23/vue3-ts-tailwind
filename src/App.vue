<template>
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <Navigator />
    <div class="max-w-3xl mx-auto my-6">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Navigator from "./components/shared/Navigator.vue";

export default defineComponent({
  components: {
    Navigator,
  },
});
</script>
