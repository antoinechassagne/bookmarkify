<template>
  <div class="bookmark-page">
    <h1>Bookmarks</h1>
    <h2>
      Check all your bookmarks
    </h2>
    <div v-if="bookmarks.length > 0" class="bookmarks-list">
      <div v-for="bookmark in bookmarks" class="bookmark">
        <h3>
          {{ bookmark.title }}
        </h3>
        </p>
        <p>
          {{ bookmark.description }}
        </p>
        <a v-bind:href="'//' + bookmark.url">
          {{ bookmark.url }}
        </a>
      </div>
    </div>
    <div v-else>
      <h2>
        There are no bookmarks yet...<br/>
      </h2>
    </div>
  </div>
</template>

<script>
  import BookmarksService from '@/services/BookmarksService'

  export default {
    name: 'bookmarks',
    data() {
      return {
        bookmarks: []
      }
    },
    mounted() {
      this.getBookmarks()
    },
    methods: {
      async getBookmarks() {
        const response = await BookmarksService.fetchBookmarks()
        this.bookmarks = response.data.bookmarks
      }
    }
  }
</script>
