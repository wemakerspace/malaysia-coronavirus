<template>
  <div>
    <h3 id="cases">Cases</h3>
    <p>A confirmed case is someone who has tested positive for coronavirus.</p>
    <p>
      <b>{{ cases.latestValue.toLocaleString() }}</b> new people had a confirmed
      positive test result reported on {{ cases.latestDate }}.
    </p>
    <p>
      Between {{ cases.betweenDate }} and {{ cases.latestDate }},
      <b>{{ cases.betweetValue.toLocaleString() }}</b> people had a confirmed
      positive test result. This shows
      {{ compareText(cases.changePercentage) }}
      <template v-if="cases.changePercentage !== 0"
        >of <b>{{ cases.changePercentage }}%</b></template
      >
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
