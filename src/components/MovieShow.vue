<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="border-l border-zinc-300 p-8 text-lg font-extralight">
    <div class="flex items-center gap-4 pb-6">
      <img
        :src="movie.Poster"
        class="w-48 rounded-md"
      />
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
