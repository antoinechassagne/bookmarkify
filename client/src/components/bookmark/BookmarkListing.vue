<template>
  <div class="bookmarks-page">
    <div class="subheader mb-30">
      <h1 class="title-medium">
        My bookmarks
      </h1>
      <router-link v-bind:to="{ name: 'BookmarkAdd' }" class="button">
        Add a bookmark
      </router-link>
    </div>
    <div class="wrapper">
      <BookmarkFilters
        v-on:updateFilters="updateFilters">
      </BookmarkFilters>
      <main v-if="bookmarks !== undefined && bookmarks.length > 0" class="bookmarks-list">
        <div v-if="bookmarksTotalCount > 0" class="bookmarks-list__count mb-30">
          {{ bookmarksTotalCount }} bookmarks found
        </div>
        <BookmarkCard v-for="(bookmark, index) in bookmarks" v-bind:key="index"
                      :bookmark="bookmark">
        </BookmarkCard>
        <pagination :pagination="pagination" v-on:changePage="changePage" class="mt-10">
        </pagination>
      </main>
      <main v-else-if="bookmarks !== undefined && bookmarks.length <= 0"
            class=" bookmarks-list bookmarks-list--center">
        <h2 class="mb-20">
          There are no bookmarks yet...
        </h2>
        <router-link v-bind:to="{ name: 'BookmarkAdd' }" class="button button--medium mt-5">
          Add one now
        </router-link>
      </main>
      <main v-else class="bookmarks-list bookmarks-list--center">
        <Loader></Loader>
      </main>
    </div>
  </div>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';
import BookmarkFilters from '@/components/bookmark/BookmarkFilters';
import BookmarkCard from '@/components/bookmark/BookmarkCard';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';

export default {
  name: 'bookmarkListing',
  components: {
    Pagination,
    Loader,
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
        perPage: 5,
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
      this.pagination.currentPage = 1;
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
  .wrapper {
    display: flex;
  }
  .bookmarks-list {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    width: 50%;
    &__count {
      font-style: italic;
    }
    &--center {
      align-items: center;
      justify-content: center;
    }
  }
</style>