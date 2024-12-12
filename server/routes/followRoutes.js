const express = require('express');
const { follow, unfollow, getUserFollowers, getUserFollowing, getFollow } = require('../controllers/followController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id/follow', authenticateToken, follow);
router.delete('/:id/unfollow', authenticateToken, unfollow);
router.get('/:id/followers', getUserFollowers);
router.get('/following', authenticateToken, getUserFollowing);
router.get("/:id/follow", authenticateToken, getFollow);

module.exports = router;
