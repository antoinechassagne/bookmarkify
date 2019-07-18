<template>
  <nav v-if="pagination.lastPage > 1">
    <ul class="pagination">
      <li v-if="pagination.currentPage > 1">
        <a @click="changePage(pagination.currentPage - 1)"
           class="pagination__previous">
          Previous
        </a>
      </li>
      <li v-else>
        <a class="pagination__previous pagination__previous--disable">
          Previous
        </a>
      </li>
      <li v-for="page in pagination.lastPage"
          :key="page" class="pl-2 pr-2">
        <a @click.prevent="changePage(page)"
           v-bind:class="{'pagination__number--active' : page === pagination.currentPage}"
           class="pagination__number">
            {{ page }}
        </a>
      </li>
      <li v-if="pagination.currentPage !== pagination.lastPage">
        <a @click="changePage(pagination.currentPage + 1)"
           class="pagination__next">
            Next
        </a>
      </li>
      <li v-else>
        <a class="pagination__next pagination__next--disable">
          Next
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
