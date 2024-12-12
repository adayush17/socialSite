const pool = require('../config/db');

const followUser = async (followerId, followingId) => {
  const query = 'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) RETURNING *';
  return await pool.query(query, [followerId, followingId]);
};

const unfollowUser = async (followerId, followingId) => {
  const query = 'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2 RETURNING *';
  return await pool.query(query, [followerId, followingId]);
};

const getFollowers = async (userId) => {
  const query = 'SELECT * FROM follows WHERE following_id = $1';
  return await pool.query(query, [userId]);
};

const getFollowing = async (userId) => {
  const query = 'SELECT * FROM follows WHERE follower_id = $1';
  return await pool.query(query, [userId]);
};

const getFollowByUser = async (userId, followingId) => {
  const query =
    "SELECT COUNT(*) AS follow_count FROM follows WHERE follower_id = $1 AND following_id = $2";
  const result = await pool.query(query, [userId, followingId]);
  return result.rows[0];
};


module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowByUser,
};
