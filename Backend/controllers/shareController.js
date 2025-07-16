const SharedDocument = require('../models/SharedDocument');
const Document = require('../models/Document');
const User = require('../models/User');

// Share a document with a user
exports.shareDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { email, permission } = req.body;

    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ error: 'Document not found' });

    if (!document.owner.equals(req.user._id)) {
      return res.status(403).json({ error: 'You are not the owner of this document' });
    }

    const targetUser = await User.findOne({ email });
    if (!targetUser) return res.status(404).json({ error: 'User to share with not found' });

    const existingShare = await SharedDocument.findOne({
      document: documentId,
      sharedWith: targetUser._id,
    });

    if (existingShare) {
      existingShare.permission = permission;
      await existingShare.save();
    } else {
      await SharedDocument.create({
        document: documentId,
        sharedWith: targetUser._id,
        permission,
      });
    }

    res.status(200).json({ message: `Document shared with ${email}` });
  } catch (err) {
    console.error('Error sharing document:', err);
    res.status(500).json({ error: 'Failed to share document' });
  }
};

// Get all users document is shared with
exports.getSharedUsers = async (req, res) => {
  try {
    const { documentId } = req.params;

    const shares = await SharedDocument.find({ document: documentId }).populate('sharedWith', 'name email');
    res.status(200).json(shares);
  } catch (err) {
    console.error('Error fetching shared users:', err);
    res.status(500).json({ error: 'Failed to fetch shared users' });
  }
};
