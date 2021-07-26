<template>
  <div class="summary max-w-screen-md m-auto py-6">
    <h1>Coronavirus (COVID-19) in Malaysia</h1>
    <h2>
      <small>Simple summary</small>
      <small>for</small>
      Malaysia
    </h2>

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
      <!-- <li>
        <a href="#healthcare">Healthcare</a>
      </li> -->
      <li>
        <a href="#deaths">Deaths</a>
      </li>
    </ul>

    <testing-element :data="data.testing" />
    <cases-element :data="data.cases" />
    <vaccinations-element :data="data.vaccinations" />
    <!-- <healthcare-element /> -->
    <deaths-element :data="data.deaths" />
  </div>
</template>

<script>
import Testing from "./testing.vue";
import Cases from "./cases.vue";
import Vaccinations from "./vaccinations.vue";
// import Healthcare from "./healthcare.vue";
import Deaths from "./deaths.vue";

export default {
  components: {
    "testing-element": Testing,
    "cases-element": Cases,
    "vaccinations-element": Vaccinations,
    // "healthcare-element": Healthcare,
    "deaths-element": Deaths,
  },
  data: () => ({
    data: {
      cases: {
        change: 0,
        current_seven_days_total: 0,
        latest_date: "",
        latest_value: 0,
        oldest_date: "",
        previous_seven_days_total: 0,
      },
      deaths: {
        change: 0,
        current_seven_days_total: 0,
        latest_date: "",
        latest_value: 0,
        oldest_date: "",
        previous_seven_days_total: 0,
      },
      testing: {
        change: 0,
        current_seven_days_total: 0,
        latest_date: "",
        latest_value: 0,
        oldest_date: "",
        previous_seven_days_total: 0,
      },
      vaccinations: {
        dose1_cumul: 0,
        dose1_daily: 0,
        dose2_cumul: 0,
        dose2_daily: 0,
        latest_date: "",
      },
    },
  }),
  async mounted() {
    const dbId = "malaysia-coronavirus-default-rtdb";
    const dbUrl = `https://${dbId}.asia-southeast1.firebasedatabase.app`;
    const req = await fetch(`${dbUrl}/summary.json`);
    this.data = await req.json();
  },
};
</script>

<style lang="scss">
.summary {
  h1 {
    @apply text-3xl lg:text-4xl font-bold text-center mb-6;
  }
  h2 {
    @apply text-xl lg:text-2xl font-bold text-center mb-8;
  }
  h2 small {
    @apply lg:text-lg block my-0 leading-6 text-gray-500;
  }
  h3 {
    @apply text-xl lg:text-2xl mt-8 lg:mt-12 mb-2 font-bold;
  }
  p {
    @apply lg:text-lg my-4 leading-6;
  }
  ul {
    li {
      @apply my-1;

      &:before {
        content: "—";
        margin-right: 5px;
      }

      a {
        @apply lg:text-lg font-semibold underline;
      }
    }
  }
}
</style>
