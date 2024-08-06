<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { debounce } from 'lodash';
import SearchBar from './components/SearchBar.vue';
import StatusBar from './components/StatusBar.vue';
import MovieDetails from './components/MovieDetails.vue';
import MovieList from './components/MovieList.vue';

/**
 * The name of the app. Displayed in the main heading of the page.
 */
const appName = import.meta.env.VITE_APP_NAME;

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
 * A reactive reference to track the details of the latest movie search that was made.
 *
 * @type {import('vue').Ref<Object>}
 */
const latestSearch = ref({});

/**
 * A reactive reference that holds an array of search results.
 *
 * @type {import('vue').Ref<Array<Object>>}
 */
const searchResults = ref([]);

/**
 * A reactive reference storing the total results found by the API that match the latest search.
 */
const totalResults = ref(0);

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
 * A reactive reference that holds an array of search result records representing the user's watchlist.
 *
 * @type {import('vue').Ref<Array<Object>>}
 */
const watchlist = ref([]);

/**
 * A computed property that returns an array of the imdbIDs of all movies in the watchlist.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const watchlistIds = computed(() => {
  return watchlist.value.map((movie) => movie.imdbID);
});

/**
 * A reactive reference to determine if the movie watchlist view should be displayed.
 *
 * @type {import('vue').Ref<boolean>}
 */
const showWatchlist = ref(false);

/**
 * A computed property that returns how many results are remaining to be retrieved from the API that match the latest search.
 *
 * @type {import('vue').Ref<number>}
 */
const resultsRemaining = computed(() => {
  return totalResults.value - searchResults.value.length;
});

/**
 * A computed property that returns whether to show the load more results button.
 *
 * @type {import('vue').Ref<boolean>}
 */
const showLoadMoreButton = computed(() => {
  return (
    !showWatchlist.value &&
    searchResults.value.length &&
    resultsRemaining.value > 0
  );
});

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
 * @param {string|number} page - The page number of the search results.
 */
function getSearchResults(search, type, year, page = 1) {
  const url = createRequestUrl({
    s: search,
    type,
    y: year,
    page,
  });

  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      if (data.Response === 'False') {
        currentStatus.value = createErrorMessage(data.Error);
        searchResults.value = [];
        totalResults.value = 0;
      } else {
        if (
          latestSearch.value.search &&
          latestSearch.value.search === search &&
          latestSearch.value.type === type &&
          latestSearch.value.year === year &&
          latestSearch.value.page === page - 1
        ) {
          searchResults.value.push(...data.Search);
        } else {
          searchResults.value = data.Search;
        }
        totalResults.value = data.totalResults;
        currentStatus.value =
          totalResults.value === 1
            ? `${totalResults.value} result found.`
            : `${totalResults.value} results found.`;
        latestSearch.value = {
          search,
          type,
          year,
          page,
        };
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
 * Closes the watchlist if it is open.
 *
 * @param {string} search - The search query entered by the user.
 * @param {string} type - The type of title to search for.
 * @param {string|number} year - The year of release for the title.
 */
function handleSearch(search, type, year) {
  closeWatchlist();
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
 * Handles to click of the load more results button.
 * If the status is not 'Loading more results',
 * Sets the status and performs a search request.
 */
function handleLoadMore() {
  if (currentStatus.value !== 'Loading more results') {
    currentStatus.value = 'Loading more results';
    getSearchResults(
      latestSearch.value.search,
      latestSearch.value.type,
      latestSearch.value.year,
      latestSearch.value.page + 1,
    );
  }
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
 * Handles the event to add a movie to the user's watchlist.
 * Adds the movie to the watchlist.
 *
 * @param {object} movie - The movie object to add to the watchlist.
 * @param {string} movie.Poster - URL of the movie poster.
 * @param {string} movie.Title - The title of the movie.
 * @param {string} movie.Type - The type of the movie. Can be 'movie', 'series', or 'episode'.
 * @param {string} movie.Year - The release year of the movie.
 * @param {string} movie.imdbID - The IMDb ID of the movie.
 */
function handleAddToWatchlist(movie) {
  if (!watchlistIds.value.includes(movie.imdbID)) {
    watchlist.value.push(movie);
  }
}

/**
 * Handles the event to remove a movie from the user's watchlist.
 * Removes the movie from the watchlist.
 *
 * @param {string} id - The IMDb ID of the movie to remove from the watchlist.
 */
function handleRemoveFromWatchlist(id) {
  if (watchlistIds.value.includes(id)) {
    const index = watchlistIds.value.indexOf(id);
    watchlist.value.splice(index, 1);
  }
}

/**
 * Handles the event to toggle the viewing and closing of the movie watchlist.
 * Toggles the watchlist and sets the current status.
 */
function handleToggleWatchlist() {
  if (showWatchlist.value) {
    closeWatchlist();
  } else {
    openWatchlist();
  }
}

/**
 * Opens the watchlist view, and sets the status.
 */
function openWatchlist() {
  if (!showWatchlist.value) {
    showWatchlist.value = true;
    currentStatus.value = 'Viewing watchlist.';
  }
}

/**
 * Closes the watchlist view, and sets the status.
 */
function closeWatchlist() {
  if (showWatchlist.value) {
    showWatchlist.value = false;
    currentStatus.value = 'Closed watchlist.';
  }
}
</script>

<template>
  <!-- Header Section -->
  <header class="bg-zinc-100">
    <h1 class="p-8 text-center font-serif text-3xl text-omdb-grey">
      {{ appName }}
    </h1>
  </header>

  <!-- Main Content -->
  <main class="grow bg-zinc-100 pb-20 xl:px-20">
    <section
      class="mx-4 flex max-w-[1300px] flex-col border border-zinc-300 bg-white sm:mx-14 xl:mx-auto"
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
          <StatusBar
            :status="currentStatus"
            :showing-watchlist="showWatchlist"
            @toggle-watchlist="handleToggleWatchlist"
          />

          <!-- Search Results and Watchlist -->
          <div class="scrollbar overflow-auto lg:h-[560px]">
            <MovieList
              :watchlist-ids="watchlistIds"
              :movies="showWatchlist ? watchlist : searchResults"
              :selected-movie-id="selectedMovie.imdbID"
              @selection="handleSelect"
            />
            <!-- Load More Results Button -->
            <button
              v-if="showLoadMoreButton"
              type="button"
              class="mx-auto my-6 block p-2 font-extralight"
              :class="
                currentStatus === 'Loading more results'
                  ? 'cursor-not-allowed text-zinc-400'
                  : 'hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-blue-300 active:bg-zinc-200'
              "
              :disabled="currentStatus === 'Loading more results'"
              @click="handleLoadMore"
            >
              Load more...
            </button>
            <!-- Empty Watchlist Message -->
            <p
              v-if="showWatchlist && watchlist.length === 0"
              class="mb-6 p-12 text-center font-extralight"
            >
              Your watchlist is empty.
            </p>
          </div>
        </div>

        <!-- Movie Details -->
        <MovieDetails
          v-if="showMovieDetails"
          class="col-span-11 row-span-1 lg:col-span-7 lg:max-h-[666px]"
          :movie="selectedMovie"
          :watchlist="watchlistIds"
          @close="handleCloseDetails"
          @add-to-watchlist="handleAddToWatchlist"
          @remove-from-watchlist="handleRemoveFromWatchlist"
        />
      </div>
    </section>
  </main>
</template>
