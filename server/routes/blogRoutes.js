const express = require('express');
const router = express.Router();
const {getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost, getPostComments, createComment} = require('../controllers/blogController');
const {protect} = require('../middleware/authMiddleware');

router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', protect, createBlogPost);
router.put('/:id', protect, updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);

router.get('/:postId/comments', getPostComments);
router.post('/:postId/comments', protect, createComment);

module.exports = router;
