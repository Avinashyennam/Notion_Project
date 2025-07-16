// models/SharedDocument.js
const mongoose = require('mongoose');

const SharedDocumentSchema = new mongoose.Schema({
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  sharedWith: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permission: { type: String, enum: ['view', 'edit'], default: 'view' },
}, { timestamps: true });

module.exports = mongoose.model('SharedDocument', SharedDocumentSchema);
