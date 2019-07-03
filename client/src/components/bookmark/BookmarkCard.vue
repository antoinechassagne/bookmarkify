<template>
  <div class="card">
    <h3>{{ bookmark.title }}</h3>
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
    <p>{{ bookmark.description }}</p>
    <a v-bind:href="'//' + bookmark.url">{{ bookmark.url }}</a>
    <router-link v-bind:to="{ name: 'BookmarkEdit', params: { id: bookmark._id } }">
      Edit
    </router-link>
    <a href="#" @click="deleteBookmark(bookmark._id)">Delete</a>
  </div>
</template>

<script>
export default {
  name: 'BookmarkCard',
  props: ['bookmark'],
};
</script>
