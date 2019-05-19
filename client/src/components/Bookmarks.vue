<template>
  <div class="bookmark-page">
    <h1>
      Bookmarks
    </h1>
    <div v-if="allBookmarks.length > 0" class="bookmarks-list">
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
                 v-bind:id="`category-${index}`" v-on:change="updateFilters(`category-${index}`)">
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
                 v-bind:id="`tag-${index}`" v-on:change="updateFilters(`tag-${index}`)">
          <label v-bind:for="`tag-${index}`">
            {{ tag }}
          </label>
        </div>
      </fieldset>
      <div v-for="(bookmark, index) in displayedBookmarks" v-bind:key="index" class="bookmark">
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
      allBookmarks: [],
      displayedBookmarks: [],
      allCategories: [],
      allTags: [],
      categoriesFilter: [],
      tagsFilter: [],
    };
  },
  mounted() {
    this.getBookmarks();
  },
  methods: {
    async getBookmarks() {
      const response = await BookmarksService.fetchBookmarks();
      this.allBookmarks = response.data.bookmarks;
      this.displayedBookmarks = this.allBookmarks;
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
    updateFilters(id) {
      console.log(this.categoriesFilter);
      console.log(this.tagsFilter);
      const checkbox = document.querySelector(`#${id}`);
      const value = checkbox.value;
      const type = checkbox.name;
      if (checkbox.checked) {
        if (type === 'category') {
          this.categoriesFilter.push(value);
        } else if (type === 'tag') {
          this.tagsFilter.push(value);
        }
      } else if (!checkbox.checked) {
        if (type === 'category') {
          const index = this.categoriesFilter.indexOf(value);
          if (index > -1) {
            this.categoriesFilter.splice(index, 1);
          }
        } else if (type === 'tag') {
          const index = this.tagsFilter.indexOf(value);
          if (index > -1) {
            this.tagsFilter.splice(index, 1);
          }
        }
      }
      this.updateDisplayedBookmarks();
    },
    updateDisplayedBookmarks() {
      this.allBookmarks.forEach((bookmark) => {
        const bookmarkCategories = [];
        const bookmarkTags = [];
        bookmark.categories.forEach((category) => {
          bookmarkCategories.push(category.name);
        });
        bookmark.tags.forEach((tag) => {
          bookmarkTags.push(tag.name);
        });
        const categories = [this.categoriesFilter, bookmarkCategories];
        const tags = [this.tagsFilter, bookmarkTags];
        const commonCategory = categories.shift().filter(v =>
          categories.every(a =>
            a.indexOf(v) !== -1));
        const commonTag = tags.shift().filter(v =>
          categories.every(a =>
            a.indexOf(v) !== -1));
        if (commonCategory.length > 0 && commonTag.length > 0) {
          if (!this.displayedBookmarks.includes(bookmark)) {
            this.displayedBookmarks.push(bookmark);
          }
        } else if (commonCategory.length === 0 || commonTag.length === 0) {
          const index = this.displayedBookmarks.indexOf(bookmark);
          this.displayedBookmarks.splice(index, 1);
        }
      });
    },
    getCategories() {
      this.allBookmarks.forEach((bookmark) => {
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
      this.allBookmarks.forEach((bookmark) => {
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
