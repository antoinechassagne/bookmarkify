<template>
  <div>
    <h1>
      {{ message }}
    </h1>
    <p>
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      message: 'Welcome to Bookmarkify',
      description: 'Bookmarkify is an app that allows you to save useful bookmarks that you want to keep.'
    }
  }
}
</script>
