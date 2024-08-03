<script setup>
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';

const search = ref('');

function handleSearch(latestSearch) {
  search.value = latestSearch;
  console.log(search.value);
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
