<template>
  <div>
    <div class="mb-4">
      <h2 class="text-3xl font-bold mb-3">Malaysia Summary</h2>
      <h3 class="mb-2">
        The unofficial website for data and insights on coronavirus (COVID-19)
        in Malaysia.
      </h3>
      <h3>
        See the
        <router-link to="/summary" class="underline"
          >simple summary</router-link
        >
        for Malaysia.
      </h3>
    </div>

    <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
      <vaccination-card class="col-span-full" :data="summary.vaccinations" />
      <summary-card v-for="(item, key) in cards" :key="key" :data="item" />
    </div>
  </div>
</template>

<script>
import VaccinationCard from "@/components/cards/vaccination-card/index.vue";
import SummaryCard from "@/components/cards/summary-card/index.vue";
export default {
  components: {
    "vaccination-card": VaccinationCard,
    "summary-card": SummaryCard,
  },
  computed: {
    summary() {
      return this.$store.state.summary.summary;
    },
    cards() {
      return [
        {
          category: "Cases",
          title: "People tested positive",
          date: this.formatDate(this.summary.cases.latest_date),
          link: "cases",
          imageUrl: this.summary.cases.imageUrl,
          values: [
            {
              title: "Daily",
              value: this.summary.cases.latest_value,
              tooltip: `Daily number of people tested positive reported on ${this.formatDate(
                this.summary.cases.latest_date
              )}`,
            },
            {
              title: "Last 7 days",
              value: this.summary.cases.current_seven_days_total,
              tooltip: `Total number of people tested positive reported in the last 7 days (${this.sevenDaysAgo(
                this.summary.cases.latest_date
              )} – ${this.formatDate(this.summary.cases.latest_date)})`,
            },
          ],
        },
        {
          category: "Deaths",
          title: "Deaths",
          date: this.formatDate(this.summary.deaths.latest_date),
          link: "deaths",
          imageUrl: this.summary.deaths.imageUrl,
          values: [
            {
              title: "Daily",
              value: this.summary.deaths.latest_value,
              tooltip: `Daily number of deaths reported on ${this.formatDate(
                this.summary.deaths.latest_date
              )}`,
            },
            {
              title: "Last 7 days",
              value: this.summary.deaths.current_seven_days_total,
              tooltip: `Total number of deaths reported in the last 7 days (${this.sevenDaysAgo(
                this.summary.deaths.latest_date
              )} – ${this.formatDate(this.summary.deaths.latest_date)})`,
            },
          ],
        },
        {
          category: "Healthcare",
          title:
            "Patients admitted in COVID-19 Quarantine and Treatment Centre",
          date: this.formatDate(this.summary.healthcare.pkrc.latest_date),
          link: "healthcare",
          imageUrl: this.summary.healthcare.pkrc.imageUrl,
          values: [
            {
              title: "Daily",
              value: this.summary.healthcare.pkrc.latest_value,
              tooltip: `Daily number of patients admitted in COVID-19 Quarantine and Treatment Centre (PKRC) reported on ${this.formatDate(
                this.summary.healthcare.pkrc.latest_date
              )}`,
            },
            {
              title: "Last 7 days",
              value: this.summary.healthcare.pkrc.current_seven_days_total,
              tooltip: `Total number of patients admitted in COVID-19 Quarantine and Treatment Centre (PKRC) reported in the last 7 days (${this.sevenDaysAgo(
                this.summary.healthcare.pkrc.latest_date
              )} – ${this.formatDate(
                this.summary.healthcare.pkrc.latest_date
              )})`,
            },
          ],
        },
        {
          category: "Healthcare",
          title: "Patients admitted in hospital",
          date: this.formatDate(this.summary.healthcare.hospital.latest_date),
          link: "healthcare",
          imageUrl: this.summary.healthcare.hospital.imageUrl,
          values: [
            {
              title: "Daily",
              value: this.summary.healthcare.hospital.latest_value,
              tooltip: `Daily number of patients admitted in hospital reported on ${this.formatDate(
                this.summary.healthcare.hospital.latest_date
              )}`,
            },
            {
              title: "Last 7 days",
              value: this.summary.healthcare.hospital.current_seven_days_total,
              tooltip: `Total number of patients admitted in hospital reported in the last 7 days (${this.sevenDaysAgo(
                this.summary.healthcare.hospital.latest_date
              )} – ${this.formatDate(
                this.summary.healthcare.hospital.latest_date
              )})`,
            },
          ],
        },
        {
          category: "Healthcare",
          title: "Patients admitted in ICU",
          date: this.formatDate(this.summary.healthcare.icu.latest_date),
          link: "healthcare",
          imageUrl: this.summary.healthcare.icu.imageUrl,
          values: [
            {
              title: "Daily",
              value: this.summary.healthcare.icu.latest_value,
              tooltip: `Daily number of patients admitted in ICU reported on ${this.formatDate(
                this.summary.healthcare.icu.latest_date
              )}`,
            },
            {
              title: "Last 7 days",
              value: this.summary.healthcare.icu.current_seven_days_total,
              tooltip: `Total number of patients admitted in ICU reported in the last 7 days (${this.sevenDaysAgo(
                this.summary.healthcare.icu.latest_date
              )} – ${this.formatDate(
                this.summary.healthcare.icu.latest_date
              )})`,
            },
          ],
        },
        {
          category: "Testing",
          title: "Virus tests conducted",
          date: this.formatDate(this.summary.testing.latest_date),
          link: "testing",
          imageUrl: this.summary.testing.imageUrl,
          values: [
            {
              title: "Daily",
              value: this.summary.testing.latest_value,
              tooltip: `Daily number of virus tests conducted reported on ${this.formatDate(
                this.summary.testing.latest_date
              )}`,
            },
            {
              title: "Last 7 days",
              value: this.summary.testing.current_seven_days_total,
              tooltip: `Total number of virus tests conducted reported in the last 7 days (${this.sevenDaysAgo(
                this.summary.testing.latest_date
              )} – ${this.formatDate(this.summary.testing.latest_date)})`,
            },
          ],
        },
        {
          category: "Vaccination",
          title: "Vaccine administered",
          date: this.formatDate(this.summary.vaccinations.latest_date),
          link: "vaccinations",
          imageUrl: this.summary.vaccinations.imageUrl,
          values: [
            {
              title: "Daily",
              value: this.summary.vaccinations.latest_value,
              tooltip: `Daily number of vaccine administered reported on ${this.formatDate(
                this.summary.testing.latest_date
              )}`,
            },
            {
              title: "Last 7 days",
              value: this.summary.vaccinations.current_seven_days_total,
              tooltip: `Total number of vaccine administered reported in the last 7 days (${this.sevenDaysAgo(
                this.summary.vaccinations.latest_date
              )} – ${this.formatDate(this.summary.vaccinations.latest_date)})`,
            },
          ],
        },
      ];
    },
  },
  methods: {
    formatDate(value) {
      return new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    sevenDaysAgo(value) {
      const d = new Date(value);
      const newDate = d.setDate(d.getDate() - 7);
      return this.formatDate(newDate);
    },
  },
  async mounted() {
    await this.$store.dispatch("summary/fetchSummary");
  },
};
</script>
