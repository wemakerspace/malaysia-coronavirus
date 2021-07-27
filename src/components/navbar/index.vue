<template>
  <nav
    class="
      grid
      gap-1
      border-b-2
      w-full
      pt-2
      pb-2
      pr-0
      md:border-none md:w-60 md:pr-4
    "
  >
    <router-link
      to="/"
      class="block p-2 pl-4 border-l-4 border-transparent hover:border-gray-500"
      active-class="border-black bg-gray-200 font-bold"
      >Daily update</router-link
    >
    <router-link
      to="/summary"
      class="block p-2 pl-4 border-l-4 border-transparent hover:border-gray-500"
      active-class="border-black bg-gray-200 font-bold"
      >Simple Summary</router-link
    >
  </nav>
</template>
