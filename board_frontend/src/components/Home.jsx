import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import FolderIcon from '@mui/icons-material/Folder'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { Container } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPostsThunk } from '../features/boardSlice'

function Home() {
   const { posts, pagination, loading, error } = useSelector((state) => state.board)
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()

   // console.log('💟Home.jsx - posts:', posts)
   // console.log('💟Home.jsx - pagination:', pagination)

   const handlePageChange = (e, value) => {
      setPage(value)
   }

   useEffect(() => {
      dispatch(getPostsThunk(page))
   }, [dispatch, page])

   return (
      <Container maxWidth="md">
         <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            게시글
         </Typography>
         <List
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
         >
            {posts.map((post) => {
               return (
                  <ListItem
                     key={post.id}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 40,
                     }}
                  >
                     {post.img ? (
                        <img
                           src={`${import.meta.env.VITE_APP_API_URL}${post.img}`}
                           alt="이미지 미리보기"
                           style={{
                              width: '50px',
                           }}
                        />
                     ) : (
                        <FolderIcon style={{ width: '50px' }} />
                     )}
                     <Link to={`/board/${post.id}`}>
                        <ListItemText primary={post.title} sx={{ textAlign: 'center' }} />
                     </Link>

                     <ListItemText primary={post.Member.name} sx={{ textAlign: 'right' }} />
                  </ListItem>
               )
            })}
         </List>
         {pagination.totalPages > 0 && (
            <Stack spacing={5} sx={{ mt: 3, alignItems: 'center' }}>
               <Pagination count={pagination.totalPages} page={page} onChange={handlePageChange} variant="outlined" />
            </Stack>
         )}
      </Container>
   )
}

export default Home
