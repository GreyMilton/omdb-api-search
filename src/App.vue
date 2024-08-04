<script setup>
import { ref } from 'vue';
import { debounce } from 'lodash';
import SearchBar from './components/SearchBar.vue';
import StatusBar from './components/StatusBar.vue';
import SearchResults from './components/SearchResults.vue';
import MovieDetails from './components/MovieDetails.vue';

const defaultStatus = 'Ready to search.';
const currentStatus = ref(defaultStatus);
const searchResults = ref([]);
const showMovieDetails = ref(false);
const selectedMovie = ref({});

const errorMap = {
  'Movie not found!': '0 results found.',
  'Too many results.': 'Too many results. Keep typing.',
  'Failed to fetch': 'Network error: Please check your internet connection',
};

function createErrorMessage(error) {
  return (
    errorMap[error] ||
    'Oops, there was a problem. Please adjust your search and try again.'
  );
}

function clearSearch() {
  searchResults.value = [];
  currentStatus.value = defaultStatus;
  showMovieDetails.value = false;
}

function createRequestUrl(params) {
  params.apikey = import.meta.env.VITE_API_KEY;
  return (
    import.meta.env.VITE_API_URL + '/?' + new URLSearchParams(params).toString()
  );
}

function getSearchResults(search, type, year) {
  const url = createRequestUrl({
    s: search,
    type: type,
    y: year,
  });

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.Response === 'False') {
        currentStatus.value = createErrorMessage(data.Error);
        searchResults.value = [];
      } else {
        searchResults.value = data.Search;
        currentStatus.value = data.totalResults + ' results found.';
      }
    })
    .catch((error) => {
      currentStatus.value = createErrorMessage(error.message);
    });
}

const debouncedSearch = debounce((search, type, year) => {
  if (!search) {
    clearSearch();
    return;
  }
  getSearchResults(search, type, year);
}, 600);

function handleSearch(search, type, year) {
  currentStatus.value = search ? 'Searching' : 'Clearing search';
  debouncedSearch(search, type, year);
}

function getMovie(id) {
  const url = createRequestUrl({
    i: id,
  });

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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

const debouncedGetMovie = debounce((id) => {
  getMovie(id);
}, 100);

function handleSelect(id) {
  currentStatus.value = 'Getting details';
  debouncedGetMovie(id);
}

function handleCloseDetails() {
  selectedMovie.value = {};
  showMovieDetails.value = false;
  currentStatus.value = 'Details closed.';
}
</script>

<template>
  <header class="bg-zinc-100">
    <h1 class="p-8 text-center font-serif text-3xl text-omdb-grey">
      Movie Search
    </h1>
  </header>

  <main class="grow bg-zinc-100 pb-20">
    <section
      class="mx-4 flex max-w-[1152px] flex-col border border-zinc-300 bg-white sm:mx-14 xl:m-auto"
    >
      <SearchBar
        class="flex-shrink-0"
        @search="handleSearch"
      />
      <div class="grid grid-cols-11">
        <div
          :class="
            showMovieDetails ? 'hidden lg:col-span-4 lg:block' : 'col-span-11'
          "
          class="row-span-1 h-fit"
        >
          <StatusBar :status="currentStatus" />
          <SearchResults
            :results="searchResults"
            :selected-result="selectedMovie.imdbID"
            @selection="handleSelect"
          />
        </div>
        <MovieDetails
          v-if="showMovieDetails"
          class="col-span-11 row-span-1 lg:col-span-7 lg:max-h-[666px]"
          :movie="selectedMovie"
          @close="handleCloseDetails"
        />
      </div>
    </section>
  </main>
</template>
