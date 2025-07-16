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
      const response = await boardApi.post('/member/register', memberData)
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

//상태확인
export const checkAuthStatus = async () => {
   try {
      const response = await boardApi.get('/member/status')
      return response.data
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//새글 등록
export const createPost = async (data) => {
   try {
      console.log('create-post-data:', data)
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await boardApi.post('/board', data, config)
      return response
   } catch (err) {
      console.error(`포스트 등록 API Request 오류: ${err.message}`)
      throw err
   }
}
// 전체 게시물 가져오기
export const getPosts = async (page) => {
   try {
      const response = await boardApi.get(`/board?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류:${error.message} `)
      throw error
   }
}
