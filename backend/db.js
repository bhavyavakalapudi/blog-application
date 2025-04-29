const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bhavyavakalapudi:T5oyRCjvNPvf6BeF@cluster0.qko4h.mongodb.net/blog?');

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