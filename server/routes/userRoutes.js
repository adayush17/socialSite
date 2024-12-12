const express = require('express');
const { getUserProfile, updateProfile, getAll, searchUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// Used cloudinary for image management
cloudinary.config({
  url: process.env.CLOUDINARY_URL
});

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.get("/", getAll);
router.get("/search", searchUser);
router.get('/:id', getUserProfile);
router.put('/:id', authenticateToken, upload.single('profile_picture'), updateProfile);


module.exports = router;
