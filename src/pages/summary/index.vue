<template>
  <div class="summary max-w-screen-md m-auto py-6">
    <h1>Coronavirus (COVID-19) in Malaysia</h1>
    <h2>
      <small>Simple summary</small>
      <small>for</small>
      Malaysia
    </h2>
    <div>
      <p>
        This information comes from the Malaysia Government. (<a
          href="https://github.com/cITF-Malaysia/citf-public/"
          class="underline"
          >Here</a
        >, and
        <a
          href="https://github.com/MoH-Malaysia/covid19-public"
          class="underline"
          >here</a
        >)
      </p>
      <!-- <p>This document explains the key statistics presented on the <b>Malaysia Coronavirus (COVID-19) Dashboard</b>.</p> -->
    </div>

    <h3>Contents</h3>
    <ul class="pl-4">
      <li>
        <a href="#testing">Testing</a>
      </li>
      <li>
        <a href="#cases">Cases</a>
      </li>
      <li>
        <a href="#vaccinations">Vaccinations</a>
      </li>
      <li>
        <a href="#healthcare">Healthcare</a>
      </li>
      <li>
        <a href="#deaths">Deaths</a>
      </li>
    </ul>

    <testing-element />
    <cases-element />
    <vaccinations-element />
    <healthcare-element />
    <deaths-element />
  </div>
</template>

<script>
import Testing from "./testing.vue";
import Cases from "./cases.vue";
import Vaccinations from "./vaccinations.vue";
import Healthcare from "./healthcare.vue";
import Deaths from "./deaths.vue";

export default {
  components: {
    "testing-element": Testing,
    "cases-element": Cases,
    "vaccinations-element": Vaccinations,
    "healthcare-element": Healthcare,
    "deaths-element": Deaths,
  },
};
</script>

<style lang="scss">
.summary {
  h1 {
    @apply text-4xl font-bold text-center mb-6;
  }
  h2 {
    @apply text-2xl font-bold text-center mb-8;
  }
  h2 small {
    @apply block my-0 text-lg leading-6 text-gray-500;
  }
  h3 {
    @apply text-2xl mt-12 mb-2 font-bold;
  }
  p {
    @apply my-4 text-lg;
  }
  ul {
    li {
      @apply my-1;

      &:before {
        content: "—";
        margin-right: 5px;
      }

      a {
        @apply font-semibold underline;
      }
    }
  }
}
</style>
