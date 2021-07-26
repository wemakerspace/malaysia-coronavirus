<template>
  <div>
    <h3 id="vaccinations">Vaccinations</h3>
    <p>
      Vaccines are currently given in 1 dose (CanSino, etc.) or 2 doses (Pfizer,
      AstraZeneca, Sinovac, etc.).
    </p>
    <p>
      <b>{{ data.dose1_cumul.toLocaleString() }}</b> people had been given a
      first dose by the end of {{ formatDate(data.latest_date) }}.
    </p>
    <p>
      <b>{{ data.dose2_cumul.toLocaleString() }}</b> people had been given a
      second dose by the end of {{ formatDate(data.latest_date) }}.
    </p>
  </div>
</template>

<script>
import Mixins from "./mixins.js";

export default {
  mixins: [Mixins],
};
</script>
