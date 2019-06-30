<template>
  <div id="vueHome" class="text-center">
    <h1 class="mt-20 mb-10 text-6xl">
      {{ title }}
    </h1>
    <p>
      {{ description }}
    </p>
    <router-link v-bind:to="{ name: 'Bookmarks' }" class="button mt-5 shadow-2xl">
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
      description: 'Bookmarkify is an app that allows you to save useful bookmarks that you want to keep.',
    };
  },
};
</script>

<style lang="scss">
  .button {
    display: inline-block;
    border: solid 1px black;
    border-radius: 50px;
    padding: 10px;
    transition: all 0.3s;
    &:hover {
      background-color: black;
      color: white;
     }
  }
</style>
