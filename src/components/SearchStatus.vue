<script setup>
defineProps({
  status: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p
    role="status"
    class="border-b border-zinc-300 px-7 py-4 text-sm font-extralight uppercase"
  >
    {{ status }}
  </p>
</template>
