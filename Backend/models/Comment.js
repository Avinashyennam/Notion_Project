// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  position: { type: mongoose.Schema.Types.Mixed }, // optional: block/paragraph/cursor
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
