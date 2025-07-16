import { Container, TextField, Button, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPostThunk } from '../features/boardSlice'
function Post() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [imgFile, setImgFile] = useState(null) // 파일객체
   const [imgUrl, setImgUrl] = useState('') // 경로

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

   const onPostCreate = (data) => {
      dispatch(createPostThunk(data))
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => console.error('게시물 등록 에러:', error))
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
      if (imgFile && imgFile.name) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
         postData.append('img', encodedFile)
      }

      onPostCreate(postData)
   }

   return (
      <>
         <Container maxWidth="md">
            <Box component="form" onSubmit={handlePostSubmit}>
               <TextField
                  fullWidth
                  sx={{ mt: 2 }}
                  value={title}
                  placeholder="제목을 입력하세요."
                  onChange={(e) => {
                     setTitle(e.target.value)
                  }}
               />
               <TextField fullWidth sx={{ mt: 2 }} value={content} multiline rows={10} placeholder="본문을 입력하세요." onChange={(e) => setContent(e.target.value)} />
               <Button variant="contained" component="label" sx={{ mt: 4 }}>
                  이미지 업로드
                  <input type="file" name="img" hidden onChange={onChangeImage} />
               </Button>
               {imgUrl && (
                  <Box mt={2}>
                     <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '100px' }} />
                  </Box>
               )}
               <br />
               <Button sx={{ mt: 4 }} type="submit">
                  등록하기
               </Button>
            </Box>
         </Container>
      </>
   )
}

export default Post
