const User = require('../models/User.js');


exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({message:'user found',user})
    } catch (error) {
        res.status(404).json({message:`error:${error.message}`})
    }
}

exports.getUserFriends = async (req, res, next) => {
    const { id } = req.params;
    try {
       const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((friend) => {
                return User.findById(friend._id)
            })
        )
        const formattedFriends = friends.map((friend) => {
            const{_id, firstName, lastName, occupation, location, imagePath }=friend
            return {_id,firstName,lastName,occupation,location,imagePath}
        })
        res.status(200).json({message:`sending user friends`,formattedFriends})
    } catch (error) {
        res.status(404).json({message:`error:${error.message}`})
    }
}

exports.addOrRemoveFriend = async (req, res, next) => {
    const { id,friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    try {
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((friend) => {
                return friend._id !== friendId
            })
            friend.friends = friend.friends.filter((frie) => {
                return frie._id !== id
            })
        } else {
            user.friends.push(friendId);
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();
    
        const friends = await Promise.all(
            user.friends.map((friend) => {
                return User.findById(friend._id)
            })
        )
        const formattedFriends = friends.map((friend) => {
            const{_id, firstName, lastName, occupation, location, imagePath }=friend
            return {_id,firstName,lastName,occupation,location,imagePath}
        })
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
   
}