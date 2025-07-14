import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Post from './components/Post'
import Register from './components/Register'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/join" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/post/create" element={<Post />} />
      </Routes>
   )
}

export default App
