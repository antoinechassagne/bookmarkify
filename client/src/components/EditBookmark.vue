<template>
  <div class="edit-bookmark-page">
    <h1>
      Edit a bookmark
    </h1>
    <div class="form">
      <div>
        <input type="text" name="url" placeholder="URL" v-model="url">
      </div>
      <div>
        <input type="text" name="title" placeholder="Title" v-model="title">
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="Description" v-model="description"></textarea>
      </div>
      <div>
        <button class="button" @click="editBookmark">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';

export default {
  name: 'EditBookmark',
  data() {
    return {
      url: '',
      title: '',
      description: '',
    };
  },
  mounted() {
    this.getBookmark();
  },
  methods: {
    async getBookmark() {
      const response = await BookmarksService.fetchSingleBookmark({
        id: this.$route.params.id,
      });

      this.url = response.data.bookmark.url;
      this.title = response.data.bookmark.title;
      this.description = response.data.bookmark.description;
    },
    async editBookmark() {
      await BookmarksService.editBookmark({
        id: this.$route.params.id,
        url: this.url,
        title: this.title,
        description: this.description,
      });

      this.$router.push({ name: 'Bookmarks' });
    },
  },
};
</script>
