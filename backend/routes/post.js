const express = require('express');
const { Post } = require('../db');
const { postBody } = require('../types/postCheck');
const authMiddleware = require('../middleware');

const router = express.Router();

router.get('/', async(req, res) => {

    const posts = await Post.find();
    res.json({
        posts: posts
    });
})

router.post('/addpost', authMiddleware, async(req, res) => {

    const success = postBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const postAvail = await Post.findOne({
        userId: req.userId
    });

    if(postAvail) {
        postAvail.post.push({title: req.body.title, content: req.body.content});
        await postAvail.save();
        return res.status(200).json({
            message: 'Post added to existing user', postAvail
        });
    }

    const post = await Post.create({
        userId: req.userId,
        post: [
            {
                title: req.body.title,
                content: req.body.content
            }
        ]
    })

    res.json({
        message: "Post added successfully",
        posts: post
    });
})

module.exports = router