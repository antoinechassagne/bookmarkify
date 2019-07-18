<template v-if="bookmarks">
  <aside class="filters">
    <fieldset v-if="allCategories.length > 0" class="mb-20">
      <legend>Categories</legend>
      <div v-for="(category, index) in allCategories" v-bind:key="index">
        <input type="checkbox"
               name="category"
               v-model="activeCategories"
               :id="`category-${index}`"
               :value="category"
               @change="updateFilters(activeCategories, activeTags)">
        <label :for="`category-${index}`">
          {{ category }}
        </label>
      </div>
    </fieldset>
    <fieldset v-if="allTags.length > 0" class="mb-10">
      <legend>Tags</legend>
      <div v-for="(tag, index) in allTags" v-bind:key="index">
        <input type="checkbox"
               name="tag"
               v-model="activeTags"
               :id="`tag-${index}`"
               :value="tag"
               @change="updateFilters(activeCategories, activeTags)">
        <label :for="`tag-${index}`">
          {{ tag }}
        </label>
      </div>
    </fieldset>
    <button class="button button--medium mt-20" @click="resetFilters()">Reset</button>
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
  legend {
    font-weight: 900;
    margin-bottom: 10px;
  }
</style>
