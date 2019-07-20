<template>
  <div class="add-bookmark-page">
    <div class="subheader mb-30">
      <h1 class="title-medium">
        Add a new bookmark
      </h1>
    </div>
    <div class="form">
      <div class="mb-30">
        <label for="url" class="label mb-10">
          URL
        </label>
        <input type="text" name="url" placeholder="Enter an URL" v-model="url" id="url"
        class="input">
      </div>
      <div class="mb-30">
        <label for="title" class="label mb-10">
          Title
        </label>
        <input type="text" name="title" placeholder="Enter a title" v-model="title" id="title"
        class="input">
      </div>
      <div class="mb-30">
        <label for="description" class="label mb-10">
          Description
        </label>
        <textarea rows="5" placeholder="Enter a description" v-model="description"
                  id="description" class="input">
        </textarea>
      </div>
      <div class="flex flex-row wrap space-between">
        <div class="flex flex-column wrap mb-20">
          <div class="mb-20">
            <span class="label mb-30">
            Categories
            </span>
            <ul v-if="categories.length > 0">
              <li v-for="(category, index) in categories" v-bind:key="index"
                  class="flex flex-row wrap space-between mb-5">
                <span class="mr-5 card__category card__category--single">
                  {{ category }}
                </span>
                <button class="button button--round" @click="removeCategory(index)">
                  ×
                </button>
              </li>
            </ul>
          </div>
          <div class="flex flex-row vertical-center">
            <input type="text" name="category" placeholder="Add a new category"
                   v-model="currentCategory" v-on:keyup.enter="addCategory"
                   class="input input--small mr-5">
            <button class="button button--small" @click="addCategory">
              Add
            </button>
          </div>
        </div>
        <div class="flex flex-column wrap mb-20">
          <div class="mb-20">
            <span class="label mb-30">
              Tags
            </span>
            <ul v-if="tags.length > 0">
              <li v-for="(tag, index) in tags" v-bind:key="index"
                  class="flex flex-row wrap space-between mb-5">
              <span class="mr-5 card__tag">
                #{{ tag }}
              </span>
                <button class="button button--round" @click="removeTag(index)">
                  ×
                </button>
              </li>
            </ul>
          </div>
          <div class="flex flex-row vertical-center">
            <input type="text" name="tag" placeholder="Add a new tag" v-model="currentTag"
                   v-on:keyup.enter="addTag" class="input input--small mr-5">
            <button class="button button--small" @click="addTag">
              Add
            </button>
          </div>
        </div>
      </div>
      <button class="button button--medium mt-20" @click="addBookmark">
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
      if (this.currentCategory !== '') {
        const category = this.currentCategory.charAt(0).toUpperCase() +
          this.currentCategory.slice(1).toLowerCase();
        this.categories.push(category);
        this.currentCategory = '';
      }
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    },
    addTag() {
      if (this.currentTag !== '') {
        const tag = this.currentTag.toLowerCase();
        this.tags.push(tag);
        this.currentTag = '';
      }
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
    @media (max-width: 991px) {
      width: 100%;
      margin: 0;
    }
  }
</style>
