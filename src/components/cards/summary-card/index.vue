<template>
  <div class="flex flex-col bg-gray-100">
    <div class="flex-1 p-4">
      <div class="text-gray-700">{{ data.category }}</div>
      <div class="text-xl font-semibold mb-2 leading-6">{{ data.title }}</div>
      <div class="text-gray-700 text-sm mb-4">
        Latest data provided on {{ formatDate(data.latest_date) }}
      </div>
      <div
        class="grid gap-3 mb-2"
        :class="{ 'grid-cols-2': data.values.length > 2 }"
      >
        <div class="grid gap-1" v-for="(item, key) in data.values" :key="key">
          <div class="text-sm flex-1 whitespace-pre-line">{{ item.title }}</div>
          <div class="has-tooltip self-end">
            <span
              class="
                has-tooltip
                text-2xl
                border-dashed border-b border-black
                cursor-help
                mr-auto
              "
            >
              {{ item.value.toLocaleString() }}
            </span>
            <div class="tooltip">
              {{ item.tooltip }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="has-tooltip inline px-2 py-1 rounded-sm" :class="changesBg">
          <span class="font-bold">{{ changesValue }}</span>
          ({{ changesPercent }}%)
        </div>
        <div class="tooltip">{{ tooltip }}</div>
      </div>
    </div>
    <div class="p-4 w-full">
      <div class="aspect-w-2 aspect-h-1">
        <img
          :src="data.imageUrl"
          loading="lazy"
          :alt="`Chart of ${data.title} in the last 180 days`"
        />
      </div>
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
  computed: {
    changesBg() {
      if (["Vaccination", "Testing"].includes(this.data.category)) {
        return "bg-gray-300";
      }
      return this.data.change > 0 ? "bg-red-200" : "bg-green-200";
    },
    changesValue() {
      const value =
        this.data.current_seven_days_total -
        this.data.previous_seven_days_total;
      return `${value > 0 ? "+" : ""}${value.toLocaleString()}`;
    },
    changesPercent() {
      const value = this.data.change;
      return `${value > 0 ? "+" : ""}${value.toFixed(1)}`;
    },
    tooltip() {
      try {
        return `Change from previous 7 days (${this.daysAgo(
          this.data.latest_date,
          14
        )} – ${this.daysAgo(this.data.latest_date, 8)})`;
      } catch (e) {
        return "";
      }
    },
  },
};
</script>
