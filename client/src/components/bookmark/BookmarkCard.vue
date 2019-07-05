<template>
  <div class="card mb-5">
    <h3 class="text-xl font-bold">
      {{ bookmark.title }}
    </h3>
    <ul v-if="bookmark.categories.length > 0" class="mb-5">
      <li v-for="(category, index) in bookmark.categories" v-bind:key="index"
          class="card__category uppercase text-sm text-gray-500 inline-block">
        {{ category.name }}
      </li>
    </ul>
    <p>
      {{ bookmark.description }}
    </p>
    <ul v-if="bookmark.tags.length > 0"
        class="card__tags">
      <li v-for="(tag, index) in bookmark.tags" v-bind:key="index"
          class="text-sm text-gray-500 inline-block pr-2">
        #{{ tag.name }}
      </li>
    </ul>
    <router-link
      v-bind:to="{ name: 'BookmarkEdit', params: { id: bookmark._id } }"
      ref="editButton"
      class="card__edit button button--xsmall button--empty mt-5">
      Edit
    </router-link>
    <div class="flex justify-end">
      <a v-bind:href="bookmark.url"
         class="card__button button button--small" target="_blank">
        Visit now
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookmarkCard',
  props: ['bookmark'],
};
</script>
