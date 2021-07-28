<template>
  <div class="w-full bg-gray-100 p-4 grid gap-6 grid-cols-8 col-span-full">
    <div class="topic grid col-span-8 lg:col-span-2">
      <div class="text-gray-700">Vaccinations</div>
      <div class="text-xl font-semibold">People vaccinated</div>
      <div class="text-gray-700 text-sm">Up to and including {{ date }}</div>
      <!-- <div class="font-medium">All vaccination data</div> -->
    </div>
    <div
      class="
        grid
        col-span-8
        md:col-span-4
        lg:col-span-3
        gap-4
        grid-cols-2 grid-rows-2
        items-end
      "
    >
      <div v-for="(item, key) in doses" :key="key">
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
        <div class="tooltip">{{ item.tooltip }} {{ date }}</div>
      </div>
    </div>
    <div
      class="
        grid
        col-span-8
        md:col-span-4
        lg:col-span-3
        gap-4
        visaulisation
        items-end
      "
    >
      <div class="justify-self-end text-right">
        <div class="text-sm mb-2">Percentage of adult population</div>
        <div class="mb-2 tooltip-right">
          <span
            class="
              has-tooltip
              inline-block
              text-2xl
              border-dashed border-b border-black
              cursor-help
            "
            >{{ first.toFixed(1) }}%</span
          >
          <div class="tooltip">
            Percentage of adults vaccinated (first dose) reported on {{ date }}
          </div>
          <div class="flex flex-row items-center justify-end mt-2">
            <div class="legend bg-green-500 mr-1" />
            <div class="text-sm">1st Dose</div>
          </div>
        </div>
        <div class="mb-2 tooltip-right">
          <span
            class="
              has-tooltip
              inline-block
              text-2xl
              border-dashed border-b border-black
              cursor-help
            "
            >{{ second.toFixed(1) }}%</span
          >
          <div class="tooltip">
            Percentage of adults vaccinated (second dose) reported on {{ date }}
          </div>
          <div class="flex flex-row items-center justify-end mt-2">
            <div class="legend bg-green-800 mr-1" />
            <div class="text-sm">2nd Dose</div>
          </div>
        </div>
      </div>
      <grid-chart :first="first" :second="second" class="col-auto" />
    </div>
  </div>
</template>

<script>
import GridChart from "@/components/grid-chart/index.vue";

export default {
  props: {
    data: Object,
  },
  components: {
    "grid-chart": GridChart,
  },
  computed: {
    pop() {
      return 23409600;
    },
    first() {
      return (this.data.dose1_cumul / this.pop) * 100;
    },
    second() {
      return (this.data.dose2_cumul / this.pop) * 100;
    },
    date() {
      if (!this.data.latest_date) return "";
      return this.formatDate(this.data.latest_date);
    },
    doses() {
      return [
        {
          title: "Daily — 1st dose",
          value: this.data.dose1_daily,
          tooltip: "Number of people vaccinated (first dose) reported on ",
        },
        {
          title: "Daily — 2nd dose",
          value: this.data.dose2_daily,
          tooltip: "Number of people vaccinated (second dose) reported on ",
        },
        {
          title: "Total — 1st dose",
          value: this.data.dose1_cumul,
          tooltip:
            "Total number of people vaccinated (first dose) up to and including ",
        },
        {
          title: "Total — 2nd dose",
          value: this.data.dose2_cumul,
          tooltip:
            "Total number of people vaccinated (second dose) up to and including ",
        },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.topic {
  grid-template-rows: auto auto 1fr auto;
}

.visaulisation {
  grid-template-columns: 1fr auto;

  .legend {
    width: 12px;
    height: 12px;
  }
}
</style>
