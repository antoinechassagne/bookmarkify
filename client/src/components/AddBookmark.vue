<template>
  <div class="add-bookmark-page">
    <h1>
      Add a new bookmark
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
        <button class="button" @click="addBookmark">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';

export default {
  name: 'AddBookmark',
  data() {
    return {
      title: '',
      description: '',
      url: '',
    };
  },
  methods: {
    async addBookmark() {
      await BookmarksService.addBookmark({
        title: this.title,
        description: this.description,
        url: this.url,
      });
      this.$router.push({ name: 'Bookmarks' });
    },
  },
};
</script>
