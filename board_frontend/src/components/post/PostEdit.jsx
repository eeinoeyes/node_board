import { Container, TextField, Button, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createPostThunk, updatePostThunk } from '../../features/boardSlice'
import { useLocation } from 'react-router-dom'

function PostEdit() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const { id } = useParams()

   const initialData = location.state?.initialData
   const [title, setTitle] = useState(initialData.title)
   const [content, setContent] = useState(initialData.content)
   const [imgFile, setImgFile] = useState(null) // 파일객체
   const [imgUrl, setImgUrl] = useState(import.meta.env.VITE_APP_API_URL + initialData.img) // 경로
   //    console.log('⭕PostEdit.jsx / initialData:', initialData)

   //이미지 미리보기, 등록
   const onChangeImage = (e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setImgFile(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (ev) => {
         setImgUrl(ev.target.result)
      }
   }

   const onPostEdit = (postData) => {
      dispatch(updatePostThunk({ id, postData }))
         .unwrap()
         .then(() => navigate('/'))
         .catch((error) => console.error('게시물 수정 중 오류 발생:', error))
   }
   const handlePostSubmit = (e) => {
      e.preventDefault()
      if (!title.trim() || !content.trim()) {
         alert('제목과 내용은 필수입력값입니다.')
         return
      }
      const postData = new FormData()
      postData.append('title', title)
      postData.append('content', content)
      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
         postData.append('img', encodedFile)
      }

      onPostEdit(postData)
   }

   return (
      <>
         <Container maxWidth="md">
            <Box component="form" onSubmit={handlePostSubmit}>
               <TextField
                  fullWidth
                  sx={{ mt: 2 }}
                  value={title}
                  onChange={(e) => {
                     setTitle(e.target.value)
                  }}
               />
               <TextField fullWidth sx={{ mt: 2 }} value={content} multiline rows={10} onChange={(e) => setContent(e.target.value)} />
               <Button className="Button inputButton" variant="contained" component="label" sx={{ mt: 4 }}>
                  이미지 업로드
                  <input type="file" name="img" accept="image/*" hidden onChange={onChangeImage} />
               </Button>

               {imgUrl ? (
                  <Box mt={2}>
                     <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '100px' }} />
                  </Box>
               ) : initialData.img ? (
                  <Box mt={2}>
                     <img src={`${import.meta.env.VITE_APP_API_URL}${initialData.img}`} alt="업로드 이미지 미리보기" style={{ width: '100px' }} />
                  </Box>
               ) : null}
               <br />
               <Button className="Button inputButton" sx={{ mt: 4 }} type="submit">
                  수정하기
               </Button>
            </Box>
         </Container>
      </>
   )
}

export default PostEdit
