const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
    },
    email: {
        type: String,
        required: true,
        min: 2,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    imagePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    likes: Number,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports=User