const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark');

// Routes

router.post('/create', bookmarkController.create);

router.get('/bookmarks', bookmarkController.fetchAll);

router.get('/:id', bookmarkController.fetchSingle);

router.put('/:id/update', bookmarkController.update);

router.delete('/:id/delete', bookmarkController.delete);

module.exports = router;