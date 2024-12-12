const pool = require('../config/db');

const commentOnPost = async (postId, userId, content) => {
  const query = 'INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *';
  return await pool.query(query, [postId, userId, content]);
};

const deleteComment = async (commentId) => {
  const query = 'DELETE FROM comments WHERE id = $1 RETURNING *';
  return await pool.query(query, [commentId]);
};

const getCommentsForPost = async (postId) => {
  const query = 'SELECT * FROM comments WHERE post_id = $1';
  return await pool.query(query, [postId]);
};

module.exports = {
  commentOnPost,
  deleteComment,
  getCommentsForPost,
};
