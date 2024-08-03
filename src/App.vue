<script setup>
import { ref } from 'vue';
import { debounce } from 'lodash';
import SearchBar from './components/SearchBar.vue';
import SearchStatus from './components/SearchStatus.vue';
import SearchResults from './components/SearchResults.vue';
import MovieDetails from './components/MovieDetails.vue';

const defaultSearchStatus = 'Ready to search.';
const searchResults = ref([]);
const searchStatus = ref(defaultSearchStatus);

const defaultSelectionStatus = 'No result selected.';
const selectedResult = ref({});
const selectionStatus = ref(defaultSelectionStatus);

const showSelection = ref(false);

const handleSearch = debounce((search, type, year) => {
  const params = {
    s: search,
    type: type,
    y: year,
    apikey: import.meta.env.VITE_API_KEY,
  };

  const url =
    import.meta.env.VITE_API_URL +
    '/?' +
    new URLSearchParams(params).toString();

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.Response === 'False') {
        searchStatus.value = data.Error;
        searchResults.value = [];
      } else {
        searchResults.value = data.Search;
        searchStatus.value = data.totalResults + ' results found.';
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, 600);

function handleClear() {
  searchResults.value = [];
  searchStatus.value = defaultSearchStatus;
  showSelection.value = false;
}

const handleSelection = debounce((imdbId) => {
  const params = {
    i: imdbId,
    apikey: import.meta.env.VITE_API_KEY,
  };

  const url =
    import.meta.env.VITE_API_URL +
    '/?' +
    new URLSearchParams(params).toString();

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.Response === 'False') {
        selectionStatus.value = data.Error;
        selectedResult.value = {};
      } else {
        selectionStatus.value = defaultSelectionStatus;
        selectedResult.value = data;
        showSelection.value = true;
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, 100);

function handleClose() {
  selectedResult.value = {};
  showSelection.value = false;
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
        @clear="handleClear"
      />
      <div class="grid grid-cols-11">
        <div
          :class="
            showSelection ? 'hidden lg:col-span-4 lg:block' : 'col-span-11'
          "
          class="row-span-1 h-fit"
        >
          <SearchStatus :status="searchStatus" />
          <SearchResults
            :results="searchResults"
            :selected-result="selectedResult.imdbID"
            @selection="handleSelection"
          />
        </div>
        <MovieDetails
          v-if="showSelection"
          class="col-span-11 row-span-1 lg:col-span-7 lg:max-h-[666px]"
          :movie="selectedResult"
          @close="handleClose"
        />
      </div>
    </section>
  </main>
</template>
