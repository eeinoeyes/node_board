import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostByIdThunk } from '../../features/boardSlice'
import { useParams } from 'react-router-dom'
function PostDetail() {
   const dispatch = useDispatch()
   const id = useParams()
   useEffect(() => {
      dispatch(getPostByIdThunk(id))
   }, [dispatch])
   const { data, loading, error } = useSelector((state) => state.board)

   return <></>
}

export default PostDetail
