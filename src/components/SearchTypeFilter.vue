<script setup>
defineProps({
  types: {
    type: Array,
    required: true,
  },
});

const model = defineModel({
  type: String,
  required: true,
});
</script>

<template>
  <fieldset class="text-sm font-extralight text-white">
    <legend class="uppercase">Type</legend>
    <div class="flex flex-row gap-2">
      <div
        v-for="(type, index) in types"
        :key="index"
        class="relative flex items-center"
      >
        <input
          :id="'type-' + index"
          v-model="model"
          type="radio"
          :value="type"
          class="peer h-4 w-4 appearance-none rounded-full border-2 border-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
        />
        <div
          class="pointer-events-none absolute left-1 top-2 h-2 w-2 rounded-full peer-checked:bg-white"
          aria-hidden="true"
        />
        <label
          :for="'type-' + index"
          class="px-2 py-0.5 capitalize"
          >{{ type }}</label
        >
      </div>
    </div>
  </fieldset>
</template>
