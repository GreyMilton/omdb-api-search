<script setup>
import BookmarkIcon from './icons/BookmarkIcon.vue';

defineProps({
  results: {
    type: Array,
    required: true,
  },
  selectedResult: {
    type: String,
    default: '',
  },
  watchlist: {
    type: Array,
    required: true,
  },
});

defineEmits(['selection']);
</script>

<template>
  <ul class="scrollbar overflow-auto sm:h-[906px] md:h-[658px] lg:h-[560px]">
    <li
      v-for="result in results"
      :key="result.imdbID"
      class="border-t border-zinc-300 first:border-none"
    >
      <article>
        <button
          class="flex w-full items-start justify-between gap-3 p-6 ring-inset hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-neutral-300 active:bg-zinc-200"
          :class="{ 'bg-zinc-100': selectedResult === result.imdbID }"
          :aria-label="'Select ' + result.Title"
          @click="$emit('selection', result.imdbID)"
        >
          <div class="flex items-center gap-3.5">
            <img
              :src="result.Poster"
              class="h-16 w-16 rounded-md object-cover object-center"
            />
            <div class="pb-1.5">
              <h1 class="text-left text-lg font-extralight">
                {{ result.Title }}
              </h1>
              <p class="text-left text-sm font-extralight text-zinc-400">
                {{ result.Year }}
              </p>
            </div>
          </div>
          <BookmarkIcon
            v-if="watchlist.includes(result.imdbID)"
            class="mt-1 h-5 w-5 flex-shrink-0 self-start fill-yellow-500 stroke-yellow-500 stroke-2"
          />
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
