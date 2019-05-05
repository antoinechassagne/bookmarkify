const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark');

// Routes

router.post('/bookmarks/add', bookmarkController.create);

router.get('/bookmarks', bookmarkController.fetchAll);

router.get('/bookmarks/:id', bookmarkController.fetchSingle);

router.put('/bookmarks/edit/:id', bookmarkController.update);

router.delete('/bookmarks/delete/:id', bookmarkController.delete);

module.exports = router;