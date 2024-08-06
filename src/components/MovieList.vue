<script setup>
import BookmarkIcon from './icons/BookmarkIcon.vue';

/**
 * Props for the component.
 *
 * @typedef {Object} Props
 * @property {Array<Object>} movies - An array of search movies.
 * @property {string} movies[].imdbID - The IMDb ID of the movie.
 * @property {string} movies[].Title - The title of the movie.
 * @property {string} movies[].Poster - The URL of the movie's poster image.
 * @property {string} movies[].Year - The release year of the movie.
 * @property {string} selectedMovieId - The IMDb ID of the currently selected movie.
 * @property {Array<string>} watchlistIds - An array of IMDb IDs representing the watchlist.
 */
defineProps({
  movies: {
    type: Array,
    required: true,
  },
  selectedMovieId: {
    type: String,
    default: '',
  },
  watchlistIds: {
    type: Array,
    required: true,
  },
});

/**
 * Emits an event when a movie is selected.
 *
 * @event selection
 * @property {string} imdbID - The IMDb ID of the selected movie.
 */
defineEmits(['selection']);
</script>

<template>
  <!-- List -->
  <ul v-if="movies.length">
    <li
      v-for="movie in movies"
      :key="movie.imdbID"
      class="border-t border-zinc-300 first:border-none"
    >
      <article>
        <!-- Result Item Button -->
        <button
          class="flex w-full items-start justify-between gap-3 p-6 ring-inset hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-blue-300 active:bg-zinc-200"
          :class="{ 'bg-zinc-100': selectedMovieId === movie.imdbID }"
          :aria-label="'Select ' + movie.Title"
          @click="$emit('selection', movie.imdbID)"
        >
          <div class="flex items-center gap-3.5">
            <!-- Poster Image -->
            <img
              :src="movie.Poster"
              alt="Poster for {{ movie.Title }}"
              class="h-16 w-16 rounded-md object-cover object-center"
            />
            <div class="pb-1.5">
              <!-- Title -->
              <h1 class="text-left text-lg font-extralight">
                {{ movie.Title }}
              </h1>
              <!-- Year -->
              <p class="text-left text-sm font-extralight text-zinc-400">
                {{ movie.Year }}
              </p>
            </div>
          </div>
          <!-- Bookmark Icon -->
          <BookmarkIcon
            v-if="watchlistIds.includes(movie.imdbID)"
            class="mt-1 h-5 w-5 flex-shrink-0 self-start fill-yellow-500 stroke-yellow-500 stroke-2"
          />
        </button>
      </article>
    </li>
  </ul>
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
