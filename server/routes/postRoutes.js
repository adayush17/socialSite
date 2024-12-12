const express = require('express');
const { create, edit, deletePostById, getAll } = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const cloudinary = require("cloudinary").v2;  
const router = express.Router();

cloudinary.config({
  url: process.env.CLOUDINARY_URL,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', authenticateToken, upload.single('image'), create);
router.put('/:id', authenticateToken, upload.single('image'), edit);
router.delete('/:id', authenticateToken, deletePostById);
router.get('/', getAll);

module.exports = router;
