<script setup>
import { ref } from 'vue';
import { debounce } from 'lodash';
import SearchBar from './components/SearchBar.vue';
import SearchStatus from './components/SearchStatus.vue';
import SearchResults from './components/SearchResults.vue';

const searchResults = ref([]);
const searchStatus = ref('Ready to search.');

const handleSearch = debounce((search) => {
  fetch(
    import.meta.env.VITE_API_URL +
      '/?' +
      new URLSearchParams({
        s: search,
        apikey: import.meta.env.VITE_API_KEY,
      }).toString(),
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.Response === 'False') {
        searchStatus.value = data.Error;
        searchResults.value = [];
      } else {
        searchResults.value = data.Search;
        searchStatus.value = data.totalResults + ' results found';
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, 600);
</script>

<template>
  <header class="bg-zinc-100">
    <h1 class="p-8 text-center font-serif text-3xl text-omdb-grey">
      Movie Search
    </h1>
  </header>

  <main class="grow bg-zinc-100 pb-20">
    <section
      class="mx-4 flex h-[700px] max-w-[1152px] flex-col border border-zinc-300 bg-white sm:mx-14 xl:m-auto"
    >
      <SearchBar
        class="flex-shrink-0"
        @search="handleSearch"
      />
      <SearchStatus :status="searchStatus" />
      <SearchResults :results="searchResults" />
    </section>
  </main>
</template>
