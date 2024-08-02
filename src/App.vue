<script setup>
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <header class="bg-gray-100">
    <h1 class="text-omdb-grey p-8 text-center font-serif text-3xl">
      Movie Search
    </h1>
  </header>

  <main class="grow bg-gray-100 pb-20">
    <section class="m-auto h-[700px] w-[1152px] border bg-white">
      <SearchBar />
    </section>
  </main>
</template>
