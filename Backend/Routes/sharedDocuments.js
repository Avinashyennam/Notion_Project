const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const shareCtrl = require('../controllers/shareController');

router.post('/:documentId/share', shareCtrl.shareDocument);
router.get('/:documentId/shared-users', shareCtrl.getSharedUsers);

module.exports = router;
