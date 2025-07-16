import Document from '../models/Document.js';

// Create a new document
const createDocument = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;
    const ownerId = req.user._id; // assumes you're using auth middleware that sets req.user

    const doc = new Document({
      title,
      content,
      isPublic,
      owner: ownerId,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error('Error creating document:', err);
    res.status(500).json({ error: 'Failed to create document' });
  }
};

// Get a document by ID
const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findById(id).populate('owner', 'name email');

    if (!doc) return res.status(404).json({ error: 'Document not found' });

    // Add permission check if needed here
    res.status(200).json(doc);
  } catch (err) {
    console.error('Error fetching document:', err);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
};

// Update a document
const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isPublic } = req.body;

    const doc = await Document.findById(id);

    if (!doc) return res.status(404).json({ error: 'Document not found' });

    if (!doc.owner.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized to update this document' });
    }

    const oldSnapshot = {
      title: doc.title,
      content: doc.content,
      isPublic: doc.isPublic,
    };

    doc.title = title || doc.title;
    doc.content = content || doc.content;
    doc.isPublic = isPublic !== undefined ? isPublic : doc.isPublic;

    await doc.save();

    // Save to history
    await DocumentHistory.create({
      document: doc._id,
      changedBy: req.user._id,
      changeType: 'edit',
      contentSnapshot: oldSnapshot, // optional: only content if preferred
    });

    res.status(200).json(doc);
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).json({ error: 'Failed to update document' });
  }
};

// Delete a document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);

    if (!doc) return res.status(404).json({ error: 'Document not found' });

    if (!doc.owner.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized to delete this document' });
    }

    await doc.remove();
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};

// Get all documents for a user
const getDocumentsByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const docs = await Document.find({ owner: userId });
    res.status(200).json(docs);
  } catch (err) {
    console.error('Error fetching user documents:', err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

export {getDocumentsByUser, deleteDocument, updateDocument, getDocumentById, createDocument}