<script setup>
import MagnifyingGlass from './icons/MagnifyingGlass.vue';
</script>

<template>
  <label for="search-input">
    <MagnifyingGlass />
  </label>
  <input
    id="search-input"
    class="h-10 bg-transparent pl-2 text-2xl font-light text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
  />
</template>
