import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/Home';
import Bookmarks from '@/components/bookmark/Bookmarks';
import AddBookmark from '@/components/bookmark/AddBookmark';
import EditBookmark from '@/components/bookmark/EditBookmark';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: Bookmarks,
    },
    {
      path: '/bookmarks/add',
      name: 'AddBookmark',
      component: AddBookmark,
    },
    {
      path: '/bookmarks/edit/:id',
      name: 'EditBookmark',
      component: EditBookmark,
    },
  ],
});
