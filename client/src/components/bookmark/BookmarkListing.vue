<template>
  <div class="bookmark-page">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl mt-10 mb-10">My bookmarks</h1>
      <router-link v-bind:to="{ name: 'BookmarkAdd' }" class="button">Add a bookmark</router-link>
    </div>
    <div class="flex">
      <BookmarkFilters
        v-on:updateFilters="updateFilters">
      </BookmarkFilters>
      <div v-if="bookmarks !== undefined && bookmarks.length > 0" class="bookmark-list">
        <div v-if="bookmarksTotalCount > 0" class="italic mb-5 text-gray-500">
          {{ bookmarksTotalCount }} bookmarks found
        </div>
        <div v-for="(bookmark, index) in bookmarks" v-bind:key="index" class="">
          <BookmarkCard :bookmark="bookmark"></BookmarkCard>
        </div>
        <pagination
          :pagination="pagination"
          v-on:changePage="changePage"
          class="mt-10">
        </pagination>
      </div>
      <div v-else-if="bookmarks !== undefined && bookmarks.length <= 0" class="bookmark-list">
        <h2 class="italic">There are no bookmarks yet...</h2>
        <router-link v-bind:to="{ name: 'BookmarkAdd' }" class="button button--small mt-5">
          Add a bookmark
        </router-link>
      </div>
      <div v-else class="bookmark-list italic">
        <h2>Loading...</h2>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';
import BookmarkFilters from '@/components/bookmark/BookmarkFilters';
import BookmarkCard from '@/components/bookmark/BookmarkCard';
import Pagination from '@/components/common/Pagination';

export default {
  name: 'bookmarkListing',
  components: {
    Pagination,
    BookmarkFilters,
    BookmarkCard,
  },
  data() {
    return {
      bookmarks: undefined,
      bookmarksTotalCount: 1,
      pagination: {
        currentPage: 1,
        lastPage: undefined,
        perPage: 2,
      },
      activeCategories: [],
      activeTags: [],
    };
  },
  async mounted() {
    await this.getBookmarks();
    this.getNumberOfPages();
  },
  methods: {
    async getBookmarks() {
      const response = await BookmarksService.fetchBookmarks({
        page: this.pagination.currentPage,
        limit: this.pagination.perPage,
        categories: this.activeCategories,
        tags: this.activeTags,
      });

      this.bookmarks = response.data.bookmarks;
      this.bookmarksTotalCount = response.data.count;
    },
    async deleteBookmark(id) {
      await BookmarksService.deleteBookmark(id);
      this.getBookmarks();
      this.$router.push({
        name: 'Bookmarks',
      });
    },
    changePage(page) {
      this.pagination.currentPage = page;
      this.getBookmarks();
    },
    async updateFilters(categories, tags) {
      this.activeCategories = categories;
      this.activeTags = tags;
      this.currentPage = 1;
      await this.getBookmarks();
      this.getNumberOfPages();
    },
    getNumberOfPages() {
      const numberOfPages = Math.ceil(this.bookmarksTotalCount / this.pagination.perPage);
      this.pagination.lastPage = numberOfPages >= 1 ? numberOfPages : 1;
    },
  },
};
</script>

<style lang="scss">
.bookmark-list {
  width: 75%;
}
</style>
