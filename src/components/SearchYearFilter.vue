<script setup>
/**
 * Model binding for the selected year in the range input.
 *
 * @model year
 * @type {import('vue').Model<string>}
 * @required
 */
const year = defineModel('year', {
  type: String,
  required: true,
});

/**
 * Model binding for the enabled state of the year filter.
 *
 * @model enabled
 * @type {import('vue').Model<boolean>}
 * @required
 */
const enabled = defineModel('enabled', {
  type: Boolean,
  required: true,
});

/**
 * The current year used as the maximum value for the year range input.
 *
 * @constant
 * @type {number}
 */
const currentYear = new Date().getFullYear();
</script>

<template>
  <!-- Main Container -->
  <div class="flex flex-col gap-[0.1rem] text-sm font-extralight text-white">
    <!-- Year Label -->
    <label
      class="uppercase"
      for="year-input"
      >Year</label
    >

    <!-- Inputs Container -->
    <div
      class="flex flex-wrap-reverse items-center gap-x-2 text-xs sm:flex-nowrap"
    >
      <div class="flex items-center gap-2">
        <!-- Enable Year Label -->
        <label
          for="enable-year"
          class="uppercase"
          aria-hidden="true"
          >enable</label
        >

        <!-- Enable Year Filter Checkbox -->
        <input
          id="enable-year"
          v-model="enabled"
          type="checkbox"
          aria-label="Enable year filter"
          class="h-3.5 w-3.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
        />
      </div>

      <div class="flex items-center gap-2">
        <!-- Year Range Input -->
        <input
          id="year-input"
          v-model="year"
          type="range"
          min="1900"
          :max="currentYear"
          step="1"
          class="w-32 p-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
          :disabled="!enabled"
        />

        <!-- Year Display -->
        <p class="w-8">{{ year }}</p>
      </div>
    </div>
  </div>
</template>
