const pool = require("../config/db");

const likePost = async (userId, postId) => {
    const query = "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *";
    return await pool.query(query, [userId, postId]);
};

const unlikePost = async (userId, postId) => {
    const query = "DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *";
    return await pool.query(query, [userId, postId]);
};

const getLikesForPost = async (postId) => {
  const query = "SELECT COUNT(*) AS like_count FROM likes WHERE post_id = $1";
  const result = await pool.query(query, [postId]);
  return result.rows[0];
};

const getLikeByUser = async (userId, postId) => {
  const query =
    "SELECT COUNT(*) AS like_count FROM likes WHERE post_id = $1 AND user_id = $2";
  const result = await pool.query(query, [postId, userId]);
  return result.rows[0];
};


module.exports = {
  likePost,
  unlikePost,
  getLikesForPost,
  getLikeByUser,
};
