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
  <ul class="scrollbar overflow-auto">
    <li
      v-for="result in results"
      :key="result.imdbId"
    >
      <article class="border-t border-zinc-300">
        <button
          class="flex w-full items-center gap-3.5 p-7 ring-inset hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-omdb-grey"
        >
          <img
            :src="result.Poster"
            class="h-16 w-16 rounded-md object-cover object-center"
          />
          <div class="pb-1.5">
            <h1 class="text-left text-lg font-extralight">
              {{ result.Title }}
            </h1>
            <p class="text-left text-sm font-extralight text-omdb-grey">
              {{ result.Year }}
            </p>
          </div>
        </button>
      </article>
    </li>
  </ul>
</template>

<style>
.scrollbar::-webkit-scrollbar {
  width: 0.725rem;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background-color: #b9b9b9;
}

.scrollbar::-webkit-scrollbar-track {
  background-color: #f9f9f9;
}
</style>
