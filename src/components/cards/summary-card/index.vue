<template>
  <div class="flex flex-col bg-gray-100">
    <div class="flex-1 p-4">
      <div class="text-gray-700">{{ category }}</div>
      <div class="text-xl font-semibold mb-2">{{ title }}</div>
      <div class="text-gray-700 text-sm mb-4">
        Latest data provided on {{ formatDate(date) }}
      </div>
      <div class="mb-2">
        <div class="text-sm">Daily — 1st dose</div>
        <span
          class="
            has-tooltip
            text-2xl
            border-dashed border-b border-black
            cursor-help
          "
          >99,999</span
        >
        <div class="tooltip">
          Number of people vaccinated (first dose) reported on {{ date }}
        </div>
      </div>
      <div class="mb-2">
        <div class="text-sm">Daily — 2nd dose</div>
        <span
          class="
            has-tooltip
            text-2xl
            border-dashed border-b border-black
            cursor-help
          "
          >99,999</span
        >
        <div class="tooltip">
          Number of people vaccinated (second dose) reported on {{ date }}
        </div>
      </div>
    </div>
    <div class="border-t border-gray-300 px-4 py-3">
      <router-link to="/" class="font-medium"
        >All <span class="lowercase">{{ category }}</span> data</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: String,
    title: String,
    date: String,
    link: String,
  },
  methods: {
    formatDate(value) {
      if (!value) return value;
      return new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>
