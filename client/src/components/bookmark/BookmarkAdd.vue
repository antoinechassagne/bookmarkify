<template>
  <div class="add-bookmark-page">
    <h1 class="text-3xl mt-10 mb-10">
      Add a new bookmark
    </h1>
    <div class="form">
      <div class="mb-5">
        <label for="url" class="font-bold block mb-2">
          URL
        </label>
        <input type="text" name="url" placeholder="Enter an URL" v-model="url" id="url"
        class="input">
      </div>
      <div class="mb-5">
        <label for="title" class="font-bold block mb-2">
          Title
        </label>
        <input type="text" name="title" placeholder="Enter a title" v-model="title" id="title"
        class="input">
      </div>
      <div class="mb-5">
        <label for="description" class="font-bold block mb-2">
          Description
        </label>
        <textarea rows="5" placeholder="Enter a description" v-model="description"
                  id="description" class="input">
        </textarea>
      </div>
      <div class="flex">
        <div class="mb-5 mr-20">
        <span class="font-bold block mb-2">
          Categories
        </span>
          <ul v-if="categories.length > 0">
            <li v-for="(category, index) in categories" v-bind:key="index"
                class="mb-3 flex justify-between">
              <span class="mr-3">
                {{ category }}
              </span>
              <button class="button button--round" @click="removeCategory(index)">
                -
              </button>
            </li>
          </ul>
          <div class="flex items-center">
            <input type="text" name="category" placeholder="Add a new category"
                   v-model="currentCategory" v-on:keyup.enter="addCategory"
                   class="input input--small mr-3">
            <button class="button button--round" @click="addCategory">
              +
            </button>
          </div>
        </div>
        <div class="mb-5">
        <span class="font-bold block mb-2">
          Tags
        </span>
          <ul v-if="tags.length > 0">
            <li v-for="(tag, index) in tags" v-bind:key="index"
                class="mb-3 flex justify-between">
              <span class="mr-3">
                #{{ tag }}
              </span>
              <button class="button button--round" @click="removeTag(index)">
                -
              </button>
            </li>
          </ul>
          <div class="flex items-center">
            <input type="text" name="tag" placeholder="Add a new tag" v-model="currentTag"
                   v-on:keyup.enter="addTag" class="input input--small mr-3">
            <button class="button button--round" @click="addTag">
              +
            </button>
          </div>
        </div>
      </div>
      <button class="button button--small mt-10" @click="addBookmark">
        Create
      </button>
    </div>
  </div>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';

export default {
  name: 'BookmarkAdd',
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
    async addBookmark() {
      await BookmarksService.addBookmark({
        title: this.title,
        description: this.description,
        url: this.url,
        categories: this.categories.length > 0 ? this.categories : undefined,
        tags: this.tags.length > 0 ? this.tags : undefined,
      });
      this.$router.push({ name: 'BookmarkListing' });
    },
  },
};
</script>

<style lang="scss">
  .form {
    margin-left: 25%;
    width: 50%;
  }
</style>
