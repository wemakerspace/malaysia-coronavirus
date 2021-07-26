<template>
  <div>
    <header-element />
    <main class="w-full flex px-4 py-2 lg:px-6 lg:py-4">
      <navbar-element />
      <div class="w-full p-2">
        <router-view />
      </div>
    </main>
    <footer-element />
  </div>
</template>

<script>
import Header from "./components/header/index.vue";
import Footer from "./components/footer/index.vue";
import NavBar from "./components/navbar/index.vue";

export default {
  components: {
    "header-element": Header,
    "footer-element": Footer,
    "navbar-element": NavBar,
  },
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
