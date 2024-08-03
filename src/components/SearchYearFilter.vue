<script setup>
const model = defineModel({
  type: String,
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
        id="year-input"
        v-model="model"
        type="range"
        min="1925"
        max="2024"
        step="1"
        class="w-44"
      />
      <p class="w-8">{{ model }}</p>
    </div>
  </div>
</template>
