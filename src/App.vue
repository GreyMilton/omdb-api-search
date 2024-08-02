<script setup>
import MagnifyingGlass from './components/icons/MagnifyingGlass.vue';
</script>

<template>
  <header class="bg-gray-100">
    <h1 class="text-omdb-grey p-8 text-center font-serif text-3xl">
      Movie Search
    </h1>
  </header>

  <main class="grow bg-gray-100 pb-20">
    <section class="m-auto h-[700px] w-[1152px] border bg-white">
      <div class="bg-omdb-grey flex h-24 items-center pl-2">
        <label for="search-input">
          <MagnifyingGlass />
        </label>
        <input
          id="search-input"
          class="h-10 bg-transparent pl-2 text-2xl font-light text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
        />
      </div>
    </section>
  </main>
</template>
