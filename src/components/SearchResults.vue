<script setup>
import BookmarkIcon from './icons/BookmarkIcon.vue';

/**
 * Props for the component.
 *
 * @typedef {Object} Props
 * @property {Array<Object>} results - An array of search results.
 * @property {string} results[].imdbID - The IMDb ID of the result item.
 * @property {string} results[].Title - The title of the result item.
 * @property {string} results[].Poster - The URL of the result item's poster image.
 * @property {string} results[].Year - The release year of the result item.
 * @property {string} selectedResult - The IMDb ID of the currently selected result item.
 * @property {Array<string>} watchlist - An array of IMDb IDs representing the watchlist.
 */
defineProps({
  results: {
    type: Array,
    required: true,
  },
  selectedResult: {
    type: String,
    default: '',
  },
  watchlist: {
    type: Array,
    required: true,
  },
});

/**
 * Emits an event when a result is selected.
 *
 * @event selection
 * @property {string} imdbID - The IMDb ID of the selected result item.
 */
defineEmits(['selection']);
</script>

<template>
  <div class="scrollbar overflow-auto lg:h-[560px]">
    <!-- List -->
    <ul v-if="results.length">
      <li
        v-for="result in results"
        :key="result.imdbID"
        class="border-t border-zinc-300 first:border-none"
      >
        <article>
          <!-- Result Item Button -->
          <button
            class="flex w-full items-start justify-between gap-3 p-6 ring-inset hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-neutral-300 active:bg-zinc-200"
            :class="{ 'bg-zinc-100': selectedResult === result.imdbID }"
            :aria-label="'Select ' + result.Title"
            @click="$emit('selection', result.imdbID)"
          >
            <div class="flex items-center gap-3.5">
              <!-- Poster Image -->
              <img
                :src="result.Poster"
                alt="Poster for {{ result.Title }}"
                class="h-16 w-16 rounded-md object-cover object-center"
              />
              <div class="pb-1.5">
                <!-- Title -->
                <h1 class="text-left text-lg font-extralight">
                  {{ result.Title }}
                </h1>
                <!-- Year -->
                <p class="text-left text-sm font-extralight text-zinc-400">
                  {{ result.Year }}
                </p>
              </div>
            </div>
            <!-- Bookmark Icon -->
            <BookmarkIcon
              v-if="watchlist.includes(result.imdbID)"
              class="mt-1 h-5 w-5 flex-shrink-0 self-start fill-yellow-500 stroke-yellow-500 stroke-2"
            />
          </button>
        </article>
      </li>
    </ul>
  </div>
</template>

<style>
/* Custom scrollbar styles */
.scrollbar::-webkit-scrollbar {
  width: 0.725rem;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background-color: #b9b9b9;
}

.scrollbar::-webkit-scrollbar-track {
  background-color: #f9f9f9;
}
</style>
