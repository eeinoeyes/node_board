import { Container } from '@mui/material'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerMemberThunk, clearAuthError } from '../../features/memberSlice'

import './auth.css'

function RegisterForm() {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignup, setIsSignup] = useState(false)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   //뒷정리 함수
   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   const handleSignup = (e) => {
      e.preventDefault()
      if (!email.trim() || !name.trim() || !password.trim() || !confirmPassword.trim()) {
         alert('모든 필드에 값을 입력해 주세요.')
         return
      }
      if (password !== confirmPassword) {
         alert('비밀번호와 확인이 일치하지 않습니다.')
         return
      }
      dispatch(registerMemberThunk({ email, name, password }))
         .unwrap()
         .then(() => {
            setIsSignup(true)
            console.log(`${email}, ${name}으로 가입 완료`)
         })
         .catch((err) => console.error(`회원가입 중 에러 발생: ${err.message || err}`))
   }
   if (isSignup) {
      return (
         <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom align="center" style={{ marginTop: '20px' }}>
               회원가입이 완료되었습니다!
            </Typography>
            <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
               로그인 페이지로 이동하세요.
            </Typography>
            <Button
               className="Button loginButton"
               variant="contained"
               color="primary"
               fullWidth
               onClick={() => navigate('/login')} // 로그인 페이지로 이동
            >
               로그인 하러 가기
            </Button>
         </Container>
      )
   }
   return (
      <Container maxWidth="sm">
         <form onSubmit={handleSignup}>
            <TextField
               required
               label="이메일"
               placeholder="이메일을 입력하세요."
               fullWidth
               margin="normal"
               onChange={(e) => {
                  setEmail(e.target.value)
               }}
            />
            <TextField
               required
               label="이름"
               placeholder="이름을 입력하세요."
               fullWidth
               margin="normal"
               onChange={(e) => {
                  setName(e.target.value)
               }}
            />

            <TextField
               required
               label="비밀번호"
               type="password"
               placeholder="패스워드를 입력하세요."
               fullWidth
               margin="normal"
               onChange={(e) => {
                  setPassword(e.target.value)
               }}
            />
            <TextField
               required
               label="비밀번호 확인"
               type="password"
               placeholder="패스워드를 확인합니다."
               fullWidth
               margin="normal"
               onChange={(e) => {
                  setConfirmPassword(e.target.value)
               }}
            />
            <Stack>
               <Button variant="contained" className="Button loginButton" type="submit">
                  가입하기
               </Button>
            </Stack>
         </form>
      </Container>
   )
}

export default RegisterForm
