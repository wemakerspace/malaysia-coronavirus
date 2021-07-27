<template>
  <div>
    <header>
      <h1>
        <span class="md:hidden">COVID-19 in Malaysia</span>
        <span class="hidden md:block">Coronavirus (COVID-19) in Malaysia</span>
      </h1>
      <button
        class="md:hidden border-2 border-white px-2 py-1 font-semibold text-sm"
        @click="showNav = !showNav"
      >
        Menu ▼
      </button>
    </header>
    <navbar-element v-if="showNav" class="md:hidden" />
  </div>
</template>

<script>
import NavBar from "@/components/navbar/index.vue";

export default {
  components: {
    "navbar-element": NavBar,
  },
  data: () => ({
    showNav: false,
  }),
  watch: {
    $route() {
      this.showNav = false;
    },
  },
};
</script>

<style scoped lang="scss">
header {
  @apply bg-black text-white border-b-4 border-gray-500 px-4 lg:px-6 py-1 mb-0 grid items-center;
  grid-template-columns: 1fr auto;
  height: 56px;

  h1 {
    @apply font-bold text-lg lg:text-xl;
  }
}
</style>
