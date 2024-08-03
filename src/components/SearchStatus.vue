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
    class="px-7 py-4 text-sm font-extralight uppercase"
  >
    {{ status }}
  </p>
</template>
