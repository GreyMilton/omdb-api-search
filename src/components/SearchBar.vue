<script setup>
import { ref, watch, computed } from 'vue';
import SearchInput from './SearchInput.vue';
import SearchTypeFilter from './SearchTypeFilter.vue';
import SearchYearFilter from './SearchYearFilter.vue';

/**
 * Emits an event to notify that search data has changed.
 *
 * @event search
 * @property {string} search - The search string entered by the user.
 * @property {string} type - The type of title to search for. Options are 'movie', 'series', or 'episode'.
 * @property {string|number} year - The year the title was released.
 */
const emit = defineEmits(['search']);

/**
 * A reactive reference to the search string.
 * @type {import('vue').Ref<string>}
 */
const search = ref('');

/**
 * An array of available types for searching, including movies, series, and episodes.
 * @type {Array<{value: string, label: string}>}
 */
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

/**
 * A reactive reference to the selected search type, initialized to 'any'.
 * @type {import('vue').Ref<string>}
 */
const type = ref(types[0].value);

/**
 * The current year as a string, used as a default value for the year filter.
 * @type {string}
 */
const currentYear = new Date().getFullYear() + '';

/**
 * A reactive reference to the year input value, initialized to the current year.
 * @type {import('vue').Ref<string>}
 */
const year = ref(currentYear);

/**
 * A reactive reference to determine if the year filter is enabled.
 * @type {import('vue').Ref<boolean>}
 */
const yearEnabled = ref(false);

/**
 * A computed property that returns the year to search if the year filter is enabled.
 * Returns an empty string if the year filter is disabled.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const searchYear = computed(() => {
  return yearEnabled.value ? year.value : '';
});

/**
 * Watches for changes in the search string and emits a 'search' event with the updated values.
 *
 * @param {string} newSearch - The updated search string.
 */
watch(search, (newSearch) => {
  emit('search', newSearch, type.value, searchYear.value);
});

/**
 * Watches for changes in the selected type and emits a 'search' event if the search string is not empty.
 *
 * @param {string} newType - The updated type of search.
 */
watch(type, (newType) => {
  if (search.value) {
    emit('search', search.value, newType, searchYear.value);
  }
});

/**
 * Watches for changes in the year input and emits a 'search' event if the search string and year filter are enabled.
 *
 * @param {string} newYear - The updated year value.
 */
watch(year, (newYear) => {
  if (search.value && yearEnabled.value) {
    emit('search', search.value, type.value, newYear);
  }
});

/**
 * Watches for changes in the year filter's enabled state and emits a 'search' event if the search string is not empty.
 */
watch(yearEnabled, () => {
  if (search.value) {
    emit('search', search.value, type.value, searchYear.value);
  }
});
</script>

<template>
  <!-- Main Container -->
  <div
    class="flex grid-cols-11 flex-col justify-between bg-omdb-grey px-2 pt-5 lg:grid lg:h-24 lg:pt-0"
  >
    <!-- Search Input -->
    <SearchInput
      v-model="search"
      class="w-full lg:col-span-4"
    />
    <!-- Filters Section -->
    <div
      class="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center md:justify-end md:gap-10 lg:col-span-7 lg:justify-end lg:gap-6"
    >
      <!-- Year Filter -->
      <SearchYearFilter
        v-model:year="year"
        v-model:enabled="yearEnabled"
      />
      <!-- Type Filter -->
      <SearchTypeFilter
        v-model="type"
        :types="types"
      />
    </div>
  </div>
</template>
