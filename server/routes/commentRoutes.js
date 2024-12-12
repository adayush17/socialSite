const express = require('express');
const { comment, removeComment, getComments } = require('../controllers/commentController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/:id/comment", authenticateToken, comment);
router.delete('/comment/:id', authenticateToken, removeComment);
router.get('/:id/comments', getComments);

module.exports = router;
