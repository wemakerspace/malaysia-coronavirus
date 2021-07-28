<template>
  <div>
    <h3 id="cases">Cases</h3>
    <p>A confirmed case is someone who has tested positive for coronavirus.</p>
    <p>
      <b>{{ data.latest_value.toLocaleString() }}</b>
      new people had a confirmed positive test result reported on
      {{ formatDate(data.latest_date) }}.
    </p>
    <p>
      Between {{ daysAgo(data.latest_date, 7) }} and
      {{ formatDate(data.latest_date) }},
      <b>{{ data.current_seven_days_total.toLocaleString() }}</b> people had a
      confirmed positive test result. This shows {{ compareText(data.change) }}
      <template v-if="data.change !== 0">
        of <b>{{ data.change.toFixed(1) }}%</b>
      </template>
      compared to the previous 7 days.
    </p>
  </div>
</template>
