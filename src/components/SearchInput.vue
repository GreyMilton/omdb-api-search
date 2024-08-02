<script setup>
import { ref, watch } from 'vue';
import MagnifyingGlass from './icons/MagnifyingGlass.vue';

const model = defineModel({
  type: String,
  required: true,
});

const showClear = ref(false);

watch(model, (newValue) => {
  showClear.value = newValue ? true : false;
});

function handleClear() {
  model.value = '';
  showClear.value = false;
}
</script>

<template>
  <div class="flex items-center">
    <label for="search-input">
      <MagnifyingGlass />
    </label>
    <input
      id="search-input"
      v-model="model"
      class="h-10 bg-transparent pl-2 text-2xl font-light text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
    />
    <button
      v-show="showClear"
      class="ml-3 h-8 w-8 rounded-full bg-white/80 pb-1 text-2xl leading-none text-omdb-grey hover:bg-white focus-visible:border-omdb-grey focus-visible:outline-2 focus-visible:outline-omdb-grey focus-visible:ring-[6px] focus-visible:ring-white"
      @click="handleClear"
    >
      x
    </button>
  </div>
</template>
