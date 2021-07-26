<template>
  <div class="vaccination-card w-full bg-gray-100 p-4 grid gap-10">
    <div class="flex flex-col">
      <div class="text-gray-700">Vaccinations</div>
      <h3 class="text-xl font-semibold mb-2">People vaccinated</h3>
      <div class="text-gray-700 text-sm flex-1">
        Up to and including 23 July 2021
      </div>
      <div class="font-medium">All vaccination data</div>
    </div>
    <div class="w-full grid grid-cols-2 gap-8">
      <div>
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
      <div>
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
      <div>
        <div class="text-sm">Total — 1st dose</div>
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
          Total number of people vaccinated (first dose) up to and including
          {{ date }}
        </div>
      </div>
      <div>
        <div class="text-sm">Total — 2nd dose</div>
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
          Total number of people vaccinated (second dose) up to and including
          {{ date }}
        </div>
      </div>
    </div>
    <div class="last grid gap-4 text-right">
      <div>
        <div class="mb-2">Percentage of adult population</div>
        <div class="mb-2 tooltip-right">
          <span
            class="
              has-tooltip
              inline-block
              text-2xl
              border-dashed border-b border-black
              cursor-help
            "
            >88.0%</span
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
            >69.9%</span
          >
          <div class="tooltip">
            Percentage of adults vaccinated (second dose) reported on 23 July
            2021
          </div>
          <div class="flex flex-row items-center justify-end mt-2">
            <div class="legend bg-green-800 mr-1" />
            <div class="text-sm">2nd Dose</div>
          </div>
        </div>
      </div>
      <grid-chart :first="first" :second="second" />
    </div>
  </div>
</template>

<script>
import GridChart from "@/components/grid-chart/index.vue";

export default {
  components: {
    "grid-chart": GridChart,
  },
  computed: {
    first() {
      return 88;
    },
    second() {
      return 69.9;
    },
    date() {
      return "23 July 2021";
    },
  },
};
</script>

<style scoped>
.vaccination-card {
  grid-template-columns: auto 1fr auto;
}

.vaccination-card .last {
  grid-template-columns: 1fr auto;
}

.legend {
  width: 12px;
  height: 12px;
}
</style>
