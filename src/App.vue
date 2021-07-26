<template>
  <div>
    <header-element />
    <div class="w-full flex px-6 py-4">
      <!-- <navbar-element /> -->
      <div class="w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/header/index.vue";
// import NavBar from "./components/navbar/index.vue";

export default {
  components: {
    "header-element": Header,
    // "navbar-element": NavBar,
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}
</style>
