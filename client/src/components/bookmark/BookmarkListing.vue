<template>
  <div class="bookmark-page">
    <h1 class="text-3xl mb-10">My bookmarks</h1>
    <div class="flex">
      <BookmarkFilters
        v-on:updateFilters="updateFilters">
      </BookmarkFilters>
      <div v-if="bookmarks !== undefined && bookmarks.length > 0" class="bookmark-list">
        <div v-if="bookmarksTotalCount > 0">
          {{ bookmarksTotalCount }} results found
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
          <router-link v-bind:to="{ name: 'BookmarkEdit', params: { id: bookmark._id } }">
            Edit
          </router-link>
          <a href="#" @click="deleteBookmark(bookmark._id)">Delete</a>
        </div>
        <router-link v-bind:to="{ name: 'BookmarkAdd' }" class="button">Add Post</router-link>
        <pagination
          :pagination="pagination"
          v-on:changePage="changePage">
        </pagination>
      </div>
      <div v-else-if="bookmarks !== undefined && bookmarks.length <= 0" class="bookmark-list">
        <h2>There are no bookmarks yet...</h2>
        <router-link v-bind:to="{ name: 'BookmarkAdd' }" class="button">Add Post</router-link>
      </div>
      <div v-else class="bookmark-list">
        <h2>Loading...</h2>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';
import BookmarkFilters from '@/components/bookmark/BookmarkFilters';
import Pagination from '@/components/common/Pagination';

export default {
  name: 'bookmarkListing',
  components: {
    Pagination,
    BookmarkFilters,
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
