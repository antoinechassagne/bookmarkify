<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <p>
      {{ description }}
    </p>
    <router-link v-bind:to="{ name: 'Bookmarks' }">
      Let's start now !
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: 'Welcome to Bookmarkify',
      description: 'Bookmarkify is an app that allows you to save useful bookmarks that you want to keep.'
    }
  }
}
</script>
