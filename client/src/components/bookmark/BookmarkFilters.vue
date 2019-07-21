<template v-if="bookmarks">
  <aside>
    <button class="sidebar__toggle button button--icon mb-20" @click="toggleFilters">
      <svg role="img" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px"
           viewBox="0 0 24 24" aria-labelledby="controlsIconTitle" stroke-width="1"
           stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6">
        <path d="M17 18L17 6M12 18L12 6M7 18L7 6M5 8L9 8M10 16L14 16M15 12L19 12"/>
      </svg>
    </button>
    <div class="filters" ref="filters">
      <div class="filters__checkboxes">
        <fieldset v-if="allCategories.length > 0" class="mb-20">
          <legend class="filters__legend">Categories</legend>
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
          <legend class="filters__legend">Tags</legend>
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
      </div>
      <button class="sidebar__toggle button button--medium mb-20" @click="toggleFilters">
        Apply
      </button>
      <button class="filters__reset button button--medium mt-20" @click="resetFilters()"
              ref="resetButton">
        Reset
      </button>
    </div>
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
    toggleFilters() {
      const filters = this.$refs.filters;
      const resetButton = this.$refs.resetButton;
      if (filters.classList.contains('filters--active')) {
        filters.classList.remove('filters--active');
        resetButton.classList.remove('filters__reset--active');
      } else {
        filters.classList.add('filters--active');
        resetButton.classList.add('filters__reset--active');
      }
    },
  },
};
</script>
