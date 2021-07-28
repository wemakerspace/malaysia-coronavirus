<template>
  <div class="grid grid-chart">
    <div v-for="(i, key) in range" :key="key" :class="i" />
  </div>
</template>

<script>
export default {
  props: {
    first: {
      type: Number,
      default: 0,
    },
    second: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    range() {
      const range = [];
      const first = Math.floor(this.first);
      const second = Math.floor(this.second);
      for (let i = 100; i > 0; i--) {
        let value = "bg-gray-300";
        if (i <= first) {
          value = "bg-green-500";
        }
        if (i <= second) {
          value = "bg-green-800";
        }
        range.push(value);
      }
      return range;
    },
  },
};
</script>

<style scoped>
.grid-chart {
  grid-template-columns: repeat(10, minmax(0, 15px));
  grid-template-rows: repeat(10, minmax(0, 15px));
  grid-gap: 2px;
  transform: scaleX(-1);
}
</style>
