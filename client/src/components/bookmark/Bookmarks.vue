<template>
  <div class="bookmark-page">
    <h1>Bookmarks</h1>
    <div v-if="bookmarks !== undefined && bookmarks.length > 0" class="bookmark-list">
      <h2>Check all your bookmarks</h2>
      <BookmarkFilters
        :bookmarks="bookmarks"
        v-on:updateFilters="updateFilters(id)">
      </BookmarkFilters>
      <div v-if="bookmarksTotalCount > 0">
        {{ bookmarks.length }} sur {{ bookmarksTotalCount }} results displayed
      </div>
      <div v-for="(bookmark, index) in bookmarks" v-bind:key="index" class="bookmark">
        <h3>{{ bookmark.title }}</h3>
        <div v-if="bookmark.categories.length > 0">
          <span>Categories</span>
          <ul>
            <li v-for="(category, index) in bookmark.categories" v-bind:key="index">
              {{ category.name }}
            </li>
          </ul>
        </div>
        <div v-if="bookmark.tags.length > 0">
          <span>Tags</span>
          <ul>
            <li v-for="(tag, index) in bookmark.tags" v-bind:key="index">
              #{{ tag.name }}
            </li>
          </ul>
        </div>
        <p>{{ bookmark.description }}</p>
        <a v-bind:href="'//' + bookmark.url">{{ bookmark.url }}</a>
        <router-link v-bind:to="{ name: 'EditBookmark', params: { id: bookmark._id } }">
          Edit
        </router-link>
        <a href="#" @click="deleteBookmark(bookmark._id)">Delete</a>
      </div>
      <pagination
        :pagination="pagination"
        v-on:changePage="changePage">
      </pagination>
    </div>
    <div v-else-if="bookmarks !== undefined && bookmarks.length <= 0">
      <h2>There are no bookmarks yet...</h2>
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div>
    <router-link v-bind:to="{ name: 'AddBookmark' }" class="button">Add Post</router-link>
  </div>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';
import BookmarkFilters from '@/components/bookmark/BookmarkFilters';
import Pagination from '@/components/pagination/Pagination';

export default {
  name: 'bookmarks',
  components: {
    Pagination,
    BookmarkFilters,
  },
  data() {
    return {
      bookmarks: undefined,
      bookmarksTotalCount: undefined,
      pagination: {
        currentPage: 1,
        lastPage: undefined,
        perPage: 2,
      },
    };
  },
  async mounted() {
    await this.getBookmarks();
    await this.getNumberOfPages();
  },
  methods: {
    async getBookmarks() {
      const response = await BookmarksService.fetchBookmarks({
        page: this.currentPage,
        limit: this.pagination.perPage,
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
      this.currentPage = page;
      this.getBookmarks();
    },
    updateFilters(id) {
      // eslint-disable-next-line
      console.log(id);
    },
    getNumberOfPages() {
      const numberOfPages = Math.ceil(this.bookmarksTotalCount / this.pagination.perPage);
      this.pagination.lastPage = numberOfPages >= 1 ? numberOfPages : 1;
    },
  },
};
</script>
