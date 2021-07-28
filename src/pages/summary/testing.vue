<template>
  <div>
    <h3 id="testing">Testing</h3>
    <p>
      Testing is where we do a test to see who has coronavirus. Some people are
      tested more than once.
    </p>
    <p>
      There were <b>{{ data.latest_value.toLocaleString() }}</b> tests reported
      on <b>{{ formatDate(data.latest_date) }}</b
      >. This shows {{ compareText(data.change) }}
      <template v-if="data.change !== 0"
        >of <b>{{ data.change.toFixed(1) }}%</b></template
      >
      compared to the previous 7 days.
    </p>
    <p>
      Between {{ daysAgo(data.latest_date, 7) }} and
      {{ formatDate(data.latest_date) }}, there have been
      <b>{{ data.current_seven_days_total.toLocaleString() }}</b> tests.
    </p>
  </div>
</template>
