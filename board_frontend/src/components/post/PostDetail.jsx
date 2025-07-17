import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostThunk, getPostByIdThunk } from '../../features/boardSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

function PostDetail({ isAuthenticated, member }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useParams()

   useEffect(() => {
      dispatch(getPostByIdThunk(id))
   }, [dispatch])

   const { data, loading, error } = useSelector((state) => state.board)
   console.log('💥detail data:', data)

   const onClickDelete = (id) => {
      const targetDelete = confirm('정말 삭제하시겠습니까?')
      if (targetDelete) {
         dispatch(deletePostThunk(id))
            .unwrap()
            .then(() => {
               navigate('/')
               alert('삭제되었습니다.')
            })
            .catch((error) => console.error('에러 발생:', error))
      }
   }
   if (loading) {
      return <p>게시물을 불러오는 중입니다...</p>
   }
   if (error) {
      return <h1>에러 발생:{error}</h1>
   }

   return data ? (
      <Card sx={{ maxWidth: '700px', margin: '0 auto' }}>
         <Box sx={{ padding: 2 }}>
            <Typography variant="h6">{data.title}</Typography>
         </Box>
         {/* 작성일자/작성자 - 우측 하단 */}
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
               작성일자: {data.createdAt.split('T')[0]}　작성자: {data.Member.name}
            </Typography>
         </Box>
         {isAuthenticated && data.Member.id === member.id ? (
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
               <Link to={`/board/edit/${data.id}`} state={{ initialData: data }}>
                  <IconButton>
                     <EditIcon />
                  </IconButton>
               </Link>

               <IconButton onClick={() => onClickDelete(id)}>
                  <DeleteForeverIcon />
               </IconButton>
            </CardActions>
         ) : null}
         {data.img ? <CardMedia component="img" image={`${import.meta.env.VITE_APP_API_URL}${data.img}`} alt="게시글이미지" /> : null}
         <CardContent>
            <Typography sx={{ color: 'text.secondary' }}>{data.content}</Typography>
         </CardContent>{' '}
         <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to={`/`} state={{ initialData: data }}>
               <IconButton>
                  <HomeIcon />
               </IconButton>
            </Link>
         </CardActions>
      </Card>
   ) : (
      <p>잠시 기다려 주세요...</p>
   )
}

export default PostDetail
