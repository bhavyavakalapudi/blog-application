import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewPosts from './pages/ViewPosts'
import LogIn from './pages/LogIn'
import ModifyPosts from './pages/ModifyPosts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewPosts/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/modifyposts" element={<ModifyPosts/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
