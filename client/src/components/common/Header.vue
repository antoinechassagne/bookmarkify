<template>
  <header class="flex items-center mt-10">
    <nav class="inline-block">
      <router-link v-bind:to="{ name: 'BookmarkListing' }" class="font-bold uppercase text-xl mr-5">
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
