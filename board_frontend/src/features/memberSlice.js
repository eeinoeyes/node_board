import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerMember, loginMember, logoutMember, checkAuthStatus } from '../api/boardApi'
//회원가입
export const registerMemberThunk = createAsyncThunk('member/registerMember', async (memberData, { rejectWithValue }) => {
   try {
      const response = await registerMember(memberData)
      return response.data
   } catch (err) {
      return rejectWithValue(err.response?.data?.message)
   }
})

//로그인
export const loginMemberThunk = createAsyncThunk('member/loginMember', async (credentials, { rejectWithValue }) => {
   try {
      //여기서 await하는 loginMember, 매개변수 credentials : boardApi에서 정의한 함수

      const response = await loginMember(credentials)
      return response.data.member
   } catch (err) {
      return rejectWithValue(err.response?.data?.message)
   }
})

//로그아웃
export const logoutMemberThunk = createAsyncThunk('member/logoutMember', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutMember()
      return response.data
   } catch (err) {
      return rejectWithValue(err.response?.data?.message)
   }
})
//상태확인
export const checkAuthStatusThunk = createAsyncThunk('member/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const memberSlice = createSlice({
   name: 'member',
   initialState: {
      member: null,
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {
      clearAuthError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         //회원가입
         .addCase(registerMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.member = action.payload
         })
         .addCase(registerMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         //로그인
         .addCase(loginMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.member = action.payload
         })
         .addCase(loginMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         //로그아웃
         .addCase(logoutMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutMemberThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.member = null // 로그아웃했으니까 유저 정보 없애기
         })
         .addCase(logoutMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         //상태확인
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.member = action.payload.member || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})
export const { clearAuthError } = memberSlice.actions
export default memberSlice.reducer
