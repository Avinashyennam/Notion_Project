import express from 'express';
const router = express.Router({ mergeParams: true });
// const auth = require('../middleware/auth');
import {deleteComment, getComments, createComment} from'../controllers/commentController.js';

// Create comment on document
router.post('/', createComment);

// Get all comments for a document
router.get('/', getComments);

// Delete a comment (auth required, must be author or document owner)
router.delete('/:commentId', deleteComment);

export default router;
