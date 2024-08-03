<script setup>
import { ref, watch } from 'vue';
import SearchInput from './SearchInput.vue';

const emit = defineEmits(['search']);

const search = ref('');

watch(search, (newSearch) => {
  if (newSearch) {
    emit('search', newSearch);
  }
});
</script>

<template>
  <div
    class="flex flex-col justify-between bg-omdb-grey px-2 pt-5 md:h-24 md:flex-row md:items-center md:pt-0"
  >
    <SearchInput
      v-model="search"
      class="w-full md:w-5/12"
    />
    <div class="flex items-center">
      <h3 class="bg-red-600">year filter</h3>
      <h3 class="bg-blue-500">type filter</h3>
    </div>
  </div>
</template>
