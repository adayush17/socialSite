const { followUser, unfollowUser, getFollowers, getFollowing, getFollowByUser } = require('../models/followModel');

// Follow a user
const follow = async (req, res) => {
  const followingId = req.params.id; 
  const followerId = req.user.id; 

  try {
    const result = await followUser(followerId, followingId);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error following user' });
  }
};

// Unfollow a user
const unfollow = async (req, res) => {
  const followingId = req.params.id;
  const followerId = req.user.id;

  try {
    const result = await unfollowUser(followerId, followingId);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error unfollowing user' });
  }
};

// Get followers of a user
const getUserFollowers = async (req, res) => {
  const userId = req.params.id;
  try {
    const followers = await getFollowers(userId);
    res.status(200).json(followers.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching followers' });
  }
};

// Get users followed by the user
const getUserFollowing = async (req, res) => {
  const userId = req.user.id; 
  try {
    const following = await getFollowing(userId);
    res.status(200).json(following.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching following' });
  }
};

const getFollow = async (req, res) => {
  const followingId = req.params.id; 
  const userId = req.user.id; 
  try {
    const follow = await getFollowByUser(userId, followingId);
    res.status(200).json({ follow: Number(follow.follow_count) });
  } catch (error) {
    console.error("Error fetching follow:", error);
    res.status(500).json({ message: "Error fetching follow" });
  }
};


module.exports = {
  follow,
  unfollow,
  getUserFollowers,
  getUserFollowing,
  getFollow,
};
