<template>
  <input type="search" class="search" v-model="search" @change="updateSearch(search)">
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
