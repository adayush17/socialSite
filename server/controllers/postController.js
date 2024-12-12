const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../models/postModel");
const cloudinary = require("cloudinary").v2;

// Helper function to upload an image to Cloudinary
const uploadImageToCloudinary = (fileBuffer) => {
  const uploadOptions = {
    resource_type: "image",
    timeout: 120000,
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error("Error uploading image to Cloudinary"));
        }
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// Create a post
const create = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadImageToCloudinary(req.file.buffer);
    }

    const createdPost = await createPost(userId, content, imageUrl);
    if (createdPost.rows.length === 0) {
      return res.status(404).json({ message: "Post not created" });
    }

    res.status(201).json(createdPost.rows[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Edit a post
const edit = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadImageToCloudinary(req.file.buffer);
    }

    const updatedPost = await updatePost(postId, content, imageUrl);
    if (updatedPost.rows.length === 0) {
      return res.status(404).json({ message: "Post not found or not updated" });
    }

    res.status(200).json(updatedPost.rows[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

// Delete a post
const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await deletePost(postId);
    if (deletedPost.rows.length === 0) {
      return res.status(404).json({ message: "Post not found or not deleted" });
    }

    res.status(200).json(deletedPost.rows[0]);
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

// Get all posts
const getAll = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

module.exports = { create, edit, deletePostById, getAll };
