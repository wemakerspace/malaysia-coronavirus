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

    <div class="grid gap-2 grid-cols-4">
      <vaccination-card class="col-span-full" />
      <summary-card
        category="Cases"
        title="People tested positive"
        date="2021-07-25"
        link="cases"
      />
      <summary-card
        category="Deaths"
        title="Deaths within 28 days of positive test"
        date="2021-07-25"
        link="cases"
      />
      <summary-card
        category="Healthcare"
        title="Patients admitted"
        date="2021-07-25"
        link="cases"
      />
      <summary-card
        category="Testing"
        title="Virus tests conducted"
        date="2021-07-25"
        link="cases"
      />
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
};
</script>
