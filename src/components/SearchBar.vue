<script setup>
import { ref, watch, computed } from 'vue';
import SearchInput from './SearchInput.vue';
import SearchTypeFilter from './SearchTypeFilter.vue';
import SearchYearFilter from './SearchYearFilter.vue';

const emit = defineEmits(['search', 'clear']);

const search = ref('');

const types = [
  {
    value: '',
    label: 'any',
  },
  {
    value: 'movie',
    label: 'movies',
  },
  {
    value: 'series',
    label: 'series',
  },
  {
    value: 'episode',
    label: 'episodes',
  },
];
const type = ref(types[0].value);

const year = ref('2024');
const yearEnabled = ref(false);
const searchYear = computed(() => {
  return yearEnabled.value ? year.value : '';
});

watch(search, (newSearch) => {
  if (newSearch) {
    emit('search', newSearch, type.value, searchYear.value);
  } else {
    emit('clear');
  }
});

watch(type, (newType) => {
  if (search.value) {
    emit('search', search.value, newType, searchYear.value);
  }
});

watch(year, (newYear) => {
  if (search.value && yearEnabled.value) {
    emit('search', search.value, type.value, newYear);
  }
});

watch(yearEnabled, () => {
  if (search.value) {
    emit('search', search.value, type.value, searchYear.value);
  }
});
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
      <SearchYearFilter
        v-model:year="year"
        v-model:enabled="yearEnabled"
      />
      <SearchTypeFilter
        v-model="type"
        :types="types"
      />
    </div>
  </div>
</template>
