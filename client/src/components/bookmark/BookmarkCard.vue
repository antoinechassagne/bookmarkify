<template>
  <div class="card mb-30">
    <div class="card__header mb-10">
      <h3 class="title-small">
        {{ bookmark.title }}
      </h3>
      <router-link v-bind:to="{ name: 'BookmarkEdit', params: { id: bookmark._id } }"
                   class="button button--small button--empty">
        Edit
      </router-link>
    </div>
    <ul v-if="bookmark.categories.length > 0" class="mb-30">
      <li v-for="(category, index) in bookmark.categories"
          v-bind:key="index"
          class="card__category">
        {{ category.name }}
      </li>
    </ul>
    <p>
      {{ bookmark.description }}
    </p>
    <ul v-if="bookmark.tags.length > 0"
        class="mt-20">
      <li v-for="(tag, index) in bookmark.tags" v-bind:key="index"
          class="card__tag">
        #{{ tag.name }}
      </li>
    </ul>
    <a v-bind:href="`//${bookmark.url}`"
       class="button button--medium mt-20" target="_blank">
      Visit now
    </a>
  </div>
</template>

<script>
export default {
  name: 'BookmarkCard',
  props: ['bookmark'],
};
</script>
