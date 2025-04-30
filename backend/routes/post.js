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
            message: 'Post added successfully', postAvail
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

router.delete('/deletepost', authMiddleware, async(req, res) => {
    
    const title = req.body.title

    const postAvail = await Post.findOne({
        userId: req.userId
    });

    if(postAvail) {
        postAvail.post = postAvail.post.filter(post => post.title !== title);
        await postAvail.save();
        return res.status(200).json({
            message: 'Post deleted successfully', postAvail
        });
    }
})

router.get('/getmyposts', authMiddleware, async (req, res) => {
    try {
      const posts = await Post.find({ userId: req.userId });
      res.json({ posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

module.exports = router