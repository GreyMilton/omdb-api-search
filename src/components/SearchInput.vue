<script setup>
import { ref, watch } from 'vue';
import CrossIcon from './icons/CrossIcon.vue';
import MagnifyingGlass from './icons/MagnifyingGlass.vue';

/**
 * A model that binds to the input field for the search query.
 *
 * @typedef {Object} Model
 * @property {string} value - The current value of the search input.
 */
const model = defineModel({
  type: String,
  required: true,
});

/**
 * A reactive reference indicating whether the clear button should be shown.
 * It becomes true when the input has text.
 *
 * @type {import('vue').Ref<boolean>}
 */
const showClear = ref(false);

/**
 * Watcher that monitors changes to the search input model and updates the visibility of the clear button.
 *
 * @param {string} newValue - The new value of the search input.
 */
watch(model, (newValue) => {
  showClear.value = newValue ? true : false;
});

/**
 * Clears the search input and hides the clear button.
 */
function handleClear() {
  model.value = '';
  showClear.value = false;
}
</script>

<template>
  <div class="flex items-center pr-4 lg:pr-0">
    <!-- Search Icon -->
    <label
      for="search-input"
      aria-hidden="true"
    >
      <MagnifyingGlass />
    </label>

    <!-- Search Input -->
    <input
      id="search-input"
      v-model="model"
      aria-label="Search"
      class="h-10 min-w-0 grow bg-transparent pl-2 text-2xl font-light text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
    />

    <!-- Clear Button -->
    <button
      class="ml-3 h-6 w-6 flex-shrink-0 rounded-full bg-white/80 hover:bg-white focus-visible:outline-0 focus-visible:outline-omdb-grey focus-visible:ring-[6px] focus-visible:ring-blue-400"
      :class="{ 'pointer-events-none invisible': !showClear }"
      aria-label="Clear search"
      @click="handleClear"
    >
      <CrossIcon
        aria-hidden="true"
        class="m-auto h-3.5 w-3.5 stroke-omdb-grey stroke-[1.6]"
      />
    </button>
  </div>
</template>
