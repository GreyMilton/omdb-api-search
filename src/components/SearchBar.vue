<script setup>
import { ref, watch } from 'vue';
import SearchInput from './SearchInput.vue';
import SearchTypeFilter from './SearchTypeFilter.vue';

const emit = defineEmits(['search', 'clear']);

const search = ref('');

watch(search, (newSearch) => {
  if (newSearch) {
    emit('search', newSearch);
  } else {
    emit('clear');
  }
});

const types = ['any', 'movies', 'series', 'episode'];
const type = ref(types[0]);
</script>

<template>
  <div
    class="flex flex-col justify-between bg-omdb-grey px-2 pt-5 lg:h-24 lg:flex-row lg:items-center lg:pt-0"
  >
    <SearchInput
      v-model="search"
      class="w-full lg:w-5/12"
    />
    <div
      class="flex flex-col justify-between gap-6 p-5 md:flex-row md:items-center lg:justify-start"
    >
      <p class="bg-red-300">year filter</p>
      <SearchTypeFilter
        v-model="type"
        :types="types"
      />
    </div>
  </div>
</template>
