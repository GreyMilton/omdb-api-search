<script setup>
import { ref, computed, onUnmounted } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

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
  <p
    class="px-7 py-7 text-sm font-extralight"
    :class="{ 'whitespace-nowrap italic': loading }"
  >
    <span role="status">{{ status }}</span
    >{{ dots }}
  </p>
</template>
