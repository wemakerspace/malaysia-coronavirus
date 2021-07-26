<template>
  <div>
    <h3 id="deaths">Deaths</h3>
    <p>
      There were <b>{{ data.latest_value.toLocaleString() }}</b> deaths reported
      on {{ formatDate(data.latest_date) }}.
    </p>
    <p>
      Between {{ sevenDaysAgo(data.latest_date) }} and
      {{ formatDate(data.latest_date) }}, there have been
      <b>{{ data.current_seven_days_total.toLocaleString() }}</b> deaths. This
      shows {{ compareText(data.change) }}
      <template v-if="data.change !== 0">
        of <b>{{ data.change.toFixed(1) }}%</b>
      </template>
      compared to the previous 7 days.
    </p>
  </div>
</template>

<script>
import Mixins from "./mixins.js";

export default {
  mixins: [Mixins],
};
</script>
