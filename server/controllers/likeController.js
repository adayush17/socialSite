const { likePost, unlikePost, getLikesForPost, getLikeByUser } = require('../models/likeModel');

// Like a post
const like = async (req, res) => {
  const postId = req.params.id; 
  const userId = req.user.id; 

  try {
    const result = await likePost(userId, postId);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post' });
  }
};

// Unlike a post
const unlike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await unlikePost(userId, postId);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error unliking post' });
  }
};

// Get likes for a post
const getLikes = async (req, res) => {
  const postId = req.params.id;
  try {
    const likes = await getLikesForPost(postId);
    res.status(200).json({ like_count: Number(likes.like_count) }); 
  } catch (error) {
    console.error("Error fetching likes:", error); 
    res.status(500).json({ message: "Error fetching likes" });
  }
};

const getLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
   try {
     const like = await getLikeByUser(userId, postId);
     res.status(200).json({ like_count: Number(like.like_count) });
   } catch (error) {
     res.status(500).json({ message: "Error fetching likes" });
   }
}

module.exports = { like, unlike, getLikes, getLike };
