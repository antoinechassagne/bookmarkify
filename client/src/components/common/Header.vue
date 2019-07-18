<template>
  <header>
    <nav>
      <router-link v-bind:to="{ name: 'BookmarkListing' }" class="brand">
        Bookmarkify
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss">
  header {
    margin: 50px 0;
  }
  .brand {
    color: black;
    font-weight: 900;
    font-size: 1.5rem;
    text-transform: uppercase;
    text-decoration: none;
  }
</style>
