const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const historyCtrl = require('../controllers/historyController');

// Get history of a document
router.get('/', historyCtrl.getDocumentHistory);
// Restore from history
router.post('/restore/:historyId', historyCtrl.restoreVersion);

module.exports = router;
