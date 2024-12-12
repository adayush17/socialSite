const pool = require('../config/db');

const createPost = async (userId, content, imageUrl) => {
  const query = 'INSERT INTO posts (user_id, content, image_url) VALUES ($1, $2, $3) RETURNING *';
  const values = [userId, content, imageUrl];
  return await pool.query(query, values);
};

const updatePost = async (postId, content, imageUrl) => {
  const query = 'UPDATE posts SET content = $1, image_url = $2 WHERE id = $3 RETURNING *';
  const values = [content, imageUrl, postId];
  return await pool.query(query, values);
};

const deletePost = async (postId) => {
  const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
  return await pool.query(query, [postId]);
};

const getAllPosts = async () => {
  return await pool.query('SELECT * FROM posts');
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
