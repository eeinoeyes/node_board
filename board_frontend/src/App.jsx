import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Post from './components/post/Post'
import Register from './components/Register'
import Navbar from './components/shared/Navbar'

import './styles/common.css'
import { checkAuthStatusThunk } from './features/memberSlice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, member } = useSelector((state) => state.members)
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} member={member} />
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} member={member} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/create" element={<Post />} />
         </Routes>
      </>
   )
}

export default App
