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
