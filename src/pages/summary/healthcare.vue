<template>
  <div>
    <h3 id="healthcare">Healthcare</h3>
    <p>
      Some people with coronavirus have to go into COVID-19 Quarantine and
      Treatment Centre (PKRC), hospital, or ICU.
    </p>
    <br />
    <p>
      <b>{{ data.pkrc.latest_value.toLocaleString() }}</b> people with
      coronavirus went into PKRC on {{ formatDate(data.pkrc.latest_date) }}.
    </p>
    <p>
      Between {{ daysAgo(data.pkrc.latest_date, 7) }} and
      {{ formatDate(data.pkrc.latest_date) }},
      <b>{{ data.pkrc.current_seven_days_total.toLocaleString() }}</b> went into
      PKRC with coronavirus. This shows
      {{ compareText(data.pkrc.change) }}
      <template v-if="data.pkrc.change !== 0">
        of <b>{{ data.pkrc.change.toFixed(1) }}%</b>
      </template>
      compared to the previous 7 days.
    </p>
    <br />
    <p>
      <b>{{ data.hospital.latest_value.toLocaleString() }}</b> people with
      coronavirus went into hospital on
      {{ formatDate(data.hospital.latest_date) }}.
    </p>
    <p>
      Between {{ daysAgo(data.hospital.latest_date, 7) }} and
      {{ formatDate(data.hospital.latest_date) }},
      <b>{{ data.hospital.current_seven_days_total.toLocaleString() }}</b> went
      into hospital with coronavirus. This shows
      {{ compareText(data.hospital.change) }}
      <template v-if="data.hospital.change !== 0">
        of <b>{{ data.hospital.change.toFixed(1) }}%</b>
      </template>
      compared to the previous 7 days.
    </p>
    <br />
    <p>
      <b>{{ data.icu.latest_value.toLocaleString() }}</b> people with
      coronavirus went into ICU on {{ formatDate(data.icu.latest_date) }}.
    </p>
    <p>
      Between {{ daysAgo(data.icu.latest_date, 7) }} and
      {{ formatDate(data.icu.latest_date) }},
      <b>{{ data.icu.current_seven_days_total.toLocaleString() }}</b> went into
      ICU with coronavirus. This shows
      {{ compareText(data.icu.change) }}
      <template v-if="data.icu.change !== 0">
        of <b>{{ data.icu.change.toFixed(1) }}%</b>
      </template>
      compared to the previous 7 days.
    </p>
    <p>
      Some people in the ICU need to use a special device called a mechanical
      ventilator to help them breathe.
    </p>
    <p>
      There were
      <b>{{ data.icu_vent.latest_value.toLocaleString() }}</b> coronavirus
      patients in ICU with a mechanical ventilator on
      {{ formatDate(data.icu_vent.latest_date) }}.
    </p>
  </div>
</template>
