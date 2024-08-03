<script setup>
const year = defineModel('year', {
  type: String,
  required: true,
});

const enabled = defineModel('enabled', {
  type: Boolean,
  required: true,
});
</script>

<template>
  <div class="flex flex-col text-sm font-extralight text-white">
    <label
      class="uppercase"
      for="year-input"
      >Year</label
    >
    <div class="flex gap-2">
      <input
        id="enable-year"
        v-model="enabled"
        type="checkbox"
        aria-label="Enable year filter"
        class="w-3.5"
      />
      <input
        id="year-input"
        v-model="year"
        type="range"
        min="1925"
        max="2024"
        step="1"
        class="w-32"
        :disabled="!enabled"
      />
      <p class="w-8">{{ year }}</p>
    </div>
  </div>
</template>
