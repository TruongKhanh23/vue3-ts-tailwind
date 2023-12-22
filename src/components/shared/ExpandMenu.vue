<template>
  <div class="sm:hidden">
    <button
      @click="updateIsOpen()"
      type="button"
      class="focus:outline-none"
      aria-label="Hamburger Menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-7 w-7 fill-current text-secondary-dark dark:text-ternary-light"
      >
        <path
          v-if="isOpen"
          fill-rule="evenodd"
          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
          clip-rule="evenodd"
        ></path>
        <path
          v-if="!isOpen"
          fill-rule="evenodd"
          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, toRefs, computed } from "vue";

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
</script>
