<template>
  <nav>
    <router-link v-bind:to="{ name: 'BookmarkListing' }">
      Home
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Header',
};
</script>
