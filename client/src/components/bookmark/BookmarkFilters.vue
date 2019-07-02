<template v-if="bookmarks">
  <aside class="filters">
    <fieldset v-if="allCategories.length > 0">
      <legend class="font-bold">
        Filter your bookmarks by categories
      </legend>
      <div v-for="(category, index) in allCategories" v-bind:key="index">
        <input type="checkbox" name="category" v-bind:value="category" v-model="activeCategories"
               v-bind:id="`category-${index}`">
        <label v-bind:for="`category-${index}`">
          {{ category }}
        </label>
      </div>
    </fieldset>
    <fieldset v-if="allTags.length > 0">
      <legend class="font-bold">
        Filter your bookmarks by tags
      </legend>
      <div v-for="(tag, index) in allTags" v-bind:key="index">
        <input type="checkbox" name="tag" v-bind:value="tag" v-model="activeTags"
               v-bind:id="`tag-${index}`">
        <label v-bind:for="`tag-${index}`">
          {{ tag }}
        </label>
      </div>
    </fieldset>
    <a href="#"
       @click="updateFilters(activeCategories, activeTags)">
      Apply
    </a>
    <a href="#"
       @click="resetFilters()">
      Reset
    </a>
  </aside>
</template>

<script>
import BookmarksService from '@/services/BookmarksService';

export default {
  name: 'BookmarkFilters',
  data() {
    return {
      allCategories: [],
      allTags: [],
      activeCategories: [],
      activeTags: [],
    };
  },
  async mounted() {
    await this.getFilters();
  },
  methods: {
    async getFilters() {
      const response = await BookmarksService.fetchFilters();
      this.allCategories = response.data.categories;
      this.allTags = response.data.tags;
    },
    updateFilters(categories, tags) {
      this.$emit('updateFilters', categories, tags);
    },
    resetFilters() {
      this.activeCategories = [];
      this.activeTags = [];
      this.updateFilters(this.activeCategories, this.activeTags);
    },
  },
};
</script>

<style lang="scss">
  .filters {
    width: 25%;
  }
</style>
