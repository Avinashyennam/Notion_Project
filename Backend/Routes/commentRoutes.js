const express = require('express');
const router = express.Router({ mergeParams: true });
// const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/commentController');

// Create comment on document
router.post('/', commentCtrl.createComment);

// Get all comments for a document
router.get('/', commentCtrl.getComments);

// Delete a comment (auth required, must be author or document owner)
router.delete('/:commentId', commentCtrl.deleteComment);

module.exports = router;
