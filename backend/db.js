const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
})

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    post: [
        {
            title: String,
            content: String
        }
    ]
})

const Post = mongoose.model('Post', postSchema);

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Post
};