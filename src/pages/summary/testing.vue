<template>
  <div>
    <h3 id="testing">Testing</h3>
    <p>
      Testing is where we do a test to see who has coronavirus. Some people are
      tested more than once.
    </p>
    <p>
      There were <b>{{ testing.latestValue.toLocaleString() }}</b> tests
      reported on <b>{{ testing.latestDate }}</b
      >. This shows {{ compareText(testing.changePercentage) }}
      <template v-if="testing.changePercentage !== 0"
        >of <b>{{ testing.changePercentage }}%</b></template
      >
      compared to the previous 7 days.
    </p>
    <p>
      Between {{ testing.betweenDate }} and {{ testing.latestDate }}, there have
      been <b>{{ testing.betweetValue.toLocaleString() }}</b> tests.
    </p>
  </div>
</template>

<script>
import Mixins from "./mixins.js";

export default {
  mixins: [Mixins],
};
</script>
