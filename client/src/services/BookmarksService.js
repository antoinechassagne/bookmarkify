import Api from '@/services/Api'

export default {
  fetchBookmarks () {
    return Api().get('bookmarks')
  },

  fetchSingleBookmark (params) {
    return Api().get(`bookmarks/${params.id}`, params)
  },

  addBookmark (params) {
    return Api().post('bookmarks/add', params)
  },

  editBookmark (params) {
    return Api().put(`bookmarks/edit/${params.id}`, params)
  }
}
