const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark');

// Routes

router.post('/bookmarks/add', bookmarkController.create);

router.post('/bookmarks', bookmarkController.fetchAll);

router.get('/bookmarks/', bookmarkController.fetchFilters);

router.get('/bookmarks/:id', bookmarkController.fetchSingle);

router.put('/bookmarks/:id', bookmarkController.update);

router.delete('/bookmarks/:id', bookmarkController.delete);

module.exports = router;