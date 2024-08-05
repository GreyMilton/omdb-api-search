<script setup>
import CrossIcon from './icons/CrossIcon.vue';
import BookmarkIcon from './icons/BookmarkIcon.vue';

/**
 * Props for the component.
 * @typedef {Object} Props
 * @property {Object} movie - The movie/series to display the details of.
 * @property {string} movie.Title - The title of the movie.
 * @property {string} movie.Poster - URL of the movie poster.
 * @property {string} movie.Rated - The content rating of the movie.
 * @property {string} movie.Year - The release year of the movie.
 * @property {string} movie.Genre - The genre of the movie.
 * @property {string} movie.Runtime - The runtime of the movie.
 * @property {string} movie.Actors - The main actors in the movie.
 * @property {string} movie.Plot - A brief plot description of the movie.
 * @property {Array<{Source: string, Value: string}>} movie.Ratings - An array of ratings from different sources.
 * @property {string} movie.imdbID - The IMDb ID of the movie.
 * @property {string} movie.Type - The type of the movie. Can be 'movie', 'series', or 'episode'.
 * @property {Array<string>} watchlist - The current watchlist of movies, as an array of IMDb IDs.
 */
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  watchlist: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  /**
   * Emitted to close the movie details view.
   * @event close
   */
  'close',
  /**
   * Emitted to add the movie from the watchlist.
   * @event add-to-watchlist
   * @param {object} movie - The movie object to add to the watchlist.
   * @param {string} movie.Poster - URL of the movie poster.
   * @param {string} movie.Title - The title of the movie.
   * @param {string} movie.Type - The type of the movie. Can be 'movie', 'series', or 'episode'.
   * @param {string} movie.Year - The release year of the movie.
   * @param {string} movie.imdbID - The IMDb ID of the movie.
   */
  'add-to-watchlist',
  /**
   * Emitted to remove the movie from the watchlist.
   * @event remove-from-watchlist
   * @param {string} imdbID - The IMDb ID of the movie to remove.
   */
  'remove-from-watchlist',
]);

/**
 * Handles the button click to toggle the movie in the watchlist.
 * If the watchlist already includes the movie, an event to remove from the watchlist is emitted.
 * Otherwise, an event to add to the watchlist is emitted.
 */
function handleClickWatchlist() {
  if (props.watchlist.includes(props.movie.imdbID)) {
    emit('remove-from-watchlist', props.movie.imdbID);
  } else {
    emit('add-to-watchlist', {
      Poster: props.movie.Poster,
      Title: props.movie.Title,
      Type: props.movie.Type,
      Year: props.movie.Year,
      imdbID: props.movie.imdbID,
    });
  }
}
</script>

<template>
  <article
    class="relative border-l border-zinc-300 px-8 pb-8 pt-1 text-lg font-extralight lg:p-8"
  >
    <!-- Buttons to close the movie details view -->
    <button
      class="absolute right-1 top-1 hidden rounded-full p-2 text-sm hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-blue-300 active:bg-zinc-200 lg:block"
      aria-label="Close"
      @click="$emit('close')"
    >
      <CrossIcon
        aria-hidden="true"
        class="h-3 w-3 stroke-zinc-500 stroke-[1.6]"
      />
    </button>
    <button
      class="my-3 block p-2 text-sm underline hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-blue-300 active:bg-zinc-200 lg:hidden"
      @click="$emit('close')"
    >
      Go back
    </button>

    <!-- Movie Details Section -->
    <div class="flex flex-col gap-10 pb-6 sm:flex-row sm:gap-4">
      <img
        :src="movie.Poster"
        alt="Movie poster"
        class="flex-none overflow-hidden rounded-md object-cover sm:max-h-80 sm:max-w-52 sm:self-center"
      />
      <div class="flex grow flex-col justify-center gap-8 md:justify-start">
        <!-- Button to toggle movie on/off watchlist -->
        <button
          aria-label="Toggle on/off watchlist"
          class="flex items-center justify-center gap-2 self-end rounded-[4px] border px-3 py-2.5 font-normal focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-blue-300"
          :class="
            watchlist.includes(movie.imdbID)
              ? 'border-yellow-500 bg-amber-50 text-yellow-600 hover:bg-[#fff7d7] active:bg-yellow-50'
              : 'border-black hover:bg-zinc-100 active:bg-zinc-50'
          "
          @click="handleClickWatchlist"
        >
          <BookmarkIcon
            class="h-6 w-6 stroke-2"
            :class="
              watchlist.includes(movie.imdbID)
                ? 'fill-yellow-500 stroke-yellow-500'
                : 'fill-none stroke-black'
            "
          />
          Watchlist
        </button>
        <div class="space-y-3">
          <!-- Movie Title -->
          <h1 class="text-4xl font-semibold">{{ movie.Title }}</h1>
          <!-- Movie Metadata -->
          <p class="capitalize text-neutral-600">
            <span
              class="rounded-[4px] border border-black px-2.5 py-0.5 text-sm font-light leading-none text-black"
              >{{ movie.Rated }}</span
            >
            {{ movie.Year }}&nbsp;&middot; {{ movie.Genre }}&nbsp;&middot;
            {{ movie.Type }}&nbsp;&middot; {{ movie.Runtime }}
          </p>
          <!-- Movie Actors -->
          <p>{{ movie.Actors }}</p>
        </div>
      </div>
    </div>
    <!-- Movie Plot -->
    <p class="border-t border-zinc-300 py-4">{{ movie.Plot }}</p>
    <!-- Movie Ratings -->
    <ul class="flex justify-center border-t border-zinc-300 pt-6">
      <li
        v-for="(rating, index) in movie.Ratings"
        :key="index"
        class="space-y-1.5 border-l border-zinc-300 px-8 text-center first:border-none"
      >
        <p>
          {{ rating.Value }}
        </p>
        <p class="text-sm">
          {{ rating.Source }}
        </p>
      </li>
    </ul>
  </article>
</template>
