import { Container } from '@mui/material'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loginMemberThunk, clearAuthError } from '../../features/memberSlice'
import { useDispatch, useSelector } from 'react-redux'

import './auth.css'

function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.members)

   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   const handleLogin = (e) => {
      e.preventDefault()
      if (!email.trim() || !password.trim()) {
         alert('이메일과 패스워드는 필수 입력값입니다.')
         return
      }
      dispatch(loginMemberThunk({ email, password }))
         .unwrap()
         .then(() => {
            // console.log(`💕${email}로 로그인 완료`)
            navigate('/')
         })
         .catch((err) => console.error(`로그인 실패: ${err}`))
   }
   return loading ? (
      <p>잠시만 기다려 주세요...</p>
   ) : (
      <Container maxWidth="sm">
         <h1 style={{ color: 'gray' }}>로그인</h1>
         {error && (
            <Typography color="error" align="center">
               {error}
            </Typography>
         )}

         <form>
            <TextField
               required
               id="outlined-required-email"
               label="email"
               placeholder="이메일을 입력하세요."
               fullWidth
               margin="normal"
               onChange={(e) => {
                  setEmail(e.target.value)
               }}
            />

            <TextField
               required
               id="outlined-required-pw"
               label="pw"
               type="password"
               placeholder="패스워드를 입력하세요."
               fullWidth
               margin="normal"
               onChange={(e) => {
                  setPassword(e.target.value)
               }}
            />
            <Stack spacing={2} direction="column">
               <Button className="Button loginButton" variant="contained" onClick={handleLogin}>
                  로그인
               </Button>
               <Link to={'/register'}>
                  <Button className="Button loginButton">가입</Button>
               </Link>
            </Stack>
         </form>
      </Container>
   )
}

export default Login
