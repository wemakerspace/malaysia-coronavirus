<template>
  <div>
    <!-- <splash-element v-if="loading" @loaded="loading = false" />
    <template v-else> -->
    <header-element />
    <main class="w-full flex px-4 py-2 lg:px-6 lg:py-4">
      <navbar-element class="hidden md:block" />
      <div class="w-full py-2 md:px-2">
        <router-view />
      </div>
    </main>
    <footer-element />
    <!-- </template> -->
  </div>
</template>

<script>
// import Splash from "@/components/splash/index.vue";
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
import NavBar from "@/components/navbar/index.vue";

export default {
  components: {
    // "splash-element": Splash,
    "header-element": Header,
    "footer-element": Footer,
    "navbar-element": NavBar,
  },
  // data: () => ({
  //   loading: true,
  // }),
};
</script>

<style scoped lang="scss">
#app {
  @apply text-black;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  main {
    min-height: 100vh;
  }
}
</style>
