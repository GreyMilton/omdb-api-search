<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { debounce } from 'lodash';
import SearchBar from './components/SearchBar.vue';
import StatusBar from './components/StatusBar.vue';
import SearchResults from './components/SearchResults.vue';
import MovieDetails from './components/MovieDetails.vue';

/**
 * The default status message displayed when the application is ready to search.
 *
 * @constant {string}
 */
const defaultStatus = 'Ready to search.';

/**
 * A reactive reference to track the current status message of the application.
 *
 * @type {import('vue').Ref<string>}
 */
const currentStatus = ref(defaultStatus);

/**
 * A reactive reference that holds an array of search results.
 *
 * @type {import('vue').Ref<Array<Object>>}
 */
const searchResults = ref([]);

/**
 * A reactive reference to determine if the movie details view should be displayed.
 *
 * @type {import('vue').Ref<boolean>}
 */
const showMovieDetails = ref(false);

/**
 * A reactive reference that holds the selected movie details.
 *
 * @type {import('vue').Ref<Object>}
 */
const selectedMovie = ref({});

/**
 * A reactive reference that holds an array of IMDb IDs representing the user's watchlist.
 *
 * @type {import('vue').Ref<Array<string>>}
 */
const watchlist = ref([]);

/**
 * An object mapping error messages from the API to user-friendly messages.
 *
 * @constant {Object<string, string>}
 */
const errorMap = {
  'Movie not found!': '0 results found.',
  'Too many results.': 'Too many results. Keep typing.',
  'Network Error': 'Network error. Please check your internet connection',
};

/**
 * Creates a user-friendly error message based on the given error.
 *
 * @param {string} error - The error message from the API.
 * @returns {string} The user-friendly error message.
 */
function createErrorMessage(error) {
  return (
    errorMap[error] ||
    'Oops, there was a problem. Please adjust your search and try again.'
  );
}

/**
 * Clears the current search results and resets the status to default.
 */
function clearSearch() {
  searchResults.value = [];
  currentStatus.value = defaultStatus;
  showMovieDetails.value = false;
}

/**
 * Creates a request URL for the API call based on the given parameters.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.s - The search query.
 * @param {string} [params.type] - The type of title to search for (optional).
 * @param {string} [params.y] - The year of release (optional).
 * @param {string} [params.i] - The IMDb ID for retrieving specific movie details (optional).
 * @returns {string} The complete URL for the API request.
 */
function createRequestUrl(params) {
  params.apikey = import.meta.env.VITE_API_KEY;
  return (
    import.meta.env.VITE_API_URL + '/?' + new URLSearchParams(params).toString()
  );
}

/**
 * Fetches search results from the API based on the search, type, and year parameters.
 * Updates the search results and status message based on the response.
 *
 * @param {string} search - The search query entered by the user.
 * @param {string} type - The type of title to search for.
 * @param {string|number} year - The year of release for the title.
 */
function getSearchResults(search, type, year) {
  const url = createRequestUrl({
    s: search,
    type: type,
    y: year,
  });

  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      if (data.Response === 'False') {
        currentStatus.value = createErrorMessage(data.Error);
        searchResults.value = [];
      } else {
        searchResults.value = data.Search;
        currentStatus.value = `${data.totalResults} results found.`;
      }
    })
    .catch((error) => {
      currentStatus.value = createErrorMessage(error.message);
    });
}

/**
 * Debounces the search function to limit API requests during rapid input changes.
 *
 * @type {Function}
 */
const debouncedSearch = debounce((search, type, year) => {
  if (!search) {
    clearSearch();
    return;
  }
  getSearchResults(search, type, year);
}, 600);

/**
 * Handles the search event triggered by the SearchBar component.
 * Updates the current status and performs a debounced search request.
 *
 * @param {string} search - The search query entered by the user.
 * @param {string} type - The type of title to search for.
 * @param {string|number} year - The year of release for the title.
 */
function handleSearch(search, type, year) {
  currentStatus.value = search ? 'Searching' : 'Clearing search';
  debouncedSearch(search, type, year);
}

/**
 * Fetches detailed information about a movie using its IMDb ID.
 * Updates the selected movie details and status message based on the response.
 *
 * @param {string} id - The IMDb ID of the movie to fetch details for.
 */
function getMovie(id) {
  const url = createRequestUrl({
    i: id,
  });

  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      if (data.Response === 'False') {
        selectedMovie.value = {};
        showMovieDetails.value = false;
        currentStatus.value = createErrorMessage(data.Error);
      } else {
        selectedMovie.value = data;
        showMovieDetails.value = true;
        currentStatus.value = 'Details retrieved.';
      }
    })
    .catch((error) => {
      currentStatus.value = createErrorMessage(error.message);
      showMovieDetails.value = false;
    });
}

/**
 * Debounces the movie details request to limit API calls during rapid selection changes.
 *
 * @type {Function}
 */
const debouncedGetMovie = debounce((id) => {
  getMovie(id);
}, 100);

/**
 * Handles the selection of a movie from the search results.
 * Initiates a debounced request to fetch movie details.
 *
 * @param {string} id - The IMDb ID of the selected movie.
 */
function handleSelect(id) {
  currentStatus.value = 'Getting details';
  debouncedGetMovie(id);
}

/**
 * Handles the event to close the movie details view.
 * Resets the selected movie and status message.
 */
function handleCloseDetails() {
  selectedMovie.value = {};
  showMovieDetails.value = false;
  currentStatus.value = 'Details closed.';
}

/**
 * Toggles the inclusion of a movie in the user's watchlist based on its IMDb ID.
 *
 * @param {string} id - The IMDb ID of the movie to toggle in the watchlist.
 */
function handleToggleOnWatchlist(id) {
  if (watchlist.value.includes(id)) {
    const index = watchlist.value.indexOf(id);
    watchlist.value.splice(index, 1);
  } else {
    watchlist.value.push(id);
  }
}
</script>

<template>
  <!-- Header Section -->
  <header class="bg-zinc-100">
    <h1 class="p-8 text-center font-serif text-3xl text-omdb-grey">
      Movie Search
    </h1>
  </header>

  <!-- Main Content -->
  <main class="grow bg-zinc-100 pb-20">
    <section
      class="mx-4 flex max-w-[1152px] flex-col border border-zinc-300 bg-white sm:mx-14 xl:m-auto"
    >
      <!-- Search Bar -->
      <SearchBar
        class="flex-shrink-0"
        @search="handleSearch"
      />

      <!-- Results and Details Grid -->
      <div class="grid grid-cols-11">
        <div
          :class="
            showMovieDetails ? 'hidden lg:col-span-4 lg:block' : 'col-span-11'
          "
          class="row-span-1 h-fit"
        >
          <!-- Status Bar -->
          <StatusBar :status="currentStatus" />

          <!-- Search Results -->
          <SearchResults
            :watchlist="watchlist"
            :results="searchResults"
            :selected-result="selectedMovie.imdbID"
            @selection="handleSelect"
          />
        </div>

        <!-- Movie Details -->
        <MovieDetails
          v-if="showMovieDetails"
          class="col-span-11 row-span-1 lg:col-span-7 lg:max-h-[666px]"
          :movie="selectedMovie"
          :watchlist="watchlist"
          @close="handleCloseDetails"
          @toggle-on-watchlist="handleToggleOnWatchlist"
        />
      </div>
    </section>
  </main>
</template>
