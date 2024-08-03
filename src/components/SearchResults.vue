<script setup>
import { watch } from 'vue';

const props = defineProps({
  results: {
    type: Array,
    required: true,
  },
});

watch(
  () => props.results,
  (newResults) => {
    console.log(newResults);
  },
);
</script>

<template>
  <ul class="overflow-auto">
    <li
      v-for="result in results"
      :key="result.imdbId"
    >
      <article
        class="flex items-center gap-3.5 border-t border-gray-400 p-7 hover:bg-zinc-100"
      >
        <img
          :src="result.Poster"
          class="h-16 w-16 rounded-md object-cover object-center"
        />
        <div class="pb-1.5">
          <h1 class="text-lg font-extralight">
            {{ result.Title }}
          </h1>
          <p class="text-sm font-extralight text-omdb-grey">
            {{ result.Year }}
          </p>
        </div>
      </article>
    </li>
  </ul>
</template>
