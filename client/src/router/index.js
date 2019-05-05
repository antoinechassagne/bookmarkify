import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Bookmarks from '@/components/Bookmarks'
import AddBookmark from '@/components/AddBookmark'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: Bookmarks
    }
  ]
})
