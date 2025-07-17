import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Post from './components/post/Post'
import Register from './components/Register'
import Navbar from './components/shared/Navbar'
import PostDetail from './components/post/PostDetail'
import PostEdit from './components/post/PostEdit'

import './styles/common.css'
import './App.css'
import { checkAuthStatusThunk } from './features/memberSlice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, member } = useSelector((state) => state.members)
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   const location = useLocation()

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} member={member} />
         <Routes>
            <Route path="/" element={<Home key={location.key} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/create" element={<Post />} />
            <Route path="/board/:id" element={<PostDetail isAuthenticated={isAuthenticated} member={member} />} />
            <Route path="/board/edit/:id" element={<PostEdit />} />
         </Routes>
      </>
   )
}

export default App
