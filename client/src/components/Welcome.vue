<template>
  <div id="vueHome" class="text-center">
    <h1 class="mt-20 mb-5 text-6xl">
      {{ title }}
    </h1>
    <p>
      {{ description }}
    </p>
    <router-link v-bind:to="{ name: 'BookmarkListing' }" class="button mt-10 shadow-2xl">
      Let's start now !
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Welcome to Bookmarkify',
      description: 'Save useful bookmarks you want to keep !',
    };
  },
};
</script>
