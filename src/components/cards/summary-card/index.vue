<template>
  <div class="">
    <div class="">{{ category }}</div>
    <div class="">{{ title }}</div>
    <div class="">Latest data provided on {{ date }}</div>
    <div class="">
      <router-link to="/" class="">All {{ category }} data</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: String,
    title: String,
    date: String,
    link: String,
  },
};
</script>
