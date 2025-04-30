import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Navbar } from '../components/Navbar';

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white md:w-100 lg:w-150 lg:mx-auto w-70 text-center p-2 h-max px-4">
                    <div className="font-bold text-4xl pt-6">
                        Log In
                    </div>
                    <div className="text-slate-500 text-md pt-1 px-4 pb-4">
                        Enter your credentials to access your account
                    </div>
                    <div className="text-sm font-medium text-left py-2">
                        Username
                    </div>
                    <input onChange={e => {
                        setUsername(e.target.value);
                    }} placeholder="example@gmail.com" className="w-full px-2 py-1 border rounded border-slate-200" />

                    <div className="text-sm font-medium text-left py-2">
                        Password
                    </div>
                    <input onChange={e => {
                        setPassword(e.target.value);
                    }} placeholder="" className="w-full px-2 py-1 border rounded border-slate-200" />
                    <div className="pt-4">
                        <button onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/users/signin", {
                                username,
                                password
                            })
                            localStorage.setItem("token", response.data.token)
                            navigate("/modifyposts")
                        }} type="button" class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Log in</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default LogIn