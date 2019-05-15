<template>
  <div class="bookmark-page">
    <h1>
      Bookmarks
    </h1>
    <div v-if="bookmarks.length > 0" class="bookmarks-list">
      <h2>
        Check all your bookmarks
      </h2>
      <div v-for="(bookmark, index) in bookmarks" v-bind:key="index" class="bookmark">
        <h3>
          {{ bookmark.title }}
        </h3>
        <p>
          {{ bookmark.description }}
        </p>
        <a v-bind:href="'//' + bookmark.url">
          {{ bookmark.url }}
        </a>
        <router-link v-bind:to="{ name: 'EditBookmark', params: { id: bookmark._id } }">
          Edit
        </router-link>
        <a href="#" @click="deleteBookmark(bookmark._id)">
          Delete
        </a>
      </div>
    </div>
    <div v-else>
      <h2>
        There are no bookmarks yet...
      </h2>
    </div>
    <router-link v-bind:to="{ name: 'AddBookmark' }" class="button">
      Add Post
    </router-link>
  </div>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';

export default {
  name: 'bookmarks',
  data() {
    return {
      bookmarks: [],
    };
  },
  mounted() {
    this.getBookmarks();
  },
  methods: {
    async getBookmarks() {
      const response = await BookmarksService.fetchBookmarks();
      this.bookmarks = response.data.bookmarks;
    },
    async deleteBookmark(id) {
      await BookmarksService.deleteBookmark(id);
      this.getBookmarks();
      this.$router.push({
        name: 'Bookmarks',
      });
    },
  },
};
</script>
