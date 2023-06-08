const express = require('express');

const router = express.Router();

const usersController=require('../controllers/users')

const verifyToken = require('../middleware/auth')


router.get('/:id', verifyToken, usersController.getUser);

router.get('/:id/friends', verifyToken, usersController.getUserFriends);

router.patch('/:id/:friendId',verifyToken,usersController.addOrRemoveFriend)
module.exports = router;