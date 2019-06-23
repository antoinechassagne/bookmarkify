<template v-if="pagination">
  <nav>
    <ul>
      <li>
        <a href="#" @click="changePage(pagination.currentPage)">
          &laquo;
        </a>
      </li>
      <li v-for="page in pagination.lastPage"
          :key="page">
        <a href="#" @click.prevent="changePage(page)">
            {{ page }}
        </a>
      </li>
      <li>
        <a href="#"
           @click="changePage(pagination.currentPage + 1)">
            &raquo;
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pagination'],
  methods: {
    changePage(currentPage) {
      this.$emit('changePage', currentPage);
    },
  },
};
</script>
