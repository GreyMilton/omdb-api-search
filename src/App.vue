<script setup>
import { ref } from 'vue';
import { debounce } from 'lodash';
import SearchBar from './components/SearchBar.vue';
import SearchStatus from './components/SearchStatus.vue';
import SearchResults from './components/SearchResults.vue';
import MovieDetails from './components/MovieDetails.vue';

const defaultSearchStatus = 'Ready to search.';
const searchStatus = ref(defaultSearchStatus);
const searchPending = ref(false);
const searchResults = ref([]);
const selectedMovie = ref({});
const showMovieDetails = ref(false);

const errorMap = {
  'Movie not found!': '0 results found.',
  'Too many results.': 'Keep typing...',
  'Failed to fetch': 'Network error: Please check your internet connection.',
};

function createErrorMessage(error) {
  return (
    errorMap[error] ||
    'Oops, there was a problem. Please adjust your search and try again.'
  );
}

function clearSearch() {
  searchResults.value = [];
  searchStatus.value = defaultSearchStatus;
  showMovieDetails.value = false;
  searchPending.value = false;
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
        searchStatus.value = createErrorMessage(data.Error);
        searchResults.value = [];
      } else {
        searchResults.value = data.Search;
        searchStatus.value = data.totalResults + ' results found.';
      }
    })
    .catch((error) => {
      searchStatus.value = createErrorMessage(error.message);
    })
    .finally(() => {
      searchPending.value = false;
    });
}

function getMovieById(id) {
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
      } else {
        selectedMovie.value = data;
        showMovieDetails.value = true;
      }
    })
    .catch((error) => {
      searchStatus.value = createErrorMessage(error.message);
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
  searchPending.value = true;
  debouncedSearch(search, type, year);
}

const handleSelect = debounce((id) => {
  getMovieById(id);
}, 100);

function handleCloseDetails() {
  selectedMovie.value = {};
  showMovieDetails.value = false;
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
          <SearchStatus :status="searchStatus">
            <p class="p-4 text-sm font-extralight italic">
              {{ searchPending ? 'loading...' : '' }}
            </p>
          </SearchStatus>
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
