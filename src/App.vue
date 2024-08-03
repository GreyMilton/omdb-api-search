<script setup>
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';

const searchResults = ref([]);
const searchError = ref('');

function handleSearch(latestSearch) {
  fetch(
    import.meta.env.VITE_API_URL +
      '/?' +
      new URLSearchParams({
        s: latestSearch,
        apikey: import.meta.env.VITE_API_KEY,
      }).toString(),
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.Response === 'False') {
        searchError.value = data.Error;
        searchResults.value = [];
      } else {
        searchError.value = '';
        searchResults.value = data.Search;
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}
</script>

<template>
  <header class="bg-gray-100">
    <h1 class="p-8 text-center font-serif text-3xl text-omdb-grey">
      Movie Search
    </h1>
  </header>

  <main class="grow bg-gray-100 pb-20">
    <section
      class="mx-4 h-[700px] max-w-[1152px] border bg-white sm:mx-14 xl:m-auto"
    >
      <SearchBar @search="handleSearch" />
    </section>
  </main>
</template>
