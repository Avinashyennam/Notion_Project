// middleware/checkPermission.js
const SharedDocument = require('../models/SharedDocument');
const Document = require('../models/Document');

const checkPermission = (requiredPermission = 'view') => {
  return async (req, res, next) => {
    const docId = req.params.id || req.params.documentId;

    const document = await Document.findById(docId);
    if (!document) return res.status(404).json({ error: 'Document not found' });

    const userId = req.user._id;

    if (document.owner.equals(userId)) {
      return next(); // full access for owner
    }

    const shared = await SharedDocument.findOne({
      document: docId,
      sharedWith: userId,
    });

    if (!shared) return res.status(403).json({ error: 'No access to this document' });

    if (requiredPermission === 'edit' && shared.permission !== 'edit') {
      return res.status(403).json({ error: 'Edit permission required' });
    }

    req.permission = shared.permission;
    next();
  };
};

module.exports = checkPermission;
