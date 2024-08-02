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
  <div class="flex h-24 items-center bg-omdb-grey pl-2">
    <SearchInput v-model="search" />
  </div>
</template>
