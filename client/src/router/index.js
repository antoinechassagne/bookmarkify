import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import BookmarkAdd from '@/components/bookmark/BookmarkAdd';
import BookmarkEdit from '@/components/bookmark/BookmarkEdit';
import BookmarkListing from '@/components/bookmark/BookmarkListing';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/bookmarks',
      name: 'BookmarkListing',
      component: BookmarkListing,
    },
    {
      path: '/bookmarks/add',
      name: 'BookmarkAdd',
      component: BookmarkAdd,
    },
    {
      path: '/bookmarks/edit/:id',
      name: 'BookmarkEdit',
      component: BookmarkEdit,
    },
  ],
});
