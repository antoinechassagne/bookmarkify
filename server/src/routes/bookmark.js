const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark');

// Routes

router.post('/bookmarks/add', bookmarkController.create);

router.get('/bookmarks', bookmarkController.fetchAll);

router.get('bookmarks/:id', bookmarkController.fetchSingle);

router.put('bookmarks/:id/update', bookmarkController.update);

router.delete('bookmarks/:id/delete', bookmarkController.delete);

module.exports = router;