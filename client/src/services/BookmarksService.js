import Api from '@/services/Api'

export default {
  fetchBookmarks () {
    return Api().get('bookmarks')
  },

  addBookmark (params) {
    return Api().post('bookmarks/add', params)
  }
}
