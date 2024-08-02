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
  <div class="flex h-24 items-center justify-between bg-omdb-grey px-2">
    <SearchInput
      v-model="search"
      class="w-5/12"
    />
    <div class="flex items-center">
      <h3 class="bg-red-600">year filter</h3>
      <h3 class="bg-blue-500">type filter</h3>
    </div>
  </div>
</template>
