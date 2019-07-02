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
      <div v-if="categories.length > 0">
        <span>Categories</span>
        <ul>
          <li v-for="(category, index) in categories" v-bind:key="index">
            <span>{{ category }}</span>
            <button class="button" @click="removeCategory(index)">
              -
            </button>
          </li>
        </ul>
        <input type="text" name="category" placeholder="Categories"
               v-model="currentCategory" v-on:keyup.enter="addCategory">
        <button class="button" @click="addCategory">
          +
        </button>
      </div>
      <div v-if="tags.length > 0">
        <span>Tags</span>
        <ul>
          <li v-for="(tag, index) in tags" v-bind:key="index">
            <span>#{{ tag }}</span>
            <button class="button" @click="removeTag(index)">
              -
            </button>
          </li>
        </ul>
        <input type="text" name="tag" placeholder="Tags" v-model="currentTag"
               v-on:keyup.enter="addTag">
        <button class="button" @click="addTag">
          +
        </button>
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
  name: 'BookmarkEdit',
  data() {
    return {
      url: '',
      title: '',
      description: '',
      categories: [],
      tags: [],
      currentCategory: '',
      currentTag: '',
    };
  },
  mounted() {
    this.getBookmark();
  },
  methods: {
    addCategory() {
      const category = this.currentCategory.charAt(0).toUpperCase() +
        this.currentCategory.slice(1).toLowerCase();
      this.categories.push(category);
      this.currentCategory = '';
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    },
    addTag() {
      const tag = this.currentTag.toLowerCase();
      this.tags.push(tag);
      this.currentTag = '';
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    async getBookmark() {
      const response = await BookmarksService.fetchSingleBookmark({
        id: this.$route.params.id,
      });
      this.url = response.data.bookmark.url;
      this.title = response.data.bookmark.title;
      this.description = response.data.bookmark.description;
      if (response.data.bookmark.categories !== undefined) {
        response.data.bookmark.categories.forEach(el => this.categories.push(el.name));
      } else {
        this.categories = [];
      }
      if (response.data.bookmark.tags !== undefined) {
        response.data.bookmark.tags.forEach(el => this.tags.push(el.name));
      } else {
        this.tags = [];
      }
    },
    async editBookmark() {
      await BookmarksService.editBookmark({
        id: this.$route.params.id,
        url: this.url,
        title: this.title,
        description: this.description,
        categories: this.categories.length > 0 ? this.categories : undefined,
        tags: this.tags.length > 0 ? this.tags : undefined,
      });

      this.$router.push({ name: 'BookmarkListing' });
    },
  },
};
</script>
