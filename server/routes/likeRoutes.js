const express = require('express');
const { like, unlike, getLikes, getLike } = require('../controllers/likeController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id/like', authenticateToken, like);
router.delete('/:id/unlike', authenticateToken, unlike);
router.get('/:id/like', authenticateToken, getLike);
router.get('/:id/likes', getLikes);

module.exports = router;
