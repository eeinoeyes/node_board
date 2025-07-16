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

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPostsThunk } from '../features/boardSlice'

function Home() {
   const { posts, pagination, loading, error } = useSelector((state) => state.board)
   const dispatch = useDispatch()
   console.log('💟Home.jsx - posts:', posts)

   useEffect(() => {
      dispatch(getPostsThunk({ page: 1 }))
   }, [dispatch])

   return (
      <Container maxWidth="md">
         <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            게시글
         </Typography>
         <List>
            {posts.map((post) => {
               return (
                  <ListItem>
                     {post.img ? (
                        <img
                           src={`${import.meta.env.VITE_APP_API_URL}${post.img}`}
                           alt=""
                           style={{
                              width: '30px',
                           }}
                           key={post.id}
                        />
                     ) : (
                        <FolderIcon key={post.id} />
                     )}
                     <ListItemText primary={post.title} />
                     <ListItemText primary={post.Member.name} />
                  </ListItem>
               )
            })}
         </List>
         <Stack spacing={5}>
            <Pagination count={10} variant="outlined" />
         </Stack>
      </Container>
   )
}

export default Home

//250716 페이지네이션구현중
