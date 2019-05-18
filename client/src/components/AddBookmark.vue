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
        <textarea rows="15" cols="15" placeholder="Description"
                  v-model="description">
        </textarea>
      </div>
      <div>
        <ul v-if="categories.length > 0">
          <li v-for="(category, index) in categories" v-bind:key="index">
            {{ category }}
          </li>
        </ul>
        <input type="text" name="category" placeholder="Categories"
               v-model="currentCategory" v-on:keyup.enter="addCategory">
        <button class="button" @click="addCategory">
          +
        </button>
      </div>
      <div>
        <ul v-if="tags.length > 0">
          <li v-for="(tag, index) in tags" v-bind:key="index">
            #{{ tag }}
          </li>
        </ul>
        <input type="text" name="tag" placeholder="Tags" v-model="currentTag"
               v-on:keyup.enter="addTag">
        <button class="button" @click="addTag">
          +
        </button>
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
      categories: [],
      tags: [],
      currentCategory: '',
      currentTag: '',
    };
  },
  methods: {
    addCategory() {
      const category = this.currentCategory.charAt(0).toUpperCase() +
        this.currentCategory.slice(1).toLowerCase();
      this.categories.push(category);
      this.currentCategory = '';
    },
    addTag() {
      const tag = this.currentTag.toLowerCase();
      this.tags.push(tag);
      this.currentTag = '';
    },
    async addBookmark() {
      await BookmarksService.addBookmark({
        title: this.title,
        description: this.description,
        url: this.url,
        categories: this.categories.length > 0 ? this.categories : undefined,
        tags: this.tags.length > 0 ? this.tags : undefined,
      });
      this.$router.push({ name: 'Bookmarks' });
    },
  },
};
</script>
