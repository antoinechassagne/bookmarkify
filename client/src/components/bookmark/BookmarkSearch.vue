<template>
  <input type="search" class="input input--small input--search mb-20" placeholder="Search..."
         v-model="search" @change="updateSearch(search)">
</template>

<script>

export default {
  name: 'bookmarkSearch',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    updateSearch(search) {
      this.$emit('updateSearch', search);
    },
  },
};
</script>
