<template>
  <footer>
    <div class="mb-2">
      Developed by
      <a href="https://twitter.com/henrylim96" target="_blank" rel="noopener"
        >Henry Lim</a
      >. Follow us on
      <a
        href="https://twitter.com/MYVaccineCount"
        target="_blank"
        rel="noopener"
        >Twitter</a
      >.
    </div>
    <div class="mb-2">
      Data source:
      <a
        href="https://github.com/CITF-Malaysia/citf-public"
        target="_blank"
        rel="noopener"
        >COVID-19 Immunisation Task Force</a
      >,
      <a
        href="https://github.com/MoH-Malaysia/covid19-public/tree/main/epidemic"
        target="_blank"
        rel="noopener"
        >Ministry of Health Malaysia</a
      >
    </div>
    <div class="mb-2">
      This website is open source. See our repositories on
      <a
        href="https://github.com/limhenry/malaysia-coronavirus"
        target="_blank"
        rel="noopener"
        >GitHub</a
      >.
    </div>
    <div>
      This website is based on
      <a href="https://coronavirus.data.gov.uk/" target="_blank" rel="noopener"
        >Coronavirus (COVID-19) in the UK</a
      >.
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  @apply bg-gray-200 border-t-2 border-gray-400 text-gray-900 text-xs lg:text-sm px-4 py-8 mt-2;

  a {
    @apply underline;
  }
}
</style>
