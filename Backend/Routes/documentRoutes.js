// routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const docCtrl = require('../controllers/documentController');
const checkPermission = require('../middleware/checkPermission');

router.post('/', auth, docCtrl.createDocument);
router.get('/:id', auth, checkPermission('view'), docCtrl.getDocumentById);
router.put('/:id', auth, checkPermission('edit'), docCtrl.updateDocument);
router.delete('/:id', auth, docCtrl.deleteDocument);
router.get('/user/me', auth, docCtrl.getDocumentsByUser);

module.exports = router;
