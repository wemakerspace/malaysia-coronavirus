<template>
  <div>
    <header>
      <h1>
        <span class="md:hidden">COVID-19 in Malaysia (Beta)</span>
        <span class="hidden md:block"
          >Coronavirus (COVID-19) in Malaysia (Beta)</span
        >
      </h1>
      <button
        class="md:hidden border-2 border-white px-2 py-1 font-semibold text-sm"
        @click="showNav = !showNav"
      >
        Menu ▼
      </button>
    </header>
    <navbar-element v-if="showNav" class="md:hidden" />
    <div class="px-4 lg:px-6 py-2 text-gray-700 text-sm">
      Last updated on {{ lastUpdated }}
    </div>
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
  computed: {
    lastUpdated() {
      try {
        const d = new Date(parseInt(this.$store.state.summary.last_updated));
        return new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "short",
        }).format(d);
      } catch (e) {
        return "";
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("summary/fetchLastUpdated");
  },
};
</script>

<style scoped lang="scss">
header {
  @apply bg-black text-white px-4 py-2 mb-0 grid gap-2 items-center lg:px-6 lg:py-4;
  grid-template-columns: 1fr auto;
  min-height: 56px;
  border-bottom: 6px solid #3cb64c;

  h1 {
    @apply font-bold text-lg lg:text-xl leading-6;
  }
}
</style>
