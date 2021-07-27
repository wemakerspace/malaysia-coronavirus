<template>
  <div class="flex flex-col bg-gray-100">
    <div class="flex-1 p-4">
      <div class="text-gray-700">{{ data.category }}</div>
      <div class="text-xl font-semibold mb-2">{{ data.title }}</div>
      <div class="text-gray-700 text-sm mb-4">
        Latest data provided on {{ data.date }}
      </div>
      <div class="mb-2" v-for="(item, key) in data.values" :key="key">
        <div class="text-sm">{{ item.title }}</div>
        <span
          class="
            has-tooltip
            text-2xl
            border-dashed border-b border-black
            cursor-help
          "
          >{{ item.value.toLocaleString() }}</span
        >
        <div class="tooltip">
          {{ item.tooltip }}
        </div>
      </div>
    </div>
    <div class="p-4">
      <img :src="data.imageUrl" />
    </div>
    <!-- <div class="border-t border-gray-300 px-4 py-3">
      <router-link to="/" class="font-medium"
        >All <span class="lowercase">{{ data.category }}</span> data
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>
