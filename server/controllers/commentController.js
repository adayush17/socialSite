const { commentOnPost, deleteComment, getCommentsForPost } = require('../models/commentModel');

// Comment on a post
const comment = async (req, res) => {
  const postId = req.params.id;
  const { content, userId } = req.body;
  try {
    const result = await commentOnPost(postId, userId, content);
    res.status(200).json(result.rows[0]);
  } catch (error) {
     console.error("Error commenting on post:", error);
    res.status(500).json({ message: 'Error commenting on post' });
  }
};

// Delete a comment
const removeComment = async (req, res) => {
  const commentId = req.params.id; 

  try {
    const result = await deleteComment(commentId);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

// Get comments for a post
const getComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await getCommentsForPost(postId);
    res.status(200).json(comments.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

module.exports = { comment, removeComment, getComments };
