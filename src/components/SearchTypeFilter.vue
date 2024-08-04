<script setup>
/**
 * Props for the component.
 *
 * @typedef {Object} Props
 * @property {Array<{value: string, label: string}>} types - An array of type objects, each containing a value and label for the radio button options.
 */
defineProps({
  types: {
    type: Array,
    required: true,
  },
});

/**
 * A model that binds to the selected type from the radio buttons.
 *
 * @typedef {Object} Model
 * @property {string} value - The currently selected type value.
 */
const model = defineModel({
  type: String,
  required: true,
});
</script>

<template>
  <!-- Fieldset Container -->
  <fieldset class="text-sm font-extralight text-white">
    <legend class="uppercase">Type</legend>
    <div class="flex flex-col min-[380px]:flex-row sm:gap-2">
      <div
        v-for="(type, index) in types"
        :key="index"
        class="relative flex items-center"
      >
        <!-- Radio Input -->
        <input
          :id="'type-' + index"
          v-model="model"
          type="radio"
          :value="type.value"
          class="peer h-4 w-4 appearance-none rounded-full border-2 border-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
        />
        <!-- Radio Dot -->
        <div
          class="pointer-events-none absolute left-1 top-2 h-2 w-2 rounded-full peer-checked:bg-white"
          aria-hidden="true"
        />
        <!-- Label -->
        <label
          :for="'type-' + index"
          class="px-2 py-0.5 capitalize"
          >{{ type.label }}</label
        >
      </div>
    </div>
  </fieldset>
</template>
