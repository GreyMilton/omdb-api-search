<script setup>
import { ref, computed, onUnmounted } from 'vue';

/**
 * Props for the component.
 *
 * @typedef {Object} Props
 * @property {string} status - The current status of the application.
 * @property {boolean} showingWatchlist - The current state of whether the watchlist is showing.
 */
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  showingWatchlist: {
    type: Boolean,
    required: true,
  },
});

/**
 * Emits an event to notify the parent component to toggle viewing the watchlist.
 *
 * @event toggle-watchlist
 */
defineEmits(['toggle-watchlist']);

/**
 * A computed property to determine if the application is in a loading state.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const loading = computed(
  () =>
    props.status === 'Searching' ||
    props.status === 'Clearing search' ||
    props.status === 'Getting details',
);

/**
 * A reactive reference to track the current index of the loading animation dots.
 *
 * @type {import('vue').Ref<number>}
 */
const index = ref(0);

/**
 * An array of strings representing different states of loading animation dots.
 *
 * @type {Array<string>}
 */
const options = ['', '.', '..', '...'];

/**
 * Interval that updates the loading animation dots based on the current loading state.
 */
const interval = setInterval(() => {
  if (loading.value && index.value < options.length - 1) {
    index.value++;
  } else {
    index.value = 0;
  }
}, 300);

/**
 * Lifecycle hook that clears the interval when the component is unmounted.
 */
onUnmounted(() => {
  clearInterval(interval);
});

/**
 * A computed property that returns the current loading dots based on the application loading state.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const dots = computed(() => {
  return loading.value ? options[index.value] : '';
});
</script>

<template>
  <!-- Main Container -->
  <div class="flex justify-between p-5 text-sm font-extralight">
    <!-- Status Message -->
    <p
      class="p-2"
      :class="{ 'whitespace-nowrap italic': loading }"
    >
      <span role="status">{{ status }}</span
      >{{ dots }}
    </p>
    <!-- View Watchlist Button -->
    <button
      class="p-2 underline hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-neutral-300 active:bg-zinc-200"
      @click="$emit('toggle-watchlist')"
    >
      {{ showingWatchlist ? 'Close watchlist' : 'View watchlist' }}
    </button>
  </div>
</template>
