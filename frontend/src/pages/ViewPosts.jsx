import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navbar } from '../components/Navbar'

const ViewPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/posts").then(
            (response) => {
                setPosts(response.data.posts)
            }
        )
    }, [])
    return (
        <div>
            <Navbar />

            <div className="bg-slate-300 min-h-screen flex flex-col items-center p-6">
                {posts.map((postNow, index) => (
                    <Post key={index} post={postNow.post} />
                ))}
            </div>
        </div>
    )
}

function Post({ post }) {
    return (
        <div>
            {post.map(postNow => 
                <div className="border p-4 mb-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">{postNow.title}</h2>
                    <p className="mt-2 text-gray-700">{postNow.content}</p>
                </div>
            )}
        </div>
    )
}

export default ViewPosts