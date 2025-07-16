import Comment from '../models/Comment.js';
import Document from '../models/Document.js';

// Create a comment
const createComment = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { text, position } = req.body;

    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ error: 'Document not found' });

    const comment = await Comment.create({
      text,
      position,
      document: documentId,
      author: req.user._id,
    });

    const populated = await comment.populate('author', 'name email');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Get all comments on a document
const getComments = async (req, res) => {
  try {
    const { documentId } = req.params;

    const comments = await Comment.find({ document: documentId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Delete a comment (by author or document owner)
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId).populate('document');
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const userId = req.user._id;
    const isOwner = comment.document.owner.equals(userId);
    const isAuthor = comment.author.equals(userId);

    if (!isOwner && !isAuthor) {
      return res.status(403).json({ error: 'Unauthorized to delete comment' });
    }

    await comment.deleteOne();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

export {deleteComment, getComments, createComment}