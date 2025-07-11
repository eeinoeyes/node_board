import axios from 'axios'
const BASE_URL = import.meta.env.VITE_APP_API_URL

const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-type': 'application/json',
   },
   withCredentials: true,
})

// 회원가입
export const registerMember = async (memberData) => {
   try {
      const response = await boardApi.post('/member/enter', memberData)
      return response
   } catch (err) {
      console.error(`API Request 오류: ${err.message}`)
      throw err
   }
}

// 로그인
export const loginMember = async (credential) => {
   try {
      const response = await boardApi.post('/member/login', credential)
      return response
   } catch (err) {
      console.error(`API Request 오류: ${err.message}`)
      throw err
   }
}

// 로그아웃
export const logoutMember = async () => {
   try {
      const response = await boardApi.get('/member/logout')
      return response
   } catch (err) {
      console.error(`API Request 오류: ${err.message}`)
      throw err
   }
}
