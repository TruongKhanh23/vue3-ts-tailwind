<template>
  <!-- Header links -->
  <div
    :class="openMobileMenu ? 'block' : 'hidden'"
    class="m-0 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none"
  >
    <div v-for="link in links" :key="link.name">
      <router-link
        :to="link.link"
        class="my-4 md:my-0 block text-left text-xl font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2"
        style="text-align: center"
        :aria-label="link.name"
        @click="updateIsOpen()"
        >{{ link.name }}</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, computed, defineEmits } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const { isOpen } = toRefs(props);
const openMobileMenu = computed(() => isOpen.value);

const emit = defineEmits(["action:updateIsOpen"]);
const updateIsOpen = async () => {
  emit("action:updateIsOpen", !openMobileMenu.value);
};

const links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Not Found",
    link: "/not-found",
  },
];
</script>

<style lang="scss" scoped></style>
