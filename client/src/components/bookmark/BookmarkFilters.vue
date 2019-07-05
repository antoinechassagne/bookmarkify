<template v-if="bookmarks">
  <aside class="filters">
    <fieldset v-if="allCategories.length > 0" class="mb-5">
      <legend class="font-bold mb-2">
        Categories
      </legend>
      <div v-for="(category, index) in allCategories" v-bind:key="index">
        <input type="checkbox" name="category" id="`category-${index}`"
               v-bind:value="category"
               v-model="activeCategories"
               @change="updateFilters(activeCategories, activeTags)">
        <label for="`category-${index}`" class="ml-2">
          {{ category }}
        </label>
      </div>
    </fieldset>
    <fieldset v-if="allTags.length > 0" class="mb-10">
      <legend class="font-bold mb-2">
        Tags
      </legend>
      <div v-for="(tag, index) in allTags" v-bind:key="index">
        <input type="checkbox" name="tag" id="`tag-${index}`"
               v-bind:value="tag" v-model="activeTags"
               @change="updateFilters(activeCategories, activeTags)">
        <label for="`tag-${index}`" class="ml-2">
          {{ tag }}
        </label>
      </div>
    </fieldset>
    <a href="#" class="button button--small"
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
