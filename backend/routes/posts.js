const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts');
const verifyToken = require('../middleware/auth');


// get

router.get('/', verifyToken, postController.getFeedPosts);
router.get('/:userId/posts',verifyToken,postController.getUserPosts)

// update

router.post('/posts',verifyToken,postController.createPost)

router.patch('/:id/like', verifyToken, postController.likePost);

module.exports=router