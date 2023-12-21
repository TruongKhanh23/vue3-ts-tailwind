<template>
  <nav id="nav" class="sm:container sm:mx-auto">
    <!-- Header start -->
    <div
      class="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center my-6"
    >
      <!-- Header menu links and small screen hamburger menu -->
      <div class="flex justify-between items-center px-4 sm:px-0">
        <!-- Header logos -->
        <div>
          <router-link to="/">
            <img :src="logo" class="w-36" alt="Dark Logo" />
          </router-link>
        </div>

        <!-- Small screen hamburger menu -->
        <ExpandMenu :is-open="isOpen" @action:updateIsOpen="updateIsOpen" />
      </div>

      <!-- Header links -->
      <Router
        :show-modal="showModal"
        :is-open="isOpen"
        @action:updateIsOpen="updateIsOpen"
      />
    </div>
  </nav>
</template>

<script setup>
import logo from "../assets/logo-light-new.svg";
import feather from "feather-icons";
import Router from "./Router.vue";
import { ref, onMounted, onUpdated } from "vue";
import ExpandMenu from "../components/shared/ExpandMenu.vue";

const isOpen = ref(false);
onMounted(() => {
  feather.replace();
});

const updateIsOpen = async (value) => {
  isOpen.value = value;
};

onUpdated(() => {
  feather.replace();
});
</script>

<style scoped>
#nav a.router-link-exact-active {
  @apply text-indigo-700;
  @apply dark:text-indigo-400;
  @apply font-medium;
}
</style>
