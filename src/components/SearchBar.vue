<script setup>
import { ref, watch, computed } from 'vue';
import SearchInput from './SearchInput.vue';
import SearchTypeFilter from './SearchTypeFilter.vue';
import SearchYearFilter from './SearchYearFilter.vue';

const emit = defineEmits(['search']);

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

const currentYear = new Date().getFullYear();
const year = ref(currentYear);
const yearEnabled = ref(false);
const searchYear = computed(() => {
  return yearEnabled.value ? year.value : '';
});

watch(search, (newSearch) => {
  emit('search', newSearch, type.value, searchYear.value);
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
    class="flex grid-cols-11 flex-col justify-between bg-omdb-grey px-2 pt-5 lg:grid lg:h-24 lg:pt-0"
  >
    <SearchInput
      v-model="search"
      class="w-full lg:col-span-4"
    />
    <div
      class="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center md:justify-end md:gap-10 lg:col-span-7 lg:justify-end lg:gap-6"
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
