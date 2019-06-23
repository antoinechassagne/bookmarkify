import Api from '@/services/Api';

export default {
  fetchBookmarks(params) {
    return Api().post('bookmarks/', params);
  },

  fetchFilters() {
    return Api().get('bookmarks/');
  },

  fetchSingleBookmark(params) {
    return Api().get(`bookmarks/${params.id}`, params);
  },

  addBookmark(params) {
    return Api().post('bookmarks/add', params);
  },

  editBookmark(params) {
    return Api().put(`bookmarks/${params.id}`, params);
  },

  deleteBookmark(id) {
    return Api().delete(`bookmarks/${id}`);
  },
};
