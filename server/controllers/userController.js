const { findUserById, updateUserProfile, findUsersByQuery, allUser } = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

const getAll = async (req, res) => {
  try {
    const posts = await allUser();
    res.status(200).json(posts.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await findUserById(userId);
    if (user.rows.length > 0) {
      res.status(200).json(user.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body; 
  try {
    let profilePictureUrl = null;

    if (req.file) {
      const uploadOptions = {
        resource_type: "image",
        timeout: 120000,
      };

      // Wrap the upload in a Promise
      profilePictureUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(new Error("Error uploading image to Cloudinary"));
            } else {
              resolve(result.secure_url);
            }
          }
        );

        stream.end(req.file.buffer);
      });
    }

    if (profilePictureUrl) {
      updates.profile_picture = profilePictureUrl; 
    }

    const updatedUser = await updateUserProfile(
      userId,
      updates.username,
      updates.profile_picture
    );

    if (updatedUser.rows.length > 0) {
      res.status(200).json(updatedUser.rows[0]);
    } else {
      res.status(404).json({ message: "User not found or not updated" });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

const searchUser = async (req, res) => {
  const query = req.query.query; 
  
  try {
    const result = await findUsersByQuery(query);
    res.status(200).json(result.rows); 
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};


module.exports = {
  getAll,
  getUserProfile,
  updateProfile,
  searchUser,
};
