<script setup>
import BookmarkIcon from './icons/BookmarkIcon.vue';

defineProps({
  movie: {
    type: Object,
    required: true,
  },
  watchlist: {
    type: Array,
    required: true,
  },
});

defineEmits(['close', 'toggle-on-watchlist']);
</script>

<template>
  <article
    class="border-l border-zinc-300 px-8 pb-8 pt-1 text-lg font-extralight lg:p-8"
  >
    <button
      class="my-3 block pb-2 pl-1 pr-2 pt-2 text-sm hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-neutral-300 active:bg-zinc-200 lg:hidden"
      @click="$emit('close')"
    >
      &lt; back to results
    </button>
    <div class="flex flex-col gap-4 pb-6 sm:flex-row">
      <img
        :src="movie.Poster"
        class="h-80 w-52 flex-none overflow-hidden rounded-md object-cover"
      />
      <div class="flex grow flex-col justify-center gap-8 lg:justify-start">
        <div class="flex flex-col items-end self-end">
          <button
            class="-mt-2 hidden p-2 text-sm hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-neutral-300 active:bg-zinc-200 lg:block"
            @click="$emit('close')"
          >
            close
          </button>
          <button
            aria-label="Toggle on/off watchlist"
            class="flex items-center justify-center gap-2 rounded-[4px] border px-3 py-2.5 font-normal focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-neutral-300"
            :class="
              watchlist.includes(movie.imdbID)
                ? 'border-yellow-500 bg-amber-50 text-yellow-600 hover:bg-[#fff7d7] active:bg-yellow-50'
                : 'border-black hover:bg-zinc-100 active:bg-zinc-50'
            "
            @click="$emit('toggle-on-watchlist', movie.imdbID)"
          >
            <BookmarkIcon
              class="h-6 w-6 stroke-2"
              :class="
                watchlist.includes(movie.imdbID)
                  ? 'fill-yellow-500 stroke-yellow-500'
                  : 'fill-white stroke-black'
              "
            />
            Watchlist
          </button>
        </div>
        <div class="space-y-3">
          <h1 class="text-4xl font-semibold">{{ movie.Title }}</h1>
          <p class="text-neutral-600">
            <span
              class="rounded-[4px] border border-black px-2.5 py-0.5 text-sm font-light leading-none text-black"
              >{{ movie.Rated }}</span
            >
            {{ movie.Year }}&nbsp;&middot; {{ movie.Genre }}&nbsp;&middot;
            {{ movie.Runtime }}
          </p>
          <p>{{ movie.Actors }}</p>
        </div>
      </div>
    </div>
    <p class="border-t border-zinc-300 py-4">{{ movie.Plot }}</p>
    <div class="flex justify-center border-t border-zinc-300 pt-6">
      <div
        v-for="(rating, index) in movie.Ratings"
        :key="index"
        class="space-y-1.5 border-l border-zinc-300 px-8 text-center first:border-none"
      >
        <p>
          {{ rating.Value }}
        </p>
        <p class="text-sm">
          {{ rating.Source }}
        </p>
      </div>
    </div>
  </article>
</template>
