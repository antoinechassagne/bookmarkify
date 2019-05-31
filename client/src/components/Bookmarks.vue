<template>
  <div class="bookmark-page">
    <h1>
      Bookmarks
    </h1>
    <div v-if="bookmarks.length > 0" class="bookmarks-list">
      <h2>
        Check all your bookmarks
      </h2>
      <h4>
        Filter your bookmarks by categories
      </h4>
      <fieldset v-if="allCategories.length > 0">
        <legend>
          Filter your bookmarks by categories
        </legend>
        <div v-for="(category, index) in allCategories" v-bind:key="index">
          <input type="checkbox" name="category" v-bind:value="category"
                 v-bind:id="`category-${index}`" v-on:change="getBookmarks(`category-${index}`)">
          <label v-bind:for="`category-${index}`">
            {{ category }}
          </label>
        </div>
      </fieldset>
      <fieldset v-if="allTags.length > 0">
        <legend>
          Filter your bookmarks by tags
        </legend>
        <div v-for="(tag, index) in allTags" v-bind:key="index">
          <input type="checkbox" name="tag" v-bind:value="tag"
                 v-bind:id="`tag-${index}`" v-on:change="getBookmarks(`tag-${index}`)">
          <label v-bind:for="`tag-${index}`">
            {{ tag }}
          </label>
        </div>
      </fieldset>
      <div v-for="(bookmark, index) in bookmarks" v-bind:key="index" class="bookmark">
        <h3>
          {{ bookmark.title }}
        </h3>
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
      allCategories: [],
      allTags: [],
      activeTags: [],
      activeFilters: [],
      page: 1,
      limit: 4,
    };
  },
  mounted() {
    this.getBookmarks();
  },
  methods: {
    async getBookmarks() {
      const response = await BookmarksService.fetchBookmarks({
        page: this.page,
        limit: this.limit,
      });
      this.bookmarks = response.data.bookmarks;
      this.getCategories();
      this.getTags();
    },
    async deleteBookmark(id) {
      await BookmarksService.deleteBookmark(id);
      this.getBookmarks();
      this.$router.push({
        name: 'Bookmarks',
      });
    },
    getCategories() {
      this.bookmarks.forEach((bookmark) => {
        if (bookmark.categories !== undefined) {
          bookmark.categories.forEach((category) => {
            this.allCategories.push(category.name);
          });
        }
        // Remove duplicates
        this.allCategories = [...new Set(this.allCategories)];
      });
    },
    getTags() {
      this.bookmarks.forEach((bookmark) => {
        if (bookmark.tags !== undefined) {
          bookmark.tags.forEach((tag) => {
            this.allTags.push(tag.name);
          });
        }
        // Remove duplicates
        this.allTags = [...new Set(this.allTags)];
      });
    },
  },
};
</script>
