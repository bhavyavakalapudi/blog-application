import axios from 'axios';
import React, { useState } from 'react'
import { Navbar } from '../components/Navbar';
import { Link, NavLink } from 'react-router-dom'

const ModifyPosts = () => {
    const [showForm, setShowForm] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [showPosts, setShowPosts] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titletoDelete, setTitleToDelete] = useState("");

    function handleViewPosts() {

        setShowForm(false);
        setDeleteForm(false);
        const response = axios.get('http://localhost:3000/api/v1/posts/getmyposts', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        response.then((response) => {
            setUserPosts(response.data.posts);
            console.log("post is", response.data.posts);
        });
        setShowPosts(true);

    }

    return (

        <div>
            <Navbar />
            <div className='min-h-screen bg-slate-300'>


                <div className="flex justify-center">
                    <button className='text-white bg-blue-500 rounded-lg m-2 p-2' onClick={() => {
                        setShowPosts(false);
                        setShowForm(true)
                        setDeleteForm(false)
                    }}>Add Post</button>
                    <button className='text-white bg-blue-500 rounded-lg m-2 p-2' onClick={() => {
                        setShowPosts(false);
                        setShowForm(false)
                        setDeleteForm(true)
                    }}>Delete Post</button>
                    <button className='text-white bg-blue-500 rounded-lg m-2 p-2' onClick={handleViewPosts}>View My Posts</button>
                </div>

                {showForm && (
                    <div className="flex flex-col justify-center items-center pt-4">
                        <div className="rounded-lg bg-white w-70 md:w-100 lg:w-120 text-center p-2 h-max px-4">
                            <h2 className="">Blog Form</h2>
                            <div className="text-sm font-medium text-left py-2">
                                Title
                            </div>
                            <input onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                                type="text"
                                placeholder="Title"
                                className="w-full px-2 py-1 border rounded border-slate-200" />
                            <div className="text-sm font-medium text-left py-2">
                                Content
                            </div>
                            <textarea onChange={(e) => {
                                setContent(e.target.value);
                            }}
                                type="text"
                                placeholder="Content"
                                className="w-full px-2 py-1 border rounded border-slate-200" />

                            <div className='pt-4'>
                                <button class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    onClick={async () => {
                                        const response = await axios.post("http://localhost:3000/api/v1/posts/addpost", {
                                            title,
                                            content
                                        }, {
                                            headers: {
                                                Authorization: "Bearer " + localStorage.getItem("token")
                                            }
                                        })
                                        if (response.data.message === 'Post added successfully') {
                                            alert('Post created')
                                        }
                                    }} >Submit</button>
                            </div>
                        </div>
                    </div>
                )}

                {deleteForm && (
                    <div className="flex flex-col justify-center items-center pt-4">
                        <div className="rounded-lg bg-white md:w-100 lg:w-120 w-70 text-center p-2 h-max px-4">
                            <h2 className="">Delete Form</h2>
                            <div className="text-sm font-medium text-left py-2">
                                Title
                            </div>
                            <input onChange={(e) => {
                                setTitleToDelete(e.target.value);
                            }} type="text" placeholder="Title" className="w-full px-2 py-1 border rounded border-slate-200" />
                            <div className='pt-4'>
                                <button class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    onClick={async () => {
                                        const response = await axios.delete("http://localhost:3000/api/v1/posts/deletepost", {
                                            data: { title: titletoDelete },
                                            headers: {
                                                Authorization: "Bearer " + localStorage.getItem("token")
                                            }
                                        });
                                        if (response.data.message === 'Post deleted successfully') {
                                            alert('Post deleted successfully')
                                        }
                                        console.log(titletoDelete)
                                    }} >Delete Post</button>
                            </div>
                        </div>
                    </div>
                )}
                {showPosts && (
                    <div className="flex flex-col justify-center items-center pt-4">
                        <div className="rounded-lg bg-white text-center p-2 h-max px-4">
                            <h2 className="font-bold">My Posts</h2>
                            {userPosts.map((posts) => (
                                <div key={posts._id}>
                                    {posts.post.map((post) => (
                                        <div key={post.title} >
                                            <div className="ml-4 mt-2 p-2 border bg-white">
                                            <h3 className="text-blue-600">{post.title}</h3>
                                            <p>{post.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ModifyPosts