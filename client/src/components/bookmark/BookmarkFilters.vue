<template v-if="bookmarks">
  <div class="filters">
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
  </div>
</template>

<script>
export default {
  name: 'BookmarkFilters',
  props: ['bookmarks'],
  data() {
    return {
      allCategories: [],
      allTags: [],
      activeTags: [],
      activeCategories: [],
    };
  },
  mounted() {
    this.getCategories();
    this.getTags();
  },
  methods: {
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
