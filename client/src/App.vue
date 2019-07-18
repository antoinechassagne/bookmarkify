<template>
  <div id="app">
    <Header v-if="!isWelcomePage()"></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/common/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
  methods: {
    isWelcomePage() {
      return (this.$route.path === '/');
    },
  },
};
</script>
