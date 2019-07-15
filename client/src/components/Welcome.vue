<template>
  <main class="welcome-page">
    <h1 class="title-big">
      Welcome to Bookmarkify
    </h1>
    <p class="mt-30">
      Save useful bookmarks you want to keep !
    </p>
    <router-link v-bind:to="{ name: 'BookmarkListing' }" class="button mt-60">
      Let's start now !
    </router-link>
  </main>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss">
  .welcome-page {
    height: 100vh;
    text-align: center;
    h1 {
      padding-top: 30vh;
    }
  }
</style>
