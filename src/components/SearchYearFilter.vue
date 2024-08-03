<script setup>
const year = defineModel('year', {
  type: String,
  required: true,
});

const enabled = defineModel('enabled', {
  type: Boolean,
  required: true,
});

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="flex flex-col gap-[0.1rem] text-sm font-extralight text-white">
    <label
      class="uppercase"
      for="year-input"
      >Year</label
    >
    <div class="flex items-center gap-2">
      <input
        id="enable-year"
        v-model="enabled"
        type="checkbox"
        aria-label="Enable year filter"
        class="h-3.5 w-3.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
      />
      <input
        id="year-input"
        v-model="year"
        type="range"
        min="1900"
        :max="currentYear"
        step="1"
        class="w-32 p-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
        :disabled="!enabled"
      />
      <p class="w-8">{{ year }}</p>
    </div>
  </div>
</template>
