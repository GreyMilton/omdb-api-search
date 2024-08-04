<script setup>
import { ref, computed, onUnmounted } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

defineEmits(['view-watchlist']);

const loading = computed(
  () =>
    props.status === 'Searching' ||
    props.status === 'Clearing search' ||
    props.status === 'Getting details',
);

const index = ref(0);
const options = ['', '.', '..', '...'];

const interval = setInterval(() => {
  if (loading.value && index.value < options.length - 1) {
    index.value++;
  } else {
    index.value = 0;
  }
}, 300);

onUnmounted(() => {
  clearInterval(interval);
});

const dots = computed(() => {
  return loading.value ? options[index.value] : '';
});
</script>

<template>
  <div class="flex justify-between p-5 text-sm font-extralight">
    <p
      class="p-2"
      :class="{ 'whitespace-nowrap italic': loading }"
    >
      <span role="status">{{ status }}</span
      >{{ dots }}
    </p>
    <button
      class="p-2 underline hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-neutral-300 active:bg-zinc-200"
      @click="$emit('view-watchlist')"
    >
      View watchlist
    </button>
  </div>
</template>
