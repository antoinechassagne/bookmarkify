<template>
  <nav v-if="pagination.lastPage > 1">
    <ul class="flex justify-center">
      <li v-if="pagination.currentPage > 1" class="pl-2 pr-2">
        <a href="#" @click="changePage(pagination.currentPage - 1)">
          &laquo;
        </a>
      </li>
      <li v-for="page in pagination.lastPage"
          :key="page" class="pl-2 pr-2">
        <a href="#" @click.prevent="changePage(page)"
           v-bind:class="{'font-bold' : page === pagination.currentPage}">
            {{ page }}
        </a>
      </li>
      <li v-if="pagination.currentPage !== pagination.lastPage"
          class="pl-2 pr-2">
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
