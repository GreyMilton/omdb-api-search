<script setup>
defineProps({
  status: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-between">
    <p
      role="status"
      class="px-7 py-4 text-sm font-extralight"
    >
      {{ status }}
    </p>
    <slot />
  </div>
</template>
